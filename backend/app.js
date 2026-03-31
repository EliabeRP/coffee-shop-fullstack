import express from 'express';
import cors from 'cors';
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
    this.app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/login', Login);
    this.app.use('/user', userRoutes);
    this.app.use('/product', productRoutes);
    this.app.use('/order', orderRoutes);
  }
}

export default new App().app;