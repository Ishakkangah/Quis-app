// GLOBAL VARIABLES
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('ansher-buttons')

let shuffledQuestion, currentQuestionIndex;

// ADDEVENSLISTENER
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', function () {
    currentQuestionIndex++;
    setNextQuestion();
})



// START GAME
function startGame() {
    startButton.classList.add('hide')
    shuffledQuestion = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

// SET NEXT QUESTIONS
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestion[currentQuestionIndex])
}

// SHOW QUESTION
function showQuestion(question) {
    questionElement.innerHTML = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button)
    });
}

// RESET STATEE
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// SELECT ANSWER
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestion.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerHTML = 'Restard';
        startButton.classList.remove('hide');
    }

}


// SET STATUS CLASS
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// CLEAR STATUS CLASS
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
// QUESTION
const questions = [
    {
        question: 'What is 1 + 1 ?',
        answers: [
            { text: '4', correct: false },
            { text: '2', correct: true }
        ]
    },
    {
        question: 'Gajah berwarna apa ?',
        answers: [
            { text: 'hitam', correct: true },
            { text: 'oren', correct: false }
        ]
    },
    {
        question: 'Kebiasaan baik ?',
        answers: [
            { text: 'Minum alkohol', correct: false },
            { text: 'olahraga', correct: true }
        ]
    }
]
