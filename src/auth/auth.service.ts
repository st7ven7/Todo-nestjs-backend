import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    
    constructor(
        private prisma:PrismaService,
        private jwtService: JwtService,
    ){};

    async register(registerDto: RegisterDto){
        const { email, password} = registerDto;
        const existingUser = await this.prisma.user.findUnique({where: {email},});
        if (existingUser){
            throw new BadRequestException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await this.prisma.user.create({
            data:{email, password: hashedPassword},
        });
        
        return{
            id: newUser.id,
            email: newUser.email,
        };
    }

    async login(loginDto: LoginDto){
        const {email, password} = loginDto;
        const user = await this.prisma.user.findUnique({where:{email},});

        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            email: user.email,
        }

        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
        });

        const refresh_token = await this.jwtService.signAsync(payload,{
            expiresIn: '7d',
        });

        await this.prisma.user.update({
            where: {id: user.id},
            data: {
                refreshToken: refresh_token,
            },
        });

        return{
            access_token,
            refresh_token,
        };

    }

    async refreshToken(refreshToken: string){
        const payload = await this.jwtService.verifyAsync(refreshToken);

        const user = await this.prisma.user.findUnique({
            where: {id: payload.sub},
        });

        if (!user || user.refreshToken !== refreshToken){
            throw new UnauthorizedException();
        }

        const newAccessToken = await this.jwtService.signAsync(
            {sub: user.id, email: user.email},
            {expiresIn: '15m'},
        );

        return {
            access_token: newAccessToken,
        };
    }
}
