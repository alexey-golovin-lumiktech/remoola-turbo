import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IUploadDocument, IDocumentType, IDocumentListItem, IPresignedResponse } from '../shared';

export class UploadDocument implements IUploadDocument {
  @Expose() @ApiProperty() contractId!: string;

  @Expose() @ApiProperty() name!: string;

  @Expose() @ApiProperty() type!: IDocumentType;

  @Expose() @ApiPropertyOptional() fileUrl?: string;

  @Expose() @ApiPropertyOptional() sizeBytes?: number;
}

export class DocumentListItem implements IDocumentListItem {
  @Expose() @ApiProperty() id: string;

  @Expose() @ApiProperty() name: string;

  @Expose() @ApiProperty() type: IDocumentType;

  @Expose() @ApiProperty() size: string;

  @Expose() @ApiProperty() updated: string;

  @Expose() @ApiPropertyOptional() fileUrl?: string | undefined;
}

export class PresignedResponse implements IPresignedResponse {
  @Expose() @ApiProperty() url: string;

  @Expose() @ApiPropertyOptional() fields?: Record<string, string> | undefined;

  @Expose() @ApiProperty() fileUrl: string;

  @Expose() @ApiProperty() method: `PUT` | `POST`;
}
