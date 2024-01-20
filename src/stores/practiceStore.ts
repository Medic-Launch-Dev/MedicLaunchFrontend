import { makeAutoObservable } from "mobx";
import { Familiarity, PracticeFilter, QuestionsOrder } from "../models/PracticeFilter";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export class PracticeStore {
    practiceFilter: PracticeFilter;
    private apiClient: MedicLaunchApiClient;
    
    constructor(apiClient: MedicLaunchApiClient) {
        this.practiceFilter = new PracticeFilter()
        this.apiClient = apiClient;
        makeAutoObservable(this);
    }

    setSelectedSpecialities(specialities: string[]) {
        this.practiceFilter.specialityIds = specialities;
    }

    setFamiliarity(familiarity: Familiarity) {
        this.practiceFilter.familiarity = familiarity;
    }

    setQuestionsOrder(questionsOrder: QuestionsOrder) {
        this.practiceFilter.selectionOrder = questionsOrder;
    }

    setQuestionsCount(questionsCount: number) {
        this.practiceFilter.questionsCount = questionsCount;
    }

    setAllSpecialitiesSelected(allSpecialitiesSelected: boolean) {
        this.practiceFilter.allSpecialitiesSelected = allSpecialitiesSelected;
    }
    
    async getPracticeQuestions() {
        return await this.apiClient.filterQuestions(this.practiceFilter);
    }
}