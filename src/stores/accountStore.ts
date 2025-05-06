import { makeAutoObservable, runInAction } from "mobx";
import { UserProfile } from "../models/User";
import AxiosProvider from "../services/AxiosProvider";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class AccountStore {
  apiClient: MedicLaunchApiClient;
  private _myProfile: UserProfile | null = null;
  isSubscribed: boolean;
  roles: string[] = [];

  // Add loading state properties
  private loadingProfile: boolean = false;
  private loadingSubscription: boolean = false;
  private loadingRoles: boolean = false;

  constructor(apClient: MedicLaunchApiClient) {
    this.apiClient = apClient;
    makeAutoObservable(this);
  }

  get isLoading() {
    return this.loadingProfile || this.loadingSubscription || this.loadingRoles;
  }

  get hasAdminAccess() {
    return this.roles.includes('Admin');
  }

  get hasAuthorAccess() {
    return this.roles.includes("FlashcardAuthor") || this.roles.includes("QuestionAuthor") || this.roles.includes("Admin");
  }

  get hasFlashcardAuthorAccess() {
    return this.roles.includes("FlashcardAuthor") || this.roles.includes("Admin");
  }

  get hasQuestionAuthorAccess() {
    return this.roles.includes("QuestionAuthor") || this.roles.includes("Admin");
  }

  get myProfile(): UserProfile | null {
    if (!this._myProfile && !this.loadingProfile) {
      this.getMyProfile();
    }
    return this._myProfile;
  }

  set myProfile(value: UserProfile | null) {
    this._myProfile = value;
  }

  get hasStudentAccess() {
    return this._myProfile?.isOnFreeTrial || this.myProfile?.hasActiveSubscription || this.roles.includes("FlashcardAuthor") || this.roles.includes("QuestionAuthor") || this.roles.includes("Admin");
  }

  public async getMyProfile() {
    try {
      this.loadingProfile = true;
      const profile: UserProfile = await this.apiClient.getData('account/myprofile');
      runInAction(() => {
        this._myProfile = profile;
      });
    } finally {
      runInAction(() => {
        this.loadingProfile = false;
      });
    }
  }

  public async getSubscriptionStatus() {
    try {
      this.loadingSubscription = true;
      const response: boolean = await this.apiClient.getData('account/hasactivesubscription');
      runInAction(() => {
        this.isSubscribed = response;
      });
    } finally {
      runInAction(() => {
        this.loadingSubscription = false;
      });
    }
  }

  public async getRoles() {
    try {
      this.loadingRoles = true;
      const response: string[] = await this.apiClient.getData('account/roles');
      runInAction(() => {
        this.roles = response;
      });
    } finally {
      runInAction(() => {
        this.loadingRoles = false;
      });
    }
  }
}

const axiosProvider = new AxiosProvider();
const medicLaunchApiClient = new MedicLaunchApiClient(axiosProvider);
const accountStore = new AccountStore(medicLaunchApiClient);
export default accountStore;