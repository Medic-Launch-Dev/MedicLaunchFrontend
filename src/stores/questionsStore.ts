import { makeAutoObservable } from "mobx";
import { Question } from "../models/Question";
import Speciality from "../models/Speciality";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";
import { PracticeFilter, QuestionsOrder } from "../models/PracticeFilter";

export class QuestionModelUI extends Question {
  submittedAnswerLetter?: string;
}

export class QuestionsStore {
  questions: QuestionModelUI[];
  specialityQuestions: Question[];
  private _currentQuestionIdx: number;
  private _correctAnswers: number;
  private _incorrectAnswers: number;
  apiClient: MedicLaunchApiClient;


  constructor(apClient: MedicLaunchApiClient) {
    this.questions = [];
    this._currentQuestionIdx = 0;
    this._correctAnswers = 0;
    this._incorrectAnswers = 0;
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

  get correctAnswers() {
    return this._correctAnswers;
  }

  get incorrectAnswers() {
    return this._incorrectAnswers;
  }

  get totalQuestions() {
    return this.questions.length;
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

  wasAnsweredCorrectly(question: QuestionModelUI) {
    if (question.submittedAnswerLetter) {
      if (question.submittedAnswerLetter === question.correctAnswerLetter)
        return true;
      else return false;
    }
  }

  submitAnswer(answerLetter: string) {
    this.currentQuestion.submittedAnswerLetter = answerLetter;
    if (answerLetter === this.currentQuestion.correctAnswerLetter) this._correctAnswers += 1;
    else this._incorrectAnswers += 1;
  }

  getSpecialityQuestions(specialityId: string) {
    this.apiClient.getQuestionsInSpeciality(specialityId).then((questions) => {
      this.specialityQuestions = questions;
    });
  }

  async addQuestion(question: Question) {
    await this.apiClient.saveQuestion(question);
  }

  async getSpecialities(): Promise<Speciality[]> {
    const specialities = await this.apiClient.getSpecialitiesList();
    return specialities;
  }

  async setPracticeQuestions(questions: Question[]) {
    this.questions = questions;
  }

  applyOrderAndQuantity(practiceFilter: PracticeFilter) {
    const questionsOrder = practiceFilter.selectionOrder;
    const quantity = practiceFilter.questionsCount;
    console.log("Questions Order: ", questionsOrder);
    console.log("Questions Quantity: ", quantity);
    

    if(this.questions.length === 0) {
      return;
    }

    let practiceQuestions : QuestionModelUI[] = [];

    if(questionsOrder === QuestionsOrder.Randomized) {
      practiceQuestions = this.questions.sort(() => Math.random());
    }
    else if(questionsOrder === QuestionsOrder.OrderBySpeciality) {
      practiceQuestions = this.questions.sort((a, b) => {
        if(a.specialityName && b.specialityName) {
          return a.specialityName.localeCompare(b.specialityName);
        }
        else {
          return 0;
        }
      });
    }

    if(quantity <= practiceQuestions.length) {
      this.questions = practiceQuestions.slice(0, quantity);
    } else {
      this.questions = practiceQuestions;
    }
    console.log("Practice Questions: ", this.questions);
    
  }
}