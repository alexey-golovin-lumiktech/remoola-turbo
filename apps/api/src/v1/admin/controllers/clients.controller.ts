import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRole } from '../../../common';
import { Roles } from '../../auth/roles.decorator';
import { AdminService } from '../admin.service';

@ApiTags(`admin`)
@Controller({ path: `admin/clients`, version: `1` })
export class ClientsController {
  constructor(private readonly adminsService: AdminService) {}

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get()
  searchClients(@Query(`search`) search?: string) {
    return this.adminsService.searchClients(search);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get(`:clientId`)
  getClientById(@Param(`clientId`) clientId: string) {
    return this.adminsService.getClientById(clientId);
  }
}
