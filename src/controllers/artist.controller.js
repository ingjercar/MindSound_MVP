import Artist from "../models/Artist.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const createArtist = async (req, res) => {
  try {
    const { name, bio, slug } = req.body;
    let image_url = null;

    if (req.file) {
      const path = req.file.path;
      const r = await cloudinary.uploader.upload(path, { folder: "mindsound/artists", resource_type: "image" });
      image_url = r.secure_url;
      fs.unlinkSync(path);
    }

    const artist = await Artist.create({ name, slug, bio, image_url });
    return res.status(201).json({ artist });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const listArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll({ order: [["createdAt", "DESC"]] });
    return res.json({ artists });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ msg: "Artist not found" });
    return res.json({ artist });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ msg: "Artist not found" });

    // handle optional file
    if (req.file) {
      const path = req.file.path;
      const r = await cloudinary.uploader.upload(path, { folder: "mindsound/artists", resource_type: "image" });
      artist.image_url = r.secure_url;
      fs.unlinkSync(path);
    }
    if (req.body.name) artist.name = req.body.name;
    if (req.body.slug) artist.slug = req.body.slug;
    if (req.body.bio) artist.bio = req.body.bio;

    await artist.save();
    return res.json({ artist });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ msg: "Artist not found" });
    await artist.destroy();
    return res.json({ msg: "Deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
