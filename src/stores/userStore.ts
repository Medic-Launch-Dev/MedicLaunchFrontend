import { makeAutoObservable } from "mobx";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";
import AxiosProvider from "../services/AxiosProvider";

class UserStore {
  apiClient: MedicLaunchApiClient;

  constructor(apClient: MedicLaunchApiClient) {
    this.apiClient = apClient;
    makeAutoObservable(this);
  }

  async createUser(email: string, password: string): Promise<boolean> {
    return await this.apiClient.registerUser(email, password);
  }

  // async signUserIn(email: string, password: string) {
  //   const res = await this.apiClient.loginUser(email, password);
  //   const tokenData = await res.json();
  //   sessionStorage.clear();
  //   sessionStorage.setItem('accessToken', tokenData.accessToken);
  //   sessionStorage.setItem('refreshToken', tokenData.refreshToken);
  // }
}

const axiosProvider = new AxiosProvider();
const medicLaunchApiClient = new MedicLaunchApiClient(axiosProvider);
const userStore = new UserStore(medicLaunchApiClient);
export default userStore;