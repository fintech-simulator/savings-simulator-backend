import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../infrastructure/database/entities/user.orm-entity';
import { TypeOrmUserRepository } from '../infrastructure/database/repositories/typeorm-user.repository';
import { UserRepositoryToken } from '../domain/repositories/user.repository';
import { CreateOnboardingUseCase } from '../application/use-cases/create-onboarding.usecase';
import { OnboardingController } from '../infrastructure/http/controllers/onboarding.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [OnboardingController],
  providers: [
    CreateOnboardingUseCase,
    {
      provide: UserRepositoryToken,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [UserRepositoryToken],
})
export class OnboardingModule {}
