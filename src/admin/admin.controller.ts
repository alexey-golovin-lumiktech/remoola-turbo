import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { User } from '../users/user.entity';
import { Contractor } from '../contractors/contractor.entity';
import { Contract } from '../contracts/contract.entity';
import { Payment } from '../payments/payment.entity';
import { Document as Doc } from '../documents/document.entity';
import { IUserRole } from '../shared';

@ApiBearerAuth(`jwt`)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(`admin`)
@Controller(`admin`)
export class AdminController {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Contractor) private people: Repository<Contractor>,
    @InjectRepository(Contract) private contracts: Repository<Contract>,
    @InjectRepository(Payment) private payments: Repository<Payment>,
    @InjectRepository(Doc) private docs: Repository<Doc>,
  ) {}

  @Get(`users`)
  listUsers(@Query(`q`) q?: string) {
    const where = q ? [{ email: ILike(`%${q}%`) }, { name: ILike(`%${q}%`) }] : undefined;
    return this.users.find({ where, order: { createdAt: `DESC` } });
  }
  @Patch(`users/:id/role`)
  setRole(@Param(`id`) id: string, @Body() body: { role: IUserRole }) {
    return this.users.update({ id }, { role: body.role });
  }

  @Get(`contractors`) listContractors(@Query(`q`) q?: string) {
    return this.people.find({ where: q ? { name: ILike(`%${q}%`) } : {}, order: { createdAt: `DESC` } });
  }
  @Post(`contractors`) createContractor(@Body() b: { name: string; email?: string; phone?: string }) {
    return this.people.save(this.people.create(b));
  }
  @Patch(`contractors/:id`) updateContractor(@Param(`id`) id: string, @Body() b: Partial<Contractor>) {
    return this.people.update({ id }, b);
  }
  @Delete(`contractors/:id`) deleteContractor(@Param(`id`) id: string) {
    return this.people.delete({ id });
  }

  @Get(`contracts`) listContracts() {
    return this.contracts.find({ order: { updatedAt: `DESC` } });
  }
  @Patch(`contracts/:id`) updateContract(@Param(`id`) id: string, @Body() b: Partial<Contract>) {
    return this.contracts.update({ id }, b);
  }
  @Delete(`contracts/:id`) deleteContract(@Param(`id`) id: string) {
    return this.contracts.delete({ id });
  }

  @Get(`payments`) listPayments() {
    return this.payments.find({ order: { createdAt: `DESC` } });
  }
  @Delete(`payments/:id`) deletePayment(@Param(`id`) id: string) {
    return this.payments.delete({ id });
  }

  @Get(`documents`) listDocuments(@Query(`q`) q?: string) {
    return this.docs.find({ where: q ? { name: ILike(`%${q}%`) } : {}, order: { updatedAt: `DESC` } });
  }
  @Delete(`documents/:id`) deleteDocument(@Param(`id`) id: string) {
    return this.docs.delete({ id });
  }
}
