import { Question, QuestionType } from './models/Question';

export const newQuestionData: Question[] = [
  {
    specialityId: "spec_id_1",
    questionType: QuestionType.General,
    questionText: "A 6-month-old infant is brought to the clinic by their parents due to recurrent infections and delayed growth milestones. On examination, the infant has dysmorphic facial features and a noticeable cleft palate. A chest X-ray reveals an absent thymic shadow. \n What is the MOST LIKELY diagnosis based on these findings?",
    options: [
      { letter: "A", text: "Down syndrome" },
      { letter: "B", text: "Fragile X syndrome" },
      { letter: "C", text: "DiGeorge syndrome" },
      { letter: "D", text: "Marfan syndrome" },
      { letter: "E", text: "Edwards syndrome" },
    ],
    correctAnswerLetter: "C",
    explanation: "DiGeorge syndrome, also known as 22q11.2 deletion syndrome, is characterised by a range of congenital anomalies including cardiac defects, cleft palate, facial dysmorphisms, hypocalcemia, and absent thymic shadow on imaging due to thymic hypoplasia or aplasia, predisposing individuals to recurrent infections.",
    clinicalTips: "",
    learningPoints: "",
    isSubmitted: false,
  },
  {
    specialityId: "spec_id_2",
    questionType: QuestionType.General,
    questionText: "Which planet is known as the Red Planet?",
    options: [
      { letter: "A", text: "Earth" },
      { letter: "B", text: "Mars" },
      { letter: "C", text: "Venus" },
      { letter: "D", text: "Jupiter" }
    ],
    correctAnswerLetter: "B",
    explanation: "Mars is often referred to as the Red Planet due to its reddish appearance.",
    clinicalTips: "",
    learningPoints: "",
    isSubmitted: false,
  },
  {
    specialityId: "spec_id_3",
    questionType: QuestionType.General,
    questionText: "What is the largest mammal on Earth?",
    options: [
      { letter: "A", text: "Elephant" },
      { letter: "B", text: "Blue whale" },
      { letter: "C", text: "Giraffe" },
      { letter: "D", text: "Hippopotamus" }
    ],
    correctAnswerLetter: "B",
    explanation: "The blue whale is the largest mammal on Earth, both in terms of weight and length.",
    clinicalTips: "",
    learningPoints: "",
    isSubmitted: false,
  },
  {
    specialityId: "spec_id_4",
    questionType: QuestionType.General,
    questionText: "Who wrote 'Romeo and Juliet'?",
    options: [
      { letter: "A", text: "William Shakespeare" },
      { letter: "B", text: "Jane Austen" },
      { letter: "C", text: "Charles Dickens" },
      { letter: "D", text: "Mark Twain" }
    ],
    correctAnswerLetter: "A",
    explanation: "'Romeo and Juliet' was written by William Shakespeare.",
    clinicalTips: "",
    learningPoints: "",
    isSubmitted: false,
  },
  {
    specialityId: "spec_id_5",
    questionType: QuestionType.General,
    questionText: "What is the chemical symbol for water?",
    options: [
      { letter: "A", text: "H2O2" },
      { letter: "B", text: "CO2" },
      { letter: "C", text: "H2O" },
      { letter: "D", text: "CH4" }
    ],
    correctAnswerLetter: "C",
    explanation: "The chemical symbol for water is H2O, representing two hydrogen atoms and one oxygen atom.",
    clinicalTips: "",
    learningPoints: "",
    isSubmitted: false,
  }
  // Add more questions as needed
];
