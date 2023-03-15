import { Application } from 'express';

import kanjiRouter from './components/kanji/controller.js';

export const router = (app: Application) => {
    app.use('/kanji', kanjiRouter);
};