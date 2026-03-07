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

  create() {
    
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