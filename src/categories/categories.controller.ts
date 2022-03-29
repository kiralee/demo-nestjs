import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  ParseIntPipe,
  Put,
  Res,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtGuard } from 'src/guard/jwt.guard';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-user.dto';
import { Response } from 'express';

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
      console.log('Error getAllCategory', error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post('add-category')
  @HttpCode(HttpStatus.CREATED)
  async addCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<object> {
    try {
      const result = this.categoriesService.addCategory(createCategoryDto);
      return {
        message: 'add category success',
        data: result,
      };
    } catch (error) {
      console.log('error add cateagory: ', error);
      throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Delete('delete-category/:id')
  @HttpCode(HttpStatus.OK)
  async deleteCategory(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<object> {
    try {
      console.log('Id', id);
      const result = await this.categoriesService.deleteCategory(id);
      if (result.affected > 0) {
        return {
          message: 'Delete category success',
          data: result,
        };
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Not found' });
    } catch (error) {
      console.log('error delete cateagory: ', error.message);
      throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Put('update-category/:id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<object> {
    try {
      const result = await this.categoriesService.updateCategory(
        id,
        updateCategoryDto,
      );
      return {
        message: 'Update success',
        data: result,
      };
    } catch (error) {
      console.log('Error updateCategory', error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
