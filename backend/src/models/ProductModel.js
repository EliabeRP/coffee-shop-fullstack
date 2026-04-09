import Sequelize, { Model, DataTypes } from 'sequelize';

export default class Product extends Model {
  static init(sequelize) {
    super.init({
        name: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
            len:{
            args: [3, 255],
            msg: 'Nome deve possuir entre 3 e 255 caracteres.',
            }
        }
        },

        price: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
            validate: {
                isFloat: {
                    msg: 'Preço deve ser um número decimal.',
                },
                min: {
                    args: [0],
                    msg: 'Preço não pode ser negativo.',
                }
            }
        },

        description: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    len:{
                        args: [3, 255],
                        msg: 'Descrição deve possuir entre 3 e 255 caracteres.',
                    }
                }
            },

        quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: {
                msg: 'Quantidade deve ser um número inteiro.',
            },
            min: {
                args: [0],
                msg: 'Quantidade não pode ser negativa.',
            }
        }
        },

        image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },

        origin: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Mari',
        },
        
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Arábica',
        },

    }, 
      { sequelize }
    );

   
    return this;
  }
}
