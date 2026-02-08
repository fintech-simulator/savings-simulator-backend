import { IsOptional, IsString } from 'class-validator';

export class ProductFiltersDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;
}
