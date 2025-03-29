import { makeAutoObservable, runInAction } from "mobx";
import { FamiliarityCounts } from "../models/FamiliarityCounts";
import { PracticeFilter, QuestionsOrder } from "../models/PracticeFilter";
import { Question, QuestionType } from "../models/Question";
import { QuestionAttempt } from "../models/QuestionAttempt";
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
    this.familiarityCounts = {
      newQuestions: 0,
      incorrectQuestions: 0,
      flaggedQuestions: 0,
      allQuestions: 0,
    };
    makeAutoObservable(this, {}, { autoBind: true });
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

  async submitAnswer(answerLetter: string, isFreeTrial?: boolean) {
    this.currentQuestion.submittedAnswerLetter = answerLetter;
    if (answerLetter === this.currentQuestion.correctAnswerLetter) this._correctAnswers += 1;
    else this._incorrectAnswers += 1;

    if (!isFreeTrial) {
      const questionAttempt: QuestionAttempt = {
        questionId: this.currentQuestion.id || "",
        chosenAnswer: answerLetter,
        correctAnswer: this.currentQuestion.correctAnswerLetter,
        isCorrect: answerLetter === this.currentQuestion.correctAnswerLetter,
      };

      await this.apiClient.postData("practice/attemptquestion", questionAttempt);
    }

  }

  async flagQuestion(isMock?: boolean) {
    if (!isMock) await this.apiClient.postData(`practice/flagquestion/${this.currentQuestion.id}`, {});
    runInAction(() => this.currentQuestion.isFlagged = true);
  }

  async unflagQuestion(isMock?: boolean) {
    if (!isMock) await this.apiClient.postData(`practice/unflagquestion/${this.currentQuestion.id}`, {});
    runInAction(() => this.currentQuestion.isFlagged = false);
  }

  flaggedQuestionsExist() {
    for (let question of this.questions)
      if (question.isFlagged) return true;

    return false;
  }

  async getSpecialityQuestions(specialityId: string, questionBank: string) {
    return await this.apiClient.getQuestionsInSpeciality(specialityId, questionBank);
  }

  async addQuestion(question: Question) {
    await this.apiClient.saveQuestion(question);
  }

  async updateQuestion(question: Question) {
    await this.apiClient.overwriteQuestion(question);
  }

  async deleteQuestion(questionId: string, specialityId: string) {
    return await this.apiClient.removeQuestion(questionId, specialityId);
  }

  async generateQuestionTextAndExplanation(prompt: string) {
    return await this.apiClient.generateQuestionTextAndExplanation(prompt);
  }

  async getTrialQuestions() {
    return await this.apiClient.getData("questions/trial-questions");
  }

  async addTrialQuestion(question: Question) {
    return await this.apiClient.postData("questions/create-trial", question);
  }

  async updateTrialQuestion(question: Question) {
    return await this.apiClient.postData(`questions/update-trial/${question.id}`, question);
  }

  async deleteTrialQuestion(questionId: string) {
    return await this.apiClient.deleteData(`questions/delete-trial`, questionId);
  }

  async getSpecialities(): Promise<Speciality[]> {
    const specialities = await this.apiClient.getSpecialitiesList();

    return specialities.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  async setPracticeQuestions(questions: Question[]) {
    this.questions = questions;
  }

  applyOrderAndQuantity(practiceFilter: PracticeFilter) {
    const questionsOrder = practiceFilter.selectionOrder;
    const quantity = practiceFilter.questionsCount;

    if (this.questions.length === 0) {
      return;
    }

    this._currentQuestionIdx = 0;
    this._correctAnswers = 0;
    this._incorrectAnswers = 0;

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
  }

  async startMock(mockExamType: QuestionType.PaperOneMockExam | QuestionType.PaperTwoMockExam) {
    let mockQuestions = await this.apiClient.startMock(mockExamType);

    // Shuffle the questions
    for (let i = mockQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mockQuestions[i], mockQuestions[j]] = [mockQuestions[j], mockQuestions[i]];
    }

    if (mockQuestions.length > 100) mockQuestions = mockQuestions.slice(0, 100);

    this.questions = mockQuestions;
    this._currentQuestionIdx = 0;
    this._correctAnswers = 0;
    this._incorrectAnswers = 0;
  }

  setPreviewQuestion(question: QuestionModelUI) {
    this.previewQuestion = question;
  }

  getQuestionNumber() {
    return this._currentQuestionIdx + 1;
  }

  async setFamiliarityCounts(specialityIds: string[], allSpecialitesSelected: boolean) {
    const counts = await this.apiClient.getFamiliarityCounts(specialityIds, allSpecialitesSelected);
    runInAction(() => this.familiarityCounts = counts);
  }

  async getQuestionCount() {
    const counts = await this.apiClient.getFamiliarityCounts([], true);
    return counts.allQuestions;
  }

  async getSpecialityAnalytics() {
    const specialityAnalytics = await this.apiClient.retrieveSpecialityAnalytics();
    return specialityAnalytics.sort((a, b) => a.specialityName.localeCompare(b.specialityName));
  }


  async startFreeTrial() {
    const trialQuestions = await this.apiClient.getData("questions/trial-questions");
    this._currentQuestionIdx = 0;
    this._correctAnswers = 0;
    this._incorrectAnswers = 0;
    this.questions = trialQuestions;
  }
}