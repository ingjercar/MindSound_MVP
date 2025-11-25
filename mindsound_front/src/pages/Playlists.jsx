import React, { useEffect, useState } from "react";
import { getJson } from "../api";

export default function Playlists() {
  const [pls, setPls] = useState([]);
  useEffect(()=>{ (async ()=> {
    const r = await getJson("/api/playlists");
    setPls(Array.isArray(r) ? r : (r.rows || []));
  })(); }, []);
  return (
    <div className="p-4">
      <h2 className="text-light">Tus playlists</h2>
      <div className="d-grid gap-3" style={{gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))"}}>
        {pls.map(pl => (
          <div key={pl.id} style={{background:"rgba(20,20,20,0.6)",padding:16,borderRadius:12}}>
            <h5 className="text-white">{pl.title || pl.name}</h5>
            <p className="text-muted">{pl.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
