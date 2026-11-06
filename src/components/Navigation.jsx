import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function Navigation({
  currentScene,
  totalScenes = 7,
  maxReachedScene,
  onPrev,
  onNext,
  canAdvance = true,
  nextLabel = "Continue 💕",
}) {
  const showPrev = currentScene > 1;
  const isLastScene = currentScene === totalScenes;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center">
      <div className="flex items-center gap-3 pointer-events-auto">
        {showPrev && (
          <button
            onClick={onPrev}
            aria-label="Previous Scene"
            className="glass-panel px-4 py-2.5 rounded-full text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-md hover:bg-white/90 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-rose-500" />
            <span className="hidden sm:inline">Back</span>
          </button>
        )}

        {!isLastScene && (
          <button
            onClick={onNext}
            disabled={!canAdvance}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg transition-all duration-300 ${
              canAdvance
                ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white hover:shadow-rose-400/40 hover:scale-105 active:scale-95'
                : 'bg-gray-200/80 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>{nextLabel}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

