import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Contract } from '../contracts/contract.entity';
import { DocumentType, DocumentTypes, IDocumentType } from '../shared';

@Entity(`document`)
export class Document {
  @PrimaryGeneratedColumn(`uuid`) id!: string;

  @ManyToOne(() => Contract, (c) => c.documents, { onDelete: `CASCADE`, eager: true }) contract!: Contract;

  @Column() name!: string;
  @Index() @Column({ type: `enum`, enum: DocumentTypes, default: DocumentType.OTHER }) type!: IDocumentType;
  @Column({ nullable: true }) fileUrl?: string;
  @Column({ type: `int`, nullable: true }) sizeBytes?: number;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
