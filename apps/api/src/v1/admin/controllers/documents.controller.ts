import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRole } from '../../../common';
import { Roles } from '../../auth/roles.decorator';
import { AdminService } from '../admin.service';

@ApiTags(`admin`)
@Controller({ path: `admin/documents`, version: `1` })
export class DocumentsController {
  constructor(private readonly adminsService: AdminService) {}

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get()
  listDocuments(@Query(`search`) search?: string) {
    return this.adminsService.listDocuments(search);
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(`:documentId`)
  deleteDocument(@Param(`documentId`) documentId: string) {
    return this.adminsService.deleteDocument(documentId);
  }
}
