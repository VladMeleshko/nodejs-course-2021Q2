import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
// import { UsersService } from 'src/resources/users/users.service';

@Injectable()
export class ValidateSessionGuard implements CanActivate {
  constructor(
    private jwtService: JwtService, // private usersService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const userToken = request.header('authorization')?.split(' ')[1];
      // console.log(request.header('authorization'));
      if (!userToken) throw new UnauthorizedException('Unauthorized');
      this.jwtService.verify(userToken);
      // this.usersService()
      return true;
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
