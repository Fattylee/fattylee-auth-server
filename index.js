import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import { startConnection } from "./config/database.js";
import { authRouter } from "./auth/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app = express();
// app.use(
//   cors({
//     credentials: true,
//     origin:
//       process.env.NODE_ENV === "production"
//         ? /\.netlify\.app$/
//         : process.env.ORIGIN,
//   })
// );
app.use(
  cors({
    credentials: true,
    origin: [/\.netlify\.app$/, "http://localhost:3000"],
  })
);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );

//   return next();
// });
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "successful" });
});

startConnection(app);
