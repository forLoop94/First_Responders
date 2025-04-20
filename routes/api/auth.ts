import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  tokenRefresh,
} from "../../controllers/auth/authController";
import { verifyUser } from "../../controllers/auth/emailVerificationController";
import { authenticateToken } from "../../middlewares/authenticateToken";
import {
  forgotPassword,
  resetPassword,
} from "../../controllers/auth/passwordResetController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", tokenRefresh);
router.post("/logout", authenticateToken, logoutUser);
router.get("/verify/:userId/:uniqueString", verifyUser);
router.get("/forgotPassword/:email", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;
