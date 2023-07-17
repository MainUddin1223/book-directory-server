import { ErrorRequestHandler } from 'express';
import config from '../config';
// import ApiError from './apiError';
// import handleZodError from './handleZodError';

type IGenericMessages = {
  path: string | number;
  message: string;
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = 500;
  const message = 'Something went wrong';
  const errorMessages: IGenericMessages[] = err?.message
    ? [
        {
          path: '',
          message: err?.message,
        },
      ]
    : [];
  console.log('--------------error---------------', err);
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
