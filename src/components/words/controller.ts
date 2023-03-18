import { Router } from 'express';

import { WordService } from './service.js';
import { SharedService } from '../../shared/shared.service.js';
import { WordCreateJoi, WordUpdateJoi, WordFilterJoi } from './word.js';
import { IdJoi, PropsJoi } from './../../shared/joi.js';
import { joiValidator } from './../../middlewares/joi.validator.js';
import { wordModel } from './model.js';

const router = Router();
const service = WordService.getInstance();
const sharedService = SharedService.getInstance();

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
            const word = await sharedService.pushProp(wordModel, req.params.id, req.body.prop, req.body.values);
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
            const word = await sharedService.pullProp(wordModel, req.params.id, req.body.prop, req.body.values);
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