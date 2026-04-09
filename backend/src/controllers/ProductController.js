import ProductModel from '../models/ProductModel';

class ProductController {

  async create(req, res) {
    try{
      const data = req.body;
      const newProduct =  await ProductModel.create(data);
      res.status(201).json({id: newProduct.id, name:newProduct.name, price:newProduct.price, description:newProduct.description, quantity:newProduct.quantity, image: newProduct.image});
    }catch(err){
      res.status(400).json({errors:err.errors.map(er=>er.message)});
    }
  }

  async read(req, res) {
    const products = await ProductModel.findAll({attributes: ['id', 'name', 'price', 'description', 'quantity', 'image', 'category', 'origin']});
    res.status(200).json(products);
  }

  async readOne(req, res){
    
    const {id} = req.params;
    const product = await ProductModel.findByPk(id, {attributes: [ 'name', 'price', 'description', 'quantity', 'image',  'category', 'origin']});
    if(!product){
      return res.status(400).json({message: "Produto não existe."});
    }
    return res.status(200).json(product)
  }
  
  async update (req, res){
    try {
        const {id} = req.params;
        const productAtt = req.body;
        const product = await ProductModel.findByPk(id);

        if (!product) return res.status(400).json({message: 'Produto não existe'});
      
        await ProductModel.update(productAtt, {where: {id}});

        res.status(200).json({id: id, name:productAtt.name, price:productAtt.price, description:productAtt.description, quantity:productAtt.quantity, image: productAtt.image});
      }
    catch(err){
        res.status(400).json({errors:err.errors.map(er=>er.message)})
    }
  }

  async delete(req, res){
    const { id } = req.params;

    await ProductModel.destroy({ where: { id }});

    res.status(200).json({message: 'Produto deletado com sucesso.'})
  }

}


export default new ProductController();