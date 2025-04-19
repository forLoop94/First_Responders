import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/auth/authController";
import { verifyUser } from "../../controllers/auth/emailVerificationController";
import { authenticateToken } from "../../middlewares/authenticateToken";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticateToken, logoutUser);
router.get("/verify/:userId/:uniqueString", verifyUser);

export default router;
