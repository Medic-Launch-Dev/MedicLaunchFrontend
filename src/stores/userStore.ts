import { makeAutoObservable } from "mobx";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";
import AxiosProvider from "../services/AxiosProvider";
import { MedicLauncUser } from "../models/User";

class UserStore {
  apiClient: MedicLaunchApiClient;

  constructor(apClient: MedicLaunchApiClient) {
    this.apiClient = apClient;
    makeAutoObservable(this);
  }

  async createUser(userData: MedicLauncUser): Promise<boolean> {
    return await this.apiClient.registerUser(userData);
  }
}

const axiosProvider = new AxiosProvider();
const medicLaunchApiClient = new MedicLaunchApiClient(axiosProvider);
const userStore = new UserStore(medicLaunchApiClient);
export default userStore;