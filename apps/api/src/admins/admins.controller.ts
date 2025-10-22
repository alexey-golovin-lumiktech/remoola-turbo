import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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
@Controller(`admins`)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Roles(UserRole.SUPERADMIN)
  @Get(`admins`)
  listAdmins(@Query(`search`) search?: string) {
    return this.adminsService.listAdmins(search);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get(`clients`)
  listClients(@Query(`search`) search?: string) {
    return this.adminsService.listClients(search);
  }

  @Get(`users`)
  listUsers() {
    throw new ForbiddenException(`this route deprecated`);
  }

  @Roles(UserRole.SUPERADMIN)
  @Patch(`users/:id/role`)
  setRole(@Param(`id`) id: string, @Body() body: { role: IUserRole }) {
    return this.adminsService.setRole(id, body);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get(`contractors`)
  listContractors(@Query(`search`) search?: string) {
    return this.adminsService.listContractors(search);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Post(`contractors`)
  createContractor(@Body() body: { name: string; email?: string; phone?: string }) {
    return this.adminsService.createContractor(body);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Patch(`contractors/:id`)
  updateContractor(@Param(`id`) id: string, @Body() body: Partial<Contractor>) {
    return this.adminsService.updateContractor(id, body);
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(`contractors/:id`)
  deleteContractor(@Param(`id`) id: string) {
    return this.adminsService.deleteContractor(id);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get(`contracts`)
  listContracts() {
    return this.adminsService.listContracts();
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Patch(`contracts/:id`)
  updateContract(@Param(`id`) id: string, @Body() body: Partial<Contract>) {
    return this.adminsService.updateContract(id, body);
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(`contracts/:id`)
  deleteContract(@Param(`id`) id: string) {
    return this.adminsService.deleteContract(id);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get(`payments`)
  listPayments() {
    return this.adminsService.listPayments();
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(`payments/:id`)
  deletePayment(@Param(`id`) id: string) {
    return this.adminsService.deletePayment(id);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get(`documents`)
  listDocuments(@Query(`search`) search?: string) {
    return this.adminsService.listDocuments(search);
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(`documents/:id`)
  deleteDocument(@Param(`id`) id: string) {
    return this.adminsService.deleteDocument(id);
  }
}
