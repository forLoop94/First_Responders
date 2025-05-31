import { Router } from "express";
import { getDoctors } from "../../controllers/doctor/doctorsController";

const router = Router();

router.get("/", getDoctors);

export default router;
