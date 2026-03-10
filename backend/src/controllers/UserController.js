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

    res.status(201).json(newUser);

  }

  read(req, res) {
    res.status(200).json(Users);
  }
  
  update () {
    
  }
  delete(){
    
  }
}


export default new UserController();