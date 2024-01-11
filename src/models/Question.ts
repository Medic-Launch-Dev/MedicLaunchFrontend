export enum QuestionType {
    General = "General",
    PaperOneMockExam = "PaperOneMockExam",
    PaperTwoMockExam = "PaperTwoMockExam",
}

export class Option {
    letter: string;
    text: string;
}

export class MedicalQuestion {
    id?: string;
    specialityId: string;
    questionType: QuestionType;
    questionText: string;
    options: Option[];
    correctAnswerLetter: string;
    explanation: string;
    clinicalTips: string;
    learningPoints: string;
    isSubmitted: boolean;
}