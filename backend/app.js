import express from 'express';
import userRoutes from './src/routes/UserRoutes';
import Login from './src/routes/index';
import database from './src/database';
import dotenv from 'dotenv';
import productRoutes from './src/routes/ProductRoutes';
import orderRoutes from './src/routes/OrderRoutes';
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
    this.app.use(productRoutes);
    this.app.use(orderRoutes);
  }
}

export default new App().app;