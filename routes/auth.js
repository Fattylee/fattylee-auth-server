import { Router } from "express";
import { User } from "../models/user.js";

const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const newUser = await User.create({ email, password, firstName, lastName });

    res.status(201).json({ message: "created", token: "1234h", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const authRouter = Router();
authRouter.post("/register", register);
