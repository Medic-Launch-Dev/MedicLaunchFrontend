
import { AxiosInstance } from "axios";
import { FamiliarityCounts } from "../models/FamiliarityCounts";
import { PracticeFilter } from "../models/PracticeFilter";
import { Question } from "../models/Question";
import Speciality from "../models/Speciality";
import { MedicLauncUser } from "../models/User";
import AxiosProvider from "./AxiosProvider";


export default class MedicLaunchApiClient {
  private readonly apiUrl: string;
  private readonly axios: AxiosInstance;
  private readonly baseUrl: string;
  constructor(axiosProvider: AxiosProvider) {
    this.baseUrl = process.env.REACT_APP_MEDIC_LAUNCH_URL!;
    this.apiUrl = this.baseUrl + '/api';
    this.axios = axiosProvider.defaultInstance;
  }

  async getQuestionsInSpeciality(specialityId: string): Promise<Question[]> {
    const response = await this.axios.get<Question[]>(`${this.apiUrl}/questions/speciality/${specialityId}`);
    return response.data;
  }

  async filterQuestions(practiceFilter: PracticeFilter): Promise<Question[]> {
    console.log("Practice Filter: ", practiceFilter);
    const response = await this.axios.post(`${this.apiUrl}/questions/filter`, {
      ...practiceFilter,
      familiarity: practiceFilter.familiarity.toString(),
    });
    return response.data;
  }

  async saveQuestion(question: Question) {
    const response = await this.axios.post<Question>(`${this.apiUrl}/questions/create`, {
      ...question
    });

    console.log("Response: ", response.data);

    return response.status === 200;
  }

  async overwriteQuestion(question: Question) {
    const response = await this.axios.post<Question>(`${this.apiUrl}/questions/update/${question.id}`, {
      ...question
    });

    console.log("Response: ", response.data);

    return response.status === 200;
  }

  async registerUser(userData: MedicLauncUser): Promise<boolean> {
    const response = await this.axios.post(`${this.apiUrl}/account/register`, {
      ...userData
    });

    return response.status === 200;
  }

  async loginUser(email: string, password: string): Promise<string> {
    const response = await this.axios.post(`${this.apiUrl}/login`, {
      email: email,
      password: password
    });

    const { token } = response.data;
    return token;
  }

  async getSpecialitiesList(): Promise<Speciality[]> {
    const response = await this.axios.get<Speciality[]>(`${this.apiUrl}/questions/specialities`);
    return response.data;
  }

  async getFamiliarityCounts(specialityIds: string[], allSpecialitiesSelected: boolean): Promise<FamiliarityCounts> {
    const response = await this.axios.post(`${this.apiUrl}/questions/familiaritycounts`, {
      specialityIds: specialityIds,
      allSpecialitiesSelected: allSpecialitiesSelected
    });

    return response.data;
  }

  async getPaymentClientSecret(planId: number) : Promise<string> {
    const response = await this.axios.post(`${this.apiUrl}/payment/create-payment-intent?planId=${planId}`);
    const clientSecret = response.data.clientSecret;
    return clientSecret;
  }

  async getPublishableKey() : Promise<string> {
    const response = await this.axios.get(`${this.apiUrl}/payment/publishable-key`);
    return response.data.publishableKey;
  }
}