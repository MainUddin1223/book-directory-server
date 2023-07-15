import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import globalErrorHandler from './errorHandler/globalErrorHandler';
import route from './routes/index';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(config.api_route as string, route);

app.use(globalErrorHandler);

app.get('/', (req, res) => {
  res.status(200).json('server is running');
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});
export default app;
