import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'user',
            passwordField: 'password',
        });
    }

    async validate(user: string, password: string): Promise<any> {
        const usr = await this.authService.validateUser(user, password);

        if (!usr) {
            throw new UnauthorizedException();
        }

        usr['password'] = '';

        return usr;
    }
}
