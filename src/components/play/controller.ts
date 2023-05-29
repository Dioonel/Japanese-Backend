import { Router } from 'express';

import { PlayService } from './service.js';
import { joiValidator } from './../../middlewares/joi.validator.js';
import { GuessJoi } from './play.js';

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

export default router;