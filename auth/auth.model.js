import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { model, Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

UserSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compare(password, this["password"]);
};

UserSchema.statics.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

UserSchema.methods.generateToken = function generateToken() {
  const { email } = this;
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24, // 1 day
  });
};

UserSchema.pre("save", async function callBackNext(next) {
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

export const User = model("users", UserSchema);
