import { makeAutoObservable, runInAction } from "mobx";
import { UserProfile } from "../models/User";
import AxiosProvider from "../services/AxiosProvider";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class AccountStore {
  apiClient: MedicLaunchApiClient;
  private _myProfile: UserProfile | null = null;
  roles: string[] = [];

  loadingProfile: boolean = false;
  loadingRoles: boolean = false;

  constructor(apClient: MedicLaunchApiClient) {
    this.apiClient = apClient;
    makeAutoObservable(this);
  }

  get isLoading() {
    return this.loadingProfile || this.loadingRoles;
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

  get hasStudentAccess() {
    return (
      this._myProfile?.isOnFreeTrial ||
      this.myProfile?.stripeSubscriptionStatus === "active" ||
      this.roles.includes("FlashcardAuthor") ||
      this.roles.includes("QuestionAuthor") ||
      this.roles.includes("Admin")
    );
  }

  get isSubscribed() {
    return this.myProfile?.stripeSubscriptionStatus === "active";
  }

  get isOnFreeTrial() {
    return this.myProfile?.isOnFreeTrial;
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


  get trialQuestionLimitReached() {
    if (this._myProfile?.isOnFreeTrial) {
      return (this._myProfile.remainingTrialQuestions || 0) <= 0;
    }
    return false;
  }

  get trialClinicalCasesLimitReached() {
    if (this._myProfile?.isOnFreeTrial) {
      return (this._myProfile.remainingTrialClinicalCases || 0) <= 0;
    }
    return false;
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