import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { Product } from '../../../domain/entities/product.entity';
import { ProductOrmEntity } from '../entities/product.orm-entity';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly repository: Repository<ProductOrmEntity>,
  ) {}

  async findAll(filters?: {
    name?: string;
    type?: string;
  }): Promise<Product[]> {
    const where: FindOptionsWhere<ProductOrmEntity> = {};
    if (filters?.name) {
      where['name'] = Like(`%${filters.name}%`);
    }
    if (filters?.type) {
      where['type'] = filters.type;
    }

    const ormProducts = await this.repository.find({ where });
    return ormProducts.map(ProductMapper.toDomain);
  }

  async findById(id: string): Promise<Product | null> {
    const ormProduct = await this.repository.findOneBy({ id });
    return ormProduct ? ProductMapper.toDomain(ormProduct) : null;
  }
}
