import { makeAutoObservable } from "mobx";
import { QuestionType } from "./Question";

export enum Familiarity {
    NewQuestions = "NewQuestions",
    IncorrectQuestions = "IncorrectQuestions",
    FlaggedQuestions = "FlaggedQuestions",
    AllQuestions = "AllQuestions"
}

export enum QuestionsOrder {
    OrderBySpeciality = "Order By Speciality",
    Randomized = "Randomized"
}

export class PracticeFilter {
    constructor() {
        this.specialityIds = [];
        this.familiarity = Familiarity.NewQuestions;
        this.selectionOrder = QuestionsOrder.Randomized;
        this.questionsCount = 20;
        this.allSpecialitiesSelected = false;
        makeAutoObservable(this);
    }
    specialityIds: string[];
    familiarity: Familiarity;
    selectionOrder: QuestionsOrder;
    questionsCount: number;
    questionType: string = QuestionType.General
    allSpecialitiesSelected: boolean;
}