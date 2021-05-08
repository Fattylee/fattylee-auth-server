import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import { startConnection } from "./config/database.js";
import { authRouter } from "./auth/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app = express();
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "successful" });
});

startConnection(app);
