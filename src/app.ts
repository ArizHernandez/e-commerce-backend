import express, { Application, Request, Response } from 'express';
import logger from 'morgan';
import { connect } from 'mongoose';
import 'dotenv/config';

import ErrorsHandler from 'middlewares/ErrorsHandler';
import authRouter from 'routes/auth';

const PORT: string = process.env.PORT || '8080';
const DB_URI: string =
  process.env.DB_URI || 'mongodb://localhost:27017/e-commerce-ar';

class App {
  private server: Application = express();
  private authRoute = '/auth';

  constructor() {
    this.middlewares();
  }

  middlewares() {
    this.server.use(logger('dev'));
    this.server.use(express.json());
    this.server.use(this.authRoute, authRouter);
    this.server.use(ErrorsHandler)
  }

  async start() {
    try {
      await connect(DB_URI);
      this.server.listen(PORT, () => {
        console.log('Server is running on port: ' + PORT);
      });
    } catch (error) {}
  }
}

const app = new App();
app.start();
