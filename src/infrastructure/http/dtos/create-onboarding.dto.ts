import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateOnboardingDto {
  @ApiProperty({ description: 'Full name of the user', example: 'Juan Perez' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Identity document number',
    example: '123456789',
  })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({
    description: 'Email address',
    example: 'juan.perez@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Recaptcha token (use "OK" for simulation)',
    example: 'OK',
  })
  @IsNotEmpty()
  @IsString()
  recaptchaToken: string;
}
