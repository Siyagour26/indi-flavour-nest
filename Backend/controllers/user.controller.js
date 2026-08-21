import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

export const signup = async (req, res) => {
  try {
    console.log(req);

    const { name, email, password } = req.body;

    const userAlreadyExists = await User.findOne({ where: { email } });
    if (userAlreadyExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json({ message: "User SignUp", user: {
      id: user.id,
      name: user.name,
      email: user.email
    } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.user_id, email: user.email }, process.env.SECRET_KEY, {
      expiresIn: "30m",
    });

    return res.json({
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
