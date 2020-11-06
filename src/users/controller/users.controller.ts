/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';

import { User } from '../model/user';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAll() {
        const users = await this.usersService.getAll();
        if (users.length === 0) {
            return 'There are no Users!';
        }

        return users;
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        let user;
        try {
            user = await this.usersService.getById(id);
            if (user === null) {
                return 'The User does not exist!';
            } else {
                return user;
            }
        } catch (error) {
            console.log(error);
            return 'The User does not exist!';
        }
    }

    @Post()
    async create(@Body() user: User) {
        const userFound = await this.usersService.checksDuplicity(user);
        if (userFound) {
            return userFound;
        }
        return await this.usersService.create(user);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: User) {
        return await this.usersService.update(id, user);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.usersService.delete(id);
    }
}
