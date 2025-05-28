import { makeAutoObservable } from "mobx";
import { QuestionType } from "./Question";

export enum Familiarity {
    NewQuestions = "NewQuestions",
    IncorrectQuestions = "IncorrectQuestions",
    FlaggedQuestions = "FlaggedQuestions",
    AllQuestions = "AllQuestions"
}

export const familiarityKeyMap = {
    [Familiarity.NewQuestions]: "newQuestions",
    [Familiarity.IncorrectQuestions]: "incorrectQuestions",
    [Familiarity.FlaggedQuestions]: "flaggedQuestions",
    [Familiarity.AllQuestions]: "allQuestions",
  } as const;

export enum QuestionsOrder {
    OrderBySpeciality = "OrderBySpeciality",
    Randomized = "Randomized"
}

export class PracticeFilter {
    constructor() {
        this.specialityIds = [];
        this.familiarity = Familiarity.NewQuestions;
        this.selectionOrder = QuestionsOrder.Randomized;
        this.amount = 20;
        this.allSpecialitiesSelected = false;
        makeAutoObservable(this);
    }
    specialityIds: string[];
    familiarity: Familiarity;
    selectionOrder: QuestionsOrder;
    amount: number;
    questionType: string = QuestionType.General
    allSpecialitiesSelected: boolean;
}