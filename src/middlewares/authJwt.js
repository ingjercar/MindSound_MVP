import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authRequired = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "Missing auth header" });
    const token = header.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload should contain user id and role (from your auth.service)
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token", detail: err.message });
  }
};
