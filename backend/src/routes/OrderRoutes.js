import OrderController from "../controllers/OrderController";
import { Router } from "express";
import auth from "../middlewares/AuthMiddleware";

const router = Router();

router.post('/order', auth.authClient, OrderController.create);
router.get('/order', auth.authAdmin, OrderController.read);
router.get('/order/:id', auth.authClient, OrderController.readOne);
router.put('/order/:id', auth.authClient, OrderController.update);
router.delete('/order/:id', auth.authClient, OrderController.delete);

export default router;