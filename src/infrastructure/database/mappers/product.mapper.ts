import { Product } from '../../../domain/entities/product.entity';
import { ProductOrmEntity } from '../entities/product.orm-entity';

export class ProductMapper {
  static toDomain(ormProduct: ProductOrmEntity): Product {
    return new Product({
      id: ormProduct.id,
      name: ormProduct.name,
      type: ormProduct.type,
      description: ormProduct.description,
      interestRate: Number(ormProduct.interestRate),
      minAmount: Number(ormProduct.minAmount),
      imageUrl: ormProduct.imageUrl ?? undefined,
    });
  }

  static toOrm(product: Product): ProductOrmEntity {
    const ormProduct = new ProductOrmEntity();
    ormProduct.id = product.id;
    ormProduct.name = product.name;
    ormProduct.type = product.type;
    ormProduct.description = product.description;
    ormProduct.interestRate = product.interestRate;
    ormProduct.minAmount = product.minAmount;
    ormProduct.imageUrl = product.imageUrl ?? null!;
    return ormProduct;
  }
}
