import { Router } from 'express';

import { KanjiService } from './service.js';

const router = Router();
const service = new KanjiService();

router.get('/', async (req, res, next) => {
    try{
        const kanji = await service.getKanji();
        res.json(kanji);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try{
        const kanji = await service.getKanjiById(req.params.id);
        res.json(kanji);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try{
        const kanji = await service.createKanji(req.body);
        res.json(kanji);
    } catch (err) {
        next(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    try{
        const kanji = await service.updateKanji(req.params.id, req.body);
        res.json(kanji);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try{
        const kanji = await service.deleteKanji(req.params.id);
        res.json((kanji) ? true : false);
    } catch (err) {
        next(err);
    }
});

export default router;