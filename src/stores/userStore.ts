import { makeAutoObservable, runInAction } from "mobx";
import { MedicLaunchUser, UserProfile } from "../models/User";
import AxiosProvider from "../services/AxiosProvider";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class UserStore {
  apiClient: MedicLaunchApiClient;
  users: UserProfile[] = [];
  private _userInViewIdx: number | null = null;

  constructor(apClient: MedicLaunchApiClient) {
    this.apiClient = apClient;
    makeAutoObservable(this);
  }

  get userInView() {
    if (this._userInViewIdx === null) return null;
    return this.users[this._userInViewIdx];
  }

  set userInViewIdx(idx: number | null) {
    this._userInViewIdx = idx;
  }

  public async createUser(userData: MedicLaunchUser): Promise<boolean> {
    return await this.apiClient.registerUser(userData);
  }

  public async getUserList() {
    const users = await this.apiClient.getData('users/list');
    runInAction(() => {
      this.users = users;
    });
  }

  public async updateUser(data: any): Promise<boolean> {
    return await this.apiClient.postData('users/update', data);
  }

  public async resetUserPassword(data: any): Promise<boolean> {
    return await this.apiClient.postData('users/resetuserpassword', data);
  }

  public async deleteUser(userId: string): Promise<boolean> {
    return await this.apiClient.deleteData('users/delete', userId);
  }

  public async addUser(data: any): Promise<boolean> {
    return await this.apiClient.postData('users/add', data);
  }
}

const axiosProvider = new AxiosProvider();
const medicLaunchApiClient = new MedicLaunchApiClient(axiosProvider);
const userStore = new UserStore(medicLaunchApiClient);
export default userStore;