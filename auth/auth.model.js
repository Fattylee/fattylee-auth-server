import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compare(password, this["password"]);
};

userSchema.pre("save", async function callBackNext(next) {
  try {
    const hashPassword = await bcrypt.hash(this.password, 6);

    if (this.isNew || this.isModified("password")) {
      this.password = hashPassword;
      next();
    }
  } catch (err) {
    next(err);
  }
});

export const User = model("users", userSchema);
