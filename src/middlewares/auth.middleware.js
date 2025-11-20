import { verifyAccessToken } from "../services/auth.service.js";

export const authRequired = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ msg: "Missing authorization header" });
    const token = header.split(" ")[1];
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token", detail: err.message });
  }
};

export const requireRole = (roleName) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
  if (req.user.role !== roleName) return res.status(403).json({ msg: "Forbidden" });
  next();
};
