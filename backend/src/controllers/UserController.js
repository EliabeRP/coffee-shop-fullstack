import UserModel from '../models/UserModel';

class UserController {

  async create(req, res) {
    try{
      const data = req.body;
      const newUser =  await UserModel.create(data);
      res.status(201).json({name:newUser.name,email:newUser.email,role:newUser.role});
    }catch(err){
      if( err.name === 'SequelizeUniqueConstraintError'){
        return res.status(409).json({
          errors:['Email já cadastrado'],
        });
      }
      res.status(400).json({errors:err.errors.map(er=>er.message)});
    }
  }

  async read(req, res) {
    const users = await UserModel.findAll({attributes: ['id', 'name', 'email', 'role']});
    res.status(200).json(users);
  }

  async readOne(req, res){
    
    const {id} = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;
    if (id != userId && userRole != 'admin') return res.status(403).json({ message: 'Você não possui a permissão para acessar informações de outros usuários.' })
    const user = await UserModel.findByPk(id, {attributes: ['id', 'name', 'email', 'role']});
    if(!user){
      return res.status(400).json({message: "Usuário não existe."});
    }
    return res.status(200).json(user)
  }
  
  async update (req, res){
    try {
      const {id} = req.params;
      const user = req.body;
      const userId = req.user.id;
      const userRole = req.user.role;
      if (id != userId && userRole != 'admin') return res.status(403).json({ message: 'Você não possui a permissão para alterar informações de outros usuários.' })
        await UserModel.update(user, {where: {id}});
        res.status(200).json({name:user.name,email:user.email,role:user.role});
      }
    catch(err){
      res.status(400).json({errors:err.errors.map(er=>er.message)})
    }
  }

  async delete(req, res){
    const { id } = req.params;

    await UserModel.destroy({ where: { id }});

    res.status(200)
  }
}


export default new UserController();