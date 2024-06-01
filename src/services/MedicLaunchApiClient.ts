
import { AxiosInstance } from "axios";
import { FamiliarityCounts } from "../models/FamiliarityCounts";
import { Flashcard } from "../models/Flashcard";
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

  async getQuestionsInSpeciality(specialityId: string, questionBank): Promise<Question[]> {
    const response = await this.axios.post<Question[]>(`${this.apiUrl}/questions/list`, {
      specialityId: specialityId,
      questionType: questionBank
    });
    return response.data;
  }

  async filterQuestions(practiceFilter: PracticeFilter): Promise<Question[]> {
    console.log("Practice Filter: ", practiceFilter);
    const response = await this.axios.post(`${this.apiUrl}/practice/filter`, {
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
    const response = await this.axios.post(`${this.apiUrl}/practice/familiaritycounts`, {
      specialityIds: specialityIds,
      allSpecialitiesSelected: allSpecialitiesSelected
    });

    return response.data;
  }

  async getPaymentClientSecret(planId: number): Promise<string> {
    const response = await this.axios.post(`${this.apiUrl}/payment/create-payment-intent?planId=${planId}`);
    const clientSecret = response.data.clientSecret;
    return clientSecret;
  }

  async getPublishableKey(): Promise<string> {
    const response = await this.axios.get(`${this.apiUrl}/payment/publishable-key`);
    return response.data.publishableKey;
  }

  async uploadFlashCardImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    const response = await this.axios.post(`${this.apiUrl}/flashcard/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async saveFlashCard(flashcard: Flashcard) {
    const response = await this.axios.post<Flashcard>(`${this.apiUrl}/flashcard/create`, {
      ...flashcard
    });

    return response.status === 200;
  }

  async overwriteFlashCard(id: string, name: string, imageUrl: string, specialityId: string) {
    const response = await this.axios.post(`${this.apiUrl}/flashcard/update`, {
      id,
      name,
      imageUrl,
      specialityId
    });

    return response.status === 200;
  }

  async retrieveAllFlashcards(): Promise<Flashcard[]> {
    const response = await this.axios.get<Flashcard[]>(`${this.apiUrl}/flashcard/list`);
    return response.data;
  }

  async postData(endpoint: string, data: any) {
    const response = await this.axios.post(`${this.apiUrl}/${endpoint}`, data);
    return response.status === 200;
  }
  
  async getData(endpoint: string): Promise<any> {
    const response = await this.axios.get<any>(`${this.apiUrl}/${endpoint}`);
    return response.data;
  }
  
  async putData(endpoint: string, data: any) {
    const response = await this.axios.put(`${this.apiUrl}/${endpoint}`, data);
    return response.status === 200;
  }
  
  async deleteData(endpoint: string, id: string) {
    const response = await this.axios.delete(`${this.apiUrl}/${endpoint}/${id}`);
    return response.status === 200;
  }
}