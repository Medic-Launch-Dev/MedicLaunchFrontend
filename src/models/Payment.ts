export class Plan {
  id: number;
  name: string;
  price: number;
}

export const plans: Plan[] = [
  {
    id: 1,
    name: "1 Month",
    price: 17
  },
  {
    id: 2,
    name: "3 Months",
    price: 29
  },
  {
    id: 3,
    name: "12 Months",
    price: 42
  },
]