import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isInt } from 'class-validator';

@Injectable()
export class IntegerValidationPipe implements PipeTransform<any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isInt(+value)) {
      throw new BadRequestException('Channel id must be an integer');
    }
    return value;
  }
}
