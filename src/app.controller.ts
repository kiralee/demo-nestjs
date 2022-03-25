import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getHello(): object {
    try {
      return {
        message: this.appService.getHello(),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR); // standard exception
    }
  }
}
