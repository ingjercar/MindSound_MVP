// src/components/PlayerControls.jsx
import React, { useState } from "react";

export default function PlayerControls({ onNext, onPrev, audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <div className="player-controls">
        <i className="bi bi-skip-backward-fill" onClick={onPrev} style={{cursor:"pointer"}}></i>
        <button className="btn bg-white bg-opacity-10 text-white" onClick={toggle}>{isPlaying ? <i className="bi bi-pause-fill" /> : <i className="bi bi-play-fill" />}</button>
        <i className="bi bi-skip-forward-fill" onClick={onNext} style={{cursor:"pointer"}}></i>
      </div>
    </div>
  );
}
