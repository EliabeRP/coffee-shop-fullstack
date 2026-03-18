import { Router } from 'express';
import Login from '../controllers/index';

const router = new Router();

router.post('/login', Login.index);

export default router;