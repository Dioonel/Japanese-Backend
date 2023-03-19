import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AuthStore } from './store.js';
import { User, UserCreateDTO, UserLoginDTO } from './auth.js';

const store = AuthStore.getInstance();

export class AuthService {
    private static _instance: AuthService;
    private constructor() {}
    static getInstance(): AuthService {
        if (!AuthService._instance) {
            AuthService._instance = new AuthService();
        }
        return AuthService._instance;
    }

    async register(user: UserLoginDTO) {
        let newUser: UserCreateDTO = {
            username: user.username,
            password: await hash(user.password, 10),
            role: 'admin'
        };
        return await store.createUser(newUser);
    }

    async signToken(user: User) {
        let payload = {
            sub: user._id,
            username: user.username,
            role: user.role
        };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    }
}