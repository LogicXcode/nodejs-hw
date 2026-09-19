import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { env } from './utils/env.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';

export const setupServer = () => {
  const app = express();

  app.use(logger);
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(authRouter);
  app.use(notesRouter);
  app.use(userRouter); 

  app.use(errors());

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(env('PORT', 3000));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const startApp = async () => {
  await connectMongoDB();
  setupServer();
};

startApp();