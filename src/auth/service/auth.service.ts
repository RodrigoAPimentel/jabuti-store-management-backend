import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { User } from 'src/users/model/user';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(user: string, password: string): Promise<any> {
        let usr: User;
        try {
            usr = await this.usersService.getByUser(user);
            if (usr === null) {
                return null;
            } else {
                const validPassword = await compare(password, usr.password);

                if (validPassword) {
                    usr.token = 'tokenn';

                    return usr;
                } else {
                    return null;
                }
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
