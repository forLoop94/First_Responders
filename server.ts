import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { useCors } from "./utils/cors";
import userRouter from "./routes/api/user";
import authRouter from "./routes/api/auth";
import doctorRouter from "./routes/api/doctor";
import patientRouter from "./routes/api/patient";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(useCors()));

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/patients", patientRouter);
