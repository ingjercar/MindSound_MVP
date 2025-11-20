import { uploadToCloudinary } from "../services/cloudinary.service.js";
import fs from "fs";

export const uploadFileController = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ msg: "No enviaste ningún archivo" });

    const filePath = req.file.path;

    const url = await uploadToCloudinary(filePath, "mindsound");

    // eliminar archivo local
    fs.unlinkSync(filePath);

    return res.json({
      msg: "Archivo subido correctamente",
      url,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
