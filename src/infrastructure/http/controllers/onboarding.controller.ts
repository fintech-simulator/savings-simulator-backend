import { Controller, Post, Body } from '@nestjs/common';
import { CreateOnboardingUseCase } from '../../../application/use-cases/create-onboarding.usecase';
import { CreateOnboardingDto } from '../dtos/create-onboarding.dto';

@Controller('onboarding')
export class OnboardingController {
  constructor(
    private readonly createOnboardingUseCase: CreateOnboardingUseCase,
  ) {}

  @Post()
  async createOnboarding(@Body() dto: CreateOnboardingDto) {
    return this.createOnboardingUseCase.execute(dto);
  }
}
