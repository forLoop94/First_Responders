import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { useCors } from "./utils/cors";
import userRouter from "./routes/api/user";
import authRouter from "./routes/api/auth";
import doctorRouter from "./routes/api/doctor";
import patientRouter from "./routes/api/patient";
import paymentRouter from "./routes/api/payment";
import ledgerRouter from "./routes/api/ledger";
import inventoryRouter from "./routes/api/inventory";
import programRouter from "./routes/api/program";
import ordersRouter from "./routes/api/order";
import prescriptionsRouter from "./routes/api/prescription";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const prisma = new PrismaClient();
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
app.use("/api/payments", paymentRouter);
app.use("/api/finance", ledgerRouter);
app.use("/api/inventories", inventoryRouter);
app.use("/api/programs", programRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/prescriptions", prescriptionsRouter);

// Handle 404 - Not Found
app.use((req, res) => {
  res.status(404).json({ msg: "Resources not found" });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  await prisma.$disconnect();
  server.close(() => {
    process.exit(0);
  });
});
