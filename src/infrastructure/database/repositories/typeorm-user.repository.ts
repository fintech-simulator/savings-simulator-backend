import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const ormUser = await this.repository.findOneBy({ email });
    return ormUser ? UserMapper.toDomain(ormUser) : null;
  }

  async findByDocument(document: string): Promise<User | null> {
    const ormUser = await this.repository.findOneBy({ document });
    return ormUser ? UserMapper.toDomain(ormUser) : null;
  }

  async create(user: Partial<User>): Promise<User> {
    const ormUser = this.repository.create(user as UserOrmEntity);
    const savedOrmUser = await this.repository.save(ormUser);
    return UserMapper.toDomain(savedOrmUser);
  }

  async findById(id: string): Promise<User | null> {
    const ormUser = await this.repository.findOneBy({ id });
    return ormUser ? UserMapper.toDomain(ormUser) : null;
  }
}
