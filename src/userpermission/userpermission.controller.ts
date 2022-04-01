import { CreateUserPermissionDto } from './dto/create-user-permission';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';

import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  Delete,
  HttpException,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { UserPermissionService } from './userpermission.service';
import { DeleteUserPermissionDto } from './dto/delete-user-permission';

@ApiTags('userPermission')
@Controller('user-permission')
export class UserPermissionController {
  constructor(
    private readonly userPermissionService: UserPermissionService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('add-permission')
  @HttpCode(HttpStatus.CREATED)
  async addPermission(@Body() userPermissionDto: CreateUserPermissionDto) {
    try {
      const result = await this.userPermissionService.addUserPermission(
        userPermissionDto,
      );
      return {
        message: 'Add successfully',
        data: result,
      };
    } catch (error) {
      console.log('Error add permission', error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete-permission')
  @HttpCode(HttpStatus.CREATED)
  async deletePermission(@Body() userPermissionDto: DeleteUserPermissionDto) {
    try {
      const result = await this.userPermissionService.deletePermission(
        userPermissionDto,
      );
      await this.cacheManager.del(userPermissionDto.userId.toString());
      return {
        message: 'Delete successfully',
        data: result,
      };
    } catch (error) {
      console.log('Error delete user permission', error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
