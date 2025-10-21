import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity(`compliance_checklist`)
export class ComplianceChecklist {
  @PrimaryGeneratedColumn(`uuid`) id!: string;

  @OneToOne(() => User, { onDelete: `CASCADE`, eager: true })
  @JoinColumn()
  user!: User;

  @Column({ default: false }) w9Ready!: boolean;
  @Column({ default: false }) kycInReview!: boolean;
  @Column({ default: false }) bankVerified!: boolean;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
