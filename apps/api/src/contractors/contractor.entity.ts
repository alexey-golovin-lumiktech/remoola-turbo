import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractBaseAuditColumns } from '../common/entities/abstract-base-audit-columns';
import { Contract } from '../contracts/contract.entity';

@Entity(`contractor`)
export class Contractor extends AbstractBaseAuditColumns {
  @Column()
  name!: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @OneToMany(() => Contract, (e) => e.contractor)
  contracts!: Contract[];
}
