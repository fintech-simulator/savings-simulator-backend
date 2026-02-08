import { Controller, Get, Query } from '@nestjs/common';
import { GetProductsUseCase } from '../../../application/use-cases/get-products.usecase';
import { ProductFiltersDto } from '../dtos/product-filters.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly getProductsUseCase: GetProductsUseCase) {}

  @Get()
  async getProducts(@Query() filters: ProductFiltersDto) {
    return this.getProductsUseCase.execute(filters);
  }
}
