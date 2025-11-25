import express from "express";
import multer from "multer";
import { authMiddleware, requireRole } from "../middlewares/auth.middleware.js";
import { createArtist, listArtists, getArtist, updateArtist, deleteArtist } from "../controllers/artist.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", listArtists);
router.get("/:id", getArtist);

// Crear/actualizar artista: sólo admin o role 'artist' (ejemplo)
router.post("/", authMiddleware, requireRole("admin"), upload.single("image"), createArtist);
router.put("/:id", authMiddleware, requireRole("admin"), upload.single("image"), updateArtist);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteArtist);

export default router;
