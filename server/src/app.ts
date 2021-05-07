import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';

import errorHandler from './middleware/errorHandler';
import HttpResponder from './utils/HttpResponder';
import routes from './routes';
import AppSecrets from './utils/secrets';

dotenv.config();

const app: Express = express();

const { PORT } = AppSecrets;

app.set('port', PORT);

app.use(cors());

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.get('/', (req: Request, res: Response) => {
  return new HttpResponder(res).success(200, 'Welcome to Auftrag API!');
});

app.use(errorHandler);

app.all('*', (req: Request, res: Response) => {
  return new HttpResponder(res).fail(404, 'Route not found!');
});

export default app;
