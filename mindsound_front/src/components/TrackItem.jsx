import React from "react";

export default function TrackItem({ track, onSelect }) {
  return (
    <div className="playlist-item d-flex align-items-center justify-content-between p-2 mb-2">
      <div className="d-flex align-items-center">
        <img src={track.cover_url || "https://via.placeholder.com/70"} alt="" style={{ width:50, height:50, objectFit:"cover", borderRadius:8, marginRight:10 }} />
        <div>
          <div className="playlist-title">{track.title}</div>
          <div className="playlist-artist text-muted" style={{fontSize:12}}>{track.artist_id ? `Artist #${track.artist_id}` : ""}</div>
        </div>
      </div>
      <div>
        <button className="btn btn-sm btn-outline-light" onClick={() => onSelect(track)}>Reproducir</button>
      </div>
    </div>
  );
}
