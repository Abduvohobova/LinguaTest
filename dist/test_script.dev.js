"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var startScreen = document.getElementById('start-screen');
  var testScreen = document.getElementById('test-screen');
  var resultsScreen = document.getElementById('results-screen');
  var startButton = document.getElementById('start-button');
  var testTitleEl = document.getElementById('test-title');
  var testDescriptionEl = document.getElementById('test-description');
  var testIconEl = document.getElementById('test-icon');
  var categoryTitleEl = document.getElementById('category-title');
  var optionsContainerEl = document.getElementById('options-container');
  var questionTextEl = document.getElementById('question-text');
  var progressCountEl = document.getElementById('progress-count');
  var progressBarEl = document.getElementById('progress-bar');
  var timeCounterEl = document.getElementById('counter');
  var resultGraphEl = document.getElementById('result-graph');
  var resultTitleEl = document.getElementById('result-title');
  var resultTextEl = document.getElementById('result-text');
  var returnBtn = document.getElementById('return-btn');
  var resubmitBtn = document.getElementById('resubmit-btn');
  var savedTheme = localStorage.getItem('theme');
  var urlParams = new URLSearchParams(window.location.search);
  var selectedTestUrl = urlParams.get('testUrl');

  if (!selectedTestUrl) {
    window.location.href = 'index.html';
    return;
  }

  if (savedTheme === 'light-mode') {
    document.body.classList.add('light-mode');
    document.documentElement.classList.add('light-mode');
  }

  var currentQuestionIndex = 0;
  var score = 0;
  var TEST_DURATION_MIN = 25;
  var remainingTime = TEST_DURATION_MIN * 60;
  var timerInterval;
  var questions = [];
  var currentTestTitle = localStorage.getItem('selectedTestTitle');
  var currentTestDesc = localStorage.getItem('selectedTestDescription');
  var currentTestIconClass = localStorage.getItem('selectedTestIconClass');
  testTitleEl.textContent = currentTestTitle;
  testDescriptionEl.textContent = currentTestDesc;
  testIconEl.className = currentTestIconClass;
  categoryTitleEl.textContent = currentTestTitle;

  function initializeTest() {
    var response, allTestQuestions;
    return regeneratorRuntime.async(function initializeTest$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(fetch('test_data.json'));

          case 3:
            response = _context.sent;
            _context.next = 6;
            return regeneratorRuntime.awrap(response.json());

          case 6:
            allTestQuestions = _context.sent;
            questions = allTestQuestions[selectedTestUrl];

            if (questions) {
              _context.next = 11;
              break;
            }

            window.location.href = 'index.html';
            return _context.abrupt("return");

          case 11:
            updateTimerDisplay(remainingTime);
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.error("Test ma'lumotlarini yuklashda xatolik:", _context.t0);
            window.location.href = 'index.html';

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 14]]);
  }

  startButton.addEventListener('click', function () {
    startScreen.style.display = 'none';
    testScreen.style.display = 'block';
    startTimer();
    loadQuestion();
  });
  returnBtn.addEventListener('click', function () {
    window.location.href = 'index.html';
  });
  resubmitBtn.addEventListener('click', function () {
    location.reload();
  });

  function updateTimerDisplay(timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60);
    var seconds = timeInSeconds % 60;
    timeCounterEl.textContent = "".concat(minutes, ":").concat(seconds < 10 ? 0 : "").concat(seconds);
  }

  function startTimer() {
    timerInterval = setInterval(function () {
      remainingTime--;
      updateTimerDisplay(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        endTest(true);
      }
    }, 1000);
  }

  function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
      endTest(false);
      return;
    }

    var currentQuestion = questions[currentQuestionIndex];
    questionTextEl.textContent = currentQuestion.question;
    optionsContainerEl.innerHTML = '';
    progressCountEl.textContent = "".concat(currentQuestionIndex + 1, "/").concat(questions.length);
    var progressPercent = (currentQuestionIndex + 1) / questions.length * 100;
    progressBarEl.style.width = "".concat(progressPercent, "%");
    currentQuestion.options.forEach(function (optionText, index) {
      var optionEl = document.createElement('div');
      optionEl.classList.add('option');
      optionEl.innerHTML = "<span class=\"option-label\">".concat(String.fromCharCode(65 + index), ") </span> ").concat(optionText);
      optionEl.addEventListener('click', function () {
        return handleAnswer(optionEl, optionText, currentQuestion.correctAnswer);
      });
      optionsContainerEl.appendChild(optionEl);
    });
  }

  function handleAnswer(selectedOptionEl, selectedAnswer, correctAnswer) {
    document.querySelectorAll('.option').forEach(function (opt) {
      return opt.style.pointerEvents = 'none';
    });

    if (selectedAnswer === correctAnswer) {
      selectedOptionEl.classList.add('correct');
      score++;
    } else {
      selectedOptionEl.classList.add('incorrect');
      var correctOption = Array.from(document.querySelectorAll('.option')).find(function (el) {
        return el.textContent.includes(correctAnswer);
      });

      if (correctOption) {
        correctOption.classList.add('correct');
      }
    }

    setTimeout(function () {
      currentQuestionIndex++;
      loadQuestion();
    }, 1000);
  }

  function endTest(isTimeout) {
    clearInterval(timerInterval);
    testScreen.style.display = "none";
    resultsScreen.style.display = "block";
    var totalQuestions = questions.length;
    var percentage = Math.round(score / totalQuestions * 100);
    var correctAnswersCount = score;
    resultGraphEl.textContent = "".concat(percentage, "%");
    resultTextEl.textContent = "Siz ".concat(totalQuestions, " ta savoldan ").concat(correctAnswersCount, " tasiga to'g'ri javob berdingiz.");

    if (percentage >= 90) {
      resultTitleEl.innerHTML = "Siz Professionalsiz! \uD83C\uDFC6";
    } else if (percentage >= 60) {
      resultTitleEl.textContent = "Yaxshi natija \uD83C\uDFC5";
    } else {
      resultTitleEl.textContent = "Yana urinib ko'ring \u2639\uFE0F";
    }
  }

  initializeTest();
});