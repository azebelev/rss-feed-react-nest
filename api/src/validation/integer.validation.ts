import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { isInt } from 'class-validator';

@Injectable()
export class IntegerValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isInt(+value)) {
      throw new BadRequestException('Channel id must be an integer');
    }
    return value;
  }
}