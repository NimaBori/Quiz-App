const questionSet = [
  {
    no: 1,
    question: "What does HTML stand for?",
    answer1: "Hyperlinks and Text Markup Language",
    answer2: "Hyper Text Markup Language",
    answer3: "Hyper Text Making Language",
    answer4: "Hyper Text Mark Language",
    correctAnswer: 1,
  },
  {
    no: 2,
    question: "What does CSS stand for?",
    answer1: "Colorful StyleSheet",
    answer2: "Creative Style Sheet",
    answer3: "Cascading Style Sheet",
    answer4: "Computer Style Sheet",
    correctAnswer: 3,
  },
  {
    no: 3,
    question: "Which HTML tag is used to define an internal style sheet?",
    answer1: "&lt; script &gt;",
    answer2: "&lt; style &gt;",
    answer3: "&lt; html &gt;",
    answer4: "&lt; svg &gt;",
    correctAnswer: 1,
  },
  {
    no: 4,
    question: "Which is the correct CSS syntax?",
    answer1: "body{color:black}",
    answer2: "{body{color:black}",
    answer3: "body={color:black}",
    answer4: "body:color{black}",
    correctAnswer: 1,
  },
  {
    no: 5,
    question: "How do you insert a comment in a CSS file?",
    answer1: "/*This is Comment*/",
    answer2: "//This Is Comment",
    answer3: "&lt;!--- This Is Comment ---&gt;",
    answer4: "//This Is Comment//",
    correctAnswer: 1,
  },
  {
    no: 6,
    question: "Which property is used to change the background color?",
    answer1: "backgroundColor",
    answer2: "BgColor",
    answer3: "Color-Background",
    answer4: "background-color",
    correctAnswer: 4,
  },
  {
    no: 7,
    question: "How to write an IF statement in JavaScript?",
    answer1: "if i==5",
    answer2: "if (i==5)",
    answer3: "if (i==5) then",
    answer4: "if i==5 then",
    correctAnswer: 2,
  },
];

// HTML elements
const startEl = document.querySelector(".start-container");
const quideEl = document.querySelector(".guide-container");
const questionFormEl = document.querySelector(".question-form");
const questionTitleEl = document.querySelector(".question-title");
const answersEl = document.querySelector(".answers-container");
const answerHandlerEl = document.querySelector(".answer-handler");
const resultsEl = document.querySelector(".results");
const finalPointsEl = document.querySelector(".points-container");
const timerEl = document.querySelector(".timer");

// HTML buttons
const startQuizBtn = document.querySelector(".start-quiz-btn");
const exitQuizBtn = document.querySelector(".exit-btn");
const continueBtn = document.querySelector(".continue-btn");
const nextBtn = document.querySelector(".next-btn");
const quitQuizBtn = document.querySelector(".quit-quiz-btn");
const startAgainBtn = document.querySelector(".start-again-btn");

// globale variables
let correctAnswersCounter = 0;
let id = 1;
let countdown = 0;
let time; //defult time for timer

// ------- add events -------
startQuizBtn.addEventListener("click", () => {
  quideEl.classList.add("guide-container-show");
  startEl.style["display"] = "none";
});

exitQuizBtn.addEventListener("click", () => {
  quideEl.classList.remove("guide-container-show");
  startEl.style["display"] = "block";
});

continueBtn.addEventListener("click", () => {
  quideEl.classList.remove("guide-container-show");
  questionFormEl.classList.add("question-form-show");
  showQuestions();
});

nextBtn.addEventListener("click", () => {
  setNextQuestion();
  clearTimeout(countdown);
});

quitQuizBtn.addEventListener("click", () => {
  id = 1;
  correctAnswersCounter = 0;
  clearTimeout(countdown);
  resultsEl.classList.remove("results-show");
  quideEl.classList.remove("guide-container-show");
  startEl.style["display"] = "block";
});

startAgainBtn.addEventListener("click", () => {
  id = 1;
  correctAnswersCounter = 0;
  clearTimeout(countdown);
  resultsEl.classList.remove("results-show");
  quideEl.classList.add("guide-container-show");
  startEl.style["display"] = "none";
});

// -------- functions --------
function showQuestions() {
  questionSet.forEach((s) => {
    answer = false;
    if (s.no === id) {
      time = 30; // defult timer sets to 30 sec
      setTimer();
      questionTitleEl.textContent = `${s.no}. ${s.question}`;
      answersEl.innerHTML = `      
        <button onclick="pickAnswer(1, ${questionSet.indexOf(
          s
        )})" class="answer-btn" id="1">${s.answer1}</button>
        <button onclick="pickAnswer(2, ${questionSet.indexOf(
          s
        )})" class="answer-btn" id="2">${s.answer2}</button>
        <button onclick="pickAnswer(3, ${questionSet.indexOf(
          s
        )})" class="answer-btn" id="3">${s.answer3}</button>
        <button onclick="pickAnswer(4, ${questionSet.indexOf(
          s
        )})" class="answer-btn" id="4">${s.answer4}</button>
      `;
    }
    answerHandlerEl.textContent = `
    total of ${questionSet.length} questions
    `;
  });
}

function pickAnswer(pickedAnswer, questionIndex) {
  const btns = document.querySelectorAll(".answer-btn");
  btns.forEach((btn) => {
    if (btn.id == pickedAnswer) {
      btn.classList.add("answer-btn-clicked");
    } else if (btn.classList.contains("answer-btn-clicked")) {
      btn.classList.remove("answer-btn-clicked");
    }
  });

  if (pickedAnswer === questionSet[questionIndex].correctAnswer) {
    correctAnswersCounter++;
  }
}

function setTimer() {
  if (time > 0) {
    time--;
    timerEl.textContent = time;
  }
  countdown = setTimeout(setTimer, 1000);
  if (time == 0) {
    clearTimeout(countdown);
    setNextQuestion();
  }
}

function setNextQuestion() {
  if (id < questionSet.length) {
    id++;
    showQuestions();
    updateAnswerEl();
  } else {
    questionFormEl.classList.remove("question-form-show");
    resultsEl.classList.add("results-show");
    finalPointsEl.textContent = `
    you've got ${correctAnswersCounter} out of ${questionSet.length} 
    `;
  }
}

function updateAnswerEl() {
  answerHandlerEl.textContent = `
  out of ${questionSet.length} points, you've got ${correctAnswersCounter}! 
  `;
}
