// Quiz Questions
const  questions = [
  {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
  },
  {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1
  },
  {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: 1
  },
  {
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
      correct: 1
  },
  {
        question: "Which language is primarily used for web development?",
        options: [ "Python", "JavaScript", "C++", "Java" ],
        correctAnswer: 1
  },
    {
        question: "What does HTML stand for?",
        options: [ "Hyper Text Markup Language", "Hot Mail", "How To Make Lasagna", "High Text Machine Language" ],
        correctAnswer: 0
    },
    {
        question: "What year was JavaScript created?",
        options: ["1995", "2000", "1989", "1998" ],
        correctAnswer: 0
    },
    {
        question: "Which company developed the Java programming language?",
        options: ["Microsoft", "Apple", "Sun Microsystems", "IBM" ],
        correctAnswer: 2
    },
    {
        question: "CSS stands for:",
        options: [ "Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets",  "Colorful Style Sheets" ],
        correctAnswer: 0
    },
    {
        question: "What is the correct way to link a CSS file in HTML?",
        options: [ "<link src='style.css'>", "<stylesheet>style.css</stylesheet>", "<link rel='stylesheet' href='style.css'>", "<css href='style.css'>" ],
        correctAnswer: 2
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: [ "<style>",  "<css>", "<script>",  "<design>" ],
        correctAnswer: 0
    },
    {
        question: "What does SQL stand for?",
        options: [ "Structured Query Language", "Stylish Question Language", "Statement Query Language", "Strong Query Language" ],
        correctAnswer: 0
    },
    {
        question: "Which tag is used to create a line break in HTML?",
        options: [ "<lb>", "<br>", "<break>", "<newline>" ],
        correctAnswer: 1
    }
  ];

// Utility functions for managing scores and player data
const Utils = {
  saveScore: function(name, score) {
      const highScores = this.getHighScores();
      const newScore = {
          name: name,
          score: score,
          date: new Date().toISOString()
      };
      
      highScores.push(newScore);
      highScores.sort((a, b) => b.score - a.score);
      
      // Keep only top 5 scores
      const topScores = highScores.slice(0, 5);
      localStorage.setItem('highScores', JSON.stringify(topScores));
  },

  getHighScores: function() {
      const scores = localStorage.getItem('highScores');
      return scores ? JSON.parse(scores) : [];
  },

  saveName: function(name) {
      localStorage.setItem('currentPlayer', name);
  },

  getCurrentPlayer: function() {
      return localStorage.getItem('currentPlayer');
  }
};

// Game state variables
let currentQuestion = 0;
let score = 0;

// Core quiz functions
function startQuiz() {
  const namePrompt = document.getElementById('name-prompt');
  const quizContainer = document.getElementById('quiz-container');
  const playerName = document.getElementById('player-name').value.trim();

  try {
      validatePlayerName(playerName);  
      Utils.saveName(playerName);
      namePrompt.classList.add('hidden');
      quizContainer.classList.remove('hidden');
      loadQuestion();
      HelloPlusName();
      nextButton()
  } catch (error) {
      console.error(error.message);
  }
}

function nextButton() {
  document.getElementById('next-btn').addEventListener('click', () => {
      currentQuestion++;
      if (currentQuestion >= questions.length) {
          endQuiz();
      } else {
          loadQuestion();
          document.getElementById('next-btn').classList.add('hidden');
      }
  });
}

function validatePlayerName(playerName) {
  if (!playerName || playerName.length === 0 || playerName.match(/^\s+$/))
     {
      alert('Please enter your name');
      throw new Error('Please enter your name');
    } else if (playerName.match(/^\d+$/)) {
      alert('Invalid input: Please enter a valid name, not a number.');
      throw new Error('Invalid input: Please enter a valid name, not a number.');
    } else if (playerName.match(/[^a-zA-Z0-9\s]/)) {
      alert('Invalid input: Please do not use special characters.');
      throw new Error('Invalid input: Please do not use special characters.');
  }
}


function HelloPlusName() {
  const quizContainer = document.getElementById('quiz-container');
  const myName = document.getElementById('myName');
  const playerName = Utils.getCurrentPlayer();

  myName.textContent = `Hello, ${playerName}!`;
  myName.style.marginBottom = '30px';
  myName.style.marginTop = '-5px';
  myName.style.color = 'green'; 
  quizContainer.insertBefore(myName, quizContainer.firstChild);
}


 
function loadQuestion() {
  if (currentQuestion >= questions.length) {
      endQuiz();
      return;
  }

  const question = questions[currentQuestion];
  document.getElementById('question').textContent = question.question;
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  for (let i = 0; i < question.options.length; i++) {
      const button = document.createElement('button');
      button.textContent = question.options[i];
      button.className = 'option-btn';
      button.onclick = () => checkAnswer(i);
      optionsContainer.appendChild(button);
  }
}


function checkAnswer(selectedOption) {
  const correct = questions[currentQuestion].correct;
  if (selectedOption === correct) {
      score++;
  }
  document.getElementById('next-btn').classList.remove('hidden');
}

function endQuiz() {
  const playerName = Utils.getCurrentPlayer();
  const quizContainer = document.getElementById('quiz-container');
  const resultContainer = document.getElementById('result-container');
  const resultText = document.getElementById('result-text');
  
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  
  const percentage = (score / questions.length) * 100;
  resultText.textContent = `${playerName}, you scored ${score} out of ${questions.length} (${percentage}%)`;
  
  Utils.saveScore(playerName, score);
  displayHighScores();
}

function displayHighScores() {
  const scoresList = document.getElementById('scores-list');
  scoresList.innerHTML = '<h3>High Scores</h3>';
  
  const highScores = Utils.getHighScores();
  for (let i = 0; i < highScores.length; i++) {
      const scoreElement = document.createElement('div');
      scoreElement.className = 'score-item';
      const date = new Date(highScores[i].date).toLocaleDateString();
      scoreElement.textContent = `${i + 1}. ${highScores[i].name} - ${highScores[i].score} points (${date})`;
      scoresList.appendChild(scoreElement);
  }
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  const namePrompt = document.getElementById('name-prompt');
  const quizContainer = document.getElementById('quiz-container');
  const resultContainer = document.getElementById('result-container');
  

  quizContainer.classList.add('hidden');
  resultContainer.classList.add('hidden');
  namePrompt.classList.remove('hidden');
  document.getElementById('player-name').value = '';
}

// Initialization
function init() {
  document.getElementById('start-btn').addEventListener('click', startQuiz);
  document.getElementById('restart-btn').addEventListener('click', resetQuiz);
}

document.addEventListener('DOMContentLoaded', init);

export {
  startQuiz,validatePlayerName,
  loadQuestion,
  checkAnswer,
  endQuiz,
  displayHighScores,
  resetQuiz,
  init,
  HelloPlusName, 
  questions,
  nextButton
};