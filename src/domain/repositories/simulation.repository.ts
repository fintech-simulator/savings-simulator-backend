import { Simulation } from '../entities/simulation.entity';

export interface SimulationRepository {
  create(simulation: Partial<Simulation>): Promise<Simulation>;
  findByUserId(userId: string): Promise<Simulation[]>;
}

export const SimulationRepositoryToken = Symbol('SimulationRepository');
