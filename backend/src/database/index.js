import  Sequelize from 'sequelize';
import config from  '../config/database';
import UserModel from '../models/UserModel';

const models = [UserModel];

const connection = new Sequelize(config);

models.forEach(model => model.init(connection));
