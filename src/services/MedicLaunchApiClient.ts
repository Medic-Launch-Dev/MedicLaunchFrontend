import { AxiosInstance } from "axios";
import { FamiliarityCounts } from "../models/FamiliarityCounts";
import { Flashcard } from "../models/Flashcard";
import { PracticeFilter } from "../models/PracticeFilter";
import { Question, QuestionTextAndExplanation, QuestionType } from "../models/Question";
import Speciality, { SpecialityAnalytics } from "../models/Speciality";
import { TextbookLesson } from "../models/TextbookLesson";
import { MedicLaunchUser } from "../models/User";
import { ApplicationStore } from "../stores/applicationStore";
import AxiosProvider from "./AxiosProvider";

export default class MedicLaunchApiClient {
  private readonly apiUrl: string;
  private readonly axios: AxiosInstance;
  private readonly baseUrl: string;
  private readonly errorStore?: ApplicationStore;

  constructor(axiosProvider: AxiosProvider, errorStore?: ApplicationStore) {
    this.baseUrl = process.env.REACT_APP_MEDIC_LAUNCH_URL!;
    this.apiUrl = this.baseUrl + '/api';
    this.axios = axiosProvider.defaultInstance;
    this.errorStore = errorStore;
  }

  async getQuestionsInSpeciality(specialityId: string, questionBank): Promise<Question[]> {
    const response = await this.axios.post<Question[]>(`${this.apiUrl}/questions/list`, {
      specialityId: specialityId,
      questionType: questionBank
    });
    return response.data;
  }

  async filterQuestions(practiceFilter: PracticeFilter): Promise<Question[]> {
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

    return response.status === 200;
  }

  async overwriteQuestion(question: Question) {
    const response = await this.axios.post<Question>(`${this.apiUrl}/questions/update/${question.id}`, {
      ...question
    });

    return response.status === 200;
  }

  async removeQuestion(questionId: string, specialityId: string) {
    return await this.deleteData(`questions/delete/${specialityId}`, questionId);
  }

  async generateQuestionTextAndExplanation(conditions: string): Promise<QuestionTextAndExplanation> {
    const response = await this.axios.post(
      `${this.apiUrl}/questions/generate/text-and-explanation`,
      JSON.stringify(conditions),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }

  async generateQuestionContent(condition: string, endpoint: string): Promise<string> {
    const response = await this.axios.post(
      `${this.apiUrl}/questions/generate/${endpoint}`,
      JSON.stringify(condition),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }

  async generateTextbookLesson(learningPoints: string, specialityId: string, questionId?: string): Promise<TextbookLesson> {
    const lesson = await this.axios.post(
      `${this.apiUrl}/textbooklesson/generate`,
      {
        learningPoints,
        specialityId,
        questionId
      }
    );
    return lesson.data;
  }

  async startMock(mockExamType: QuestionType.PaperOneMockExam | QuestionType.PaperTwoMockExam) {
    const res = await this.axios.post(`${this.apiUrl}/mockexam/start/${mockExamType}`, {});
    return res.data;
  }

  async registerUser(userData: MedicLaunchUser): Promise<boolean> {
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

  async retrieveUserProfile() {
    return await this.getData('account/myprofile');
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

  async createCheckoutSession(planId: number): Promise<string> {
    const response = await this.axios.post(`${this.apiUrl}/payment/create-checkout-session?planId=${planId}`);
    const sessionUrl = response.data.sessionUrl;
    return sessionUrl;
  }

  async getPublishableKey(): Promise<string> {
    const response = await this.axios.get(`${this.apiUrl}/payment/publishable-key`);
    return response.data.publishableKey;
  }

  async uploadFlashCardImage(image: File) {
    const formData = new FormData();
    formData.append('file', image);

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

  async createTextbookLesson(lesson: TextbookLesson): Promise<string> {
    const response = await this.axios.post(`${this.apiUrl}/textbooklesson/create`, lesson);

    return response.data;
  }

  async removeFlashCard(flashcardId: string) {
    return await this.deleteData('flashcard/delete', flashcardId);
  }

  async retrieveAllFlashcards(): Promise<Flashcard[]> {
    return await this.getData('flashcard/list');
  }

  async retrieveFlashcardById(id: string): Promise<Flashcard> {
    return await this.getData(`flashcard/${id}`);
  }

  async retrieveSpecialityAnalytics(): Promise<SpecialityAnalytics[]> {
    return await this.getData('practice/specialityanalytics');
  }

  async handleRequest(promise: Promise<any>) {
    try {
      const response = await promise;
      this.errorStore?.clearError();
      return response;
    } catch (error) {
      this.errorStore?.setError("An error occurred while processing your request. Please refresh the page or try again later.");
      throw error;
    }
  }

  async postData(endpoint: string, data: any) {
    const response = await this.handleRequest(
      this.axios.post(`${this.apiUrl}/${endpoint}`, data)
    );
    return response.status === 200;
  }

  async getData(endpoint: string): Promise<any> {
    const response = await this.handleRequest(
      this.axios.get<any>(`${this.apiUrl}/${endpoint}`)
    );
    return response.data;
  }

  async putData(endpoint: string, data: any) {
    const response = await this.handleRequest(
      this.axios.put(`${this.apiUrl}/${endpoint}`, data)
    );
    return response.status === 200;
  }

  async deleteData(endpoint: string, id: string) {
    const response = await this.handleRequest(
      this.axios.delete(`${this.apiUrl}/${endpoint}/${id}`)
    );
    return response.status === 200;
  }
}