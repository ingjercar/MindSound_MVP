import express from "express";
import { meController, updateProfileController } from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", authRequired, meController);
router.put("/me", authRequired, updateProfileController);

export default router;
