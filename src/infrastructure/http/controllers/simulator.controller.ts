import { Controller, Post, Body } from '@nestjs/common';
import { CalculateSimulationUseCase } from '../../../application/use-cases/calculate-simulation.usecase';
import { CalculateSimulationDto } from '../dtos/calculate-simulation.dto';

@Controller('simulator')
export class SimulatorController {
  constructor(
    private readonly calculateSimulationUseCase: CalculateSimulationUseCase,
  ) {}

  @Post()
  async calculate(@Body() dto: CalculateSimulationDto) {
    return this.calculateSimulationUseCase.execute(dto);
  }
}
