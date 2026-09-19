import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import { errors } from 'celebrate';

import { env } from './utils/env.js';
import { initMongoDB } from './db/initMongoDB.js';
import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(pino());
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

 
  app.use(authRouter);
  app.use(notesRouter);

  
  app.use(errors());

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(env('PORT', 3000));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};


const startApp = async () => {
  await initMongoDB();
  setupServer();
};

startApp();