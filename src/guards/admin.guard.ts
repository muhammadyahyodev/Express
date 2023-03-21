import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: 'Nomzod ro`yhatdan o`tmagan',
      });
    }

    const condidate = this.jwtService.verify(token, {
      publicKey: process.env.ACCESS_TOKEN_KEY,
    });

    if (request.body.id !== condidate.sub && !condidate.is_active) {
      throw new ForbiddenException(`Ruxsat berilmadi`);
    }

    return true;
  }
}
