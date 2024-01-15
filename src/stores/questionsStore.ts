import { makeAutoObservable, toJS } from "mobx";
import { newQuestionData, questionsData } from "../Questions";
import { MedicalQuestion } from "../models/Question";
import Speciality from "../models/Speciality";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

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
  isAnsweredCorrectly?: boolean;
}

export class QuestionsStore {
  questions: Question[];
  newModelQuestions: QuestionModelUI[];
  specialityQuestions: MedicalQuestion[];
  answers: Answer[];
  private _currentQuestionIdx: number;
  apiClient: MedicLaunchApiClient;


  constructor(apClient: MedicLaunchApiClient) {
    this.questions = questionsData;
    this.newModelQuestions = newQuestionData;
    this.answers = this.questions.map(question => {
      return { result: undefined, questionText: question.questionText };
    })
    this._currentQuestionIdx = 0;
    this.apiClient = apClient;
    makeAutoObservable(this);
  }

  get currentQuestionIdx() {
    return this._currentQuestionIdx;
  }

  get currentQuestion() {
    return this.questions[this._currentQuestionIdx];
  }

  get onFirstQuestion() {
    return this.currentQuestionIdx === 0;
  }

  get onLastQuestion() {
    return this.currentQuestionIdx === this.questions.length - 1;
  }

  incrementQuestion() {
    this._currentQuestionIdx += 1;
  }

  decrementQuestion() {
    this._currentQuestionIdx -= 1;
  }

  setCurrentQuestion(idx: number) {
    this._currentQuestionIdx = idx;
  }

  submitAnswer(answer: string) {
    const question = this.questions[this._currentQuestionIdx]
    if (answer === question.correctAnswer)
      this.answers[this._currentQuestionIdx] = { result: "correct", questionText: question.questionText };
    else this.answers[this._currentQuestionIdx] = { result: "incorrect", questionText: question.questionText };
    this.questions[this._currentQuestionIdx].submittedAnswer = answer;
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