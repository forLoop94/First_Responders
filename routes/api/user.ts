import { Router } from "express";
import {
  getCurrentUser,
  getUser,
  getUsers,
} from "../../controllers/user/userController";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { authorizeRoles } from "../../middlewares/authorizeRoles";

const router = Router();

router.get("/", authenticateToken, authorizeRoles("DOCTOR"), getUsers);
router.get("/:id", getUser);
router.get("/currentUser", authenticateToken, getCurrentUser);

export default router;
