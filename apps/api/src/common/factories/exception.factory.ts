import { type ValidationPipeOptions, HttpStatus, BadRequestException } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { type ValidationError } from 'class-validator';
import { snakeCase } from 'lodash';
import { titleCase } from 'typeorm/util/StringUtils';

const exceptionFactory: ValidationPipeOptions[`exceptionFactory`] = (validationErrors: ValidationError[] = []) => {
  const statusCode = HttpStatus.BAD_REQUEST;
  const statusText = titleCase(snakeCase(HttpStatus[HttpStatus.BAD_REQUEST]).replace(`_`, ` `));
  const collector = {
    message: ``,
    errors: {},
    statusCode,
    statusText,
  };
  const errorsReducer = (acc: typeof collector, ctx: ValidationError) => {
    if (ctx.children.length !== 0) {
      return ctx.children.reduce(errorsReducer, collector);
    }
    acc.errors = {
      ...acc.errors,
      [ctx.property]: Object.values(ctx.constraints).join(`, `),
    };
    acc.message += Object.values(ctx.constraints).join(`, `);
    return acc;
  };
  const error = validationErrors.reduce(errorsReducer, collector);
  return new BadRequestException(error);
};

export const validationPipeOpts: ValidationPipeOptions = {
  stopAtFirstError: true,
  exceptionFactory,
  transform: true,
  transformerPackage: {
    classToPlain: instanceToPlain,
    plainToInstance: plainToInstance,
  },
  transformOptions: {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
    exposeUnsetFields: false,
  },
} satisfies ValidationPipeOptions;
