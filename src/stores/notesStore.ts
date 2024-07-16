import { makeAutoObservable, runInAction } from "mobx";
import { Note } from "../models/Note";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class NotesStore {
  private apiClient: MedicLaunchApiClient;
  selectedSpecialityId?: string;
  notes: Note[] = [];

  constructor(apiClient: MedicLaunchApiClient) {
    this.apiClient = apiClient;
    makeAutoObservable(this);
  }

  async getAllNotes() {
    const notes: Note[] = await this.apiClient.getData('note/list');
    runInAction(() => {
      this.notes = notes;
    });
  }

  async createNote(note: Note) {
    const response = await this.apiClient.postData('note/create', note);
    return response;
  }

  async updateNote(note: Note) {
    const response = await this.apiClient.putData('note/update', note);
    return response;
  }

  async deleteNoteById(noteId: string) {
    const response = await this.apiClient.deleteData('note/delete', noteId);
    return response;
  }
}