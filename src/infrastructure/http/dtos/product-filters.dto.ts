import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProductFiltersDto {
  @ApiPropertyOptional({ description: 'Filter by product name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by product type',
    example: 'Ahorro',
  })
  @IsOptional()
  @IsString()
  type?: string;
}
