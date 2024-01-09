
import { AxiosInstance } from "axios";
import { MedicalQuestion } from "../models/Question";
import AxiosProvider from "./AxiosProvider";
import Speciality from "../models/Speciality";
import { MedicLauncUser } from "../models/User";


export default class MedicLaunchApiClient {
  private readonly apiUrl: string;
  private readonly axios: AxiosInstance;
  private readonly baseUrl: string;
  constructor(axiosProvider: AxiosProvider) {
    this.baseUrl = process.env.REACT_APP_MEDIC_LAUNCH_URL!;
    this.apiUrl = this.baseUrl + '/api';
    this.axios = axiosProvider.defaultInstance;
  }

  async getQuestionsInSpeciality(specialityId: string): Promise<MedicalQuestion[]> {
    const response = await fetch(`${this.apiUrl}/questions/speciality/${specialityId}`);
    const data = await response.json();
    return data;
  }

  async saveQuestion(question: MedicalQuestion) {
    await fetch(`${this.apiUrl}/questions/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(question)
    });
  }

  async registerUser(userData: MedicLauncUser): Promise<boolean> {
    const response = await this.axios.post(`${this.baseUrl}/register`, {
      userData
    });

    return response.status === 200;
  }

  async loginUser(email: string, password: string): Promise<string> {
    const response = await this.axios.post(`${this.apiUrl}/login`, {
        email: email,
        password: password
    });

      const { token} = response.data;
      return token;
  }

  async getSpecialitiesList(): Promise<Speciality[]> {
    // use axios to get the list of specialities
    const response = await this.axios.get<Speciality[]>(`${this.apiUrl}/questions/specialities`);
    return response.data;
  }
}