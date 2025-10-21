import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminController } from './admin.controller';
import { Contractor } from '../contractors/contractor.entity';
import { Contract } from '../contracts/contract.entity';
import { Document } from '../documents/document.entity';
import { Payment } from '../payments/payment.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contractor, Contract, Payment, Document])],
  controllers: [AdminController],
})
export class AdminModule {}
