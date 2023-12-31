export enum QuestionType {
    General,
    PaperOneMockExam,
    PaperTwoMockExam
}

export class Option {
    letter: string;
    text: string;
}

export class MedicalQuestion {
    id: string;
    code: string;
    specialityId: string;
    questionType: QuestionType;
    questionText: string;
    labValues: string;
    options: Option[];
    correctAnswerLetter: string;
    explanation: string;
    clinicalTips: string;
    references: string;
    authorUserId: string;
    createdAt: Date;
    updatedAt: Date;
    updatedByUserId: string;
}