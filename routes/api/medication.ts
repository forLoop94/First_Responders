import { Router } from "express";
import { getMedications } from "../../controllers/medications/medicationsController";

const router = Router();

router.get("/", getMedications);

export default router;
