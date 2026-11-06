import React from 'react';
import { motion } from 'framer-motion';

const SCENE_ICONS = [
  { id: 1, label: "Welcome", icon: "💌" },
  { id: 2, label: "Birthday", icon: "🎂" },
  { id: 3, label: "Our Story", icon: "💭" },
  { id: 4, label: "Catch Hearts", icon: "🏹" },
  { id: 5, label: "Secret Code", icon: "🔐" },
  { id: 6, label: "Love Letter", icon: "📜" },
  { id: 7, label: "Forever", icon: "💖" },
];

export default function ProgressBar({ currentScene, maxReachedScene, onSelectScene }) {
  const progressPercent = ((currentScene - 1) / (SCENE_ICONS.length - 1)) * 100;

  return (
    <div className="fixed top-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto z-40 max-w-lg w-auto pointer-events-auto">
      <div className="glass-panel px-3 py-2 sm:px-4 sm:py-2.5 rounded-full flex items-center justify-between sm:gap-3 shadow-lg border border-pink-200/70">
        
        {/* Progress Track Line */}
        <div className="relative flex items-center justify-between w-full">
          <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-1 bg-pink-100 rounded-full -z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Scene Step Icons */}
          {SCENE_ICONS.map((step) => {
            const isActive = currentScene === step.id;
            const isCompleted = step.id < currentScene;
            const isAccessible = step.id <= maxReachedScene;

            return (
              <button
                key={step.id}
                onClick={() => isAccessible && onSelectScene(step.id)}
                disabled={!isAccessible}
                title={`${step.label} (Scene ${step.id})`}
                className={`relative z-10 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-rose-500 text-white scale-110 shadow-md shadow-rose-400/50 ring-2 ring-rose-200'
                    : isCompleted
                    ? 'bg-rose-200/80 text-rose-800 hover:bg-rose-300 hover:scale-105'
                    : isAccessible
                    ? 'bg-white/90 text-gray-500 hover:bg-rose-50'
                    : 'bg-white/40 text-gray-300 cursor-not-allowed opacity-60'
                }`}
              >
                <span>{step.icon}</span>
                {isActive && (
                  <motion.span
                    layoutId="active-indicator"
                    className="absolute -inset-1 rounded-full border-2 border-rose-400 animate-pulse pointer-events-none"
                  />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}

