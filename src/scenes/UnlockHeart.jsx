import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Key, HelpCircle, CheckCircle2, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { romanticContent } from '../data/content';
import { validateRiddleAnswer } from '../games/puzzleLogic';
import { fireCelebrationConfetti } from '../components/Confetti';

export default function UnlockHeart({ onNext }) {
  const { puzzle } = romanticContent;
  const riddles = puzzle.riddles;

  const [currentRiddleIdx, setCurrentRiddleIdx] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [unlockedLetters, setUnlockedLetters] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeRiddle = riddles[currentRiddleIdx];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const isCorrect = validateRiddleAnswer(inputValue, activeRiddle);

    if (isCorrect) {
      setSuccessAnimation(true);
      setErrorFeedback(false);
      fireCelebrationConfetti();

      const newUnlocked = [...unlockedLetters, activeRiddle.revealedLetter];
      setUnlockedLetters(newUnlocked);

      setTimeout(() => {
        setSuccessAnimation(false);
        setInputValue('');
        setShowHint(false);

        if (currentRiddleIdx + 1 < riddles.length) {
          setCurrentRiddleIdx((prev) => prev + 1);
        } else {
          setIsCompleted(true);
        }
      }, 1200);
    } else {
      setErrorFeedback(true);
      setTimeout(() => setErrorFeedback(false), 2000);
    }
  };

  const handleRestart = () => {
    setCurrentRiddleIdx(0);
    setInputValue('');
    setShowHint(false);
    setErrorFeedback(false);
    setSuccessAnimation(false);
    setUnlockedLetters([]);
    setIsCompleted(false);
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
          <Key className="w-3.5 h-3.5 text-rose-500" />
          <span>Romantic Puzzle Chamber</span>
          <Key className="w-3.5 h-3.5 text-rose-500" />
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-romantic-gradient">
          {puzzle.title}
        </h2>
        <p className="text-xs sm:text-sm text-rose-700/80 font-medium mt-1">
          {puzzle.subtitle}
        </p>
      </motion.div>

      {/* Secret Vault Display Card */}
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentRiddleIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-6 sm:p-7 rounded-3xl border border-rose-200 shadow-xl relative"
            >
              {/* Vault Padlock Icon */}
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={successAnimation ? { rotate: [0, -15, 15, 0], scale: 1.15 } : {}}
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                    successAnimation
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-tr from-rose-500 to-pink-400 text-white'
                  }`}
                >
                  {successAnimation ? <Unlock className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
                </motion.div>
              </div>

              {/* Secret Letters Assembled so far */}
              <div className="flex justify-center items-center gap-2 mb-5">
                <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">Vault Code:</span>
                <div className="flex gap-1.5">
                  {riddles.map((r, i) => (
                    <div
                      key={r.id}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm border ${
                        i < currentRiddleIdx || (i === currentRiddleIdx && successAnimation)
                          ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                          : 'bg-white/60 text-gray-400 border-rose-200'
                      }`}
                    >
                      {i < unlockedLetters.length ? unlockedLetters[i] : '?'}
                    </div>
                  ))}
                </div>
              </div>

              {/* Riddle Number Pill */}
              <div className="flex items-center justify-between text-xs font-semibold text-rose-600 mb-2">
                <span>Riddle {currentRiddleIdx + 1} of {riddles.length}</span>
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1 text-rose-500 hover:text-rose-700 underline font-medium"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
                </button>
              </div>

              {/* Riddle Question */}
              <p className="font-serif text-base sm:text-lg font-bold text-rose-950 mb-4 leading-relaxed italic bg-rose-50/60 p-4 rounded-2xl border border-rose-100">
                "{activeRiddle.question}"
              </p>

              {/* Hint Box */}
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-4 text-xs font-medium text-amber-800 bg-amber-50/90 border border-amber-200 p-3 rounded-xl text-left"
                >
                  💡 <strong>Hint:</strong> {activeRiddle.hint}
                </motion.div>
              )}

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your answer here..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-medium transition-all outline-none bg-white/90 text-gray-800 placeholder:text-gray-400 ${
                      errorFeedback
                        ? 'border-rose-500 ring-2 ring-rose-200 bg-rose-50/50 animate-shake'
                        : 'border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200'
                    }`}
                  />
                </div>

                {errorFeedback && (
                  <p className="text-xs font-semibold text-rose-500">
                    Not quite! Give it another sweet thought or check the hint! 💫
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    inputValue.trim()
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md hover:scale-[1.01] active:scale-[0.99]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Answer</span>
                </button>
              </form>

            </motion.div>
          ) : (
            /* All Riddles Solved - Secret Vault Message */
            <motion.div
              key="vault-opened"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-rose-200 shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-rose-300/50 animate-pulse-glow">
                <Unlock className="w-8 h-8" />
              </div>

              <div className="flex justify-center gap-2 mb-3">
                {['L', 'O', 'V', 'E'].map((letter, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.15 }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white font-serif font-black text-xl flex items-center justify-center shadow-md"
                  >
                    {letter}
                  </motion.div>
                ))}
              </div>

              <h3 className="font-serif text-2xl font-bold text-rose-950 mb-2">
                {puzzle.vaultSuccessTitle}
              </h3>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium italic my-4 bg-rose-50/70 p-4 rounded-2xl border border-rose-100">
                "{puzzle.vaultSuccessMessage}"
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
                <button
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-rose-300 bg-white text-rose-700 font-semibold text-xs sm:text-sm hover:bg-rose-50 transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Puzzle</span>
                </button>

                <button
                  onClick={onNext}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>{puzzle.continueButtonText}</span>
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

