import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    code: String,
    name: String,
    user: String,
    email: String,
    password: String,
    access_token: String,
    permission_level: String,
    permission_group: String,
    active: Boolean,
});
