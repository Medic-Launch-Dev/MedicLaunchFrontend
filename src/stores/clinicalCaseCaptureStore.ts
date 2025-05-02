import { makeAutoObservable } from "mobx";
import { ClinicalCaseDetails } from "../models/ClinicalCaseCapture";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class ClinicalCaseCaptureStore {
  private apiClient: MedicLaunchApiClient;

  constructor(apiClient: MedicLaunchApiClient) {
    this.apiClient = apiClient;
    makeAutoObservable(this);
  }

  async generateClinicalCase(caseDetails: ClinicalCaseDetails) {
    const output = await this.apiClient.generateClinicalCase(caseDetails);
    return output;
  }
}