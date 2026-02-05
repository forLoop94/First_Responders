import { Router } from "express";
import {
  processPayment,
  verifyPayment,
} from "../../controllers/payments/paymentController";

const router = Router();

router.post("/", processPayment);
router.patch("/verify-payment", verifyPayment);

export default router;
