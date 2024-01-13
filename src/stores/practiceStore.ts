import { makeAutoObservable } from "mobx";
import { Familiarity, PracticeFilter, QuestionsOrder } from "../models/PracticeFilter";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

const questionsOrderMapping: { [key: string]: QuestionsOrder } = {
    "Randomized": QuestionsOrder.Randomized,
    "Order By Speciality": QuestionsOrder.OrderBySpeciality
};


export class PracticeStore {
    practiceFilter: PracticeFilter;
    private apiClient: MedicLaunchApiClient;
    
    constructor() {
        this.practiceFilter = new PracticeFilter();
        // this.apiClient = apiClient;
        makeAutoObservable(this);
    }

    setSelectedSpecialities(specialities: string[]) {
        this.practiceFilter.specialities = specialities;
    }

    setFamiliarity(familiarity: Familiarity) {
        console.log("Familiarity: ", familiarity);
        
        this.practiceFilter.familiarity = familiarity;
    }

    setQuestionsOrder(questionsOrder: QuestionsOrder) {
        this.practiceFilter.questionsOrder = questionsOrder;
    }

    setQuestionsCount(questionsCount: number) {
        this.practiceFilter.questionsCount = questionsCount;
    }

    getPracticeFilter() {
        return {
            ...this.practiceFilter,
            questionsOrder: questionsOrderMapping[this.practiceFilter.questionsOrder]
        }
    }

    getPracticeQuestions() {
        return this.apiClient.filterQuestions(this.practiceFilter);
    }

}