import OrderController from "../controllers/OrderController";
import { Router } from "express";
import auth from "../middlewares/AuthMiddleware";

const router = Router();

router.get('/', auth.authAdmin, OrderController.read);
router.get('/discount-report', auth.authAdmin, OrderController.discountReport);
router.get('/my-orders', auth.authClient, OrderController.readByUser);
router.get('/:id', auth.authClient, OrderController.readOne);
router.post('/', auth.authClient, OrderController.create);
router.put('/:id', auth.authClient, OrderController.update);
router.patch('/:id/status', auth.authAdmin, OrderController.updateStatus);
router.delete('/:id', auth.authClient, OrderController.delete);

export default router;