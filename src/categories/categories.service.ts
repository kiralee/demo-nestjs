import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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

  async deleteCategory(id: number): Promise<any> {
    return await this.categoryRepository.delete(id);
  }

  async updateCategory(id: number, updateCategory: UpdateCategoryDto) {
    return await this.categoryRepository.update(id, updateCategory);
  }
}
