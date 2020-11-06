import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { hash } from 'bcryptjs';

import { User } from '../model/user';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async getById(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async getByUser(user: string): Promise<User> {
        return await this.userModel.findOne({ user }).exec();
    }

    // async getByUser(user: string): Promise<any> {
    //     let usr;
    //     try {
    //         usr = await this.userModel.findOne({ user }).exec();
    //         if (usr === null) {
    //             return 'The User does not exist!';
    //         } else {
    //             return usr;
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return 'The User does not exist!';
    //     }
    // }

    async create(user: User): Promise<User> {
        const hashedPassword = await hash(user.password, 8);

        user.password = hashedPassword;

        const userCreated = new this.userModel(user);
        return await userCreated.save();
    }

    async update(id: string, user: User): Promise<User> {
        await this.userModel.updateOne({ _id: id }, user).exec();
        return this.getById(id);
    }

    async delete(id: string) {
        return await this.userModel.deleteOne({ _id: id }).exec();
    }

    async checksDuplicity(user: User): Promise<string> {
        const userName = await this.userModel.findOne({ user: user.user });
        const userEmail = await this.userModel.findOne({ email: user.email });
        if (userName || userEmail) {
            return `User already registered !`;
        }
    }
}
