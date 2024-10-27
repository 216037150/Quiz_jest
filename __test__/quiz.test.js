
import jest from 'jest-mock';
import { 
       startQuiz, checkAnswer, endQuiz,
       displayHighScores, resetQuiz, 
       loadQuestion, init, HelloPlusName,
       questions
      } 
      
      from '../js/script.js';

describe('Quiz App Basic Functionality', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="name-prompt"><input id="player-name" value="Test Player"/><button id="start-btn">Start</button></div>
      <div id="quiz-container" class="hidden"><h2 id="question"></h2><div id="options"></div></div>
      <div id="result-container" class="hidden"><p id="result-text"></p><div id="scores-list"></div></div>
      <p id="myName"></p> 

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

// Testing the HelloPlusName function with jsdom
const Utils = {
  getCurrentPlayer: jest.fn(),
};

describe('HelloPlusName', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="quiz-container">
      </div>
      <div id="myName"></div>
    `;

    Utils.getCurrentPlayer.mockReturnValue('TestPlayer');
  });

  it('should update myName element with player name and apply styles', () => {
    HelloPlusName(); 

    const myName = document.getElementById('myName');
    const quizContainer = document.getElementById('quiz-container');

    expect(myName.textContent).toBe('Hello, Test Player!');
    expect(myName.style.marginBottom).toBe('50px');
    expect(myName.style.marginTop).toBe('-5px');
    expect(myName.style.color).toBe('Red');
    expect(quizContainer.firstChild).toBe(myName);
  });
});

//Testing a question is an array
// This array must contain an object with questions and options properties
describe('[questions] must be an array', () => {
  test('should have a questions property', () => {
    expect(questions).toBeDefined();
  });

  test('[questions] property should be an array', () => {
    expect(Array.isArray(questions)).toBe(true);
  });

  test('questions array should have a length of 4', () => {
    expect(questions).toHaveLength(4);
  });

  test('each question should have question and options properties', () => {
    questions.forEach((question) => {
      expect(question).toHaveProperty('question');
      expect(question).toHaveProperty('options');
    });
  });

  test('each question should have a string question', () => {
    questions.forEach((question) => {
      expect(typeof question.question).toBe('string');
    });
  });

  test('each question should have exactly four options', () => {
    questions.forEach((question) => {
      expect(Array.isArray(question.options)).toBe(true);
      expect(question.options).toHaveLength(4);
    });
  });

  test('questions array should contain valid structure', () => {
    expect(questions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          question: expect.any(String),
          options: expect.arrayContaining([expect.any(String)]),
        }),
      ])
    );
  });
});


// Test quiz question
describe('Question Structure', () => {
  test('questions should have a question and options properties', () => {
    questions.forEach(question => {
      expect(typeof question.question).toBe('string');
      expect(Array.isArray(question.options)).toBe(true);
    });
  });

  test('questions should have exactly four options', () => {
    questions.forEach(question => {
      expect(question.options.length).toBe(4);
    });
  });
});



// Test loading questions
describe('loadQuestion', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="question"></div>
      <div id="options"></div>
    `;
  });

  it('should load a question and its options', () => {
    loadQuestion(0); 

    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');

    expect(questionElement.textContent).toBe(questions[0].question);
    expect(optionsElement.children.length).toBe(questions[0].options.length);

    // Create buttons for each option
    questions[0].options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option;
      optionsElement.appendChild(button);
    });

    for (let i = 0; i < questions[0].options.length; i++) {
      expect(optionsElement.children[i].textContent).toBe(questions[0].options[i]);
    }
  });
});

});
