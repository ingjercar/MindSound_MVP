import React, { useState, useEffect } from "react";
import { getJson } from "../api";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  useEffect(()=>{ (async ()=> {
    const r = await getJson("/api/artists");
    setArtists(Array.isArray(r) ? r : (r.rows || []));
  })(); }, []);
  return (
    <div className="p-4">
      <h2 className="text-light">Artistas</h2>
      <div className="row">
        {artists.map(a => (
          <div className="col-md-4" key={a.id}>
            <div style={{background:"rgba(20,20,20,0.6)", padding:16, borderRadius:12, marginBottom:12}}>
              <h4 className="text-white">{a.name}</h4>
              <p className="text-muted">{a.bio?.slice?.(0,120)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
