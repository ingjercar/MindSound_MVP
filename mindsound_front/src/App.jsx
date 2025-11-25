import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Player from "./pages/Player";
import Playlists from "./pages/Playlists";
import Artists from "./pages/Artists";
import "./styles.css";

export default function App() {
  // Very small router (no react-router) — you can swap to real router if want
  const [page, setPage] = React.useState("login");
  return (
    <AuthProvider>
      <div>
        <nav className="p-2 d-flex gap-2" style={{position:"fixed", top:10, right:10}}>
          <button className="btn btn-sm btn-outline-light" onClick={()=>setPage("player")}>Player</button>
          <button className="btn btn-sm btn-outline-light" onClick={()=>setPage("playlists")}>Playlists</button>
          <button className="btn btn-sm btn-outline-light" onClick={()=>setPage("artists")}>Artists</button>
          <button className="btn btn-sm btn-outline-light" onClick={()=>setPage("login")}>Login</button>
        </nav>

        {page === "login" && <Login onSuccess={()=>setPage("player")} />}
        {page === "player" && <Player />}
        {page === "playlists" && <Playlists />}
        {page === "artists" && <Artists />}
      </div>
    </AuthProvider>
  );
}
