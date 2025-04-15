import { Router } from "express";
import { getUsers } from "../../controllers/user/userController";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { authorizeRoles } from "../../middlewares/authorizeRoles";

const router = Router();

router.get("/", authenticateToken, authorizeRoles("DOCTOR"), getUsers);

export default router;
