import { Playlist, Track } from "../models/index.js";

export const createPlaylist = async ({ name, userId }) => {
  return await Playlist.create({ name, UserId: userId });
};

export const addTrackToPlaylist = async ({ playlistId, trackId }) => {
  const playlist = await Playlist.findByPk(playlistId);
  const track = await Track.findByPk(trackId);
  await playlist.addTrack(track);
  return playlist;
};

export const getUserPlaylists = async (userId) => {
  return await Playlist.findAll({
    where: { UserId: userId },
    include: Track
  });
};
