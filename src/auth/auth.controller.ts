import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/login.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService:AuthService
    ) {}

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async signIn(
        @Body() body: loginDTO,
        @Res({ passthrough: true }) res: Response
    ) {
        const token = await this.authService.signIn(body)

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'development' ? false : true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60, // 1h
        })
    }
}
