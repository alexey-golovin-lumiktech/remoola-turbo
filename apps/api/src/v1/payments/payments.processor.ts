import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { Repository } from 'typeorm';

import { PaymentEntity } from './payment.entity';
import { PaymentsService } from './payments.service';
import { errors } from '../../common';
import { FORCE_PAYMENT_RESULT } from '../../envs';

@Processor(`payments`, { concurrency: 3 })
export class PaymentsProcessor extends WorkerHost {
  constructor(
    @InjectRepository(PaymentEntity) private readonly paymentRepository: Repository<PaymentEntity>,
    private readonly paymentsService: PaymentsService,
  ) {
    super();
  }

  async process(job: Job<{ paymentId: string }>) {
    const { paymentId } = job.data;
    const payment = await this.paymentRepository.findOneByOrFail({ id: paymentId });

    await new Promise((r) => setTimeout(r, 1500));
    const success = FORCE_PAYMENT_RESULT == `ok` || Math.random() < 0.85;

    if (success) await this.paymentsService.markCompleted(payment.id);
    else throw new Error(errors.PAYMENTS_PROCESSOR_FAILURE.message);
  }
}
