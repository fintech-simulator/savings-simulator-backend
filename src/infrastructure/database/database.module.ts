import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductOrmEntity } from './entities/product.orm-entity';
import { UserOrmEntity } from './entities/user.orm-entity';
import { SimulationOrmEntity } from './entities/simulation.orm-entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [ProductOrmEntity, UserOrmEntity, SimulationOrmEntity],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    TypeOrmModule.forFeature([
      ProductOrmEntity,
      UserOrmEntity,
      SimulationOrmEntity,
    ]),
  ],
  providers: [SeedService],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
