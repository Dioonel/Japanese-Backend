import { notFound, internal, badData } from '@hapi/boom';

import { userModel } from './model.js';
import { UserCreateDTO } from './auth.js';

export class AuthStore {
    private static _instance: AuthStore;
    private constructor() {}
    static getInstance(): AuthStore {
        if (!AuthStore._instance) {
            AuthStore._instance = new AuthStore();
        }
        return AuthStore._instance;
    }

    async getUserByUsername(username: string) {
        return await userModel.findOne({ username: username })
        .catch(err => {
            if(err.name === 'CastError') {
                throw notFound(`User with username ${username} not found`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async createUser(user: UserCreateDTO) {
        const newUser = new userModel(user);
        return await newUser.save()
        .catch(err => {
            if(err.name === 'ValidationError') {
                throw badData(`${err.message}`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async getUserCount() {
        return await userModel.countDocuments();
    }
}