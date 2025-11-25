import { Track } from "../models/Track.js";

export const createTrack = async (req, res) => {
  try {
    const { title, artist_id, audio_url } = req.body;

    const track = await Track.create({ title, artist_id, audio_url });

    return res.status(201).json({ msg: "Track creado", track });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getTracks = async (req, res) => {
  try {
    const tracks = await Track.findAll();
    return res.json(tracks);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getTrackById = async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);

    if (!track) return res.status(404).json({ msg: "Track no encontrado" });

    return res.json(track);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateTrack = async (req, res) => {
  try {
    const { title, audio_url } = req.body;

    const track = await Track.findByPk(req.params.id);
    if (!track) return res.status(404).json({ msg: "Track no encontrado" });

    await track.update({ title, audio_url });

    return res.json({ msg: "Track actualizado", track });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteTrack = async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) return res.status(404).json({ msg: "Track no encontrado" });

    await track.destroy();

    return res.json({ msg: "Track eliminado" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
