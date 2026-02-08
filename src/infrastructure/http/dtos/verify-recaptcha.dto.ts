import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyRecaptchaDto {
  @ApiProperty({
    description: 'Recaptcha token to validate (use "OK" for simulation)',
    example: 'OK',
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
