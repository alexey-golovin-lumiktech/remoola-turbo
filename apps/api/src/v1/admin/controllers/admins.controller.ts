import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRole } from '../../../common';
import { Roles } from '../../auth/roles.decorator';
import { AdminService } from '../admin.service';

@ApiTags(`admin`)
@Controller({ path: `admin/admins`, version: `1` })
export class AdminsController {
  constructor(private readonly adminsService: AdminService) {}

  @Roles(UserRole.SUPERADMIN)
  @Get()
  searchAdmins(@Query(`search`) search?: string) {
    return this.adminsService.searchAdmins(search);
  }

  @Roles(UserRole.SUPERADMIN)
  @Get(`:adminId`)
  getAdminById(@Param(`adminId`) adminId: string) {
    return this.adminsService.getAdminById(adminId);
  }
}
