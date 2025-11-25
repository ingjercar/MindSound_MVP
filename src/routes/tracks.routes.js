import { Router } from "express";
import { createTrack, getTracks, getTrackById, updateTrack, deleteTrack } from "../controllers/track.controller.js";

const router = Router();

router.post("/", createTrack);
router.get("/", getTracks);
router.get("/:id", getTrackById);
router.put("/:id", updateTrack);
router.delete("/:id", deleteTrack);

export default router;
