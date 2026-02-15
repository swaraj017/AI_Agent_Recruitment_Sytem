import jwt from "jsonwebtoken";
import AuthUser from "../models/AuthUser.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await AuthUser.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


//for only hr routes 
export const hrOnly = (req, res, next) => {
  if (req.user.role !== "hr") {
    return res.status(403).json({ message: "HR access only" });
  }
  next();
};
