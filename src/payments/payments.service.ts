import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from './payment.entity';
import { StartPayment, UpdatePaymentStatus } from './dto';
import { Contract } from '../contracts/contract.entity';
import { PaymentStatus } from '../shared';
import { fmt } from '../utils';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(Contract) private readonly contractsRepository: Repository<Contract>,
    @InjectQueue(`payments`) private readonly queue: Queue,
  ) {}

  async listByClient(clientId: string) {
    const rows = await this.paymentsRepository.find({
      where: { contract: { client: { id: clientId } } },
      order: { createdAt: `DESC` },
    });

    return rows.map((p) => ({
      id: p.id,
      contract: p.contract.contractor?.name || `Unknown contractor`,
      amount: fmt(p.amountCents),
      method: p.method,
      status:
        p.status === PaymentStatus.COMPLETED ? `Completed` : p.status === PaymentStatus.PENDING ? `Pending` : `Failed`,
      date: p.paidAt ? p.paidAt.toLocaleDateString(undefined, { month: `short`, day: `numeric` }) : ``,
    }));
  }

  async start(body: StartPayment) {
    const contract = await this.contractsRepository.findOneByOrFail({ id: body.contractId });
    const entity = await this.paymentsRepository.save(
      this.paymentsRepository.create({
        contract,
        amountCents: body.amountCents,
        currency: body.currency ?? `USD`,
        method: body.method ?? `ACH`,
        status: PaymentStatus.PENDING,
      }),
    );
    await this.queue.add(
      `process`,
      { paymentId: entity.id },
      {
        jobId: `payment:${entity.id}`,
        attempts: 5,
        backoff: { type: `exponential`, delay: 2000 },
        removeOnComplete: true,
        removeOnFail: 50,
      },
    );
    return entity;
  }

  async markCompleted(id: string, dto?: UpdatePaymentStatus) {
    await this.paymentsRepository.update({ id }, { ...dto, status: PaymentStatus.COMPLETED, paidAt: new Date() });
    return this.paymentsRepository.findOneByOrFail({ id });
  }
  async markFailed(id: string) {
    await this.paymentsRepository.update({ id }, { status: PaymentStatus.FAILED });
    return this.paymentsRepository.findOneByOrFail({ id });
  }
}
