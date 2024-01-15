
import { AxiosInstance } from "axios";
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
    const response = await fetch(`${this.apiUrl}/questions/speciality/${specialityId}`);
    const data = await response.json();
    return data;
  }

  async filterQuestions(practiceFilter: PracticeFilter): Promise<Question[]> {
    console.log("Practice Filter: ", practiceFilter);

    const response = this.axios.post(`${this.apiUrl}/questions/filter`, {
      practiceFilter
    });

    const { allQuestions } = (await response).data;

    return allQuestions;
  }

  async saveQuestion(question: Question) {
    const response = await this.axios.post<Question>(`${this.apiUrl}/questions/create`, {
      ...question
    });

    console.log("Response: ", response.data);

    return response.status === 200;
  }

  async registerUser(userData: MedicLauncUser): Promise<boolean> {
    const response = await this.axios.post(`${this.apiUrl}/account/register`, {
      userData
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
    // use axios to get the list of specialities
    const response = await this.axios.get<Speciality[]>(`${this.apiUrl}/questions/specialities`);
    return response.data;
  }
}