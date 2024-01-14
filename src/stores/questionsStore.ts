import { makeAutoObservable, toJS } from "mobx";
import { questionsData } from "../Questions";
import { MedicalQuestion } from "../models/Question";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";
import AxiosProvider from "../services/AxiosProvider";
import Speciality from "../models/Speciality";

export interface Question {
  questionText: string;
  answers: string[];
  correctAnswer: string;
  submittedAnswer: string | null;
  explanation: string;
}

interface Answer {
  result: "correct" | "incorrect" | undefined;
  questionText: string;
}

// TODO: remove question and use class below
// TODO: remove answer option class
// TODO: keep all logic inside the store class
// TODO: don't expose the current question index
// TODO: refactor question view UI class to rely on the store class
// TODO: retrieve the questions from the backend and use in the practice session

export class QuestionModelUI extends MedicalQuestion {
  isAnsweredCorrectly: boolean;
}

class QuestionsStore {
  questions: Question[];
  specialityQuestions: MedicalQuestion[];
  answers: Answer[];
  currentQuestionIdx: number;
  apiClient: MedicLaunchApiClient;


  constructor(apClient: MedicLaunchApiClient) {
    this.questions = questionsData;
    this.answers = this.questions.map(question => { 
      return { result: undefined, questionText: question.questionText };
     })
    this.currentQuestionIdx = 0;
    this.apiClient = apClient;
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
    const question = this.questions[this.currentQuestionIdx]
    if (answer === question.correctAnswer)
      this.answers[this.currentQuestionIdx] = { result: "correct", questionText: question.questionText };
    else this.answers[this.currentQuestionIdx] = { result: "incorrect", questionText: question.questionText };
    this.questions[this.currentQuestionIdx].submittedAnswer = answer;
  }

  getSpecialityQuestions(specialityId: string) {
    this.apiClient.getQuestionsInSpeciality(specialityId).then((questions) => {
      this.specialityQuestions = questions;

      console.log("Questions: ", toJS(this.specialityQuestions));
    });
  }

  async addQuestion(question: MedicalQuestion) {
    await this.apiClient.saveQuestion(question);
  }

  getAnswerTotal(filter?: "correct" | "incorrect") {
    if (!filter) return this.answers.length;

    let total = 0;
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i].result === filter) total += 1;
    }
    
    return total;
  }

  async getSpecialities(): Promise<Speciality[]> {
    const specialities = await this.apiClient.getSpecialitiesList();
    return specialities;
  }
}

const axiosProvider = new AxiosProvider();
const medicLaunchApiClient = new MedicLaunchApiClient(axiosProvider);
const questionsStore = new QuestionsStore(medicLaunchApiClient);
export default questionsStore;