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
  }): Promise<Product[]> {
    return this.productRepository.findAll(filters);
  }
}
