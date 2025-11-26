// src/pages/Artists.jsx
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getJson, uploadForm, postJson } from "../api";

export default function Artists() {
  const { user } = useAuth();
  const [audio, setAudio] = useState(null);
  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const res = await getJson(`/api/tracks?artist=${user.id}`);
      setTracks(res || []);
    })();
  }, [user]);

  async function uploadTrack() {
    if (!audio) return alert("Selecciona audio");
    const fd = new FormData();
    fd.append("file", audio);
    if (cover) fd.append("cover", cover);

    const up = await uploadForm("/api/upload/upload", fd);
    const url = up.url || up.secure_url || up?.data?.url;
    if (!url) return alert("Upload failed");

    // create track on backend
    const created = await postJson("/api/tracks", { title: title || audio.name, artist_id: user.id, audio_url: url });
    alert("Track creado");
    setTitle("");
    setAudio(null);
    setCover(null);
    setTracks(prev => [created.track || created, ...prev]);
  }

  if (!user) return <div className="page-container">Inicia sesión para ver esto.</div>;

  return (
    <div className="page-container">
      <h2 className="page-title">Artist Panel</h2>

      {user.role === "artist" ? (
        <div className="card-dark p-3 mb-3">
          <h5>Subir pista</h5>
          <input className="form-control mb-2" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
          <input type="file" accept="audio/*" className="form-control mb-2" onChange={e=>setAudio(e.target.files[0])} />
          <input type="file" accept="image/*" className="form-control mb-2" onChange={e=>setCover(e.target.files[0])} />
          <button className="btn btn-success" onClick={uploadTrack}>Subir</button>
        </div>
      ) : (
        <div className="card-dark p-3">Necesitas rol <strong>artist</strong> para usar este panel.</div>
      )}

      <div className="card-dark p-3">
        <h5>Tus pistas</h5>
        {tracks.map(t => (<div key={t.id} className="playlist-item">{t.title}</div>))}
      </div>
    </div>
  );
}
