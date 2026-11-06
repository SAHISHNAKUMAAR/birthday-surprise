import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Feather, ArrowRight, BookOpen } from 'lucide-react';
import { romanticContent } from '../data/content';
import { fireCelebrationConfetti } from '../components/Confetti';

export default function LoveLetter({ onNext }) {
  const { letter, personal } = romanticContent;
  const [isOpen, setIsOpen] = useState(false);
  const [typewriterParagraphs, setTypewriterParagraphs] = useState([]);
  const [currentParagraphIdx, setCurrentParagraphIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const paragraphs = letter.bodyParagraphs;

  const handleOpenLetter = () => {
    setIsOpen(true);
    fireCelebrationConfetti();
  };

  // Typewriter effect after opening letter
  useEffect(() => {
    if (!isOpen) return;

    if (currentParagraphIdx >= paragraphs.length) {
      setIsTypingComplete(true);
      return;
    }

    const currentTarget = paragraphs[currentParagraphIdx];

    if (currentCharIdx < currentTarget.length) {
      const timer = setTimeout(() => {
        setTypewriterParagraphs((prev) => {
          const updated = [...prev];
          const currentText = (updated[currentParagraphIdx] || '') + currentTarget[currentCharIdx];
          updated[currentParagraphIdx] = currentText;
          return updated;
        });
        setCurrentCharIdx((c) => c + 1);
      }, 14); // smooth typing speed
      return () => clearTimeout(timer);
    } else {
      // Completed current paragraph, move to next
      const timer = setTimeout(() => {
        setCurrentParagraphIdx((p) => p + 1);
        setCurrentCharIdx(0);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentParagraphIdx, currentCharIdx, paragraphs]);

  // Quick skip typing animation if user wants to read immediately
  const handleSkipTyping = () => {
    setTypewriterParagraphs(paragraphs);
    setIsTypingComplete(true);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-12 select-none">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mb-6"
      >
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-rose-500 uppercase flex items-center justify-center gap-1.5 mb-1">
          <Feather className="w-3.5 h-3.5 text-rose-500" />
          <span>Handwritten From The Heart</span>
          <Feather className="w-3.5 h-3.5 text-rose-500" />
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-romantic-gradient">
          {letter.title}
        </h2>
        <p className="text-xs sm:text-sm text-rose-700/80 font-medium mt-1">
          {letter.subtitle}
        </p>
      </motion.div>

      {/* Main Container */}
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Letter Scroll / Card */
            <motion.div
              key="closed"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              className="glass-card p-8 rounded-3xl border border-rose-200 shadow-2xl flex flex-col items-center cursor-pointer hover:shadow-rose-300/40 transition-all group"
              onClick={handleOpenLetter}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-xl mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 fill-white animate-pulse" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-rose-950 mb-1">
                A Letter For You
              </h3>
              <p className="text-xs text-rose-600/80 italic mb-6">
                Click to break the wax seal and unfold my words
              </p>

              <button
                className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm shadow-md group-hover:shadow-lg transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Letter 💌</span>
              </button>
            </motion.div>
          ) : (
            /* Unfolded Parchment / Letter Card */
            <motion.div
              key="opened"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative bg-gradient-to-b from-rose-50/95 via-white to-pink-50/95 p-6 sm:p-10 rounded-3xl border-2 border-rose-200/80 shadow-2xl text-left"
              style={{
                boxShadow: '0 20px 45px -10px rgba(244, 63, 114, 0.25), 0 0 25px rgba(255, 255, 255, 0.8) inset',
              }}
            >
              {/* Skip Typing Button if still animating */}
              {!isTypingComplete && (
                <button
                  onClick={handleSkipTyping}
                  className="absolute top-4 right-4 text-[11px] font-semibold text-rose-500 bg-rose-100/60 hover:bg-rose-100 px-3 py-1 rounded-full border border-rose-200 transition-colors"
                >
                  Show Full Letter ⚡
                </button>
              )}

              {/* Salutation */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-900 mb-4 tracking-wide">
                {letter.salutation}
              </h3>

              {/* Typewritten Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed font-sans font-normal">
                {typewriterParagraphs.map((para, i) => (
                  <p key={i} className="transition-opacity duration-300">
                    {para}
                    {i === currentParagraphIdx && !isTypingComplete && (
                      <span className="inline-block w-1.5 h-4 bg-rose-500 ml-1 animate-pulse" />
                    )}
                  </p>
                ))}
              </div>

              {/* Signoff */}
              <div className="mt-8 pt-6 border-t border-rose-200/60 flex flex-col items-end">
                <span className="text-xs sm:text-sm text-rose-600 font-medium italic">
                  {letter.signoff}
                </span>
                <span className="font-script text-2xl sm:text-3xl text-rose-800 font-bold mt-1">
                  {letter.signature}
                </span>
              </div>

              {/* Continue Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={onNext}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-400/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>{letter.continueButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

