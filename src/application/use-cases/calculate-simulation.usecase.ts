import { Injectable } from '@nestjs/common';
import { Simulation } from '../../domain/entities/simulation.entity';

export interface CalculateSimulationDto {
  initialAmount: number;
  monthlyContribution: number;
  months: number;
  annualInterestRate: number; // e.g., 0.10 for 10%
}

@Injectable()
export class CalculateSimulationUseCase {
  /**
   * Calculates the future value of a savings plan.
   * Logic: Future Value of an Annuity + Compound Interest on Initial Amount.
   * Formula: FV = [P * (1 + i)^n] + [PMT * ((1 + i)^n - 1) / i]
   * Where:
   * P = Initial Amount
   * PMT = Monthly Contribution
   * i = Monthly Interest Rate (Annual Rate / 12)
   * n = Number of months
   */
  async execute(dto: CalculateSimulationDto): Promise<Simulation> {
    const { initialAmount, monthlyContribution, months, annualInterestRate } =
      dto;
    const i = annualInterestRate / 12;
    const n = months;

    // Compound interest on initial amount
    const fvInitial = initialAmount * Math.pow(1 + i, n);

    // Future value of monthly contributions
    let fvContributions = 0;
    if (i > 0) {
      fvContributions = (monthlyContribution * (Math.pow(1 + i, n) - 1)) / i;
    } else {
      fvContributions = monthlyContribution * n;
    }

    const totalBalance = fvInitial + fvContributions;
    const totalInvested = initialAmount + monthlyContribution * n;
    const estimatedProfit = totalBalance - totalInvested;

    return new Simulation({
      initialAmount,
      monthlyContribution,
      months,
      interestRate: annualInterestRate,
      estimatedProfit: parseFloat(estimatedProfit.toFixed(2)),
      totalBalance: parseFloat(totalBalance.toFixed(2)),
      createdAt: new Date(),
    });
  }
}
