import {
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  public resource: string;
  public action: string;

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    this.resource = request.path?.split('/')[1];
    this.action = request.method.toLocaleLowerCase();
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const permission = user.permission;
    const check = permission?.[this.resource]?.includes(this.action);
    if (!check) {
      throw new ForbiddenException('No permission');
    }
    return user;
  }
}
