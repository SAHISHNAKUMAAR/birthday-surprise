/**
 * Catch My Heart - Game engine and collision helpers
 */

export const GAME_STATUS = {
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  WON: 'WON',
  LOST: 'LOST',
};

export function createHeartItem(id, screenWidth = 400) {
  const isGolden = Math.random() < 0.22; // 22% chance of golden bonus heart
  const size = isGolden ? 36 : 30 + Math.floor(Math.random() * 12);
  const left = Math.max(10, Math.min(screenWidth - size - 20, Math.random() * (screenWidth - size)));
  const speed = 2.0 + Math.random() * 1.8; // Falling speed px per frame

  return {
    id,
    x: left,
    y: -size,
    size,
    speed,
    isGolden,
    points: isGolden ? 25 : 10,
    swayOffset: Math.random() * Math.PI * 2,
    swaySpeed: 0.03 + Math.random() * 0.03,
  };
}

export function checkBasketCollision(heart, basket) {
  // heart: { x, y, size }
  // basket: { x, y, width, height }
  const heartCenterX = heart.x + heart.size / 2;
  const heartBottomY = heart.y + heart.size;

  return (
    heartBottomY >= basket.y &&
    heartBottomY <= basket.y + basket.height + 15 &&
    heartCenterX >= basket.x - 10 &&
    heartCenterX <= basket.x + basket.width + 10
  );
}

