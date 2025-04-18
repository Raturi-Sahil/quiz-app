let quizCategory = "programming";
const answerOptions = document.querySelector(".answer-options");
const nextQuestionButton = document.querySelector(".next-question-btn");
const questionStatus = document.querySelector(".question-status");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.querySelector(".result-container");
const timerDisplay = document.querySelector(".time-duration");
const tryAgain = document.querySelector(".try-again-btn");
const configContainer = document.querySelector(".config-container");
const startQuiz = document.querySelector(".start-quiz-btn");

const QUIZ_TIME_LIMIT = 15;
let currentTime = QUIZ_TIME_LIMIT;
let timer = null;
let currentQuestion = null;
const questionIndexHistory = [];
let correctCount = 0;
let numberOfQuestions = 0;




// Eventhandler for try again button

tryAgain.addEventListener('click', function() {
    resultContainer.style.display = "none";
    configContainer.style.display = "block";
});

// Start the quiz
const start = () => {

    configContainer.style.display = "none";
    quizContainer.style.display = "block";

    //update the quiz Category and no of questions.
    quizCategory = document.querySelector(".category-option.active").textContent;
    numberOfQuestions  = parseInt(document.querySelector(".question-option.active").textContent);
    renderQuestion();
}


// Highlight the selected category and question no
document.querySelectorAll(".category-option, .question-option").forEach(option => {
    option.addEventListener('click', ()=> {
        option.parentNode.querySelector(".active").classList.remove("active");
        option.classList.add("active");

    });
});



//clear and reset timer 
const resetTimer = ()=> {
    clearInterval(timer);
    currentTime = QUIZ_TIME_LIMIT;
    timerDisplay.textContent = `${currentTime}s`;
}


//Initialize and start the timer
const startTimer = () => {
    timer = setInterval(()=> {
        currentTime--;
        timerDisplay.textContent = `${currentTime}s`;

        if(currentTime <= 0) {
            clearInterval(timer);
            highlightCorrectAnswer();
            nextQuestionButton.style.visibility = "visible";
            document.querySelector(".quiz-timer").style.background = "#c31402";
        }
    }, 1000);
}

// Render results
const renderResults = () => {
    const resultMessage = resultContainer.querySelector(".result-message");
    resultMessage.innerHTML = `You answered <b>${correctCount}</b> out of <b>${numberOfQuestions}</b> questions correctly. Great job!`
    resultContainer.style.display = "block";
}

//Fetch a random question based on the selected quizCategory.
const getRandomQuestion = ()=> {
    const categoryQuestions = questions.find(cat => cat.category.toLowerCase() === quizCategory.toLowerCase()).questions || [];

    if(questionIndexHistory.length >= Math.min(categoryQuestions.length, numberOfQuestions)) {
        quizContainer.style.display = "none"
        renderResults();
        return console.log("Quiz completed");
    }

    //filter out already asked questions and select a random one.
    const availableQuestions = categoryQuestions.filter((_, index) => !questionIndexHistory.includes(index));
    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    questionIndexHistory.push(categoryQuestions.indexOf(randomQuestion));


    
    return randomQuestion;
}

// Highlight the right answer when user selects a wrong one.

const highlightCorrectAnswer = () => {
    const correctOption = answerOptions.querySelectorAll(".answer-option")[currentQuestion.correctAnswer];
    correctOption.classList.add("correct");
    //Add correct icon to the answer.
    const iconHTML = `<span class="material-symbols-rounded">check_circle</span>`;
    correctOption.insertAdjacentHTML("beforeend", iconHTML);
}


// Handle the user's answer selection
const handleAnswer = (option, answerIndex) => {

    //clear timer in case the currentTime doesn't reach zero
    clearInterval(timer);

    const isCorrect = currentQuestion.correctAnswer === answerIndex;
    option.classList.add(isCorrect ? "correct": "incorrect");

    //Handle both correct and incorrect answer.
    !isCorrect ? highlightCorrectAnswer() : correctCount++;

    //Ad icon of correct/incorrect.
    const iconHTML = `<span class="material-symbols-rounded"> ${isCorrect ? 'check_circle': 'cancel'} </span>`;
    option.insertAdjacentHTML("beforeend", iconHTML);

    // Prevents other options from being selected once an option is chosen.
    answerOptions.querySelectorAll('.answer-option').forEach((option) => option.style.pointerEvents = "none");
    
    //Making the next button visible after an answer is selected.
    nextQuestionButton.style.visibility = "visible";

}


//Renders the next question and it's options
function renderQuestion() {
    currentQuestion = getRandomQuestion();
    if(!currentQuestion) return;

    //Start a new timer but first reset the old one from 0 to 15
    resetTimer();
    startTimer();
    



    //update the UI  
    answerOptions.innerHTML = " ";
    nextQuestionButton.style.visibility = "hidden";

    document.querySelector(".quiz-timer").style.background = "#A617A6";

    document.querySelector(".quiz-text").textContent = currentQuestion.question;
    questionStatus.innerHTML = `<b>${questionIndexHistory.length}</b> of <b>${numberOfQuestions}</b> quesions`

    //update the options
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.classList.add("answer-option");
        li.textContent = option;
        document.querySelector(".answer-options").appendChild(li);
        li.addEventListener('click', () => handleAnswer(li, index))
    });
}



nextQuestionButton.addEventListener('click', renderQuestion);
startQuiz.addEventListener('click', start);