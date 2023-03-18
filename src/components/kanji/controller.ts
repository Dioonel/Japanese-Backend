import { Router } from 'express';

import { KanjiService } from './service.js';
import { joiValidator } from './../../middlewares/joi.validator.js';
import { KanjiJoi, KanjiCreateJoi, KanjiUpdateJoi, IdJoi, PropsJoi, KanjiFilterJoi } from './kanji.js';

const router = Router();
const service = new KanjiService();

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
    joiValidator(IdJoi, 'params'),
    joiValidator(PropsJoi, 'body'),
    async (req, res, next) => {
        try{
            const kanji = await service.pushProp(req.params.id, req.body);
            res.json(kanji);
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
            const kanji = await service.pullProp(req.params.id, req.body);
            res.json(kanji);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/:id',
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