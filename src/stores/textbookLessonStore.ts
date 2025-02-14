import { makeAutoObservable } from "mobx";
import { TextbookLesson } from "../models/TextbookLesson";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class TextbookLessonStore {
  private apiClient: MedicLaunchApiClient;

  constructor(apiClient: MedicLaunchApiClient) {
    this.apiClient = apiClient;
    makeAutoObservable(this);
  }

  async getAllTextbookLessons() {
    const lessons: TextbookLesson[] = await this.apiClient.getData("textbooklesson/list");
    return lessons;
  }

  async getTextbookLessonsBySpeciality(specialityId: string) {
    const lessons: TextbookLesson[] = await this.apiClient.getData(`textbooklesson/list?specialityId=${specialityId}`);
    return lessons;
  }

  async getTextbookLessonById(id: string) {
    const lesson: TextbookLesson = await this.apiClient.getData(`textbooklesson/${id}`);
    return lesson;
  }

  async createTextbookLesson(lesson: TextbookLesson) {
    const newLessonId = await this.apiClient.createTextbookLesson(lesson);
    return newLessonId;
  }

  async updateTextbookLesson(lesson: TextbookLesson) {
    const success = await this.apiClient.putData("textbooklesson/update", lesson);
    return success;
  }

  async deleteTextbookLessonById(id: string) {
    const success = this.apiClient.deleteData("textbooklesson/delete", id);
    return success;
  }
}