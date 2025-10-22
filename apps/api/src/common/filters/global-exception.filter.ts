import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import express from 'express';

import { errorCodeMessageLookup } from '../../shared';

export class ResponseSchemaException {
  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  path: string;

  @ApiPropertyOptional()
  msg?: string;

  @ApiPropertyOptional()
  code?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<express.Request>();
    const response = ctx.getResponse<express.Response>();
    const error: ResponseSchemaException = {
      timestamp: new Date(),
      path: request.originalUrl,
    };
    let exceptionStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    const traceExceptions = [
      UnauthorizedException,
      ForbiddenException,
      HttpException,
      InternalServerErrorException,
      ServiceUnavailableException,
      BadRequestException,
      NotFoundException,
    ];

    const isTraceError = traceExceptions.some((e) => exception instanceof e);
    if (isTraceError) {
      exceptionStatus = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();
      error.msg = exceptionResponse.msg ?? exception.message ?? `Unexpected exception`;
      const code = exceptionResponse.code ?? errorCodeMessageLookup[error.msg];
      if (code) {
        error.code = code;
      }
      if (exceptionResponse.additionalInfo) {
        Object.assign(error, {
          additionalInfo: exceptionResponse.additionalInfo,
        });
      }
    }

    this.logger.error(`[${exceptionStatus}] ${request.method} ${request.url} → ${error.msg}`);

    return response.status(exceptionStatus).json(error);
  }
}
