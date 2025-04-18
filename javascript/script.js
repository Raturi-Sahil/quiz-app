const quizCategory = "programming";
const answerOptions = document.querySelector(".answer-options");

//Fetch a random question based on the selected quizCategory.
const getRandomQuestion = ()=> {
    const categoryQuestions = questions.find(cat => cat.category.toLowerCase() === quizCategory.toLowerCase()).questions || [];
    const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
    return randomQuestion;
}

//Renders the next question and it's options
function renderQuestion() {
    const currentQuestion = getRandomQuestion();
    if(!currentQuestion) return;
    
    //update the UI
    answerOptions.innerHTML = " ";
    document.querySelector(".quiz-text").textContent = currentQuestion.question;

    //update the options
    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.classList.add("answer-option");
        li.textContent = option;
        document.querySelector(".answer-options").appendChild(li);
    });
}

renderQuestion();