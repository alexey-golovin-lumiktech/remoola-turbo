import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AdminsService } from './admins.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Contractor } from '../contractors/contractor.entity';
import { Contract } from '../contracts/contract.entity';
import { IUserRole, UserRole } from '../shared';

@ApiBearerAuth(`jwt`)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPERADMIN)
@Controller(`admins`)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get(`users`)
  listUsers(@Query(`q`) query?: string) {
    return this.adminsService.listUsers(query);
  }

  @Patch(`users/:id/role`)
  setRole(@Param(`id`) id: string, @Body() body: { role: IUserRole }) {
    return this.adminsService.setRole(id, body);
  }

  @Get(`contractors`)
  listContractors(@Query(`q`) query?: string) {
    return this.adminsService.listContractors(query);
  }

  @Post(`contractors`)
  createContractor(@Body() body: { name: string; email?: string; phone?: string }) {
    return this.adminsService.createContractor(body);
  }

  @Patch(`contractors/:id`)
  updateContractor(@Param(`id`) id: string, @Body() body: Partial<Contractor>) {
    return this.adminsService.updateContractor(id, body);
  }

  @Delete(`contractors/:id`)
  deleteContractor(@Param(`id`) id: string) {
    return this.adminsService.deleteContractor(id);
  }

  @Get(`contracts`)
  listContracts() {
    return this.adminsService.listContracts();
  }

  @Patch(`contracts/:id`)
  updateContract(@Param(`id`) id: string, @Body() body: Partial<Contract>) {
    return this.adminsService.updateContract(id, body);
  }

  @Delete(`contracts/:id`)
  deleteContract(@Param(`id`) id: string) {
    return this.adminsService.deleteContract(id);
  }

  @Get(`payments`)
  listPayments() {
    return this.adminsService.listPayments();
  }

  @Delete(`payments/:id`)
  deletePayment(@Param(`id`) id: string) {
    return this.adminsService.deletePayment(id);
  }

  @Get(`documents`)
  listDocuments(@Query(`q`) query?: string) {
    return this.adminsService.listDocuments(query);
  }

  @Delete(`documents/:id`)
  deleteDocument(@Param(`id`) id: string) {
    return this.adminsService.deleteDocument(id);
  }
}
