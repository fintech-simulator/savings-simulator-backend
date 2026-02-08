import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  UserRepository,
  UserRepositoryToken,
} from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

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
  ) {}

  async execute(
    dto: CreateOnboardingDto,
  ): Promise<{ user: User; requestId: string }> {
    if (dto.recaptchaToken !== 'OK') {
      throw new BadRequestException('Invalid recaptcha token');
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
      requestId: uuidv4(),
    };
  }
}
