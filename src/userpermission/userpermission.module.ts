import { Module } from '@nestjs/common';
import { UserPermissionService } from './userpermission.service';
import { UserPermissionController } from './userpermission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Permission } from 'src/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  controllers: [UserPermissionController],
  providers: [UserPermissionService],
})
export class UserPermissionModule {}
