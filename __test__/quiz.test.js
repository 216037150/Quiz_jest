import { startQuiz, checkAnswer, endQuiz, displayHighScores, resetQuiz, loadQuestion, init } from '../js/script.js';

describe('startQuiz', () => {
  test('[startQuiz]', () => {
    expect(startQuiz).toBeDefined();
  });

  test('[startQuiz]', () => {
    expect(loadQuestion).toBeDefined();
  });

  test('[startQuiz]', () => {
    expect(resetQuiz).toBeDefined();
  });
})
