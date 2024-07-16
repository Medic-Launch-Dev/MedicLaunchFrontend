import { Note } from "./Note";

export class Flashcard {
  id?: string;
  name: string;
  imageUrl: string;
  specialityId: string;
  createdBy?: string;
  createdOn?: string;
  note?: Note;
  speciality?: FlashcardSpeciality;
}

class FlashcardSpeciality {
  id?: string;
  name?: string;
}