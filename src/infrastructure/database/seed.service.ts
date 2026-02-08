import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrmEntity } from './entities/product.orm-entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly productRepository: Repository<ProductOrmEntity>,
  ) {}

  async onModuleInit() {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    await this.seedProducts();
  }

  private async seedProducts() {
    const count = await this.productRepository.count();
    if (count > 0) return;

    const products = [
      {
        name: 'Cuenta de Ahorros Tradicional',
        type: 'Ahorro',
        description:
          'La cuenta ideal para tus ahorros del día a día con disponibilidad inmediata.',
        interestRate: 0.02,
        minAmount: 0,
        imageUrl:
          'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'CDT Digital 360',
        type: 'Inversión',
        description:
          'Invierte a término fijo con las mejores tasas del mercado.',
        interestRate: 0.12,
        minAmount: 1000000,
        imageUrl:
          'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Ahorro Joven',
        type: 'Ahorro',
        description:
          'Especial para menores de 25 años, con beneficios exclusivos y sin cuota de manejo.',
        interestRate: 0.05,
        minAmount: 50000,
        imageUrl:
          'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop',
      },
    ];

    for (const prod of products) {
      const product = this.productRepository.create(prod);
      await this.productRepository.save(product);
    }

    console.log('Database seeded with products.');
  }
}
