import express from 'express';
import userRoutes from './src/routes/UserRoutes';
import Login from './src/routes/index';
import database from './src/database';
import dotenv from 'dotenv';
dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(Login);
    this.app.use(userRoutes);
  }
}

export default new App().app;