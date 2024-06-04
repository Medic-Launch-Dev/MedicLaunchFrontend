import { makeAutoObservable } from "mobx";
import { Familiarity, PracticeFilter, QuestionsOrder } from "../models/PracticeFilter";
import MedicLaunchApiClient from "../services/MedicLaunchApiClient";

export enum TimerState {
	STOPPED,
	RUNNING,
	PAUSED,
}

export class PracticeStore {
	private apiClient: MedicLaunchApiClient;
	practiceFilter: PracticeFilter;
	examTimerState: TimerState = TimerState.STOPPED;
	timeRemaining: number = 7;
	showEndMessage: boolean = false;
	private timerInterval: NodeJS.Timeout;

	constructor(apiClient: MedicLaunchApiClient) {
		this.practiceFilter = new PracticeFilter()
		this.apiClient = apiClient;
		makeAutoObservable(this);
	}

	startTimer() {
		this.examTimerState = TimerState.RUNNING;
		this.timerInterval = setInterval(() => {
			if (this.timeRemaining > 0) {
				this.timeRemaining--;
			} else {
				this.timeRemaining = 0;
				this.pauseTimer();
				this.showEndMessage = true;
			}
		}, 1000);
	}

	pauseTimer() {
		this.examTimerState = TimerState.PAUSED;
		clearInterval(this.timerInterval);
	}

	resetTimer() {
		this.examTimerState = TimerState.STOPPED;
		this.timeRemaining = 7;
		clearInterval(this.timerInterval);
	}

	setShowEndMessage(showEndMessage: boolean) {
		this.showEndMessage = showEndMessage;
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

	async getPracticeStats() {
		return await this.apiClient.getData(`practice/practicestats`);
	}
}