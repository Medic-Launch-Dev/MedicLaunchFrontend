export enum PlanLookupKey {
  MONTHYLY = "mediclaunch_monthly",
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
    lookupKey: PlanLookupKey.MONTHYLY,
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