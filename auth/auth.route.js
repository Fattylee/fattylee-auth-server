import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { loginValidator, signupValidator } from "./auth.validator.js";

export const authRouter = Router();

authRouter.post("/register", signupValidator, register);

authRouter.post("/login", loginValidator, login);
