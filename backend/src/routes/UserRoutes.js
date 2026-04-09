import { Router } from 'express';
import UserController from '../controllers/UserController'
import auth from '../middlewares/AuthMiddleware';

const router = new Router();

router.get('/',  auth.authAdmin, UserController.read);

router.get('/:id', auth.authClient, UserController.readOne);

router.post('/', UserController.create);

router.put('/:id', auth.authClient, UserController.update);

router.delete('/:id',auth.authAdmin, UserController.delete);

export default router;