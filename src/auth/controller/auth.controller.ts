import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../service/local-auth.guard';

@UseGuards(LocalAuthGuard)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    async signin(@Request() req: any): Promise<any> {
        return await this.authService.signin(req.user);
    }
}
