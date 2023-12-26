import { makeAutoObservable } from "mobx";
import { questionsData } from "../Questions";

export interface Question {
  questionText: string;
  answers: string[];
  correctAnswer: string;
  submittedAnswer: string | null;
  explanation: string;
}

class QuestionsStore {
  questions: Question[];
  answers: string[];
  currentQuestionIdx: number;


  constructor() {
    this.questions = questionsData;
    this.answers = new Array(this.questions.length);
    this.currentQuestionIdx = 0;
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
}

const questionsStore = new QuestionsStore();
export default questionsStore;