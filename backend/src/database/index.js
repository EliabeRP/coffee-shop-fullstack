import  Sequelize from 'sequelize';
import config from  '../config/database';
import UserModel from '../models/UserModel';
import ProductModel from '../models/ProductModel';
import OrderModel from '../models/OrderModel';
import ViewModel from '../models/ViewModel';

const models = [UserModel, ProductModel, OrderModel, ViewModel];

const connection = new Sequelize(config);

models.forEach(model => model.init(connection));
