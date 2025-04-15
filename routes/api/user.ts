import { Router } from "express";
import { getUsers } from "../../controllers/user/userController";
import { authenticateToken } from "../../middlewares/authenticateToken";

const router = Router();

router.get("/", authenticateToken, getUsers);

export default router;
