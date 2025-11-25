import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createPlaylistController,
  addTrackController,
  listPlaylistsController
} from "../controllers/playlist.controller.js";

const router = Router();

router.post("/", authMiddleware, createPlaylistController);
router.post("/add", authMiddleware, addTrackController);
router.get("/", authMiddleware, listPlaylistsController);

export default router;
