import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRole } from '../../../common';
import { Roles } from '../../auth/roles.decorator';
import { ContractorEntity } from '../../contractors/contractor.entity';
import { AdminService } from '../admin.service';

@ApiTags(`admin`)
@Controller({ path: `admin/contractors`, version: `1` })
export class ContractorsController {
  constructor(private readonly adminsService: AdminService) {}

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get()
  listContractors(@Query(`search`) search?: string) {
    return this.adminsService.listContractors(search);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Post()
  createContractor(@Body() body: { name: string; email?: string; phone?: string }) {
    return this.adminsService.createContractor(body);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Patch(`:contractorId`)
  updateContractor(@Param(`contractorId`) contractorId: string, @Body() body: Partial<ContractorEntity>) {
    return this.adminsService.updateContractor(contractorId, body);
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(`:contractorId`)
  deleteContractor(@Param(`contractorId`) contractorId: string) {
    return this.adminsService.deleteContractor(contractorId);
  }
}
