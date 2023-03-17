import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router } from './router.js';
import { connect } from './db.js';
import { logError, boomErrorHandler, errorHandler } from './middlewares/error.handlers.js';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
await connect(process.env.DB_URI);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

router(app);                                                     // Router is one of the last things to be called, only before error handling

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server started on port ' + port);
});