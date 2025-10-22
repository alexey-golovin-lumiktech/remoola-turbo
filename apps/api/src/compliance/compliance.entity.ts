import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { AbstractBaseAuditColumns } from '../common';
import { User } from '../users/user.entity';

@Entity(`compliance_checklist`)
export class ComplianceChecklist extends AbstractBaseAuditColumns {
  @OneToOne(() => User, { onDelete: `CASCADE`, eager: true })
  @JoinColumn()
  user!: User;

  @Column({ default: false })
  w9Ready!: boolean;

  @Column({ default: false })
  kycInReview!: boolean;

  @Column({ default: false })
  bankVerified!: boolean;
}
