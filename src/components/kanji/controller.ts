import { Router } from 'express';

import { KanjiService } from './service.js';

const router = Router();
const service = new KanjiService();

router.get('/', async (req, res) => {
    try{
        const kanji = await service.getKanji();
        res.json(kanji);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.get('/:id', async (req, res) => {
    try{
        const kanji = await service.getKanjiById(req.params.id);
        res.json(kanji);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.post('/', async (req, res) => {
    try{
        const kanji = await service.createKanji(req.body);
        res.json(kanji);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.patch('/:id', async (req, res) => {
    try{
        const kanji = await service.updateKanji(req.params.id, req.body);
        res.json(kanji);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const kanji = await service.deleteKanji(req.params.id);
        res.json((kanji) ? true : false);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

export default router;