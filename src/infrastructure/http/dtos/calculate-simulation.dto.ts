import { IsNumber, IsPositive, Min } from 'class-validator';

export class CalculateSimulationDto {
  @IsNumber()
  @IsPositive()
  initialAmount: number;

  @IsNumber()
  @Min(0)
  monthlyContribution: number;

  @IsNumber()
  @IsPositive()
  months: number;

  @IsNumber()
  @Min(0)
  annualInterestRate: number;
}
