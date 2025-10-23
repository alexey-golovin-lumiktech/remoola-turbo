import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IUserRole, UserRole } from '../../../common';
import { Roles } from '../../auth/roles.decorator';
import { AdminService } from '../admin.service';

@ApiTags(`admin`)
@Controller({ path: `admin/users`, version: `1` })
export class UsersController {
  constructor(private readonly adminsService: AdminService) {}

  @Roles(UserRole.SUPERADMIN)
  @Patch(`:userId/role`)
  setRole(@Param(`userId`) userId: string, @Body() body: { role: IUserRole }) {
    return this.adminsService.setRole(userId, body);
  }
}
