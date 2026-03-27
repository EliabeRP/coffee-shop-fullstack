import { Router } from 'express';
import ProductController from '../controllers/ProductController'
import auth from '../middlewares/AuthMiddleware';

const router = new Router();

router.get('/product', ProductController.read);

router.get('/product/:id', ProductController.readOne);

router.post('/product', auth.authAdmin, ProductController.create);

router.put('/product/:id', auth.authAdmin, ProductController.update);

router.delete('/product/:id',auth.authAdmin, ProductController.delete);

export default router;