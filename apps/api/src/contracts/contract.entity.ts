import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contractor } from '../contractors/contractor.entity';
import { Payment } from '../payments/payment.entity';
import { RateUnit, IRateUnit, ContractStatuses, ContractStatus, IContractStatus } from '../shared';
import { User } from '../users/user.entity';
import { Document } from '../documents/document.entity';

@Entity(`contract`)
export class Contract {
  @PrimaryGeneratedColumn(`uuid`) id!: string;

  @ManyToOne(() => User, (u) => u.contracts, { eager: true }) client!: User;
  @ManyToOne(() => Contractor, (p) => p.contracts, { eager: true }) contractor!: Contractor;

  @Column({ type: `int` }) rateCents!: number;
  @Column({ type: `enum`, enum: RateUnit, default: RateUnit.HOURLY }) rateUnit!: IRateUnit;

  @Index() @Column({ type: `enum`, enum: ContractStatuses, default: ContractStatus.DRAFT }) status!: IContractStatus;
  @OneToMany(() => Payment, (p) => p.contract) payments!: Payment[];
  @OneToMany(() => Document, (d) => d.contract) documents!: Document[];

  @Column({ type: `timestamptz`, nullable: true }) lastActivityAt?: Date;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
