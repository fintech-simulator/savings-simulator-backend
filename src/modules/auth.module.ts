import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '../infrastructure/http/controllers/auth/auth.controller';
import { LoginUseCase } from '../application/use-cases/auth/login.usecase';
import { JwtStrategy } from '../infrastructure/auth/jwt.strategy';
import { OnboardingModule } from './onboarding.module';

@Module({
  imports: [
    OnboardingModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'secret',
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [LoginUseCase, JwtStrategy],
  exports: [LoginUseCase],
})
export class AuthModule {}
