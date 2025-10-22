import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { AbstractBaseAuditColumns } from '../common';
import { Contract } from '../contracts/contract.entity';
import { PaymentStatuses, PaymentStatus, IPaymentStatus } from '../shared';

@Entity(`payment`)
export class Payment extends AbstractBaseAuditColumns {
  @ManyToOne(() => Contract, (e) => e.payments, { onDelete: `CASCADE`, eager: true })
  contract!: Contract;

  @Column({ type: `int` })
  amountCents!: number;

  @Column({ length: 3, default: `USD` })
  currency!: string;

  @Column({ default: `ACH` })
  method!: string;

  @Index()
  @Column({ type: `enum`, enum: PaymentStatuses, default: PaymentStatus.PENDING })
  status!: IPaymentStatus;

  @Column({ type: `timestamptz`, nullable: true })
  paidAt?: Date;
}
