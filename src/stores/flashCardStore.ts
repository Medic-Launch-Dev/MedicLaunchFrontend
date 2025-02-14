import { makeAutoObservable } from "mobx";
import { Flashcard } from "../models/Flashcard";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class FlashCardStore {
  private apiClient: MedicLaunchApiClient;

  constructor(apiClient: MedicLaunchApiClient) {
    this.apiClient = apiClient;
    makeAutoObservable(this);
  }

  async getAllFlashCards() {
    try {
      const response = await this.apiClient.retrieveAllFlashcards();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getFlashcardById(flashcardId: string) {
    try {
      const response = await this.apiClient.retrieveFlashcardById(flashcardId);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getFlashcardsBySpecialityId(specialityId: string) {
    try {
      const response = await this.apiClient.retrieveAllFlashcards();
      const flashcards = response.filter((flashcard: Flashcard) => flashcard.specialityId === specialityId);
      return flashcards;
    } catch (error) {
      console.error(error);
    }
  }

  async uploadFlashCardImage(file: File) {
    try {
      const imgUrl: string = await this.apiClient.uploadFlashCardImage(file);
      return imgUrl;
    } catch (error) {
      console.error(error);
    }
  }

  async createFlashCard(flashcard: Flashcard) {
    try {
      const response = await this.apiClient.saveFlashCard(flashcard);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteFlashCard(flashcardId: string) {
    return await this.apiClient.removeFlashCard(flashcardId);
  }
}