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

// Static files middleware - handle both development and production
let clientPath: string;

if (process.env.NODE_ENV === "production") {
  // In production: client is built to 'client/dist' relative to project root
  clientPath = path.join(__dirname, "../client/dist");
} else {
  // In development: client is in 'client/dist' relative to project root
  clientPath = path.join(process.cwd(), "client/dist");
}

console.log("Client path:", clientPath); // Debug log

app.use(express.static(clientPath));

app.use(express.json());
app.use(cookieParser());
app.use(cors(useCors()));

// Serve React app for all non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Configure Express to trust the proxy
app.set("trust proxy", true);

// API routes
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
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
