import User from "./User.js";
import { Playlist } from "./Playlist.js";
import { Track } from "./Track.js";
import Role from "./Role.js";

// relations
User.hasMany(Playlist, { foreignKey: "user_id" });
Playlist.belongsTo(User, { foreignKey: "user_id" });

Playlist.belongsToMany(Track, { through: "playlist_tracks" });
Track.belongsToMany(Playlist, { through: "playlist_tracks" });

Role.hasMany(User, { foreignKey: "role_id" });

// ❌ Quitar — ya se define en User.js
// Role.hasMany(User, { foreignKey: "role_id" });

export { User, Playlist, Track, Role };


