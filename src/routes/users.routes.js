import express from "express";
import { meController, updateProfileController, listUsers, getUserById, updateUserById, deleteUserById } from "../controllers/user.controller.js";
import { authRequired, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", authRequired, meController);
router.put("/me", authRequired, updateProfileController);

// Admin CRUD for users
router.get("/", authRequired, requireRole("admin"), listUsers);
router.get("/:id", authRequired, requireRole("admin"), getUserById);
router.put("/:id", authRequired, requireRole("admin"), updateUserById);
router.delete("/:id", authRequired, requireRole("admin"), deleteUserById);

export default router;
