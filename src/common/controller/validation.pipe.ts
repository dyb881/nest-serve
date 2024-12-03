import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private readonly Dto: new (...args: any[]) => object) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = new this.Dto();
    Object.assign(obj, value);
    const errors = await validate(obj, { stopAtFirstError: true });
    if (errors.length > 0) {
      const message = errors.map((i) => i.constraints?.matches).filter(Boolean);
      throw new BadRequestException(message);
    }

    return value;
  }
}
