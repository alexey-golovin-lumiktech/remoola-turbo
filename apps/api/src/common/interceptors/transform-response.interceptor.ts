import { CallHandler, type ExecutionContext, Injectable, NestInterceptor, SetMetadata } from '@nestjs/common';
import { type Reflector } from '@nestjs/core';
import { type ClassConstructor } from 'class-transformer';
import { map } from 'rxjs/operators';

import { convertPlainToInstance } from '../../utils';

const DTO_CLASS_TO_TRANSFORM_RESPONSE = Symbol(`DTO_CLASS_TO_TRANSFORM_RESPONSE`);
export const TransformResponse = <T>(cls: ClassConstructor<T>) => {
  return SetMetadata(DTO_CLASS_TO_TRANSFORM_RESPONSE, cls);
};

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map((res) => {
        if (res) {
          const handlerDto = this.reflector.get(DTO_CLASS_TO_TRANSFORM_RESPONSE, context.getHandler());
          const classDto = this.reflector.get(DTO_CLASS_TO_TRANSFORM_RESPONSE, context.getClass());
          if (!handlerDto && !classDto) return res;

          const cls = handlerDto ?? classDto;
          if (Array.isArray(res)) return res.map((x) => convertPlainToInstance(cls, x));
          return convertPlainToInstance(cls, res);
        }
      }),
    );
  }
}
