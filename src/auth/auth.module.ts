import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

import { UsersModule } from 'src/users/users.module';

import { LocalStrategy } from './service/local.strategy';
import { JwtStrategy } from './service/jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({ secret: process.env.AUTH_SECRET, signOptions: { expiresIn: process.env.AUTH_EXPIRESIN } }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
