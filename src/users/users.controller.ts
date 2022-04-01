import { ValidationPipe } from './../validation/validation.pipe';
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
import { AuthService } from 'src/auth/auth.service';

@ApiTags('users')
@Controller('users') //nhận vào 1 chuỗi nếu k mặt định là /
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

  // @UseGuards(LocalGuard)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Request() req,
    @Body(new ValidationPipe()) loginUserDto: LoginUserDto,
  ) {
    try {
      // const user = req.user;
      const user = await this.usersService.signIn(loginUserDto);
      if (!user)
        return {
          message: 'Wrong user or password',
        };
      const { password, ...rest } = user;
      return await this.authService.signIn(user);
    } catch (error) {
      console.log('Error signIp', error);
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
