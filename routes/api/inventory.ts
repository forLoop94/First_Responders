import { Router } from "express";
import { getInventories } from "../../controllers/inventories/inventoryController";

const router = Router();

router.get("/", getInventories);

export default router;
