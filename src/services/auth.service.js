import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User, Role } from "../models/index.js";

dotenv.config();

const SALT_ROUNDS = 10;

export const hashPassword = async (plain) => bcrypt.hash(plain, SALT_ROUNDS);
export const comparePassword = async (plain, hash) => bcrypt.compare(plain, hash);

export const signAccessToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" });
export const signRefreshToken = (payload) => jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES || "30d" });

export const verifyAccessToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
export const verifyRefreshToken = (token) => jwt.verify(token, process.env.JWT_REFRESH_SECRET);

export const registerUser = async ({ email, password, roleName = "user" }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("Email already registered");

  // find role
  let role = await Role.findOne({ where: { name: roleName } });
  if (!role) role = await Role.create({ name: roleName, description: roleName });

  const password_hash = await hashPassword(password);
  const user = await User.create({ email, password_hash, role_id: role.id });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email }, include: ["role"] });
  if (!user) throw new Error("Invalid credentials");
  const ok = await comparePassword(password, user.password_hash);
  if (!ok) throw new Error("Invalid credentials");

  // payload minimal
  const payload = { id: user.id, email: user.email, role: user.role?.name || "user" };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  user.last_login = new Date();
  await user.save();

  return { user, accessToken, refreshToken };
};
