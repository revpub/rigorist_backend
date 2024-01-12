import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './api';
import auth from './api/auth/auth.routes';
import MessageResponse from './interfaces/MessageResponse';
import dotenv from "dotenv";
dotenv.config({ path: './.env' });

console.log('process.env.MONGO_HOST', process.env.MONGO_HOST);

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);
app.use('/auth', auth);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
