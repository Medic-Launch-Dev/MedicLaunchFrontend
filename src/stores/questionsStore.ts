import { makeAutoObservable, toJS } from "mobx";
import { questionsData } from "../Questions";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";
import { MedicalQuestion } from "../models/Question";

export interface Question {
  questionText: string;
  answers: string[];
  correctAnswer: string;
  submittedAnswer: string | null;
  explanation: string;
}

class QuestionsStore {
  questions: Question[];
  specialityQuestions: MedicalQuestion[];
  answers: string[];
  currentQuestionIdx: number;
  apiClient: MedicLaunchApiClient;


  constructor(apClient: MedicLaunchApiClient) {
    this.questions = questionsData;
    this.answers = new Array(this.questions.length);
    this.currentQuestionIdx = 0;
    this.apiClient = apClient;
    // this.getSpecialityQuestions("e9093faf-afc7-4a3e-bdc6-a5d66b273257");
    makeAutoObservable(this);
  }

  nextQuestion() {
    this.currentQuestionIdx += 1;
  }

  prevQuestion() {
    this.currentQuestionIdx -= 1;
  }

  setCurrentQuestion(idx: number) {
    this.currentQuestionIdx = idx;
  }

  submitAnswer(answer: string) {
    if (answer === this.questions[this.currentQuestionIdx].correctAnswer)
      this.answers[this.currentQuestionIdx] = "correct";
    else this.answers[this.currentQuestionIdx] = "incorrect";
    this.questions[this.currentQuestionIdx].submittedAnswer = answer;
  }

  getSpecialityQuestions(specialityId: string) {
    this.apiClient.getQuestionsInSpeciality(specialityId).then((questions) => {
      this.specialityQuestions = questions;

      console.log("Questions: ", toJS(this.specialityQuestions));
    });
  }
}

const medicLaunchApiClient = new MedicLaunchApiClient();
const questionsStore = new QuestionsStore(medicLaunchApiClient);
export default questionsStore;