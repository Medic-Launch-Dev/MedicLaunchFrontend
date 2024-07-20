import { makeAutoObservable, runInAction } from "mobx";
import { UserProfile } from "../models/User";
import AxiosProvider from "../services/AxiosProvider";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class AccountStore {
  apiClient: MedicLaunchApiClient;
  myProfile: UserProfile | null = null;
  isSubscribed: boolean = false;
  roles: string[] = [];

  constructor(apClient: MedicLaunchApiClient) {
    this.apiClient = apClient;
    makeAutoObservable(this);
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

  public async getMyProfile() {
    const profile: UserProfile = await this.apiClient.getData('account/myprofile');
    runInAction(() => {
      this.myProfile = profile;
    });
  }

  public async getSubscriptionStatus() {
    const response: boolean = await this.apiClient.getData('account/hasactivesubscription');
    runInAction(() => {
      this.isSubscribed = response;
    });
  }

  public async getRoles() {
    const response: string[] = await this.apiClient.getData('account/roles');
    runInAction(() => {
      this.roles = response;
    });
  }
}

const axiosProvider = new AxiosProvider();
const medicLaunchApiClient = new MedicLaunchApiClient(axiosProvider);
const accountStore = new AccountStore(medicLaunchApiClient);
export default accountStore;