import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  //async vì một số phương thức xác thực có thể thực hiện không động bộ càn await
  //nếu có global pipe thì global pipe sẽ run trước
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(errors[0].constraints);
    }
    return value;
  }
}
