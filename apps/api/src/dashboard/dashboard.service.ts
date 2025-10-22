import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ComplianceChecklist } from '../compliance/compliance.entity';
import { Contract } from '../contracts/contract.entity';
import { ContractsService } from '../contracts/contracts.service';
import { DocumentsService } from '../documents/documents.service';
import { Payment } from '../payments/payment.entity';
import { ContractStatus, PaymentStatus } from '../shared';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Contract) private readonly contractRepository: Repository<Contract>,
    @InjectRepository(ComplianceChecklist) private readonly complianceRepository: Repository<ComplianceChecklist>,
    private readonly documentsService: DocumentsService,
    private readonly contractsService: ContractsService,
  ) {}

  async get(clientId: string) {
    const [activeCount, lastPayment, openContracts, quickDocs, compliance] = await Promise.all([
      this.contractRepository.count({ where: { client: { id: clientId }, status: ContractStatus.ACTIVE } }),
      this.paymentRepository.findOne({
        where: { contract: { client: { id: clientId } }, status: PaymentStatus.COMPLETED },
        order: { paidAt: `DESC` },
      }),
      this.contractsService.list(clientId),
      this.documentsService.listByClient(clientId).then((x) => x.slice(0, 3)),
      this.complianceRepository.findOne({ where: { user: { id: clientId } } }),
    ]);

    let lastPaymentAgo = `—`;
    if (lastPayment?.paidAt) {
      const round = Math.round((+lastPayment.paidAt - Date.now()) / 86400000);
      lastPaymentAgo = new Intl.RelativeTimeFormat(`en`, { numeric: `auto` }).format(round, `day`);
    }

    return {
      balance: `$${(0).toFixed(2)}`,
      contractsActiveCount: activeCount,
      lastPaymentAgo: lastPaymentAgo,
      openContracts,
      quickDocs,
      compliance: {
        w9Ready: !!compliance?.w9Ready,
        kycInReview: !!compliance?.kycInReview,
        bankVerified: !!compliance?.bankVerified,
      },
    };
  }
}
