import { LoginUserDto } from './../users/dtos/login-user.dto';
import { CACHE_MANAGER, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import _ from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async validateUser(user: LoginUserDto) {
    const result = await this.usersService.signIn(user);
    if (result) {
      const { password, ...rest } = result;
      return rest;
    }

    return null;
  }

  async signIn(user: any) {
    const permission = {};
    const userPermission = user.permissions;
    userPermission?.forEach((value: any) => {
      const resource = value.resource;
      const action = value.action;
      permission[resource]
        ? permission[resource].push(action)
        : (permission[resource] = [action]);
    });

    const payload = {
      id: user.id,
      email: user.email,
      permission: permission,
    };

    const token = this.jwtService.sign(payload);

    const findCache = await this.cacheManager.get(user.id);

    if (findCache) await this.cacheManager.del(user.id);

    await this.cacheManager.set(user.id, token, { ttl: 0 }); // default set tll 5second, use tll=0 no limit

    return {
      message: 'Login success',
      data: token,
    };
  }
}
