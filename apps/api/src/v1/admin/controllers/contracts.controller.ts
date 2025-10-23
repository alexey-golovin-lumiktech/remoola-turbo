import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRole } from '../../../common';
import { Roles } from '../../auth/roles.decorator';
import { ContractEntity } from '../../contracts/contract.entity';
import { AdminService } from '../admin.service';

@ApiTags(`admin`)
@Controller({ path: `admin/contracts`, version: `1` })
export class ContractsController {
  constructor(private readonly adminsService: AdminService) {}

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get()
  listContracts() {
    return this.adminsService.listContracts();
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Patch(`:contractId`)
  updateContract(@Param(`contractId`) contractId: string, @Body() body: Partial<ContractEntity>) {
    return this.adminsService.updateContract(contractId, body);
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(`:contractId`)
  deleteContract(@Param(`contractId`) contractId: string) {
    return this.adminsService.deleteContract(contractId);
  }
}
