import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SimulationRepository } from '../../../domain/repositories/simulation.repository';
import { Simulation } from '../../../domain/entities/simulation.entity';
import { SimulationOrmEntity } from '../entities/simulation.orm-entity';
import { SimulationMapper } from '../mappers/simulation.mapper';

@Injectable()
export class TypeOrmSimulationRepository implements SimulationRepository {
  constructor(
    @InjectRepository(SimulationOrmEntity)
    private readonly repository: Repository<SimulationOrmEntity>,
  ) {}

  async create(simulation: Partial<Simulation>): Promise<Simulation> {
    const ormSimulation = this.repository.create(
      simulation as SimulationOrmEntity,
    );
    const savedOrmSimulation = await this.repository.save(ormSimulation);
    return SimulationMapper.toDomain(savedOrmSimulation);
  }

  async findByUserId(userId: string): Promise<Simulation[]> {
    const ormSimulations = await this.repository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
    return ormSimulations.map(SimulationMapper.toDomain);
  }
}
