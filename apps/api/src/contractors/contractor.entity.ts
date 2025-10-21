import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Contract } from '../contracts/contract.entity';

@Entity(`contractor`)
export class Contractor {
  @PrimaryGeneratedColumn(`uuid`) id!: string;
  @Column() name!: string;
  @Column({ nullable: true }) email?: string;
  @Column({ nullable: true }) phone?: string;

  @OneToMany(() => Contract, (c) => c.contractor) contracts!: Contract[];

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
