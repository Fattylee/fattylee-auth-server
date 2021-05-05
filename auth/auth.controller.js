import { User } from "./auth.model.js";

const register = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    let password = req.body.password;

    const emailUser = await User.findOne({ email });
    if (emailUser)
      return res.status(400).json({ email: "email already exist" });

    const newUser = await User.create({ email, password, firstName, lastName });
    let user;
    ({ password, ...user } = newUser._doc);

    res.status(201).json({ message: "created", token: "1234h", user });
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
    if (!emailUser) return res.status(404).json({ email: "Invalid email" });

    const isValid = await emailUser.isValidPassword(password);
    if (!isValid)
      return res.status(400).json({ password: "Incorrect password" });

    let user;
    ({ password, ...user } = emailUser._doc);

    res.status(200).json({ message: "success", token: "1234h", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { register, login };
