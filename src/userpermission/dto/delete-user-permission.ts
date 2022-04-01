import { CreateUserPermissionDto } from './create-user-permission';
import { PartialType } from '@nestjs/swagger';

export class DeleteUserPermissionDto extends PartialType(
  CreateUserPermissionDto,
) {}
