// src/components/TrackItem.jsx
import React from "react";

export default function TrackItem({ track, onSelect }) {
  return (
    <div className="playlist-item" onClick={onSelect} style={{ cursor: "pointer" }}>
      <img src={track.cover_url || "https://via.placeholder.com/50"} alt="cover" />
      <div className="playlist-text">
        <div className="playlist-title">{track.title}</div>
        <div className="playlist-artist">{track.artist_name || "Artist"}</div>
      </div>
      <div className="text-muted">{Math.floor((track.duration_seconds || 0)/60)}:{String((track.duration_seconds || 0)%60).padStart(2,"0")}</div>
    </div>
  );
}
