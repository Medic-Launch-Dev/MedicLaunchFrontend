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

  public async getMyProfile() {
    const profile: UserProfile = await this.apiClient.getData('account/myprofile');
    runInAction(() => {
      this.myProfile = profile;
    });
  }

  public async getSubsriptionStatus() {
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