import React from "react";

export default function PlayerControls({ isPlaying, onPlayPause, onNext, onPrev }) {
  return (
    <div className="player-controls d-flex justify-content-center gap-4 my-3">
      <button className="btn btn-link text-light" onClick={onPrev}><i className="bi bi-skip-backward-fill fs-3"></i></button>
      <button className="btn btn-light rounded-circle p-3" onClick={onPlayPause}>
        {isPlaying ? <i className="bi bi-pause-fill fs-4"></i> : <i className="bi bi-play-fill fs-4"></i>}
      </button>
      <button className="btn btn-link text-light" onClick={onNext}><i className="bi bi-skip-forward-fill fs-3"></i></button>
    </div>
  );
}
