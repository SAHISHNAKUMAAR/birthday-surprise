import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, Check, Star } from 'lucide-react';
import { romanticContent } from '../data/content';
import { fireHeartsShower, fireCelebrationConfetti } from '../components/Confetti';

export default function FinalSurprise({ onReplay }) {
  const { finale, personal } = romanticContent;

  useEffect(() => {
    fireCelebrationConfetti();
    const timer = setTimeout(() => {
      fireHeartsShower();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-4 py-12 select-none">
      
      {/* Grand Glowing Animated Heart */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative my-4 flex items-center justify-center"
      >
        {/* Multi-layered Soft Glowing Auras */}
        <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-rose-400/30 blur-2xl animate-pulse-glow" />
        <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-pink-400/40 blur-xl animate-pulse" />

        {/* Pulsing CSS/SVG Heart */}
        <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 animate-heartbeat cursor-pointer" onClick={() => fireCelebrationConfetti()}>
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full fill-rose-500 text-rose-600 drop-shadow-[0_0_25px_rgba(244,63,114,0.7)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-white font-script text-xl sm:text-2xl font-bold drop-shadow">
            {personal.girlfriendNickname}
          </div>
        </div>
      </motion.div>

      {/* Romantic Headline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="max-w-xl mb-4"
      >
        <span className="glass-panel px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-rose-600 uppercase tracking-widest inline-flex items-center gap-1.5 mb-3 border border-rose-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{finale.badge}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-romantic-gradient leading-tight mb-3">
          {finale.headline}
        </h1>
        <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed italic max-w-lg mx-auto">
          "{finale.message}"
        </p>
      </motion.div>

      {/* Special Promises Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="w-full max-w-md glass-card p-5 sm:p-6 rounded-3xl border border-rose-200/80 shadow-xl my-4 text-left"
      >
        <h4 className="text-xs sm:text-sm font-serif font-bold text-rose-900 uppercase tracking-wider mb-3 text-center flex items-center justify-center gap-1.5">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>My Birthday Vows to You</span>
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        </h4>

        <div className="space-y-2.5">
          {finale.promises.map((promise, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
              <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span>{promise}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-rose-100 text-center">
          <p className="text-xs font-semibold text-rose-700 italic">
            {finale.birthdayWish}
          </p>
        </div>
      </motion.div>

      {/* Special Signature & Replay Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col items-center gap-4 mt-2"
      >
        <p className="font-script text-xl sm:text-2xl text-rose-700 font-semibold">
          {finale.specialSignature}
        </p>

        <button
          onClick={onReplay}
          className="px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-rose-400/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{finale.replayButtonText}</span>
        </button>
      </motion.div>

    </div>
  );
}

