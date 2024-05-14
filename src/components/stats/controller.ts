import { Router } from 'express';
import passport from 'passport';

import { StatsService } from './service.js';

const router = Router();
const service = StatsService.getInstance();

router.get('/',
    //passport.authenticate('jwt', { session: false }),                           ** Activate when user system is implemented
    async (req, res, next) => {
        try{
            const stats = await service.getStats();
            res.json(stats);
        } catch (err) {
            next(err);
        }
    }
);

export default router;