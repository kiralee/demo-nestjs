import { UpdatePostDto } from './dtos/updatee-post.dto';
import {
  Controller,
  HttpCode,
  UseGuards,
  HttpStatus,
  Get,
  Post,
  Put,
  Body,
  HttpException,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get('get-all-post')
  @HttpCode(HttpStatus.OK)
  async getAllPost(): Promise<object> {
    const listPost = await this.postService.getAllPost();
    return {
      message: 'List all post',
      data: listPost,
    };
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post('add-post')
  @HttpCode(HttpStatus.CREATED)
  async addPost(@Body() createPostDto: CreatePostDto): Promise<object> {
    try {
      const timestamp = new Date();
      createPostDto.createAt = timestamp;
      createPostDto.updateAt = timestamp;
      const result = await this.postService.addPost(createPostDto);
      return {
        message: 'Add post success',
        data: result,
      };
    } catch (error) {
      console.log('Error addPost', error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Delete('delete-post/:id')
  @HttpCode(HttpStatus.OK)
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<object> {
    try {
      const result = await this.postService.deletePost(id);
      if (result.affected <= 0)
        throw new HttpException('Not found', HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        message: 'Delete post success',
        data: result,
      };
    } catch (error) {
      console.log('Error addPost', error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Put('update-post/:id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      const result = await this.postService.updatePost(id, updatePostDto);
      return {
        message: 'Update success',
        data: result,
      };
    } catch (error) {
      console.log('Error update post', error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
