import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminController } from './admin.controller';
import { providers } from './providers';
import { ContractorEntity } from '../contractors/contractor.entity';
import { ContractEntity } from '../contracts/contract.entity';
import { DocumentEntity } from '../documents/document.entity';
import { PaymentEntity } from '../payments/payment.entity';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ContractorEntity, ContractEntity, PaymentEntity, DocumentEntity])],
  controllers: [AdminController],
  providers: providers,
  exports: providers,
})
export class AdminModule {}
