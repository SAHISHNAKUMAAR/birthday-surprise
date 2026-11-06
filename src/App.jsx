import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Global Components
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';

// Scenes
import Welcome from './scenes/Welcome';
import Birthday from './scenes/Birthday';
import LoveQuiz from './scenes/LoveQuiz';
import CatchHeart from './scenes/CatchHeart';
import UnlockHeart from './scenes/UnlockHeart';
import LoveLetter from './scenes/LoveLetter';
import FinalSurprise from './scenes/FinalSurprise';

export default function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const [maxReachedScene, setMaxReachedScene] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Mark user interaction (to kick off audio and animations)
  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handleNext = () => {
    handleInteraction();
    setCurrentScene((prev) => {
      const next = Math.min(prev + 1, 7);
      setMaxReachedScene((m) => Math.max(m, next));
      return next;
    });
  };

  const handlePrev = () => {
    handleInteraction();
    setCurrentScene((prev) => Math.max(prev - 1, 1));
  };

  const handleSelectScene = (sceneId) => {
    handleInteraction();
    if (sceneId <= maxReachedScene) {
      setCurrentScene(sceneId);
    }
  };

  const handleReplay = () => {
    handleInteraction();
    setCurrentScene(1);
  };

  // Determine transition animations between scenes
  const pageVariants = {
    initial: { opacity: 0, scale: 0.98, y: 15 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 1.02, y: -15, transition: { duration: 0.35, ease: "easeIn" } },
  };

  return (
    <div
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden"
    >
      {/* Background Animated Floating Hearts & Glowing Light Orbs */}
      <FloatingHearts />

      {/* Top Header: Progress Bar & Music Player */}
      <header className="relative z-40 w-full pt-2">
        <ProgressBar
          currentScene={currentScene}
          maxReachedScene={maxReachedScene}
          onSelectScene={handleSelectScene}
        />
        <MusicPlayer hasInteracted={hasInteracted} />
      </header>

      {/* Scene Render Arena with Framer Motion AnimatePresence */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 pb-20 pt-16">
        <AnimatePresence mode="wait">
          {currentScene === 1 && (
            <motion.div key="scene-1" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <Welcome onNext={handleNext} onUserInteraction={handleInteraction} />
            </motion.div>
          )}

          {currentScene === 2 && (
            <motion.div key="scene-2" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <Birthday onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 3 && (
            <motion.div key="scene-3" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <LoveQuiz onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 4 && (
            <motion.div key="scene-4" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <CatchHeart onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 5 && (
            <motion.div key="scene-5" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <UnlockHeart onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 6 && (
            <motion.div key="scene-6" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <LoveLetter onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 7 && (
            <motion.div key="scene-7" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <FinalSurprise onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Bottom Navigation (back button, etc.) */}
      <Navigation
        currentScene={currentScene}
        totalScenes={7}
        maxReachedScene={maxReachedScene}
        onPrev={handlePrev}
        onNext={handleNext}
        canAdvance={currentScene < maxReachedScene}
        nextLabel="Continue 💕"
      />
    </div>
  );
}

