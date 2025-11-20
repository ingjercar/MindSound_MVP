import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (filePath, folder) => {
  try {
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: folder,
    });
    return res.secure_url;
  } catch (err) {
    throw new Error("Error subiendo a Cloudinary: " + err.message);
  }
};
