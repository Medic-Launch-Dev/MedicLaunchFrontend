import Speciality from "./Speciality";

export interface TextbookLesson {
  id?: string;
  title: string;
  specialityId: string;
  speciality?: Speciality;
  contents: TextbookLessonContent[];
  questionId?: string;
  isSubmitted?: boolean;
}

export interface TextbookLessonContent {
  id?: string;
  textbookLessonId?: string;
  heading: string;
  text: string;
}