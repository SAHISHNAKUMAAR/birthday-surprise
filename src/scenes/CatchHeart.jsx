import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trophy, Sparkles, RotateCcw, ArrowRight, Play } from 'lucide-react';
import { romanticContent } from '../data/content';
import { GAME_STATUS, createHeartItem, checkBasketCollision } from '../games/catchHeartLogic';
import { fireCelebrationConfetti } from '../components/Confetti';

export default function CatchHeart({ onNext }) {
  const { catchGame } = romanticContent;

  const [gameState, setGameState] = useState(GAME_STATUS.IDLE);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(catchGame.maxLives);
  const [fallingHearts, setFallingHearts] = useState([]);
  const [basketX, setBasketX] = useState(150);

  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastSpawnTimeRef = useRef(0);
  const heartIdCounterRef = useRef(1);

  const basketWidth = 90;
  const basketHeight = 36;

  // Start or reset game
  const startGame = () => {
    setScore(0);
    setLives(catchGame.maxLives);
    setFallingHearts([]);
    setGameState(GAME_STATUS.PLAYING);
    lastSpawnTimeRef.current = Date.now();
  };

  // Handle pointer/touch drag inside game area
  const handlePointerMove = (e) => {
    if (gameState !== GAME_STATUS.PLAYING || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const relX = clientX - rect.left - basketWidth / 2;
    const boundedX = Math.max(0, Math.min(rect.width - basketWidth, relX));
    setBasketX(boundedX);
  };

  // Direct tap catch bonus
  const handleHeartClick = (heart, e) => {
    e.stopPropagation();
    if (gameState !== GAME_STATUS.PLAYING) return;
    catchHeart(heart);
  };

  const catchHeart = (heart) => {
    setFallingHearts((prev) => prev.filter((h) => h.id !== heart.id));
    setScore((prevScore) => {
      const nextScore = prevScore + heart.points;
      if (nextScore >= catchGame.targetScore) {
        setGameState(GAME_STATUS.WON);
        fireCelebrationConfetti();
      }
      return nextScore;
    });
  };

  // Main Game Loop using requestAnimationFrame
  useEffect(() => {
    if (gameState !== GAME_STATUS.PLAYING) return;

    let isMounted = true;

    const gameLoop = (timestamp) => {
      if (!isMounted || !containerRef.current) return;

      const containerHeight = containerRef.current.clientHeight || 450;
      const containerWidth = containerRef.current.clientWidth || 360;
      const basket = {
        x: basketX,
        y: containerHeight - basketHeight - 12,
        width: basketWidth,
        height: basketHeight,
      };

      // 1. Spawning new hearts
      const now = Date.now();
      if (now - lastSpawnTimeRef.current > 750) {
        lastSpawnTimeRef.current = now;
        const newHeart = createHeartItem(heartIdCounterRef.current++, containerWidth);
        setFallingHearts((prev) => [...prev, newHeart]);
      }

      // 2. Update hearts position & collision detection
      setFallingHearts((prevHearts) => {
        const remaining = [];
        let lostLife = false;

        for (const heart of prevHearts) {
          const updatedHeart = {
            ...heart,
            y: heart.y + heart.speed,
            x: heart.x + Math.sin(timestamp * 0.003 + heart.swayOffset) * 0.8,
          };

          // Check if caught in basket
          if (checkBasketCollision(updatedHeart, basket)) {
            // caught!
            setScore((prevScore) => {
              const newScore = prevScore + updatedHeart.points;
              if (newScore >= catchGame.targetScore) {
                setGameState(GAME_STATUS.WON);
                fireCelebrationConfetti();
              }
              return newScore;
            });
            continue; // don't add back to remaining
          }

          // Check if fallen past bottom
          if (updatedHeart.y > containerHeight) {
            if (!updatedHeart.isGolden) {
              lostLife = true;
            }
            continue; // missed
          }

          remaining.push(updatedHeart);
        }

        if (lostLife) {
          setLives((prevLives) => {
            const nextLives = prevLives - 1;
            if (nextLives <= 0) {
              setGameState(GAME_STATUS.LOST);
            }
            return Math.max(0, nextLives);
          });
        }

        return remaining;
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      isMounted = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, basketX]);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-8 select-none">
      
      {/* Title */}
      <div className="max-w-md mb-3">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-romantic-gradient">
          {catchGame.title}
        </h2>
        <p className="text-xs sm:text-sm text-rose-700/80 font-medium">
          {catchGame.instructions}
        </p>
      </div>

      {/* Score & Lives Status Pill */}
      <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-6 mb-3 border border-rose-200 shadow-sm text-xs sm:text-sm font-bold text-rose-900">
        <div className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Score: <span className="text-rose-600 font-extrabold">{score}</span> / {catchGame.targetScore}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Lives:</span>
          <div className="flex gap-1">
            {[...Array(catchGame.maxLives)].map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 transition-transform ${
                  i < lives ? 'fill-rose-500 text-rose-500 scale-100' : 'fill-gray-300 text-gray-300 scale-90'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Game Arena */}
      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        className="relative w-full max-w-md h-[400px] sm:h-[450px] glass-card rounded-3xl border-2 border-rose-200/90 shadow-2xl overflow-hidden cursor-crosshair touch-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 241, 245, 0.9) 0%, rgba(254, 205, 220, 0.6) 100%)',
        }}
      >
        {/* Falling Hearts */}
        {gameState === GAME_STATUS.PLAYING &&
          fallingHearts.map((heart) => (
            <div
              key={heart.id}
              onClick={(e) => handleHeartClick(heart, e)}
              className="absolute cursor-pointer will-change-transform transition-transform active:scale-125"
              style={{
                left: `${heart.x}px`,
                top: `${heart.y}px`,
                width: `${heart.size}px`,
                height: `${heart.size}px`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className={`w-full h-full drop-shadow-md ${
                  heart.isGolden ? 'animate-sparkle text-amber-400 fill-amber-400 glow-gold' : 'text-rose-500 fill-rose-500 glow-pink'
                }`}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          ))}

        {/* Catcher Basket */}
        <div
          className="absolute bottom-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 shadow-xl border-2 border-white/90 flex items-center justify-center text-white text-xs font-bold transition-all duration-75 pointer-events-none"
          style={{
            left: `${basketX}px`,
            width: `${basketWidth}px`,
            height: `${basketHeight}px`,
          }}
        >
          <span className="flex items-center gap-1">
            💖 <span>Catch</span> 💖
          </span>
        </div>

        {/* Start Game Overlay */}
        {gameState === GAME_STATUS.IDLE && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-lg mb-3 animate-heartbeat">
              <Heart className="w-8 h-8 fill-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-rose-950 mb-1">
              Ready to catch my love?
            </h3>
            <p className="text-xs text-rose-700/80 mb-5 max-w-xs">
              Slide the basket or tap the falling hearts to reach {catchGame.targetScore} points!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-rose-400/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Game</span>
            </button>
          </div>
        )}

        {/* Won Game Modal */}
        {gameState === GAME_STATUS.WON && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 text-white flex items-center justify-center shadow-xl mb-3">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-rose-950 mb-1">
                {catchGame.winTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 font-medium my-3 max-w-xs italic leading-relaxed">
                "{catchGame.winMessage}"
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <button
                  onClick={startGame}
                  className="px-4 py-2 rounded-full border border-rose-300 bg-white text-rose-700 text-xs font-semibold hover:bg-rose-50 transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{catchGame.playAgainText}</span>
                </button>
                <button
                  onClick={onNext}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs sm:text-sm font-semibold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{catchGame.continueButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Lost Game Modal */}
        {gameState === GAME_STATUS.LOST && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="text-4xl mb-2">🥺</div>
            <h3 className="text-xl font-serif font-bold text-rose-950 mb-1">
              {catchGame.loseTitle}
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 my-2 max-w-xs italic">
              {catchGame.loseMessage}
            </p>
            <button
              onClick={startGame}
              className="mt-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

