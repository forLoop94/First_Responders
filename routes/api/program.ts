import { Router } from "express";
import { getPrograms } from "../../controllers/programs/programController";

const router = Router();

router.get("/", getPrograms);

export default router;
