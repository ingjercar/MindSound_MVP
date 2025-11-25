import React, { useEffect, useState, useRef, useContext } from "react";
import { getJson } from "../api";
import TrackItem from "../components/TrackItem";
import PlayerControls from "../components/PlayerControls";
import { AuthContext } from "../contexts/AuthContext";

export default function PlayerPage() {
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(()=> {
    (async ()=> {
      const list = await getJson("/api/tracks");
      // if your backend returns { error } handle it
      setTracks(Array.isArray(list) ? list : (list.rows || []));
    })();
  },[]);

  const selectTrack = (t) => {
    const idx = tracks.findIndex(x => x.id === t.id);
    setCurrentIndex(idx >= 0 ? idx : 0);
    setIsPlaying(true);
  };

  useEffect(()=> {
    if (!audioRef.current) return;
    const src = tracks[currentIndex]?.audio_url;
    if (src) {
      audioRef.current.src = src;
      if (isPlaying) audioRef.current.play().catch(()=>{});
    } else {
      audioRef.current.pause();
    }
  }, [currentIndex, tracks, isPlaying]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play().catch(()=>{}); setIsPlaying(true); }
  };

  const next = () => {
    setCurrentIndex(i => Math.min(tracks.length-1, i+1));
    setIsPlaying(true);
  };
  const prev = () => {
    setCurrentIndex(i => Math.max(0, i-1));
    setIsPlaying(true);
  };

  return (
    <div className="container-player p-4" style={{maxWidth:1100, margin:"40px auto"}}>
      <div>
        <div className="card-dark p-3 mb-3">
          <div className="d-flex align-items-center mb-3">
            <img src={user?.avatar_url || "https://via.placeholder.com/70"} style={{width:70,height:70,borderRadius:12,marginRight:12}} />
            <div className="text-light">{user?.display_name || user?.email || "Invitado"}</div>
          </div>
        </div>

        <div className="card-dark p-3">
          {tracks.map(t => <TrackItem key={t.id} track={t} onSelect={selectTrack} />)}
        </div>
      </div>

      <div className="card-dark p-4" style={{marginLeft:20}}>
        <img src={tracks[currentIndex]?.cover_url || "https://via.placeholder.com/300"} className="player-cover mb-3" style={{width:300,height:300,objectFit:"cover",borderRadius:8}} />
        <h4 className="text-light">{tracks[currentIndex]?.title || "Selecciona una canción"}</h4>
        <p className="text-muted">{tracks[currentIndex]?.artist_name || ""}</p>

        <PlayerControls isPlaying={isPlaying} onPlayPause={toggle} onNext={next} onPrev={prev} />
        <div className="progress-bar-container d-flex align-items-center p-2">
          <audio ref={audioRef} onEnded={next} />
          <div style={{flex:1}} />
        </div>
      </div>
    </div>
  );
}
