import { Router } from 'express';
import UserController from '../controllers/UserController'
import User from '../models/UserModel';

const router = new Router();

router.get('/user', UserController.read);

router.get('/user/:id',UserController.readOne);

router.post('/user', UserController.create);

router.put('/user/:id', UserController.update);

router.delete('/user/:id', UserController.delete);

export default router;