import { makeAutoObservable } from "mobx";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class FlashCardStore {
  private apiClient: MedicLaunchApiClient;
  selectedSpecialityId?: string;

  constructor(apiClient: MedicLaunchApiClient) {
    this.apiClient = apiClient;
    makeAutoObservable(this);
  }

  setSelectedSpecialityId(specialityId: string) {
    this.selectedSpecialityId = specialityId;
  }

  async getFlashCardsBySpeciality(specialityId: string) {
    // implement this method
  }

  async uploadImage(file: File) {
    return this.apiClient.uploadImage(file);
  }
}