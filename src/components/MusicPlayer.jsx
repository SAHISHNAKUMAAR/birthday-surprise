import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { romanticContent } from '../data/content';

export default function MusicPlayer({ hasInteracted }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const audioRef = useRef(null);

  // Correctly resolve asset path with Vite base URL for local dev and GitHub Pages
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const rawPath = romanticContent.audio?.audioPath || 'music/romantic.mp3';
  const audioSrc = `${cleanBase}${rawPath.replace(/^\//, '')}`;

  const attemptPlay = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Modern browsers block autoplay without user interaction
          // Interaction listeners below will immediately trigger playback
        });
    }
  };

  // 1. Try to autoplay immediately on mount
  // 2. Attach global user interaction listeners to bypass browser autoplay blocks instantly
  useEffect(() => {
    attemptPlay();

    const startAudioOnGesture = () => {
      attemptPlay();
    };

    const events = ['click', 'touchstart', 'pointerdown', 'keydown', 'scroll'];
    events.forEach((evt) => window.addEventListener(evt, startAudioOnGesture, { passive: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, startAudioOnGesture));
    };
  }, []);

  // Also trigger when parent App detects any interaction
  useEffect(() => {
    if (hasInteracted) {
      attemptPlay();
    }
  }, [hasInteracted]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
    audioRef.current.volume = nextMuted ? 0 : volume;
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {/* HTML Audio element - loops automatically without pause/play button */}
      <audio
        ref={audioRef}
        src={audioSrc}
        autoPlay
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
      />

      {/* Music Pill Indicator (No pause or play button) */}
      <div className="glass-panel px-3 py-2 rounded-full flex items-center gap-2.5 shadow-lg border border-pink-200/60 transition-all duration-300 hover:shadow-pink-300/30">
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-sm">
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-sway' : ''}`} />
        </div>

        <div className="hidden sm:flex flex-col text-left pr-1 max-w-[140px]">
          <span className="text-xs font-semibold text-rose-900 tracking-tight truncate">
            {romanticContent.personal?.favoriteSongTitle || "Romantic Song"}
          </span>
          <span className="text-[10px] text-rose-500/80 font-medium">
            {isPlaying ? "Playing with love 💖" : "Starting music ✨"}
          </span>
        </div>

        {/* Volume & Mute Controls */}
        <div className="relative flex items-center">
          <button
            onClick={toggleMute}
            onMouseEnter={() => setShowVolumeSlider(true)}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="p-1.5 rounded-full hover:bg-rose-100/60 text-rose-700 transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-rose-600" />
            )}
          </button>

          {/* Volume Slider Popover */}
          <div
            onMouseLeave={() => setShowVolumeSlider(false)}
            className={`absolute right-0 top-10 glass-panel px-3 py-2 rounded-2xl shadow-xl flex items-center gap-2 transition-all duration-200 ${
              showVolumeSlider
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1.5 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <span className="text-[10px] font-bold text-rose-700 w-6">
              {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
