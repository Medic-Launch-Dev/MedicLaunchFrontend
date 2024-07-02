
export default class Speciality {
	id: string;
	name: string;
}

export class SpecialityAnalytics {
	specialityId: string;
	specialityName: string;
	questionsAnswered: number;
	totalQuestions: number;
	correct: number;
	incorrect: number;
}