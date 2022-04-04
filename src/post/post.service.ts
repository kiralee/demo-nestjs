import { UpdatePostDto } from './dtos/updatee-post.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepositories: Repository<Post>,
  ) {}

  async getAllPost(): Promise<Post[]> {
    return await this.postRepositories.find();
  }

  async addPost(createPostDto: CreatePostDto): Promise<Post> {
    return await this.postRepositories.save(createPostDto);
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return this.postRepositories.delete(id);
  }

  async updatePost(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdateResult> {
    return await this.postRepositories.update(id, updatePostDto);
  }
}
