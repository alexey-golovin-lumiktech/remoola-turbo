import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { type Request } from 'express';

import { DashboardService } from './dashboard.service';
import { Dashboard } from './dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiBearerAuth(`jwt`)
@UseGuards(JwtAuthGuard)
@Controller(`dashboard`)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOkResponse({ type: Dashboard, isArray: false })
  get(@Req() req: Request, @Query(`clientId`) clientId?: string) {
    const sub = req.user?.[`sub`] || clientId;
    return this.dashboardService.get(sub);
  }
}
