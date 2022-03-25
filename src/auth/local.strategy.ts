import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    }); // config field body
  }

  async validate(email: string, password: string) {
    const result = await this.authService.validateUser({ email, password });
    if (!result) {
      throw new UnauthorizedException('Wrong email or password');
    }

    return result;
  }
}
