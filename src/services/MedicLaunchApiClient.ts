
import { MedicalQuestion } from "../models/Question";


export default class MedicLaunchApiClient {
  private readonly apiUrl: string;

  constructor() {
    const baseUrl = process.env.REACT_APP_MEDIC_LAUNCH_URL;
    this.apiUrl = baseUrl + '/api';
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
}