import { User } from "./auth.model.js";

const authGuard = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Unauthenticated");

    const { email } = User.verifyToken(token);

    const user = await User.findOne({ email });

    if (!user) throw new Error("Unauthenticated");

    const { password, ...rest } = user._doc;
    res.locals.user = rest;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: error.message });
  }
};

export { authGuard };
