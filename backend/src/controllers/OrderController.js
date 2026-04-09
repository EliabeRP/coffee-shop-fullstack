import OrderModel from '../models/OrderModel';
import ProductModel from '../models/ProductModel';
import UserModel from '../models/UserModel';
import ViewModel from '../models/ViewModel';
const { QueryTypes } = require('sequelize');

class OrderController {

  async create(req, res) {
  try {
    const data = req.body;
    const userId = req.user.id;

    if (data.id_user != userId) {
      return res.status(403).json({ message: 'Permissão negada.' });
    }

    const productIds = data.products.map(p => p.id);
    const products = await ProductModel.findAll({
      where: { id: productIds },
      attributes: ['id', 'price']
    });

    if (products.length !== data.products.length) {
      return res.status(404).json({ message: 'Produtos não encontrados.' });
    }

    let totalPrice = data.products.reduce((total, item) => {
      const product = products.find(p => String(p.id) === String(item.id));
      return product ? total + (parseFloat(product.price) * parseInt(item.quantidade)) : total;
    }, 0);

    data.total_price = totalPrice;

    const newOrder = await OrderModel.create(data);

    const user = await UserModel.findByPk(userId);
    
    const mereceDesconto = 
      user.is_flamengo === true || 
      user.assiste_one_piece === true || 
      (user.name.toLowerCase().includes('sousa'));

    let aplicado = false;
    if (mereceDesconto) {
      const desconto = 10;
      
      await OrderModel.sequelize.query(
        "CALL sp_aplicar_desconto_perfil(:orderId, :perc)",
        {
          replacements: { orderId: newOrder.id, perc: desconto },
          type: QueryTypes.RAW
        }
      );
      
      aplicado = true;
      totalPrice = totalPrice * (1 - desconto / 100);
    }

    res.status(201).json({
      message: aplicado ? 'Pedido criado com desconto especial!' : 'Pedido criado com sucesso.',
      total_final: totalPrice.toFixed(2),
      desconto_aplicado: aplicado
    });

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Erro ao processar pedido.' });
  }
}

  async read(req, res) {
    const products = await OrderModel.findAll({ attributes: ['id', 'id_user', 'products', 'total_price', 'payment_method', 'status'] });
    res.status(200).json(products);
  }

  async readByUser(req, res) {
    const userId = req.user.id;

    const orders = await OrderModel.findAll({
      where: { id_user: userId },
      attributes: ['id', 'id_user', 'products', 'status', 'total_price', 'created_at'],
      order: [['created_at', 'DESC']],
    });

    return res.status(200).json(orders);
  }

  async readOne(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;
    const order = await OrderModel.findByPk(id, { attributes: ['id', 'id_user', 'products', 'total_price', 'payment_method', 'status'] });
    if (!order) {
      return res.status(400).json({ message: "Pedido não existe." });
    }
    if (order.id_user != userId && userRole != 'admin') return res.status(403).json({ message: 'Você não possui a permissão para acessar informações de outros usuários.' });
    return res.status(200).json(order)
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const orderAtt = req.body;
      const userId = req.user.id;

      if (orderAtt.id_user != userId) return res.status(403).json({ message: 'Você não possui permissão para transferir pedidos para outros usuários.' });

      const order = await OrderModel.findByPk(id);
      if (!order) return res.status(400).json({ message: 'Pedido não existe' });

      if (order.id_user != userId) return res.status(403).json({ message: 'Você não possui a permissão para alterar informações de outros usuários.' });

      const productIds = orderAtt.products.map(p => p.id);

      const products = await ProductModel.findAll({
        where: { id: productIds },
        attributes: ['id', 'price']
      });

      if (products.length !== orderAtt.products.length) {
        const foundIds = products.map(p => String(p.id));
        const missingIds = orderAtt.products
          .filter(item => !foundIds.includes(String(item.id)))
          .map(item => item.id);

        return res.status(404).json({
          message: 'Alguns produtos não foram encontrados.',
          ids_invalidos: missingIds
        });
      }

      const totalPrice = orderAtt.products.reduce((total, item) => {
        const product = products.find(p => String(p.id) === String(item.id));

        if (product) {
          const price = parseFloat(product.price);
          const qtd = parseInt(item.quantidade);

          return total + (price * qtd);
        }

        return total;
      }, 0);

      orderAtt.total_price = totalPrice;

      await OrderModel.update(orderAtt, { where: { id } });

      res.status(200).json({ message: 'Pedido atualizado com sucesso.' });
    }
    catch (err) {
      res.status(400).json({ errors: err.errors.map(er => er.message) });
    }
  }

  async updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await OrderModel.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });

    await order.update({ status });

    console.log(order.status);

    return res.status(200).json({ message: 'Status atualizado com sucesso!', order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno ao atualizar status.' });
  }
}

  async discountReport(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          message: 'Acesso negado. Apenas administradores podem ver este relatório.' 
        });
      }

      const report = await ViewModel.findAll({
        order: [['created_at', 'DESC']],
      });

      return res.json(report);
    } catch (err) {
      console.error('Erro na View:', err);
      return res.status(500).json({ 
        message: 'Erro interno ao carregar o relatório de descontos.' 
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const userId = req.user.id;
    const userRole = req.user.role;

    const order = await OrderModel.findByPk(id);
    if (!order) return res.status(400).json({ message: 'Pedido não existe.' });

    if (order.id_user != userId && userRole != 'admin') return res.status(403).json({ message: 'Você não possui permissão para deletar pedidos para outros usuários.' });

    await OrderModel.destroy({ where: { id } });

    res.status(200).json({ message: 'Pedido deletado com sucesso.' })
  }

}

export default new OrderController();