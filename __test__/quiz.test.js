import { startQuiz, checkAnswer, endQuiz, displayHighScores, resetQuiz, loadQuestion, init } from '../js/script.js';

describe('startQuiz', () => {
  test('[startQuiz]', () => {
    expect(startQuiz).toBeDefined();
    expect(typeof startQuiz).toBe('function');
  });

  test('[startQuiz] must be a function', () => {
    expect(typeof startQuiz).toBe('function');
  });
});
