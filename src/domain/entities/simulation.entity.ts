export class Simulation {
  id: string;
  initialAmount: number;
  monthlyContribution: number;
  months: number;
  interestRate: number;
  estimatedProfit: number;
  totalBalance: number;
  userId?: string;
  createdAt: Date;

  constructor(partial: Partial<Simulation>) {
    Object.assign(this, partial);
  }
}
