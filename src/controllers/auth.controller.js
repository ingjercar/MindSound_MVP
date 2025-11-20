import { registerUser, loginUser, verifyRefreshToken, signAccessToken, signRefreshToken } from "../services/auth.service.js";

export const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "email & password required" });
    const user = await registerUser({ email, password });
    return res.status(201).json({ msg: "User registered", user: { id: user.id, email: user.email } });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await loginUser({ email, password });
    return res.json({ user: { id: user.id, email: user.email }, accessToken, refreshToken });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

import { verifyRefreshToken as verifyRefresh } from "../services/auth.service.js";

export const refreshController = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ msg: "refreshToken required" });
    const payload = verifyRefresh(refreshToken);
    const newAccess = signAccessToken({ id: payload.id, email: payload.email, role: payload.role });
    const newRefresh = signRefreshToken({ id: payload.id, email: payload.email, role: payload.role });
    return res.json({ accessToken: newAccess, refreshToken: newRefresh });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};
