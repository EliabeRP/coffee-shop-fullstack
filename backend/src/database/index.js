import  Sequelize from 'sequelize';
import config from  '../config/database';
import UserModel from '../models/UserModel';
import ProductModel from '../models/ProductModel';

const models = [UserModel, ProductModel];

const connection = new Sequelize(config);

models.forEach(model => model.init(connection));
