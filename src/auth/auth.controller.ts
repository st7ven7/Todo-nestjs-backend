import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UseGuards, Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    register(@Body() regitserDto: RegisterDto){
        return this.authService.register(regitserDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    refresh(@Body('refresh_token') refreshToken: string){
        return this.authService.refreshToken(refreshToken);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user
    }
}
