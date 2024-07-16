import { Flashcard } from "./Flashcard";
import { Question } from "./Question";
import Speciality from "./Speciality";

export class Note {
  content: string;
  createdOn?: string;
  flashcard?: Flashcard;
  flashcardId?: string;
  id?: string;
  question?: Question;
  questionId?: string;
  speciality?: Speciality;
  specialityId?: string;
  updatedOn?: string;
  userId?: string;
}