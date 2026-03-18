import Sequelize, { Model, DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
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
      email: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          isEmail:{
            msg: 'Utilize um email válido.',
          }
        }
      },

      password_hash: DataTypes.STRING,

      password: {
        type: DataTypes.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 60],
            msg: 'Senha deve possuir entre 8 e 60 caracteres.'
          }
        }
      },

      role: {
        type: DataTypes.ENUM('admin', 'client'),
        defaultValue: 'client',
        validate: {
          isIn: {
            args: [['admin', 'client']],
            msg: 'Role precisa ser admin ou client.',
          }
        }
      }
    }, 
      { sequelize }
    );

    this.addHook('beforeSave', async (user)  => {
      user.password_hash = await bcryptjs.hash(user.password, 10);
    })
    return this;
  }
}
