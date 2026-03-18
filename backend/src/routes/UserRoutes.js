import { Router } from 'express';
import UserController from '../controllers/UserController'
import auth from '../middlewares/AuthMiddleware';

const router = new Router();

router.get('/user',  auth.authAdmin, UserController.read);

router.get('/user/:id', auth.authClient, UserController.readOne);

router.post('/user', UserController.create);

router.put('/user/:id', auth.authClient, UserController.update);

router.delete('/user/:id',auth.authAdmin, UserController.delete);

export default router;