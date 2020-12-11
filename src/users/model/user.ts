import { Document } from 'mongoose';

export class User extends Document {
    code: string;
    name: string;
    user: string;
    email: string;
    password: string;
    permission_level: string;
    permission_group: string;
    active: boolean;
}
