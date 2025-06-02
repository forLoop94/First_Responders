import { Router } from "express";
import { getPrescriptions } from "../../controllers/prescriptions/prescriptionsController";

const router = Router();

router.get("/", getPrescriptions);

export default router;
