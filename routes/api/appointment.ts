import { Router } from "express";
import { getAppointments } from "../../controllers/appointments/appointmentsController";

const router = Router();

router.get("/", getAppointments);

export default router;
