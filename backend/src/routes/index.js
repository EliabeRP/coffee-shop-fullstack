import { Router } from 'express';
import Login from '../controllers/index';

const router = new Router();

router.post('/', Login.index);

export default router;