// src/pages/Player.jsx
import React, { useEffect, useState, useRef } from "react";
import { getJson } from "../api";

export default function Player() {
  const [tracks, setTracks] = useState([]);
  const [current, setCurrent] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    (async () => {
      const res = await getJson("/api/tracks");
      setTracks(res || []);
      if ((res || []).length) setCurrent(res[0]);
    })();
  }, []);

  useEffect(() => {
    if (audioRef.current && current) {
      audioRef.current.src = current.audio_url;
      audioRef.current.play().catch(() => { });
    }
  }, [current]);

  return (
    <div className="page-container">
      <div className="container-player">
        <div>
          <div className="card-dark profile-card mb-3">
            <div className="profile">
              <img src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" alt="profile" />
              <div className="profile-name">Tu cuenta</div>
            </div>
          </div>

          <div className="card-dark">
            {tracks.map(t => (
              <div key={t.id} className={`playlist-item ${current?.id === t.id ? "active" : ""}`} onClick={() => setCurrent(t)}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={t.cover_url || "https://via.placeholder.com/50"} alt="cov" style={{ width: 50, height: 50, borderRadius: 8 }} />
                  <div>
                    <div className="playlist-title">{t.title}</div>
                    <div className="playlist-artist">by {t.artist_id}</div>
                  </div>
                </div>
                <div>{Math.floor((t.duration_seconds || 0) / 60)}:{(t.duration_seconds || 0) % 60}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-dark player">
          <img className="player-cover" src={current?.cover_url || "https://wallpaperaccess.com/full/3405398.jpg"} alt="cover" />
          <h3 className="text-white mt-2">{current?.title || "Selecciona una pista"}</h3>

          <div className="player-controls">
            <button className="btn btn-sm btn-outline-light" onClick={() => {
              const idx = tracks.findIndex(x => x.id === current?.id);
              if (idx > 0) setCurrent(tracks[idx - 1]);
            }}>◀</button>
            <button className="btn btn-sm btn-primary" onClick={() => {
              if (audioRef.current.paused) audioRef.current.play(); else audioRef.current.pause();
            }}>Play/Pause</button>
            <button className="btn btn-sm btn-outline-light" onClick={() => {
              const idx = tracks.findIndex(x => x.id === current?.id);
              if (idx < tracks.length - 1) setCurrent(tracks[idx + 1]);
            }}>▶</button>
          </div>

          <audio ref={audioRef} controls style={{ width: "100%", marginTop: 12 }} />
        </div>
      </div>
    </div>
  );
}
