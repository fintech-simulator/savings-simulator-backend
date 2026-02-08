import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimulationOrmEntity } from '../infrastructure/database/entities/simulation.orm-entity';
import { TypeOrmSimulationRepository } from '../infrastructure/database/repositories/typeorm-simulation.repository';
import { SimulationRepositoryToken } from '../domain/repositories/simulation.repository';
import { CalculateSimulationUseCase } from '../application/use-cases/calculate-simulation.usecase';
import { SimulatorController } from '../infrastructure/http/controllers/simulator.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SimulationOrmEntity])],
  controllers: [SimulatorController],
  providers: [
    CalculateSimulationUseCase,
    {
      provide: SimulationRepositoryToken,
      useClass: TypeOrmSimulationRepository,
    },
  ],
})
export class SimulatorModule {}
