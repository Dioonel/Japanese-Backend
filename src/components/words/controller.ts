import { Router } from 'express';

import { WordService } from './service.js';
import { IdJoi, PropsJoi, WordCreateJoi, WordUpdateJoi, WordFilterJoi } from './word.js';
import { joiValidator } from './../../middlewares/joi.validator.js';

const router = Router();
const service = new WordService();
//// service /////

router.get('/',
    joiValidator(WordFilterJoi, 'query'),
    async (req, res, next) => {
        try{
            const words = await service.getWords(req.query);
            res.json(words);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id',
    joiValidator(IdJoi, 'params'),
    async (req, res, next) => {
        try{
            const word = await service.getWordById(req.params.id);
            res.json(word);
        } catch (err) {
            next(err);
        }  
    }
);

router.post('/',
    joiValidator(WordCreateJoi, 'body'),
    async (req, res, next) => {
        try{
            const word = await service.createWord(req.body);
            res.json(word);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/push/:id', 
    joiValidator(IdJoi, 'params'),
    joiValidator(PropsJoi, 'body'),
    async (req, res, next) => {
        try{
            const word = await service.pushProp(req.params.id, req.body);
            res.json(word);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/pull/:id', 
    joiValidator(IdJoi, 'params'),
    joiValidator(PropsJoi, 'body'),
    async (req, res, next) => {
        try{
            const word = await service.pullProp(req.params.id, req.body);
            res.json(word);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/:id',
    joiValidator(IdJoi, 'params'),
    joiValidator(WordUpdateJoi, 'body'),
    async (req, res, next) => {
        try{
            const word = await service.updateWord(req.params.id, req.body);
            res.json(word);
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/:id',
    joiValidator(IdJoi, 'params'),
    async (req, res, next) => {
        try{
            const word = await service.deleteWord(req.params.id);
            res.json((word) ? true : false);
        } catch (err) {
            next(err);
        }
    }
);


export default router;