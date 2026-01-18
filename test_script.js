document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const testScreen = document.getElementById('test-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startButton = document.getElementById('start-button');
    const testTitleEl = document.getElementById('test-title');
    const testDescriptionEl = document.getElementById('test-description');
    const testIconEl = document.getElementById('test-icon');
    const categoryTitleEl = document.getElementById('category-title');
    const optionsContainerEl = document.getElementById('options-container');
    const questionTextEl = document.getElementById('question-text');
    const progressCountEl = document.getElementById('progress-count'); 
    const progressBarEl = document.getElementById('progress-bar');
    const timeCounterEl = document.getElementById('counter');
    const resultGraphEl = document.getElementById('result-graph');
    const resultTitleEl = document.getElementById('result-title');
    const resultTextEl = document.getElementById('result-text');
    const returnBtn = document.getElementById('return-btn');
    const resubmitBtn = document.getElementById('resubmit-btn');
    const savedTheme = localStorage.getItem('theme');
    
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTestUrl = urlParams.get('testUrl');

    if (!selectedTestUrl) {
        window.location.href = 'index.html';
        return;
    }

    if (savedTheme === 'light-mode') {
        document.body.classList.add('light-mode');
        document.documentElement.classList.add('light-mode');
    }
    
    let currentQuestionIndex = 0;
    let score = 0;
    const TEST_DURATION_MIN = 25;
    let remainingTime = TEST_DURATION_MIN * 60;
    let timerInterval;
    let questions = [];

    const currentTestTitle = localStorage.getItem('selectedTestTitle');
    const currentTestDesc = localStorage.getItem('selectedTestDescription');
    const currentTestIconClass = localStorage.getItem('selectedTestIconClass');

    testTitleEl.textContent = currentTestTitle;
    testDescriptionEl.textContent = currentTestDesc;
    testIconEl.className = currentTestIconClass;
    categoryTitleEl.textContent = currentTestTitle;
    
    async function initializeTest() {
        try {
            const response = await fetch('test_data.json');
            const allTestQuestions = await response.json();
            questions = allTestQuestions[selectedTestUrl];

            if (!questions) {
                window.location.href = 'index.html';
                return;
            }
            updateTimerDisplay(remainingTime); 

        } catch (error) {
            console.error("Test ma'lumotlarini yuklashda xatolik:", error);
            window.location.href = 'index.html';
        }
    }
    

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        testScreen.style.display = 'block';
        startTimer();
        loadQuestion();
    });
    returnBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    resubmitBtn.addEventListener('click', () => {
        location.reload();
    });

    function updateTimerDisplay(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        timeCounterEl.textContent = `${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
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

        const currentQuestion = questions[currentQuestionIndex];
        questionTextEl.textContent = currentQuestion.question;
        optionsContainerEl.innerHTML = '';

        progressCountEl.textContent = `${currentQuestionIndex + 1}/${questions.length}`;

        const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBarEl.style.width = `${progressPercent}%`;

        currentQuestion.options.forEach((optionText, index) => {
            const optionEl = document.createElement('div');
            optionEl.classList.add('option');
            optionEl.innerHTML = `<span class="option-label">${String.fromCharCode(65 + index)}) </span> ${optionText}`;

            optionEl.addEventListener('click', () => handleAnswer(optionEl, optionText, currentQuestion.correctAnswer));
            optionsContainerEl.appendChild(optionEl);
        });
    }

    function handleAnswer(selectedOptionEl, selectedAnswer, correctAnswer) {
        document.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');

        if (selectedAnswer === correctAnswer) {
            selectedOptionEl.classList.add('correct');
            score++;
        } else {
            selectedOptionEl.classList.add('incorrect');
            const correctOption = Array.from(document.querySelectorAll('.option')).find(
                el => el.textContent.includes(correctAnswer)
            );
            if (correctOption) {
                correctOption.classList.add('correct');
            }
        }

        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1000);
    }

    function endTest(isTimeout) {
        clearInterval(timerInterval);
        testScreen.style.display = "none";
        resultsScreen.style.display = "block";

        const totalQuestions = questions.length;
        const percentage = Math.round((score / totalQuestions) * 100);
        const correctAnswersCount = score;

        resultGraphEl.textContent = `${percentage}%`;
        resultTextEl.textContent = `Siz ${totalQuestions} ta savoldan ${correctAnswersCount} tasiga to'g'ri javob berdingiz.`;

        if (percentage >= 90) {
            resultTitleEl.innerHTML = `Siz Professionalsiz! 🏆`
        }
        else if (percentage >= 60) {
            resultTitleEl.textContent = `Yaxshi natija 🏅`
        }
        else {
            resultTitleEl.textContent = `Yana urinib ko'ring ☹️`;
        }
    }
    initializeTest();
});

