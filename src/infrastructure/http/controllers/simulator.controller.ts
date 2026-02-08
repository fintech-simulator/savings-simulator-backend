import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CalculateSimulationUseCase } from '../../../application/use-cases/calculate-simulation.usecase';
import { CalculateSimulationDto } from '../dtos/calculate-simulation.dto';

@ApiTags('Simulator')
@Controller('simulator')
export class SimulatorController {
  constructor(
    private readonly calculateSimulationUseCase: CalculateSimulationUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Calculate estimated profit for a savings plan' })
  async calculate(@Body() dto: CalculateSimulationDto) {
    return this.calculateSimulationUseCase.execute(dto);
  }
}
