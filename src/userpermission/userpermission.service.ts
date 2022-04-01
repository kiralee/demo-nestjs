import { DeleteUserPermissionDto } from './dto/delete-user-permission';
import { CreateUserPermissionDto } from './dto/create-user-permission';
import { User } from './../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Permission } from 'src/entities/permission.entity';

@Injectable()
export class UserPermissionService {
  constructor(
    @InjectRepository(User) private userRepositories: Repository<User>,
    @InjectRepository(Permission)
    private permissionRepositories: Repository<Permission>,
  ) {}

  async addUserPermission(
    createUserPermissionDto: CreateUserPermissionDto,
  ): Promise<User> {
    const users = await this.userRepositories.findOne({
      where: {
        id: createUserPermissionDto.userId,
      },
      relations: ['permissions'],
    });

    if (!users) throw Error('User not found');

    const permission = await this.permissionRepositories.findOne({
      id: createUserPermissionDto.permissionId,
    });

    users.permissions.length > 0
      ? users.permissions.push(permission)
      : (users.permissions = [permission]);

    return await this.userRepositories.save(users);
  }

  async deletePermission(
    deletePermissionDto: DeleteUserPermissionDto,
  ): Promise<User> {
    const users = await this.userRepositories.findOne({
      where: {
        id: deletePermissionDto.userId,
      },
      relations: ['permissions'],
    });

    if (!users) throw Error('User not found');

    users.permissions = users.permissions.filter((permission) => {
      return permission.id != deletePermissionDto.permissionId;
    });

    return await this.userRepositories.save(users);
  }
}
