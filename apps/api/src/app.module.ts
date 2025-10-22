import { BullModule } from '@nestjs/bullmq';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { CookieToAuthMiddleware } from './auth/cookie-to-auth.middleware';
import { ComplianceChecklist } from './compliance/compliance.entity';
import { typeormAsyncConfig } from './config/typeorm.config';
import { Contractor } from './contractors/contractor.entity';
import { Contract } from './contracts/contract.entity';
import { ContractsController } from './contracts/contracts.controller';
import { ContractsService } from './contracts/contracts.service';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { Document } from './documents/document.entity';
import { DocumentsController } from './documents/documents.controller';
import { DocumentsService } from './documents/documents.service';
import { Payment } from './payments/payment.entity';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsProcessor } from './payments/payments.processor';
import { PaymentsService } from './payments/payments.service';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeormAsyncConfig),
    TypeOrmModule.forFeature([User, Contractor, Contract, Payment, Document, ComplianceChecklist]),
    BullModule.forRoot({ connection: { url: process.env.REDIS_URL } }),
    BullModule.registerQueue({ name: `payments` }),
    AuthModule,
    AdminModule,
  ],
  controllers: [ContractsController, PaymentsController, DocumentsController, DashboardController],
  providers: [ContractsService, PaymentsService, PaymentsProcessor, DocumentsService, DashboardService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieToAuthMiddleware).forRoutes(`*splat`);
  }
}
