import { Product } from '../entities/product.entity';

export interface ProductRepository {
  findAll(filters?: { name?: string; type?: string }): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
}

export const ProductRepositoryToken = Symbol('ProductRepository');
