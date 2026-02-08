import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../../../../application/use-cases/auth/login.usecase';
import { LoginDto } from '../../dtos/auth/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }
}
