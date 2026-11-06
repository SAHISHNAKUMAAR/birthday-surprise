/**
 * Quiz game state and validation logic
 */

export function calculateQuizScore(userAnswers, questions) {
  let score = 0;
  questions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctIndex) {
      score += 1;
    }
  });
  return {
    score,
    total: questions.length,
    percentage: Math.round((score / questions.length) * 100),
    isPerfect: score === questions.length,
    isGood: score >= Math.ceil(questions.length * 0.7),
  };
}

