import mongoose from "mongoose";
const { model, Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
});

export const User = model("users", userSchema);
