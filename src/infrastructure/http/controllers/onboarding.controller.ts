import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOnboardingUseCase } from '../../../application/use-cases/create-onboarding.usecase';
import { CreateOnboardingDto } from '../dtos/create-onboarding.dto';

@ApiTags('Onboarding')
@Controller('onboarding')
export class OnboardingController {
  constructor(
    private readonly createOnboardingUseCase: CreateOnboardingUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Register interest in opening a savings product' })
  async createOnboarding(@Body() dto: CreateOnboardingDto) {
    return this.createOnboardingUseCase.execute(dto);
  }
}
