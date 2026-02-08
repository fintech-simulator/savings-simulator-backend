import { Inject, Injectable } from '@nestjs/common';
import {
  ProductRepository,
  ProductRepositoryToken,
} from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class GetProductsUseCase {
  constructor(
    @Inject(ProductRepositoryToken)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(filters?: {
    name?: string;
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    data: Product[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const { data, total } = await this.productRepository.findAll(filters);
    const limit = filters?.limit || 10;
    const page = filters?.page || 1;

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
