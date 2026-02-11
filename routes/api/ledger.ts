import { Router } from "express";
import { getExpenses } from "../../controllers/ledgers/ledgerController";

const router = Router();

router.get("/expenses", getExpenses);

export default router;
