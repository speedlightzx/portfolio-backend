import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService:JwtService
    ) {}

    async signIn(dto:loginDTO) {
        if(dto.email == process.env.ADMIN_EMAIL && dto.password == process.env.ADMIN_PASSWORD) {
            const access_token = await this.jwtService.signAsync({
                isAdmin: true
            })

            return access_token
        }

        throw new UnauthorizedException('Credenciais inválidas.')
    }
}
