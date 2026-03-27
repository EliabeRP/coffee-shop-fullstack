import OrderModel from '../models/OrderModel';

class OrderController {
  
  async create (req, res) {
    try{
      const data = req.body;
      const userId = req.user.id;
      if (data.id_user != userId) return res.status(403).json({ message: 'Você não possui a permissão para criar pedidos para outros usuários.' });
      const totalPrice = data.products.reduce((total, item) => total + (item.price * item.quantidade), 0);
      data.total_price = totalPrice;
      await OrderModel.create(data);
      res.status(201).json({message: 'Pedido criado com sucesso.'});
    }catch(err){
      return res.status(400).json({errors:err.errors.map(er=>er.message)});
    }
  }

  async read(req, res) {
    const products = await OrderModel.findAll({attributes: ['id', 'id_user', 'products', 'total_price']});
    res.status(200).json(products);
  }
  
  async readOne(req, res){
    const {id} = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;
    const product = await OrderModel.findByPk(id, {attributes: ['id', 'id_user', 'products', 'total_price']});
    if (product.id_user != userId && userRole != 'admin') return res.status(403).json({ message: 'Você não possui a permissão para acessar informações de outros usuários.' });
    if(!product){
      return res.status(400).json({message: "Pedido não existe."});
    }
    return res.status(200).json(product)
  }
    
    async update (req, res){
      try {
          const {id} = req.params;
          const orderAtt = req.body;
          const userId = req.user.id;
          const userRole = req.user.role;
          const order = await OrderModel.findByPk(id);
          if (order.id_user != userId && userRole != 'admin') return res.status(403).json({ message: 'Você não possui a permissão para alterar informações de outros usuários.' });
  
          if (!order) return res.status(400).json({message: 'Pedido não existe'});
        
          await OrderModel.update(orderAtt, {where: {id}});
  
          res.status(200).json({message: 'Pedido atualizado com sucesso.'});
        }
      catch(err){
          res.status(400).json({errors:err.errors.map(er=>er.message)})
      }
    }
  
    async delete(req, res){
      const { id } = req.params;
  
      await OrderModel.destroy({ where: { id }});
  
      res.status(200).json({message: 'Pedido deletado com sucesso.'})
    }

}

export default new OrderController();