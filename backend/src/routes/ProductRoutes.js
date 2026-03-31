import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import auth from '../middlewares/AuthMiddleware';

const router = new Router();

router.get('/', ProductController.read);

router.get('/:id', ProductController.readOne);

router.post('/', auth.authAdmin, ProductController.create);

router.put('/:id', auth.authAdmin, ProductController.update);

router.delete('/:id',auth.authAdmin, ProductController.delete);

export default router;