import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Contract } from '../contracts/contract.entity';
import { UserRoles, UserRole, IUserRole } from '../shared';

@Entity(`user`)
export class User {
  @PrimaryGeneratedColumn(`uuid`) id!: string;
  @Column({ unique: true }) email!: string;
  @Column() name!: string;
  @Column({ type: `enum`, enum: UserRoles, default: UserRole.CLIENT }) role!: IUserRole;

  @Column({ select: false })
  passwordHash!: string;

  @OneToMany(() => Contract, (c) => c.client) contracts!: Contract[];

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
