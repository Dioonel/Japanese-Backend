import { Strategy } from 'passport-local';
import { notFound, unauthorized } from '@hapi/boom';
import { compare } from 'bcrypt';

import { AuthStore } from './../components/auth/store.js';

const store = AuthStore.getInstance();

const LocalStrategy = new Strategy(async (username, password, done) => {
    try{
        const user = await store.getUserByUsername(username);
        if(!user) {
            done(notFound('User not found'), false);
        }
        const isMatch = await compare(password, user.password);
        if(!isMatch) {
            done(unauthorized('Unauthorized'), false);
        }
        done(null, user);
    } catch (err) {
        done(err, false);
    }
});

export default LocalStrategy;