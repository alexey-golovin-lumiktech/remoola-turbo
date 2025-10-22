import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { AbstractBaseAuditColumns } from '../common';
import { Contract } from '../contracts/contract.entity';
import { DocumentType, DocumentTypes, IDocumentType } from '../shared';

@Entity(`document`)
export class Document extends AbstractBaseAuditColumns {
  @ManyToOne(() => Contract, (e) => e.documents, { onDelete: `CASCADE`, eager: true })
  contract!: Contract;

  @Column()
  name!: string;

  @Index()
  @Column({ type: `enum`, enum: DocumentTypes, default: DocumentType.OTHER })
  type!: IDocumentType;

  @Column({ nullable: true })
  fileUrl?: string;

  @Column({ type: `int`, nullable: true })
  sizeBytes?: number;
}
