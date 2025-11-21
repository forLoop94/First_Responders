import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { useCors } from "./utils/cors";
import userRouter from "./routes/api/user";
import authRouter from "./routes/api/auth";
import doctorRouter from "./routes/api/doctor";
import patientRouter from "./routes/api/patient";
import appointmentRouter from "./routes/api/appointment";
import medicationRouter from "./routes/api/medication";
import invoicesRouter from "./routes/api/invoice";
import expensesRouter from "./routes/api/expense";
import prescriptionsRouter from "./routes/api/prescription";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();

// Static files middleware
const clientPath = path.resolve(__dirname, "./client/dist");
app.use(express.static(clientPath));

app.use(express.json());
app.use(cookieParser());
app.use(cors(useCors()));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Configure Express to trust the proxy
app.set("trust proxy", true);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/patients", patientRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/medications", medicationRouter);
app.use("/api/invoices", invoicesRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/prescriptions", prescriptionsRouter);

// Handle 404 - Not Found
app.use((req, res) => {
  res.status(404).json({ msg: "Resources not found" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
