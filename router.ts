import express from 'express';
import { router as annotationsRouter } from './components/annotations/controller';
import { router as kanjiRouter } from './components/kanji/controller';
import { router as loginRouter } from './components/login/controller';

export const router = (app: express.Application) => {
    app.use('/annotations', annotationsRouter);
    app.use('/kanji', kanjiRouter);
    app.use('/login', loginRouter);
};