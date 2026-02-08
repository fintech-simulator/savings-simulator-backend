import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateOnboardingDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  document: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  recaptchaToken: string;
}
