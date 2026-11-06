import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Send } from 'lucide-react';
import { romanticContent } from '../data/content';
import { fireCelebrationConfetti } from '../components/Confetti';

export default function Welcome({ onNext, onUserInteraction }) {
  const [isOpening, setIsOpening] = useState(false);
  const { welcome, personal } = romanticContent;

  const handleOpenEnvelope = () => {
    onUserInteraction?.();
    setIsOpening(true);
    fireCelebrationConfetti();
    setTimeout(() => {
      onNext();
    }, 1800);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-12 select-none">
      
      {/* Gentle Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="glass-panel px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-6 border border-rose-200/60 shadow-sm"
      >
        <Sparkles className="w-4 h-4 text-rose-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="text-xs sm:text-sm font-semibold text-rose-800 tracking-wide">
          {welcome.tagline}
        </span>
      </motion.div>

      {/* Main Serif Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-romantic-gradient mb-3 drop-shadow-sm leading-tight max-w-2xl"
      >
        {welcome.title}
      </motion.h1>

      {/* Romantic Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-base sm:text-lg text-rose-700/80 font-medium max-w-lg mb-8 leading-relaxed"
      >
        {welcome.subtitle}
      </motion.p>

      {/* Interactive 3D Envelope */}
      <div className="relative my-4 perspective-1000 cursor-pointer" onClick={handleOpenEnvelope}>
        <motion.div
          animate={isOpening ? { scale: [1, 1.08, 1.02] } : { y: [0, -8, 0] }}
          transition={isOpening ? { duration: 0.6 } : { repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative w-64 h-44 sm:w-72 sm:h-48 rounded-2xl bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 shadow-2xl border-2 border-white/80 p-3 flex flex-col justify-end items-center overflow-hidden"
        >
          {/* Envelope Envelope Flap (Triangle Top) */}
          <motion.div
            animate={isOpening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: "top center" }}
            className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-rose-300/80 to-pink-200/90 shadow-md clip-path-triangle"
          />

          {/* Letter Peeking Out */}
          <motion.div
            animate={isOpening ? { y: -80, opacity: 1 } : { y: 0, opacity: 0.9 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="w-52 sm:w-60 h-28 bg-white/95 rounded-xl shadow-lg border border-rose-100 p-3 flex flex-col items-center justify-center text-center -translate-y-2 z-10"
          >
            <span className="text-[11px] uppercase tracking-wider text-rose-400 font-bold mb-1">
              Private & Confidential
            </span>
            <p className="font-serif text-rose-900 text-sm sm:text-base font-bold">
              Dear {personal.girlfriendName} 💕
            </p>
            <p className="text-xs text-rose-600/80 italic mt-0.5">
              A magical surprise awaits you...
            </p>
          </motion.div>

          {/* Envelope Front Pocket */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-pink-300/90 to-rose-200/95 border-t border-white/60 z-20 flex items-center justify-center">
            {/* Wax Heart Seal */}
            <motion.div
              animate={{ scale: isOpening ? [1, 1.4, 0] : [1, 1.1, 1] }}
              transition={isOpening ? { duration: 0.5 } : { repeat: Infinity, duration: 2 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-600 to-pink-600 shadow-md flex items-center justify-center text-white border-2 border-rose-300 ring-4 ring-rose-200/50"
            >
              <Heart className="w-6 h-6 fill-white text-white drop-shadow" />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Sparkles around envelope */}
        <div className="absolute -top-3 -right-3 text-gold-400 animate-sway">
          ✨
        </div>
        <div className="absolute -bottom-2 -left-3 text-rose-400 animate-sway" style={{ animationDelay: '1.5s' }}>
          💖
        </div>
      </div>

      {/* Envelope Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-xs text-rose-500/80 font-medium mt-4 mb-6"
      >
        {welcome.envelopeHint}
      </motion.p>

      {/* Main Action Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={handleOpenEnvelope}
        className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-base sm:text-lg shadow-xl shadow-rose-400/30 hover:shadow-rose-400/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 overflow-hidden"
      >
        <span className="relative z-10">{welcome.openButtonText}</span>
        <Sparkles className="w-5 h-5 relative z-10 text-yellow-200 group-hover:rotate-45 transition-transform" />
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      </motion.button>

      {/* Clip-path styles for triangle envelope flap */}
      <style>{`
        .clip-path-triangle {
          clip-path: polygon(0 0, 100% 0, 50% 100%);
        }
      `}</style>
    </div>
  );
}

