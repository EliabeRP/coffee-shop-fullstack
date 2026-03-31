import Sequelize, { Model, DataTypes } from 'sequelize';

export default class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        id_user: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        products: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: [],
          comment: 'Array de objetos com {id, quantidade}',
        },

        total_price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },

        status: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
        },

      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user',
    });
  }
}

