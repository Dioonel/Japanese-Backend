import { Application } from 'express';

import kanjiRouter from './components/kanji/controller.js';
import wordsRouter from './components/words/controller.js';
import authRouter from './components/auth/controller.js';

export const router = (app: Application) => {
    app.use('/kanji', kanjiRouter);
    app.use('/words', wordsRouter);
    app.use('/auth', authRouter);
};