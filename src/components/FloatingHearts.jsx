import React, { useMemo } from 'react';

export default function FloatingHearts() {
  // Generate a deterministic set of floating particles & hearts for performance
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      size: 14 + (i % 5) * 6, // 14px to 38px
      left: `${(i * 4.2 + (i % 7) * 9) % 96 + 2}%`,
      delay: (i * 0.7) % 8,
      duration: 10 + (i % 6) * 3, // 10s to 25s
      opacity: 0.2 + (i % 4) * 0.15,
      type: i % 3 === 0 ? 'sparkle' : 'heart',
      color: i % 2 === 0 ? '#f43f72' : '#c084fc',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Background Soft Radiant Gradient Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-200/40 blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-lavender-200/40 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Floating Particles and Hearts */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute will-change-transform"
          style={{
            left: p.left,
            bottom: '-40px',
            animation: `floatUpwards ${p.duration}s infinite linear`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        >
          {p.type === 'heart' ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={p.color}
              className="drop-shadow-sm filter transition-transform"
              style={{
                transform: `rotate(${((p.id * 15) % 40) - 20}deg)`,
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <div
              style={{
                width: `${p.size * 0.4}px`,
                height: `${p.size * 0.4}px`,
                backgroundColor: p.color,
                borderRadius: '50%',
                boxShadow: `0 0 12px ${p.color}`,
              }}
              className="animate-sparkle"
            />
          )}
        </div>
      ))}

      {/* CSS Keyframe for floating upwards */}
      <style>{`
        @keyframes floatUpwards {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-115vh) rotate(360deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

