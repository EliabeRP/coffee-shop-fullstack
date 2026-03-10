import { Router } from 'express';
import UserController from '../controllers/UserController'

const router = new Router();

router.post('/user', UserController.create);

export default router;