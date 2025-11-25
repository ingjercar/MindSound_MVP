import { createPlaylist, addTrackToPlaylist, getUserPlaylists } from "../services/playlist.service.js";

export const createPlaylistController = async (req, res) => {
  try {
    const { name } = req.body;

    const playlist = await createPlaylist({
      name,
      userId: req.user.id
    });

    res.json({ playlist });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const addTrackController = async (req, res) => {
  try {
    const { playlistId, trackId } = req.body;

    const playlist = await addTrackToPlaylist({ playlistId, trackId });
    res.json({ msg: "Track added", playlist });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const listPlaylistsController = async (req, res) => {
  try {
    const playlists = await getUserPlaylists(req.user.id);
    res.json({ playlists });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
