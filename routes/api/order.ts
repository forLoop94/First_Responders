import { Router } from "express";
import {
  createOrder,
  updateOrder,
} from "../../controllers/orders/orderController";

const router = Router();

router.post("/", createOrder);
router.patch("/:id", updateOrder);

export default router;
