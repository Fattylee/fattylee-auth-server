import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import { authRouter } from "./routes/auth.js";
import { connection } from "./confing/startDB.js";

config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "successful" });
});

connection(app);
