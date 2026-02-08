import { Product } from '../entities/product.entity';

export interface ProductRepository {
  findAll(filters?: {
    name?: string;
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Product[]; total: number }>;
  findById(id: string): Promise<Product | null>;
}

export const ProductRepositoryToken = Symbol('ProductRepository');
