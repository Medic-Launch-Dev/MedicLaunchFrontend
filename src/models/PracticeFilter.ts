import { makeAutoObservable } from "mobx";

export enum Familiarity {
    NewQuestions = "New Questions",
    IncorrectQuestions = "Incorrect Questions",
    FlaggedQuestions = "Flagged Questions",
    AllQuestions = "All Questions"
}

export enum QuestionsOrder {
    Randomized = "Randomized",
    OrderBySpeciality = "Order By Speciality"
}

export class PracticeFilter {
    constructor() {
        this.specialities = [];
        this.familiarity = Familiarity.NewQuestions;
        this.questionsOrder = QuestionsOrder.Randomized;
        this.questionsCount = 20;
        makeAutoObservable(this);
    }
    specialities: string[];
    familiarity: Familiarity;
    questionsOrder: QuestionsOrder;
    questionsCount: number;
}