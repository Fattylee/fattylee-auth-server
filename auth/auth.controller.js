import cookie from "cookie";
import { User } from "./auth.model.js";

const register = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    let password = req.body.password;

    const emailUser = await User.findOne({ email });
    if (emailUser)
      return res.status(400).json({ email: "Email already exist" });

    const newUser = await User.create({ email, password, firstName, lastName });
    let user;
    ({ password, ...user } = newUser._doc);

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    let password = req.body.password;

    const emailUser = await User.findOne({ email });
    if (!emailUser)
      return res.status(404).json({ email: "Email does not exist" });

    const passwordMatches = await emailUser.isValidPassword(password);
    if (!passwordMatches)
      return res.status(400).json({ password: "Incorrect password" });

    let user;
    ({ password, ...user } = emailUser._doc);

    // res.set(
    //   "Set-Cookie",
    //   cookie.serialize("token", emailUser.generateToken(), {
    //     httpOnly: true,
    //     // secure: process.env.NODE_ENV === "production",
    //     // secure: false,
    //     path: "/",
    //     sameSite: "strict",
    //     maxAge: 3600,
    //   })
    // );

    res.cookie("token", emailUser.generateToken(), {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const me = async (_, res) => {
  res.status(200).json(res.locals.user);
};

const logout = (_, res) => {
  try {
    // res.set(
    //   "Set-Cookie",
    //   cookie.serialize("token", "", {
    //     httpOnly: true,
    //     // secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //     path: "/",
    //     expires: new Date(0),
    //   })
    // );
    res.cookie("token", "", {
      maxAge: new Date(0),
      httpOnly: true,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export { register, login, me, logout };
