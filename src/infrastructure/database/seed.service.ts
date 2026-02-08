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
      {
        name: 'Fondo de Inversión Estabilidad',
        type: 'Inversión',
        description:
          'Diversifica tu capital con riesgo moderado y rentabilidad competitiva.',
        interestRate: 0.08,
        minAmount: 500000,
        imageUrl:
          'https://images.unsplash.com/photo-1611974714658-75d32bb98efc?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Cuenta Nómina Pro',
        type: 'Nómina',
        description:
          'Recibe tu salario y accede a créditos con tasas preferenciales.',
        interestRate: 0.01,
        minAmount: 0,
        imageUrl:
          'https://images.unsplash.com/photo-1454165833767-02acd197368d?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Ahorro para Vivienda (Hogar)',
        type: 'Programado',
        description:
          'Cumple el sueño de tener casa propia con este plan de ahorro programado.',
        interestRate: 0.06,
        minAmount: 100000,
        imageUrl:
          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'CDT Senior 60+',
        type: 'Inversión',
        description:
          'Tasa preferencial para mayores de 60 años con pago de intereses mensual.',
        interestRate: 0.13,
        minAmount: 2000000,
        imageUrl:
          'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Ahorro Vehículo Directo',
        type: 'Programado',
        description:
          'La forma más fácil de ahorrar para la cuota inicial de tu primer carro.',
        interestRate: 0.045,
        minAmount: 200000,
        imageUrl:
          'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Cuenta de Ahorros Premium',
        type: 'Ahorro',
        description:
          'Para ahorrar grandes sumas con una rentabilidad superior.',
        interestRate: 0.075,
        minAmount: 10000000,
        imageUrl:
          'https://images.unsplash.com/photo-1502920513530-058df21734bc?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'CDT Express 90 días',
        type: 'Inversión',
        description:
          'Rentabilidad rápida a corto plazo para tus excedentes de liquidez.',
        interestRate: 0.1,
        minAmount: 500000,
        imageUrl:
          'https://images.unsplash.com/photo-1621932953443-755f7427599e?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Ahorro Futuro Infantil',
        type: 'Ahorro',
        description:
          'Empieza a construir el futuro de tus hijos desde hoy mismo.',
        interestRate: 0.055,
        minAmount: 20000,
        imageUrl:
          'https://images.unsplash.com/photo-1502086223501-7ea24ee30541?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Fondo Biológico (Eco-Inversión)',
        type: 'Inversión',
        description:
          'Invierte en proyectos sostenibles y ayuda al planeta mientras ganas.',
        interestRate: 0.09,
        minAmount: 100000,
        imageUrl:
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Nómina Plus Ejecutivo',
        type: 'Nómina',
        description:
          'Beneficios VIP y seguro de vida incluido por domiciliar tu nómina.',
        interestRate: 0.015,
        minAmount: 0,
        imageUrl:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Plan Educación Total',
        type: 'Programado',
        description:
          'Ahorra para los estudios universitarios con tasas protegidas contra inflación.',
        interestRate: 0.07,
        minAmount: 150000,
        imageUrl:
          'https://images.unsplash.com/photo-1523050335192-ce1de9b1836c?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'CDT Flexible 180 días',
        type: 'Inversión',
        description:
          'Retira tus intereses mensualmente o al final del periodo.',
        interestRate: 0.115,
        minAmount: 2000000,
        imageUrl:
          'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Meta Viaje Soñado',
        type: 'Programado',
        description:
          'Define tu destino y nosotros te ayudamos a llegar con este plan de ahorro.',
        interestRate: 0.04,
        minAmount: 50000,
        imageUrl:
          'https://images.unsplash.com/photo-1433086177607-6c3863a824ee?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Cuenta de Ahorros Eficiente',
        type: 'Ahorro',
        description:
          'Sin cuotas de manejo si mantienes un saldo promedio mínimo.',
        interestRate: 0.03,
        minAmount: 200000,
        imageUrl:
          'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Inversión Global USA',
        type: 'Inversión',
        description:
          'Accede a mercados internacionales desde el mercado local.',
        interestRate: 0.105,
        minAmount: 5000000,
        imageUrl:
          'https://images.unsplash.com/photo-1611974714658-75d32bb98efc?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Nómina Emprendedor',
        type: 'Nómina',
        description:
          'Para dueños de pequeñas empresas que pagan su propio salario.',
        interestRate: 0.012,
        minAmount: 0,
        imageUrl:
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Fondo Pensiones Voluntarias',
        type: 'Inversión',
        description:
          'Mejora tu jubilación con beneficios tributarios inmediatos.',
        interestRate: 0.085,
        minAmount: 300000,
        imageUrl:
          'https://images.unsplash.com/photo-1554224155-1696413575b8?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'CDT Platino 540 días',
        type: 'Inversión',
        description:
          'Máxima rentabilidad para inversores pacientes y decididos.',
        interestRate: 0.14,
        minAmount: 5000000,
        imageUrl:
          'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Ahorro Tecnológico',
        type: 'Programado',
        description:
          'Renueva tus dispositivos ahorrando mensualmente con tasas dinámicas.',
        interestRate: 0.035,
        minAmount: 100000,
        imageUrl:
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Cuenta Nómina Salud',
        type: 'Nómina',
        description:
          'Para profesionales de la salud con convenios en clínicas y prepagadas.',
        interestRate: 0.018,
        minAmount: 0,
        imageUrl:
          'https://images.unsplash.com/photo-1505751172107-5739a007c6f0?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Fondo Emergencias Seguro',
        type: 'Ahorro',
        description:
          'Ten siempre un respaldo disponible para cualquier imprevisto.',
        interestRate: 0.045,
        minAmount: 500000,
        imageUrl:
          'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'Meta Boda Increíble',
        type: 'Programado',
        description:
          'Ahorra para el día más importante de tu vida con el mejor rendimiento.',
        interestRate: 0.05,
        minAmount: 500000,
        imageUrl:
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'CDT Prime VIP',
        type: 'Inversión',
        description:
          'Trato preferencial y tasas negociables para clientes de banca privada.',
        interestRate: 0.15,
        minAmount: 50000000,
        imageUrl:
          'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
      },
    ];

    console.log(
      `Cleaning existing products and seeding ${products.length} new products...`,
    );
    await this.productRepository.clear();

    for (const prod of products) {
      const product = this.productRepository.create(prod);
      await this.productRepository.save(product);
    }

    console.log('Database successfully seeded with expanded product catalog.');
  }
}
