import { Router } from "express";
import {
  getCurrentUser,
  getUser,
  getUsers,
  userImageUpload,
} from "../../controllers/user/userController";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { authorizeRoles } from "../../middlewares/authorizeRoles";
import upload from "../../middlewares/multer";

const router = Router();

router.get("/", authenticateToken, getUsers);
router.get("/currentUser", authenticateToken, getCurrentUser);
router.get("/:id", getUser);
router.post("/image_upload", upload.single("image"), userImageUpload);

export default router;
