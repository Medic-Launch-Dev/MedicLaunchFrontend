import { makeAutoObservable } from "mobx";
import { GenerateClinicalCase, ClinicalCase } from "../models/ClinicalCaseCapture";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class ClinicalCaseCaptureStore {
  private apiClient: MedicLaunchApiClient;
  clinicalCases: ClinicalCase[] = [];

  constructor(apiClient: MedicLaunchApiClient) {
    this.apiClient = apiClient;
    makeAutoObservable(this);
  }

  async generateClinicalCase(caseDetails: GenerateClinicalCase) {
    const output = await this.apiClient.generateClinicalCase(caseDetails);
    return output;
  }

  async getAllClinicalCases() {
    const cases: ClinicalCase[] = await this.apiClient.getData('clinicalCases');
    this.clinicalCases = cases;
    return cases;
  }

  async createClinicalCase(clinicalCase: ClinicalCase): Promise<string | undefined> {
    const createdCase = await this.apiClient.createClinicalCase(clinicalCase);
    await this.getAllClinicalCases();
    return createdCase?.id;
  }

  async updateClinicalCase(id: string, clinicalCase: ClinicalCase) {
    await this.apiClient.putData(`clinicalCases/${id}`, clinicalCase);
    await this.getAllClinicalCases();
  }

  async deleteClinicalCase(id: string) {
    await this.apiClient.deleteData('clinicalCases', id);
    await this.getAllClinicalCases();
  }
}