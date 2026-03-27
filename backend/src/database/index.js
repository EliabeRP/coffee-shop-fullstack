import  Sequelize from 'sequelize';
import config from  '../config/database';
import UserModel from '../models/UserModel';
import ProductModel from '../models/ProductModel';
import OrderModel from '../models/OrderModel';

const models = [UserModel, ProductModel, OrderModel];

const connection = new Sequelize(config);

models.forEach(model => model.init(connection));
