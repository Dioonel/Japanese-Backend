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

export default router;