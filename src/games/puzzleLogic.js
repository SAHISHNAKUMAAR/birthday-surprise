/**
 * Romantic Riddle Validation and Logic
 */

export function normalizeAnswer(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"“”]/g, '')
    .replace(/\s+/g, ' ');
}

export function validateRiddleAnswer(input, riddle) {
  const normalized = normalizeAnswer(input);
  if (!normalized) return false;

  return riddle.acceptableAnswers.some((acceptable) => {
    const cleanAcceptable = normalizeAnswer(acceptable);
    return normalized === cleanAcceptable || normalized.includes(cleanAcceptable);
  });
}

