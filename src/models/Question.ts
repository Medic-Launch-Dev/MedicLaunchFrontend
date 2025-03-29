import { Note } from "./Note";

export enum QuestionType {
    General = "General",
    PaperOneMockExam = "PaperOneMockExam",
    PaperTwoMockExam = "PaperTwoMockExam",
}

export class Option {
    letter: string;
    text: string;
}

export class Question {
    clinicalTips: string;
    correctAnswerLetter: string;
    explanation: string;
    id?: string;
    isFlagged?: boolean;
    isSubmitted?: boolean;
    learningPoints: string;
    note?: Note;
    options: Option[];
    previousSpecialityId?: string;
    questionCode?: string;
    questionText: string;
    questionType: QuestionType;
    specialityId: string;
    specialityName?: string;
    videoUrl?: string;
}

export class QuestionTextAndExplanation {
    questionText: string;
    options: Option[];
    correctAnswerLetter: string;
    explanation: string;
}