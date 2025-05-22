export enum PlanLookupKey {
  MONTHLY = "mediclaunch_monthly",
  ANNUAL = "mediclaunch_annual",
}

export class Plan {
  lookupKey: PlanLookupKey;
  name: string;
  price: number;
  normalizedMonthlyPrice: number;
}

export const plans: Plan[] = [
  {
    lookupKey: PlanLookupKey.MONTHLY,
    name: "Monthly",
    price: 7,
    normalizedMonthlyPrice: 7
  },
  {
    lookupKey: PlanLookupKey.ANNUAL,
    name: "Yearly",
    price: 42,
    normalizedMonthlyPrice: 3.5
  }
]

export const features = [
  {
    title: "Question Bank",
    description: "Master your weakest topics in half the time"
  },
  {
    title: "Clinical Tips",
    description: "Insider hacks from NHS consultants"
  },
  {
    title: "Detailed Explanations",
    description: "Clinically backed with zero fluff"
  },
  {
    title: "Flashcards",
    description: "Clinically proven recall, retain facts 2× faster"
  },
  {
    title: "Mock Exams",
    description: "Crush MLA anxiety with timed practice"
  },
  {
    title: "Clinical Case Capture",
    description: "Transform patients into powerful revision"
  },
  {
    title: "Personalised Dashboard",
    description: "Track growth, build streaks, stay motivated"
  },
  {
    title: "Medic Launch Community",
    description: "Connect, learn, and thrive with colleagues"
  }
];