import express from "express";
import { meController, updateProfileController, listUsers, getUserById, updateUserById, deleteUserById } from "../controllers/user.controller.js";
import { authMiddleware, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, meController);
router.put("/me", authMiddleware, updateProfileController);

// Admin CRUD
router.get("/", authMiddleware, requireRole("admin"), listUsers);
router.get("/:id", authMiddleware, requireRole("admin"), getUserById);
router.put("/:id", authMiddleware, requireRole("admin"), updateUserById);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteUserById);


export default router;
