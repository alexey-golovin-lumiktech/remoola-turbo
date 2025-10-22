import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Contract } from './contract.entity';
import { CreateContract, UpdateContract, ContractListItem } from './dto';
import { Contractor } from '../contractors/contractor.entity';
import { ContractStatus, errors } from '../shared';
import { User } from '../users/user.entity';
import { money, ago } from '../utils';

@Injectable()
export class ContractsService {
  private readonly logger = new Logger(ContractsService.name);

  constructor(
    @InjectRepository(Contract) private readonly contracts: Repository<Contract>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Contractor) private readonly contractors: Repository<Contractor>,
  ) {}

  async list(clientId: string, search?: string) {
    const rows = await this.contracts.find({
      where: { client: { id: clientId }, ...(search ? { contractor: { name: ILike(`%${search}%`) } } : {}) },
      order: { updatedAt: `DESC` },
    });

    return rows.map(
      (r) =>
        ({
          id: r.id,
          contractorId: r.contractor?.id,
          contractorName: r.contractor?.name,
          rate: money(r.rateCents, r.rateUnit),
          status: r.status,
          lastActivityAgo: ago(r.lastActivityAt ?? r.updatedAt),
        }) satisfies ContractListItem,
    );
  }

  async create(body: CreateContract) {
    try {
      const client = await this.users.findOneByOrFail({ id: body.clientId });

      const contractor = !body.contractorId ? null : await this.contractors.findOneByOrFail({ id: body.contractorId });

      const contract = this.contracts.create({
        client,
        ...(contractor && { contractor }),
        rateCents: body.rateCents,
        rateUnit: body.rateUnit,
        status: ContractStatus.DRAFT,
      });
      return this.contracts.save(contract);
    } catch (error) {
      this.logger.debug(String(error));
      throw new InternalServerErrorException(errors.FAIL_CREATE_CONTRACT);
    }
  }

  async update(id: string, body: UpdateContract) {
    await this.contracts.update({ id }, { ...body, lastActivityAt: new Date() });
    return this.contracts.findOneByOrFail({ id });
  }
}
