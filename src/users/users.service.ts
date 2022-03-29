import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dtos/login-user.dto';
import { Cache } from 'cache-manager';

@Injectable() //use @Injectable annotation allows you to inject instances
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async signUp(user: CreateUserDto): Promise<any> {
    const result = await this.usersRepository.save(user);
    return result;
  }

  async signIn(user: LoginUserDto): Promise<User | undefined> {
    const result = await this.usersRepository.findOne({
      where: {
        email: user.email,
        password: user.password,
      },
      relations: ['permissions'],
    });
    return result;
  }

  async signOut(id: number) {
    return await this.cacheManager.del(id.toString());
  }

  test() {
    console.log('abc');
  }
}
