import { makeAutoObservable, runInAction } from "mobx";
import { Notification } from "../models/Notification";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class NotificationsStore {
  private apiClient: MedicLaunchApiClient;
  notifications: Notification[] = [];

  constructor(apiClient: MedicLaunchApiClient) {
    this.apiClient = apiClient;
    makeAutoObservable(this);
  }

  async getUserNotifications() {
    const data: Notification[] = await this.apiClient.getData('notification/user-notifications');
    runInAction(() => {
      this.notifications = data;
    });
  }

  async markNotificationAsRead(notificationId: string) {
    return await this.apiClient.postData(`notification/mark-as-read/${notificationId}`, {});
  }

  async createNotification(notification: Notification) {
    return await this.apiClient.postData('notification/create', notification);
  }
}