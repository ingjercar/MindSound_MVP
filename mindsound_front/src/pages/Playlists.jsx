// src/pages/Playlists.jsx
import React, { useEffect, useState } from "react";
import { getJson, postJson, uploadForm } from "../api";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [title, setTitle] = useState("");

  async function load() {
    const res = await getJson("/api/playlists");
    setPlaylists(res.playlists || []);
  }
  useEffect(()=>{ load(); }, []);

  async function create() {
    if (!name) return;
    await postJson("/api/playlists", { name });
    setName("");
    load();
  }

  async function uploadToCloudAndAdd() {
    if (!selected || !audioFile) return alert("Selecciona playlist y archivo de audio");
    // 1) upload audio (and cover optionally)
    const fd = new FormData();
    fd.append("file", audioFile);
    if (coverFile) fd.append("file", coverFile, coverFile.name);
    // backend upload route is /api/upload/upload
    const up = await uploadForm("/api/upload/upload", fd);
    const audioUrl = up.url || up.secure_url || up?.data?.url;
    if (!audioUrl) return alert("Upload failed");

    // 2) create track
    const tr = await postJson("/api/tracks", { title: title || audioFile.name, artist_id: null, audio_url: audioUrl });
    const trackId = tr.track?.id || tr.trackId || tr.id;
    if (!trackId) return alert("Error creating track");

    // 3) add to playlist
    await postJson("/api/playlists/add", { playlistId: selected, trackId });
    alert("Track subido y agregado");
    setAudioFile(null);
    setCoverFile(null);
    setTitle("");
    load();
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Playlists</h2>

      <div className="card-dark p-3 mb-3">
        <div className="d-flex gap-2">
          <input className="form-control" placeholder="Nombre playlist" value={name} onChange={e=>setName(e.target.value)} />
          <button className="btn btn-primary" onClick={create}>Crear</button>
        </div>
      </div>

      <div className="card-dark p-3 mb-3">
        <h5>Tus playlists</h5>
        {playlists.map(p => (
          <div key={p.id} className={`playlist-item ${selected===p.id ? "active" : ""}`} onClick={()=>setSelected(p.id)}>
            <div>{p.title || p.name}</div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="card-dark p-3">
          <h5>Subir pista a playlist</h5>
          <input className="form-control mb-2" placeholder="Título (opcional)" value={title} onChange={e=>setTitle(e.target.value)} />
          <input type="file" accept="audio/*" className="form-control mb-2" onChange={e=>setAudioFile(e.target.files[0])} />
          <input type="file" accept="image/*" className="form-control mb-2" onChange={e=>setCoverFile(e.target.files[0])} />
          <button className="btn btn-success" onClick={uploadToCloudAndAdd}>Subir y agregar</button>
        </div>
      )}
    </div>
  );
}
