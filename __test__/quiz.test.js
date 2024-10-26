import { startQuiz, checkAnswer, endQuiz, displayHighScores, resetQuiz, loadQuestion, init } from '../js/script.js';
import jest from 'jest-mock';



describe('Quiz App Basic Functionality', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="name-prompt"><input id="player-name" value="Test Player"/><button id="start-btn">Start</button></div>
      <div id="quiz-container" class="hidden"><h2 id="question"></h2><div id="options"></div></div>
      <div id="result-container" class="hidden"><p id="result-text"></p><div id="scores-list"></div></div>
    `;
  });

describe('startQuiz', () => {
  test('[startQuiz]', () => {
    expect(startQuiz).toBeDefined();
  });

  test('[startQuiz] must be a function', () => {
    expect(typeof startQuiz).toBe('function');
  });

});

describe('checkAnswer', () => {
  test('[checkAnswer]', () => {
    expect(checkAnswer).toBeDefined();
  });

  test('[checkAnswer] must be a function', () => {
    expect(typeof checkAnswer).toBe('function');
  });
})

describe('endQuiz', () => {
  test('[endQuiz]', () => {
    expect(endQuiz).toBeDefined();
  });

  test('[endQuiz] must be a function', () => {
    expect(typeof endQuiz).toBe('function');
  });
})

describe('displayHighScores', () => {
  test('[displayHighScores]', () => {
    expect(displayHighScores).toBeDefined();
  });

  test('[displayHighScores] must be a function', () => {
    expect(typeof displayHighScores).toBe('function');
  });
})

describe('resetQuiz', () => {
  test('[resetQuiz]', () => {
    expect(resetQuiz).toBeDefined();
  });

  test('[resetQuiz] must be a function', () => {
    expect(typeof resetQuiz).toBe('function');
  });
})

describe('loadQuestion', () => {
  test('[loadQuestion]', () => {
    expect(loadQuestion).toBeDefined();
  });

  test('[loadQuestion] must be a function', () => {
    expect(typeof loadQuestion).toBe('function');
  });
})

describe('init', () => {
  test('[init]', () => {
    expect(init).toBeDefined();
  });

  test('[init] must be a function', () => {
    expect(typeof init).toBe('function');
  });
})


  describe('Function Definitions and Types', () => {
    test('startQuiz is defined and is a function', () => {
      expect(startQuiz).toBeDefined();
      expect(typeof startQuiz).toBe('function');
    });

    test('checkAnswer is defined and is a function', () => {
      expect(checkAnswer).toBeDefined();
      expect(typeof checkAnswer).toBe('function');
    });

    test('endQuiz is defined and is a function', () => {
      expect(endQuiz).toBeDefined();
      expect(typeof endQuiz).toBe('function');
    });
  });

  describe('startQuiz Functionality', () => {
    test('startQuiz hides name-prompt and displays quiz-container', () => {
      startQuiz();
      expect(document.getElementById('name-prompt').classList.contains('hidden')).toBe(true);
      expect(document.getElementById('quiz-container').classList.contains('hidden')).toBe(false);
    });
  });


 // testing functionality of other functions
  describe('checkAnswer Functionality', () => {
    test('checkAnswer does not update the score for an incorrect answer', () => {
      const correctAnswer = 'A';
      const playerAnswer = 'B';
      let score = 0;

      const result = checkAnswer(playerAnswer, correctAnswer);
      if (result) {
        score++;
      }

      expect(score).toBe(0); 
    });
  });

describe('endQuiz Functionality', () => {
    test('endQuiz displays result-container and hides quiz-container', () => {
      endQuiz();
      expect(document.getElementById('quiz-container').classList.contains('hidden')).toBe(true);
      expect(document.getElementById('result-container').classList.contains('hidden')).toBe(false);
    });
  });

  describe('displayHighScores Functionality', () => {
    test('displayHighScores shows high scores in scores-list', () => {
      const scores = [{ name: 'Test Player', score: 10 }];
      displayHighScores(scores);
      
      const scoresList = document.getElementById('scores-list').innerHTML;
      expect(scoresList).toContain('Test Player');
      expect(scoresList).toContain('10');
    });
  });

  describe('resetQuiz Functionality', () => {
    test('resetQuiz resets the quiz state', () => {
      resetQuiz();

      expect(document.getElementById('result-container').classList.contains('hidden')).toBe(true);
      expect(document.getElementById('quiz-container').classList.contains('hidden')).toBe(true);
      expect(document.getElementById('name-prompt').classList.contains('hidden')).toBe(false);
    });
  });

});
