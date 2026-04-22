import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    status: 500,
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
};
