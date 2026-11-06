import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles } from 'lucide-react';
import { romanticContent } from '../data/content';

export default function MusicPlayer({ hasInteracted }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [usingSynthesizer, setUsingSynthesizer] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef(null);
  const synthTimerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Initialize Web Audio API romantic chime synthesizer fallback
  const playRomanticChime = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        audioCtxRef.current = new AudioContext();
        gainNodeRef.current = audioCtxRef.current.createGain();
        gainNodeRef.current.connect(audioCtxRef.current.destination);
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const notes = [
        261.63, // C4
        329.63, // E4
        392.00, // G4
        493.88, // B4
        523.25, // C5
        587.33, // D5
        659.25, // E5
      ];

      // Soft music box chords
      const chordNotes = [
        [notes[0], notes[2], notes[4]],
        [notes[1], notes[3], notes[5]],
        [notes[2], notes[4], notes[6]],
        [notes[3], notes[5], notes[6]],
      ];

      let chordIdx = 0;
      let arpeggioIdx = 0;

      const tick = () => {
        if (!isPlaying && !synthTimerRef.current) return;
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;

        const now = audioCtxRef.current.currentTime;
        const currentChord = chordNotes[chordIdx % chordNotes.length];
        const freq = currentChord[arpeggioIdx % currentChord.length];

        const osc = audioCtxRef.current.createOscillator();
        const noteGain = audioCtxRef.current.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const currentVol = isMuted ? 0 : volume * 0.22;
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.exponentialRampToValueAtTime(currentVol, now + 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(noteGain);
        noteGain.connect(gainNodeRef.current);

        osc.start(now);
        osc.stop(now + 1.9);

        arpeggioIdx++;
        if (arpeggioIdx % 4 === 0) {
          chordIdx++;
        }
      };

      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      synthTimerRef.current = setInterval(tick, 700);
      tick();
    } catch (e) {
      console.warn("Audio Context init note:", e);
    }
  };

  const stopRomanticChime = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  // Play audio when user first interacts
  useEffect(() => {
    if (hasInteracted && !isPlaying && !audioError) {
      startPlayback();
    }
  }, [hasInteracted]);

  const startPlayback = () => {
    if (audioRef.current && !usingSynthesizer) {
      audioRef.current.volume = isMuted ? 0 : volume;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAudioError(false);
          })
          .catch((err) => {
            console.info("romantic.mp3 not found or autoplay prevented. Falling back to ambient chime generator.");
            setUsingSynthesizer(true);
            setIsPlaying(true);
            playRomanticChime();
          });
      }
    } else {
      setIsPlaying(true);
      playRomanticChime();
    }
  };

  const pausePlayback = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopRomanticChime();
  };

  const togglePlay = () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        nextMuted ? 0 : volume * 0.22,
        audioCtxRef.current.currentTime
      );
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        newVol * 0.22,
        audioCtxRef.current.currentTime
      );
    }
  };

  const handleAudioError = () => {
    setAudioError(true);
    setUsingSynthesizer(true);
    if (isPlaying || hasInteracted) {
      playRomanticChime();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRomanticChime();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {/* Hidden HTML Audio element */}
      <audio
        ref={audioRef}
        src={romanticContent.audio.audioPath}
        loop
        preload="auto"
        onError={handleAudioError}
      />

      {/* Music Controller Glass Pill */}
      <div className="glass-panel px-3 py-2 rounded-full flex items-center gap-2.5 shadow-lg border border-pink-200/60 transition-all duration-300 hover:shadow-pink-300/30">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />}
        </button>

        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-xs font-semibold text-rose-900 tracking-tight flex items-center gap-1">
            <Music className="w-3 h-3 text-rose-500 inline animate-sway" />
            {usingSynthesizer ? "Music Box Melody" : "Romantic Song"}
          </span>
          <span className="text-[10px] text-rose-500/80 font-medium">
            {isPlaying ? "Now Playing ✨" : "Paused"}
          </span>
        </div>

        {/* Volume & Mute Controls */}
        <div className="relative flex items-center">
          <button
            onClick={toggleMute}
            onMouseEnter={() => setShowVolumeSlider(true)}
            aria-label={isMuted ? "Unmute" : "Mute"}
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
              showVolumeSlider ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
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

