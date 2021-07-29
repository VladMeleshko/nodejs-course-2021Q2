import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import config from '../common/config';

@Injectable()
export class ValidateSessionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const validRoutes = ['/', '/doc', '/login'];

    const path = request.path || request.routerPath;

    if (validRoutes.includes(path)) {
      return true;
    }

    try {
      const userToken = request.headers['authorization']?.split(' ')[1];
      if (!userToken) throw new UnauthorizedException('Unauthorized');
      jwt.verify(userToken, config.JWT_SECRET_KEY);
      return true;
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
