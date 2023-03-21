import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { refresh_token } = request.cookies;

    if (!refresh_token) {
      throw new UnauthorizedException({
        message: `Nomzod ro'yhatdan o'tmagan`,
      });
    }

    this.jwtService.verify(refresh_token, {
      publicKey: process.env.REFRESH_TOKEN_KEY,
    });

    return true;
  }
}
