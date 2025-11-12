import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  preferenceId!: string;

  @Column()
  status!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column()
  currency!: string;

  @Column({ nullable: true })
  paymentId?: string;

  @CreateDateColumn()
  createdAt!: Date;
}

