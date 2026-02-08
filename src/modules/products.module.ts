import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrmEntity } from '../infrastructure/database/entities/product.orm-entity';
import { TypeOrmProductRepository } from '../infrastructure/database/repositories/typeorm-product.repository';
import { ProductRepositoryToken } from '../domain/repositories/product.repository';
import { GetProductsUseCase } from '../application/use-cases/get-products.usecase';
import { ProductsController } from '../infrastructure/http/controllers/products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  controllers: [ProductsController],
  providers: [
    GetProductsUseCase,
    {
      provide: ProductRepositoryToken,
      useClass: TypeOrmProductRepository,
    },
  ],
  exports: [ProductRepositoryToken],
})
export class ProductsModule {}
