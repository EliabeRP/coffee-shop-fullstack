import { Model, DataTypes } from 'sequelize';

export default class ViewModel extends Model {
  static init(sequelize) {
    super.init({
      pedido_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      valor_final: DataTypes.DECIMAL(10, 2),
      payment_method: DataTypes.STRING,
      status: DataTypes.STRING,
      created_at: DataTypes.DATE,
      usuario_id: DataTypes.INTEGER,
      cliente_nome: DataTypes.STRING,
      cliente_email: DataTypes.STRING,
      is_flamengo: DataTypes.BOOLEAN,
      assiste_one_piece: DataTypes.BOOLEAN,
    }, {
      sequelize,
      tableName: 'v_pedidos_com_desconto',
      timestamps: false,
      underscored: true,
    });

    return this;
  }
}