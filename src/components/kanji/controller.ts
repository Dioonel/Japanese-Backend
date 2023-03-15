import { Router } from 'express';

import { KanjiService } from './service.js';

const router = Router();
const service = new KanjiService();

router.get('/', async (req, res) => {
    try{
        const kanji = await service.getKanji();
        res.json(kanji);
    } catch (err) {
        res.status(400).json({ error: true });
    }
});

export default router;