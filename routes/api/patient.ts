import { Router } from "express";
import { getpatients } from "../../controllers/patient/patientsController";

const router = Router();

router.get("/", getpatients);

export default router;
