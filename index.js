import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import { startConnection } from "./config/database.js";
import { authRouter } from "./auth/auth.route.js";

config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "successful" });
});

startConnection(app);
