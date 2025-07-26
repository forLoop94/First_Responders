import { Router } from "express";
import {
  getpatients,
  updatePatients,
} from "../../controllers/patients/patientsController";

const router = Router();

router.get("/", getpatients);
router.put("/:id", updatePatients);

export default router;
