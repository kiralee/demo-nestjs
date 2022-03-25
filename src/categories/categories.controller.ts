import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtGuard } from 'src/auth/jwt.guard';

@ApiTags('category')
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get('get-all-category')
  @HttpCode(HttpStatus.OK)
  async getCategory(): Promise<object> {
    try {
      const data = await this.categoriesService.getAllCategory();
      return {
        message: 'All categories',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
