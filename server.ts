import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { useCors } from "./utils/cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(useCors()));

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
