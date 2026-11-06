import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Heart, Award, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { romanticContent } from '../data/content';
import { calculateQuizScore } from '../games/quizLogic';
import { fireCelebrationConfetti } from '../components/Confetti';

export default function LoveQuiz({ onNext }) {
  const { quiz } = romanticContent;
  const questions = quiz.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
    setIsAnswered(true);

    if (optionIndex === currentQ.correctIndex) {
      fireCelebrationConfetti();
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswered(false);
    } else {
      setIsQuizFinished(true);
      fireCelebrationConfetti();
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsAnswered(false);
    setIsQuizFinished(false);
  };

  const result = calculateQuizScore(selectedAnswers, questions);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-12 select-none">
      
      {/* Quiz Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mb-6"
      >
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-rose-500 uppercase flex items-center justify-center gap-1.5 mb-1">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>Romantic Memory Quiz</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-romantic-gradient">
          {quiz.title}
        </h2>
        <p className="text-xs sm:text-sm text-rose-700/80 font-medium mt-1">
          {quiz.subtitle}
        </p>
      </motion.div>

      {/* Main Quiz Body */}
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!isQuizFinished ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-6 rounded-3xl border border-rose-200 shadow-xl text-left"
            >
              {/* Progress Bar & Counter */}
              <div className="flex items-center justify-between mb-4 text-xs font-semibold text-rose-600">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span>{Math.round(((currentIndex) / questions.length) * 100)}% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-rose-100 rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="font-serif text-lg sm:text-xl font-bold text-rose-950 mb-5 leading-snug">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentIndex] === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  
                  let btnStyle = "bg-white/80 hover:bg-rose-50/80 border-rose-100 text-gray-700";
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 shadow-sm ring-1 ring-emerald-300";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-100 border-rose-400 text-rose-900 ring-1 ring-rose-300";
                    } else {
                      btnStyle = "bg-white/40 border-gray-100 text-gray-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl border text-sm sm:text-base font-medium flex items-center justify-between transition-all duration-200 text-left ${btnStyle} ${
                        !isAnswered ? 'hover:scale-[1.01] active:scale-[0.99]' : ''
                      }`}
                    >
                      <span className="pr-3 leading-relaxed">{option}</span>
                      {isAnswered && (
                        <span>
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Next Button */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-2 border-t border-rose-100 flex flex-col gap-3"
                >
                  <p className="text-xs sm:text-sm font-medium text-rose-700 italic bg-rose-50/70 p-3 rounded-xl border border-rose-100">
                    💖 {currentQ.sweetFeedback}
                  </p>

                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>{currentIndex + 1 < questions.length ? "Next Question" : "See Final Score ✨"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Final Score Card */
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-rose-200 shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-300/40">
                <Award className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950 mb-1">
                Quiz Complete! 💖
              </h3>
              
              <div className="my-4">
                <span className="text-4xl sm:text-5xl font-black text-romantic-gradient font-serif">
                  {result.score} / {result.total}
                </span>
                <p className="text-xs sm:text-sm font-bold text-rose-500 mt-1 uppercase tracking-wider">
                  ({result.percentage}% Match)
                </p>
              </div>

              <p className="text-sm sm:text-base text-gray-700 font-medium max-w-md mx-auto mb-6 leading-relaxed">
                {result.isPerfect
                  ? quiz.resultMessages.perfect
                  : result.isGood
                  ? quiz.resultMessages.high
                  : quiz.resultMessages.good}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  onClick={handleRestartQuiz}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-rose-300 bg-white/80 text-rose-700 font-semibold text-xs sm:text-sm hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Quiz</span>
                </button>

                <button
                  onClick={onNext}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>{quiz.continueButtonText}</span>
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

