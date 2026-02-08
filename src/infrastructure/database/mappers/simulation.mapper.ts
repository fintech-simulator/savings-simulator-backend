import { Simulation } from '../../../domain/entities/simulation.entity';
import { SimulationOrmEntity } from '../entities/simulation.orm-entity';

export class SimulationMapper {
  static toDomain(ormSimulation: SimulationOrmEntity): Simulation {
    return new Simulation({
      id: ormSimulation.id,
      initialAmount: Number(ormSimulation.initialAmount),
      monthlyContribution: Number(ormSimulation.monthlyContribution),
      months: ormSimulation.months,
      interestRate: Number(ormSimulation.interestRate),
      estimatedProfit: Number(ormSimulation.estimatedProfit),
      totalBalance: Number(ormSimulation.totalBalance),
      userId: ormSimulation.userId,
      createdAt: ormSimulation.createdAt,
    });
  }

  static toOrm(simulation: Simulation): SimulationOrmEntity {
    const ormSimulation = new SimulationOrmEntity();
    ormSimulation.id = simulation.id;
    ormSimulation.initialAmount = simulation.initialAmount;
    ormSimulation.monthlyContribution = simulation.monthlyContribution;
    ormSimulation.months = simulation.months;
    ormSimulation.interestRate = simulation.interestRate;
    ormSimulation.estimatedProfit = simulation.estimatedProfit;
    ormSimulation.totalBalance = simulation.totalBalance;
    ormSimulation.userId = simulation.userId ?? null!;
    ormSimulation.createdAt = simulation.createdAt;
    return ormSimulation;
  }
}
