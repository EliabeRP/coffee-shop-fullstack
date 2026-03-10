import Sequelize, { Model } from 'sequelize';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      age: Sequelize.INTEGER,
      role: Sequelize.STRING,
    }, 
      { sequelize }
    );
    return this;
  }
}
