import UserModel from '../models/UserModel';

class UserController {

  async create(req, res) {
    const data = req.body;
    const newUser =  await UserModel.create(data);

    res.status(201).json({name:newUser.name,email:newUser.email,role:newUser.role});

  }

  async read(req, res) {
    const users = await UserModel.findAll({attributes: ['id', 'name', 'email', 'role']});


    res.status(200).json(users);
  }

  async readOne(req, res){
    const {id} = req.params;
    const user = await UserModel.findByPk(id, {attributes: ['id', 'name', 'email', 'role']});

    res.status(200).json(user)
  }
  
  async update (req, res){
    const {id} = req.params;
    const user = req.body;
    await UserModel.update(user, {where: {id}});

    res.status(200).json({name:user.name,email:user.email,role:user.role});
  }

  async delete(req, res){
    const { id } = req.params;

    await UserModel.destroy({ where: { id }});

    res.status(200)
  }
}


export default new UserController();