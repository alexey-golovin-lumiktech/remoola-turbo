import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v == `object` && v !== null && v.constructor == Object;
}

function stripUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((v) => stripUndefined(v)) as T;
  }
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (v !== undefined) out[k] = stripUndefined(v);
    }
    return out as T;
  }
  return value;
}

@Injectable()
export class StripUndefinedPipe implements PipeTransform {
  transform<T>(value: T, metadata: ArgumentMetadata) {
    if (metadata.type == `body` && isPlainObject(value)) {
      console.log(`[HERE]`);
      return stripUndefined(value);
    }
    return value;
  }
}
