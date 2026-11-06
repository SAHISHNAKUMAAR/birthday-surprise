import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, Heart, ArrowRight } from 'lucide-react';
import { romanticContent } from '../data/content';
import { fireCelebrationConfetti, fireHeartsShower } from '../components/Confetti';

export default function Birthday({ onNext }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const { birthday, personal } = romanticContent;

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    fireCelebrationConfetti();
    setTimeout(() => {
      fireHeartsShower();
    }, 400);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-12 select-none">
      
      {/* Celebration Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mb-6"
      >
        <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-rose-500 mb-2 inline-block">
          Celebrating {personal.birthdayDate} ✨
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-romantic-gradient leading-tight mb-2">
          {birthday.heading}
        </h1>
        <p className="text-sm sm:text-base text-rose-700/80 font-medium max-w-lg mx-auto">
          {birthday.subheading}
        </p>
      </motion.div>

      {/* Pure CSS Animated Birthday Cake */}
      <div className="relative my-6 flex flex-col items-center cursor-pointer" onClick={handleBlowCandles}>
        
        {/* 3 Candles */}
        <div className="flex items-end justify-center gap-6 sm:gap-8 -mb-1 relative z-20">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              
              {/* Flame or Smoke */}
              <div className="h-9 flex items-center justify-center relative">
                {!candlesBlown ? (
                  <div
                    className="candle-flame w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100"
                    style={{
                      animationDelay: `${idx * 0.25}s`,
                      filter: 'drop-shadow(0 0 8px #fbbf24)',
                    }}
                  />
                ) : (
                  <div className="smoke-puff w-2.5 h-6 rounded-full bg-gray-300/60 blur-[1px]" />
                )}
              </div>

              {/* Wick */}
              <div className="w-0.5 h-2.5 bg-gray-700" />

              {/* Candle Body */}
              <div
                className={`w-3.5 sm:w-4 h-12 rounded-t-sm shadow-md border-t border-white/50 ${
                  idx === 1
                    ? 'h-14 bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300'
                    : 'bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300'
                }`}
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.6) 4px, rgba(255,255,255,0.6) 8px)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Cake Tier (Upper Layer) */}
        <div className="relative z-10 w-44 sm:w-52 h-14 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 rounded-t-2xl shadow-md border-t-2 border-white/80 flex items-center justify-around overflow-hidden px-2">
          {/* Icing Drips */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/90 rounded-b-xl shadow-sm flex justify-between px-1">
            <span className="w-4 h-4 bg-white rounded-full -mt-1" />
            <span className="w-5 h-6 bg-white rounded-full -mt-1" />
            <span className="w-4 h-5 bg-white rounded-full -mt-1" />
            <span className="w-5 h-6 bg-white rounded-full -mt-1" />
            <span className="w-4 h-4 bg-white rounded-full -mt-1" />
          </div>
          {/* Heart Sugar Pearls */}
          <span className="text-rose-400 text-xs">💖</span>
          <span className="text-pink-400 text-xs">✨</span>
          <span className="text-rose-400 text-xs">💖</span>
        </div>

        {/* Cake Tier (Base Layer) */}
        <div className="relative z-10 w-56 sm:w-64 h-20 bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 rounded-t-2xl shadow-xl border-t-2 border-pink-100/90 flex flex-col justify-end items-center pb-2">
          {/* Decorative frosting flowers (pure CSS circles) */}
          <div className="flex gap-2 mb-2">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="w-3.5 h-3.5 rounded-full bg-white/90 shadow-sm border border-rose-200" />
            ))}
          </div>
          <span className="text-[11px] font-serif font-bold text-rose-800 tracking-wider">
            {personal.girlfriendNickname}
          </span>
        </div>

        {/* Cake Stand / Plate */}
        <div className="w-68 sm:w-76 h-4 bg-gradient-to-r from-white via-rose-100 to-white rounded-full shadow-2xl border border-rose-200/60 -mt-1" />
        <div className="w-24 h-4 bg-gradient-to-r from-rose-100 via-white to-rose-100 rounded-b-lg shadow-sm border border-rose-200/40" />

      </div>

      {/* Cake Instruction / Wish prompt */}
      <AnimatePresence mode="wait">
        {!candlesBlown ? (
          <motion.div
            key="unblown"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-3 my-4"
          >
            <p className="text-xs sm:text-sm text-rose-600 font-medium italic">
              {birthday.cakeInstruction}
            </p>
            <button
              onClick={handleBlowCandles}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-300/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Wind className="w-4 h-4" />
              <span>{birthday.blowButtonText}</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="blown"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg my-4 glass-card p-5 rounded-3xl border border-rose-200/80 shadow-xl"
          >
            <div className="flex items-center justify-center gap-1.5 text-amber-500 text-lg mb-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="font-serif font-bold text-rose-900">A Wish Made With Love</span>
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            
            <p className="text-sm sm:text-base font-semibold text-rose-800 mb-3">
              {birthday.blownSuccessMessage}
            </p>
            
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic mb-5">
              "{birthday.romanticNote}"
            </p>

            <button
              onClick={onNext}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-400/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <span>{birthday.continueButtonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

