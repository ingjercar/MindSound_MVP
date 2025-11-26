// src/App.jsx
import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Player from "./pages/Player";
import Playlists from "./pages/Playlists";
import Artists from "./pages/Artists";
import "./styles.css";
import logo from "./img/logo1.png"; // coloca la imagen en src/img/logo1.png

function TopNav({ onNavigate, hide }) {
  const { user, logout } = useAuth();
  return (
    <div className="topbar">
      <div className="topbar-left">
        <img src={logo} alt="logo" className="app-logo" />
        <div className="app-title">Mind<strong>Sound</strong></div>
      </div>

      {!hide && (
        <div className="topbar-right">
          <button className="link-btn" onClick={() => onNavigate("player")}>Player</button>
          <button className="link-btn" onClick={() => onNavigate("playlists")}>Playlists</button>
          <button className="link-btn" onClick={() => onNavigate("artists")}>Artists</button>
          {user ? (
            <button className="btn-ghost" onClick={() => { logout(); onNavigate("login"); }}>Logout</button>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default function AppContainer() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

function InnerApp() {
  const [page, setPage] = React.useState("login");
  const { user, ready } = useAuth();

  React.useEffect(() => {
    // if logged in, go to player by default
    if (ready && user) setPage("player");
  }, [ready, user]);

  // hide topnav on login/register
  const hideTop = page === "login" || page === "register";

  return (
    <div>
      <TopNav onNavigate={setPage} hide={hideTop} />
      <div className="app-body">
        {page === "login" && <Login onSuccess={() => setPage("player")} goRegister={() => setPage("register")} />}
        {page === "register" && <Register goLogin={() => setPage("login")} />}
        {page === "player" && <Player />}
        {page === "playlists" && <Playlists />}
        {page === "artists" && <Artists />}
      </div>
    </div>
  );
}
