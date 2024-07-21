import { makeAutoObservable } from "mobx";
import { Notification } from "../models/Notification";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class NotificationsStore {
  private apiClient: MedicLaunchApiClient;

  constructor(apiClient: MedicLaunchApiClient) {
    this.apiClient = apiClient;
    makeAutoObservable(this);
  }

  async getUserNotifications(): Promise<Notification[]> {
    return await this.apiClient.getData('notification/user-notifications');
  }

  async markNotificationAsRead(notificationId: string) {
    return await this.apiClient.postData(`notification/mark-as-read/${notificationId}`, {});
  }

  async createNotification(notification: Notification) {
    return await this.apiClient.postData('notification/create', notification);
  }
}