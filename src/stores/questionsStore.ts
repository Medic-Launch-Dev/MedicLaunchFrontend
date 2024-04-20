import { makeAutoObservable } from "mobx";
import { FamiliarityCounts } from "../models/FamiliarityCounts";
import { PracticeFilter, QuestionsOrder } from "../models/PracticeFilter";
import { Question } from "../models/Question";
import Speciality from "../models/Speciality";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class QuestionModelUI extends Question {
  submittedAnswerLetter?: string;
}

export class QuestionsStore {
  questions: QuestionModelUI[];
  specialityQuestions: Question[];
  previewQuestion: QuestionModelUI;
  private _currentQuestionIdx: number;
  private _correctAnswers: number;
  private _incorrectAnswers: number;
  apiClient: MedicLaunchApiClient;
  familiarityCounts: FamiliarityCounts;
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

  async getSpecialityQuestions(specialityId: string) {
    return await this.apiClient.getQuestionsInSpeciality(specialityId);
  }

  async addQuestion(question: Question) {
    await this.apiClient.saveQuestion(question);
  }

  async updateQuestion(question: Question) {
    await this.apiClient.overwriteQuestion(question);
  }

  async getSpecialities(): Promise<Speciality[]> {
    // const specialities = await this.apiClient.getSpecialitiesList();
    const specialities = [
      { id: "1", name: "Acute Medicine" },
      { id: "2", name: "Cardiology" },
      { id: "3", name: "Dermatology" },
      { id: "4", name: "Endocrinology" },
      { id: "5", name: "Gastroenterology" },
      { id: "6", name: "Geriatric Medicine" },
      { id: "7", name: "Haematology" },
      { id: "8", name: "Infectious Diseases" },
      { id: "9", name: "Nephrology" },
      { id: "10", name: "Neurology" },
      { id: "11", name: "Oncology" },
      { id: "12", name: "Paediatrics" },
      { id: "13", name: "Psychiatry" },
      { id: "14", name: "Respiratory Medicine" },
      { id: "15", name: "Rheumatology" },
      { id: "16", name: "Allergy and Immunology" },
      { id: "17", name: "Anesthesiology" },
      { id: "18", name: "Critical Care Medicine" },
      { id: "19", name: "Emergency Medicine" },
      { id: "20", name: "Family Medicine" },
      { id: "21", name: "Internal Medicine" },
      { id: "22", name: "Medical Genetics" },
      { id: "23", name: "Medical Oncology" },
      { id: "24", name: "Pain Medicine" },
      { id: "25", name: "Physical Medicine and Rehabilitation" },
      { id: "26", name: "Plastic Surgery" },
      { id: "27", name: "Radiation Oncology" },
      { id: "28", name: "Sleep Medicine" },
      { id: "29", name: "Sports Medicine" },
      { id: "30", name: "Urology" }
    ]

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


    if (this.questions.length === 0) {
      return;
    }

    let practiceQuestions: QuestionModelUI[] = [];

    if (questionsOrder === QuestionsOrder.Randomized) {
      practiceQuestions = this.questions.sort(() => Math.random());
    }
    else if (questionsOrder === QuestionsOrder.OrderBySpeciality) {
      practiceQuestions = this.questions.sort((a, b) => {
        if (a.specialityName && b.specialityName) {
          return a.specialityName.localeCompare(b.specialityName);
        }
        else {
          return 0;
        }
      });
    }

    if (quantity <= practiceQuestions.length) {
      this.questions = practiceQuestions.slice(0, quantity);
    } else {
      this.questions = practiceQuestions;
    }
    console.log("Practice Questions: ", this.questions);
  }

  setPreviewQuestion(question: QuestionModelUI) {
    this.previewQuestion = question;
  }

  getQuestionNumber() {
    return this._currentQuestionIdx + 1;
  }

  async setFamiliarityCounts(specialityIds: string[], allSpecialitesSelected: boolean) {
    this.familiarityCounts = await this.apiClient.getFamiliarityCounts(specialityIds, allSpecialitesSelected);
  }
}