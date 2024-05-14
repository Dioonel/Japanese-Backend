import { Router } from 'express';
import passport from 'passport';

import { PlayService } from './service.js';
import { joiValidator } from './../../middlewares/joi.validator.js';
import { GuessJoi, PairsJoi } from './play.js';
import { ScoreSubmitJoi } from './../stats/stats.js';

const router = Router();
const service = PlayService.getInstance();

router.post('/guess',
    joiValidator(GuessJoi, 'body'),
    async (req, res, next) => {
        try{
            const items = await service.guess(req.body.quantity);
            res.json(items);
        } catch (err) {
            next(err);
        }
    }
);

router.post('/pairs',
    joiValidator(PairsJoi, 'body'),
    async (req, res, next) => {
        try{
            const items = await service.pairs(req.body.quantity);
            res.json(items);
        } catch (err) {
            next(err);
        }
    }
);

router.post('/submit-score',
    passport.authenticate('jwt', { session: false }),
    joiValidator(ScoreSubmitJoi, 'body'),
    async (req, res, next) => {
        try{
            await service.submitScore(req.user['sub'], req.body.score, req.body.type);
            res.json({ message: 'Score submitted!' });
        } catch (err) {
            next(err);
        }
    }
);

export default router;