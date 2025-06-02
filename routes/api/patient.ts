import { Router } from "express";
import { getpatients } from "../../controllers/patients/patientsController";

const router = Router();

router.get("/", getpatients);

export default router;
