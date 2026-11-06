import confetti from 'canvas-confetti';

/**
 * Fires celebratory romantic confetti with pinks, golds, and rose petals
 */
export function fireCelebrationConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#f43f72', '#fb7185', '#fda4af', '#f472b6', '#e879f9', '#fbbf24', '#ffffff'],
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 30,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.1,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.3,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

/**
 * Fireworks style bursts from bottom edges
 */
export function fireHeartsShower() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#f43f72', '#fda4af', '#fbbf24', '#d8b4fe'],
    });
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#f43f72', '#fda4af', '#fbbf24', '#d8b4fe'],
    });
  }, 250);
}

