import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindOptionsWhere } from 'typeorm';
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
    page?: number;
    limit?: number;
  }): Promise<{ data: Product[]; total: number }> {
    const where: FindOptionsWhere<ProductOrmEntity> = {};
    if (filters?.name) {
      where['name'] = ILike(`%${filters.name}%`);
    }
    if (filters?.type) {
      where['type'] = filters.type;
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const skip = (page - 1) * limit;

    const [ormProducts, total] = await this.repository.findAndCount({
      where,
      skip,
      take: limit,
      order: { name: 'ASC' } as any,
    });

    return {
      data: ormProducts.map(ProductMapper.toDomain),
      total,
    };
  }

  async findById(id: string): Promise<Product | null> {
    const ormProduct = await this.repository.findOneBy({ id });
    return ormProduct ? ProductMapper.toDomain(ormProduct) : null;
  }
}
