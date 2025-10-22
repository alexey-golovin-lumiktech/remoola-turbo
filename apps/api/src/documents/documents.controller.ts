import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { DocumentsService } from './documents.service';
import { UploadDocument, PresignedResponse, DocumentListItem } from './dto';

@Controller(`documents`)
export class DocumentsController {
  private s3 = new S3Client({ region: process.env.AWS_REGION });

  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @ApiOkResponse({ type: DocumentListItem, isArray: true })
  list(@Req() req: Request, @Query(`clientId`) clientId?: string) {
    const sub = req.user?.[`sub`] || clientId;
    return this.documentsService.listByClient(sub);
  }

  @Post()
  upload(@Body() body: UploadDocument) {
    return this.documentsService.upload(body);
  }

  @Post(`presigned`)
  async presigned(@Body() body: { key?: string; filename: string; contentType: string }): Promise<PresignedResponse> {
    const key = body.key ?? `uploads/${Date.now()}-${encodeURIComponent(body.filename)}`;
    const Bucket = process.env.S3_BUCKET;
    const params = { Bucket, Key: key, ContentType: body.contentType };
    const url = await getSignedUrl(this.s3, new PutObjectCommand(params), { expiresIn: 60 });
    return { url, fileUrl: `${process.env.S3_PUBLIC_BASE}/${key}`, method: `PUT` };
  }
}
