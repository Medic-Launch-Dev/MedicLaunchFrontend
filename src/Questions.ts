import { MedicalQuestion, QuestionType } from './models/Question';

export const questionsData = [
  {
    questionText: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    submittedAnswer: null,
    explanation: "Paris is the capital of France."
  },
  {
    questionText: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: "Mars",
    submittedAnswer: null,
    explanation: "Mars is often referred to as the Red Planet due to its reddish appearance."
  },
  {
    questionText: "What is the largest mammal on Earth?",
    answers: ["Elephant", "Blue whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue whale",
    submittedAnswer: null,
    explanation: "The blue whale is the largest mammal on Earth, both in terms of weight and length."
  },
  {
    questionText: "Who wrote 'Romeo and Juliet'?",
    answers: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    submittedAnswer: null,
    explanation: "'Romeo and Juliet' was written by William Shakespeare."
  },
  {
    questionText: "What is the chemical symbol for water?",
    answers: ["H2O2", "CO2", "H2O", "CH4"],
    correctAnswer: "H2O",
    submittedAnswer: null,
    explanation: "The chemical symbol for water is H2O, representing two hydrogen atoms and one oxygen atom."
  }
  // Add more questions as needed
];

export const newQuestionData: MedicalQuestion[] = [
  {
    specialityId: "spec_id_1",
    questionType: QuestionType.General,
    questionText: "What is the capital of France?",
    options: [
      { letter: "A", text: "Berlin" },
      { letter: "B", text: "Madrid" },
      { letter: "C", text: "Paris" },
      { letter: "D", text: "Rome" }
    ],
    correctAnswerLetter: "C",
    explanation: "Paris is the capital of France.",
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
