import { Controller, Get, Query } from '@nestjs/common';
import { User } from 'src/users/model/user';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    async validateUser(@Query('user') user: string, @Query('password') password: string): Promise<User> {
        return this.authService.validateUser(user, password);
    }
}
