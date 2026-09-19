import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pino from 'http-logger';
import { env } from './utils/env.js';
import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());


  app.use('/auth', authRouter);

  // Роути нотаток
  app.use('/notes', notesRouter);


  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(env('PORT', 3000));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};