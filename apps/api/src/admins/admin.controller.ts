import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { AdminService } from './admin.service';
import { SearchResult } from './dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Contractor } from '../contractors/contractor.entity';
import { Contract } from '../contracts/contract.entity';
import { IUserRole, UserRole } from '../shared';
import { SearchService } from './search.service';

@ApiBearerAuth(`jwt`)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(`admin`)
export class AdminController {
  constructor(
    private readonly adminsService: AdminService,
    private readonly searchService: SearchService,
  ) {}

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get(`global-search`)
  @ApiOkResponse({ type: SearchResult, isArray: true })
  async globalSearch(@Query(`search`) incoming: string) {
    const search = incoming?.trim();
    if (!search) return { results: [] };
    const results = await this.searchService.globalSearch(search);
    return { results };
  }

  @Roles(UserRole.SUPERADMIN)
  @Get()
  searchAdmins(@Query(`search`) search?: string) {
    return this.adminsService.searchAdmins(search);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get(`clients`)
  searchClients(@Query(`search`) search?: string) {
    return this.adminsService.searchClients(search);
  }

  @Roles(UserRole.SUPERADMIN)
  @Get(`:adminId`)
  getAdminById(@Param(`adminId`) adminId: string) {
    return this.adminsService.getAdminById(adminId);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get(`clients/:clientId`)
  getClientById(@Param(`clientId`) clientId: string) {
    return this.adminsService.getClientById(clientId);
  }

  @Roles(UserRole.SUPERADMIN)
  @Patch(`users/:userId/role`)
  setRole(@Param(`userId`) userId: string, @Body() body: { role: IUserRole }) {
    return this.adminsService.setRole(userId, body);
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
  @Patch(`contractors/:contractorId`)
  updateContractor(@Param(`contractorId`) contractorId: string, @Body() body: Partial<Contractor>) {
    return this.adminsService.updateContractor(contractorId, body);
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(`contractors/:contractorId`)
  deleteContractor(@Param(`contractorId`) contractorId: string) {
    return this.adminsService.deleteContractor(contractorId);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get(`contracts`)
  listContracts() {
    return this.adminsService.listContracts();
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Patch(`contracts/:contractId`)
  updateContract(@Param(`contractId`) contractId: string, @Body() body: Partial<Contract>) {
    return this.adminsService.updateContract(contractId, body);
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(`contracts/:contractId`)
  deleteContract(@Param(`contractId`) contractId: string) {
    return this.adminsService.deleteContract(contractId);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get(`payments`)
  listPayments() {
    return this.adminsService.listPayments();
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(`payments/:paymentId`)
  deletePayment(@Param(`paymentId`) paymentId: string) {
    return this.adminsService.deletePayment(paymentId);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get(`documents`)
  listDocuments(@Query(`search`) search?: string) {
    return this.adminsService.listDocuments(search);
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(`documents/:documentId`)
  deleteDocument(@Param(`documentId`) documentId: string) {
    return this.adminsService.deleteDocument(documentId);
  }
}
