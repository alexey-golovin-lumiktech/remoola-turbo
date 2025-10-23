import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ContractsModule } from './contracts/contracts.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DocumentsModule } from './documents/documents.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    BullModule.forRoot({ connection: { url: process.env.REDIS_URL } }),
    AuthModule,
    AdminModule,
    ContractsModule,
    DashboardModule,
    DocumentsModule,
    PaymentsModule,
  ],
})
export class V1Module {}
