import { Router } from 'express';
import passport from 'passport';

import { AuthService } from './service.js';
import { joiValidator } from './../../middlewares/joi.validator.js';
import { LoginJoi, RegisterJoi, User } from './auth.js';

const router = Router();
const service = AuthService.getInstance();

router.post('/login',
    joiValidator(LoginJoi, 'body'),
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try{
            const token = await service.signToken(req.user as User);
            res.json({user: req.user, token: token});
        } catch (err) {
            next(err);
        }
    }
);

router.post('/register',
    joiValidator(RegisterJoi, 'body'),
    async (req, res, next) => {
        try{
            const user = await service.register(req.body);
            res.json(user);
        } catch (err) {
            next(err);
        }
    }
);

export default router;