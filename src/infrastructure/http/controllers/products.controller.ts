import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetProductsUseCase } from '../../../application/use-cases/get-products.usecase';
import { ProductFiltersDto } from '../dtos/product-filters.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly getProductsUseCase: GetProductsUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get all savings products with optional filters' })
  async getProducts(@Query() filters: ProductFiltersDto) {
    return this.getProductsUseCase.execute(filters);
  }
}
