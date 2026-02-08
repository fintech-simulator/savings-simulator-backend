import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Min } from 'class-validator';

export class CalculateSimulationDto {
  @ApiProperty({ description: 'Initial deposit amount', example: 1000000 })
  @IsNumber()
  @IsPositive()
  initialAmount: number;

  @ApiProperty({ description: 'Monthly contribution amount', example: 100000 })
  @IsNumber()
  @Min(0)
  monthlyContribution: number;

  @ApiProperty({ description: 'Simulation term in months', example: 12 })
  @IsNumber()
  @IsPositive()
  months: number;

  @ApiProperty({
    description: 'Annual interest rate (e.g., 0.12 for 12%)',
    example: 0.12,
  })
  @IsNumber()
  @Min(0)
  annualInterestRate: number;
}
