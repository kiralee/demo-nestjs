import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

let resource: string | number;
let action: any;

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    resource = request.path?.split('/')[1];
    action = request.method.toLocaleLowerCase();
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const permission = user.permission;

    const check = permission?.[resource]?.includes(action);
    if (!check) {
      throw new UnauthorizedException('No permission');
    }
    return user;
  }
}
