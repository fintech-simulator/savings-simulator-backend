import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity('simulations')
export class SimulationOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 15, scale: 2 })
  initialAmount: number;

  @Column('decimal', { precision: 15, scale: 2 })
  monthlyContribution: number;

  @Column()
  months: number;

  @Column('decimal', { precision: 5, scale: 2 })
  interestRate: number;

  @Column('decimal', { precision: 15, scale: 2 })
  estimatedProfit: number;

  @Column('decimal', { precision: 15, scale: 2 })
  totalBalance: number;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => UserOrmEntity, { nullable: true })
  user: UserOrmEntity;

  @CreateDateColumn()
  createdAt: Date;
}
