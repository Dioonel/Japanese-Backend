import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64,
        unique: false,
    },
    role: {
        type: String,
        required: true,
    }
});

export const userModel = model('user', userSchema);