import { Router } from "express";
import { login, logout, me, register } from "./auth.controller.js";
import { authGuard } from "./auth.middleware.js";
import { loginValidator, signupValidator } from "./auth.validator.js";

export const authRouter = Router();

authRouter.post("/register", signupValidator, register);

authRouter.post("/login", loginValidator, login);

authRouter.get("/me", authGuard, me);

authRouter.get("/logout", authGuard, logout);
