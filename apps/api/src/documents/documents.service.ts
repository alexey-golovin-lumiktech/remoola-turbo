import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Document } from './document.entity';
import { UploadDocument } from './dto';
import { Contract } from '../contracts/contract.entity';

const fmtSize = (b?: number) =>
  b ? (b < 1024 * 1024 ? `${Math.round(b / 1024)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`) : ``;

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document) private readonly documents: Repository<Document>,
    @InjectRepository(Contract) private readonly contracts: Repository<Contract>,
  ) {}

  async listByClient(clientId: string) {
    const rows = await this.documents.find({
      where: { contract: { client: { id: clientId } } },
      order: { updatedAt: `DESC` },
      take: 100,
    });

    return rows.map((d) => ({
      id: d.id,
      name: d.name,
      type: d.type,
      size: fmtSize(d.sizeBytes),
      updated: new Intl.RelativeTimeFormat(`en`, { numeric: `auto` }).format(
        Math.round((+d.updatedAt - Date.now()) / 86400000),
        `day`,
      ),
      fileUrl: d.fileUrl,
    }));
  }

  async upload(body: UploadDocument) {
    const contract = await this.contracts.findOneByOrFail({ id: body.contractId });
    return this.documents.save(this.documents.create({ ...body, contract }));
  }
}
