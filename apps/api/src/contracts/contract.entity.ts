import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

import { AbstractBaseAuditColumns } from '../common';
import { Contractor } from '../contractors/contractor.entity';
import { Document } from '../documents/document.entity';
import { Payment } from '../payments/payment.entity';
import { RateUnit, IRateUnit, ContractStatuses, ContractStatus, IContractStatus } from '../shared';
import { User } from '../users/user.entity';

@Entity(`contract`)
export class Contract extends AbstractBaseAuditColumns {
  @ManyToOne(() => User, (e) => e.contracts, { eager: true })
  client!: User;

  @ManyToOne(() => Contractor, (e) => e.contracts, { eager: true })
  contractor!: Contractor;

  @Column({ type: `int` })
  rateCents!: number;

  @Column({ type: `enum`, enum: RateUnit, default: RateUnit.HOURLY })
  rateUnit!: IRateUnit;

  @Index()
  @Column({ type: `enum`, enum: ContractStatuses, default: ContractStatus.DRAFT })
  status!: IContractStatus;

  @OneToMany(() => Payment, (e) => e.contract)
  payments!: Payment[];

  @OneToMany(() => Document, (e) => e.contract)
  documents!: Document[];

  @Column({ type: `timestamptz`, nullable: true })
  lastActivityAt?: Date;
}
