import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  UserRepository,
  UserRepositoryToken,
} from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { randomUUID } from 'crypto';
import { RecaptchaService } from '../services/recaptcha.service';

export interface CreateOnboardingDto {
  name: string;
  document: string;
  email: string;
  recaptchaToken: string;
}

@Injectable()
export class CreateOnboardingUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly recaptchaService: RecaptchaService,
  ) {}

  async execute(
    dto: CreateOnboardingDto,
  ): Promise<{ user: User; requestId: string }> {
    // Validate recaptcha token using the service
    const recaptchaResult = await this.recaptchaService.validateToken(
      dto.recaptchaToken,
    );

    if (!recaptchaResult.success) {
      throw new BadRequestException(
        recaptchaResult.message || 'Invalid recaptcha token',
      );
    }

    const existingUser = await this.userRepository.findByEmail(dto.email);

    let user: User;
    if (existingUser) {
      user = existingUser;
    } else {
      user = await this.userRepository.create({
        name: dto.name,
        document: dto.document,
        email: dto.email,
        createdAt: new Date(),
      });
    }

    return {
      user,
      requestId: randomUUID(),
    };
  }
}
