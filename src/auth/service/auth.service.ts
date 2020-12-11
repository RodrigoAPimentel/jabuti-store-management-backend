import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from 'src/users/model/user';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(user: string, password: string): Promise<any> {
        let usr: User;
        try {
            usr = await this.usersService.getByUser(user);
            if (usr === null) {
                return null;
            } else {
                const validPassword = await compare(password, usr.password);

                if (validPassword) return usr;

                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async signin(user: any) {
        const payload = { id: user._id, user: user.user };

        return { user, access_token: await this.jwtService.sign(payload) };
    }
}
