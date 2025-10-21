import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { StartPayment, UpdatePaymentStatus } from './dto';
import { PaymentsService } from './payments.service';

@Controller(`payments`)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Get() list(@Req() req: Request, @Query(`clientId`) clientId?: string) {
    const sub = req.user?.[`sub`] || clientId;
    return this.paymentsService.listByClient(sub);
  }

  @Post() start(@Body() body: StartPayment) {
    return this.paymentsService.start(body);
  }

  @Patch(`:id/status`) patch(@Param(`id`) id: string, @Body() body: UpdatePaymentStatus) {
    return this.paymentsService.markCompleted(id, body);
  }
}
