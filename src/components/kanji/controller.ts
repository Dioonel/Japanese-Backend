import { Router } from 'express';
import passport from 'passport';

import { KanjiService } from './service.js';
import { SharedService } from '../../shared/shared.service.js';
import { joiValidator } from './../../middlewares/joi.validator.js';
import { KanjiJoi, KanjiCreateJoi, KanjiUpdateJoi, KanjiFilterJoi } from './kanji.js';
import { IdJoi, PropsJoi } from './../../shared/joi.js';
import { kanjiModel } from './model.js';

const router = Router();
const service = KanjiService.getInstance();
const sharedService = SharedService.getInstance();

router.get('/',
    joiValidator(KanjiFilterJoi, 'query'),
    async (req, res, next) => {
        try{
            const kanji = await service.getKanji(req.query);
            res.json(kanji);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id',
    joiValidator(IdJoi, 'params'),
    async (req, res, next) => {
        try{
            const kanji = await service.getKanjiById(req.params.id);
            res.json(kanji);
        } catch (err) {
            next(err);
        }  
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    joiValidator(KanjiCreateJoi, 'body'),
    async (req, res, next) => {
        try{
            const kanji = await service.createKanji(req.body);
            res.json(kanji);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/push/:id', 
    passport.authenticate('jwt', { session: false }),
    joiValidator(IdJoi, 'params'),
    joiValidator(PropsJoi, 'body'),
    async (req, res, next) => {
        try{
            const kanji = await sharedService.pushProp(kanjiModel, req.params.id, req.body.prop, req.body.values);
            res.json(kanji);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/pull/:id', 
    passport.authenticate('jwt', { session: false }),
    joiValidator(IdJoi, 'params'),
    joiValidator(PropsJoi, 'body'),
    async (req, res, next) => {
        try{
            const kanji = await sharedService.pullProp(kanjiModel, req.params.id, req.body.prop, req.body.values);
            res.json(kanji);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    joiValidator(IdJoi, 'params'),
    joiValidator(KanjiUpdateJoi, 'body'),
    async (req, res, next) => {
        try{
            const kanji = await service.updateKanji(req.params.id, req.body);
            res.json(kanji);
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    joiValidator(IdJoi, 'params'),
    async (req, res, next) => {
        try{
            const kanji = await service.deleteKanji(req.params.id);
            res.json((kanji) ? true : false);
        } catch (err) {
            next(err);
        }
    }
);

export default router;