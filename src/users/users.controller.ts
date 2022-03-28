import { CreateUserDto } from './dtos/create-user.dto';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Request,
  UseGuards,
  forwardRef,
  Inject,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto): Promise<object> {
    try {
      const result = await this.usersService.signUp(createUserDto);
      return {
        message: 'Create success',
        data: result,
      };
    } catch (error) {
      console.log('Error signUp', error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  async signIn(@Request() req, @Body() loginUserDto: LoginUserDto) {
    try {
      const user = req.user;
      return await this.authService.signIn(user);
    } catch (error) {
      console.log('Error signUp', error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('sign-out')
  async signOut(@Body('id') id: number) {
    try {
      await this.usersService.signOut(id);
      return {
        message: 'Sign out success',
      };
    } catch (error) {
      console.log('Error signUp', error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
