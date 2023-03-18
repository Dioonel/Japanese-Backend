import { Application } from 'express';

import kanjiRouter from './components/kanji/controller.js';
import wordsRouter from './components/words/controller.js';

export const router = (app: Application) => {
    app.use('/kanji', kanjiRouter);
    app.use('/words', wordsRouter);
};