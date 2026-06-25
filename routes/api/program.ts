import { Router } from "express";
import {
  createProgram,
  deleteProgram,
  getPrograms,
  updateProgram,
} from "../../controllers/programs/programController";

const router = Router();

router.get("/", getPrograms);
router.post("/", createProgram);
router.patch("/:id", updateProgram);
router.delete("/:id", deleteProgram);

export default router;
