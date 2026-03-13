import UserModel from '../models/UserModel';

let Users = [
  {
    'nome': 'eliabe',
    'idade': 22,
    'curso': 'eng comp',
  },

  {
    'nome' : 'igor',
    'idade' : 21,
    'curso' : 'eng comp',
  },
  
  {
    'nome': 'nome3',
    'idade': 40,
    'curso': 'ciencia comp',
  },
  
  {
    'nome' : 'juninho',
    'idade' : 43,
    'curso' : 'medicina',
  }
]


class UserController {

  async create(req, res) {
    const data = req.body;
    const newUser =  await UserModel.create(data);

    res.status(201).json({name:newUser.name,age:newUser.age,email:newUser.email,role:newUser.role});

  }

  async read(req, res) {
    const users = await UserModel.findAll({attributes: ['name' ,'age', 'email', 'role']});


    res.status(200).json(users);
  }
  
  update () {
    
  }
  delete(){
    
  }
}


export default new UserController();