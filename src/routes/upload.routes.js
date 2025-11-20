import express from "express";
import multer from "multer";
import { uploadFileController } from "../controllers/upload.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadFileController);

export default router;
