import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractBaseAuditColumns } from '../common/entities/abstract-base-audit-columns';
import { Contract } from '../contracts/contract.entity';
import { UserRoles, UserRole, IUserRole } from '../shared';

@Entity(`user`)
export class User extends AbstractBaseAuditColumns {
  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column({ type: `enum`, enum: UserRoles, default: UserRole.CLIENT })
  role!: IUserRole;

  @Column({ select: false })
  passwordHash!: string;

  @OneToMany(() => Contract, (e) => e.client)
  contracts!: Contract[];
}
