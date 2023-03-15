import express, { Express, Request, Response } from 'express';
// import dotenv from 'dotenv';
import { router } from './router.js';

// dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

router(app);                                                     // Router is one of the last things to be called, only before error handling

app.listen(3000, () => {
    console.log('Server started on port 3000');
});