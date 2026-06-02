import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService:JwtService
  ) {}

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const token = req.cookies?.access_token || ""
    if(!token) throw new UnauthorizedException()

    try {
      const payload = await this.jwtService.verifyAsync(token)

      req.user = payload
    } catch(e) {
      throw new UnauthorizedException()
    }

    return true
  }
}
