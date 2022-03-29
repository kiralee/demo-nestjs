import { UsersService } from 'src/users/users.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateCategoryDto } from './dtos/update-user.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategory(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async addCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async deleteCategory(id: number): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }

  async updateCategory(
    id: number,
    updateCategory: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoryRepository.update(id, updateCategory);
  }
}
