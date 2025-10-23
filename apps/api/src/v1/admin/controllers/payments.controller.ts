import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRole } from '../../../common';
import { Roles } from '../../auth/roles.decorator';
import { AdminService } from '../admin.service';

@ApiTags(`admin`)
@Controller({ path: `admin/payments`, version: `1` })
export class PaymentsController {
  constructor(private readonly adminsService: AdminService) {}

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get()
  listPayments() {
    return this.adminsService.listPayments();
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(`:paymentId`)
  deletePayment(@Param(`paymentId`) paymentId: string) {
    return this.adminsService.deletePayment(paymentId);
  }
}
