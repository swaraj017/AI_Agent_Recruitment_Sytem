import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AuthUser from "../models/AuthUser.js";
import HR from "../models/HR.js";
import JobSeeker from "../models/JobSeeker.js";

const register = async (req, res) => {
  try {
    const { email, password, role, fullName, companyName } = req.body;

    console.log("Registration request body:", req.body);
    const existingUser = await AuthUser.findOne({ email });
    console.log("Existing user check:", existingUser);
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
  
    const authUser = await AuthUser.create({ username: fullName, email, password: hashedPassword, role });
    console.log("Created AuthUser:", authUser);

    if (role === "hr") await HR.create({ authUserId: authUser._id, companyName });
    if (role === "job_seeker") await JobSeeker.create({ authUserId: authUser._id, fullName });

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration error" });
  }
};

const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await AuthUser.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
};

export default { register, login };
