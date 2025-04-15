import { Router } from "express";
import { loginUser, registerUser } from "../../controllers/auth/authController";
import { verifyUser } from "../../controllers/auth/emailVerificationController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify/:userId/:uniqueString", verifyUser);

export default router;
