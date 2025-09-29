import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { PaymentsService } from './payments.service';
import { Job } from 'bullmq';

@Processor(`payments`, { concurrency: 3 })
export class PaymentsProcessor extends WorkerHost {
  constructor(
    @InjectRepository(Payment) private readonly paymentsRepository: Repository<Payment>,
    private readonly paymentsService: PaymentsService,
  ) {
    super();
  }

  async process(job: Job<{ paymentId: string }>): Promise<void> {
    const { paymentId } = job.data;
    const payment = await this.paymentsRepository.findOneByOrFail({ id: paymentId });

    await new Promise((r) => setTimeout(r, 1500));
    const FORCE = process.env.FORCE_PAYMENT_RESULT;
    const success = FORCE ? FORCE === `ok` : Math.random() < 0.85;

    if (success) await this.paymentsService.markCompleted(payment.id);
    else throw new Error(`Processor temporary failure`);
  }
}
