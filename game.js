const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is Plane Surveying?',
        choice1: 'Provide horizontal and vertical positions of points to which supplementary surveys are adjusted',
        choice2: 'Surveying streams, lakes, reservoirs, harbors, ocean, and other bodies of water',
        choice3: 'Performed to determine the position of all underground excavations and surface mine structures',
        choice4: 'The method of measuring small areas of the earth\'s surface by disregarding curvature and geoid effects',
        answer: '4',
    },
    {
        question: 'What is the primary purpose of geodetic engineering?',
        choice1: 'Mapping outer space',
        choice2: 'Understanding the shape and dimensions of Earth',
        choice3: 'Studying marine biology',
        choice4: 'Analyzing weather patterns',
        answer: '2',
    },
    {
        question: 'Which instrument is commonly used in geodetic surveys to measure angles?',
        choice1: 'Barometer',
        choice2: 'Sextant',
        choice3: 'Theodolite',
        choice4: 'Hydrometer',
        answer: '3',
    },
    {
        question: 'What is a datum in geodetic engineering?',
        choice1: 'A point at sea level',
        choice2: 'A reference surface for measurements',
        choice3: 'A type of compass',
        choice4: 'A unit of length',
        answer: '2',
    },
    {
        question: 'Which system provides accurate location data using satellites?',
        choice1: 'RADAR',
        choice2: 'SONAR',
        choice3: 'GPS (Global Positioning System)',
        choice4: 'GIS (Geographic Information System)',
        answer: '3',
    },
    {
        question: 'What does GIS stand for?',
        choice1: 'Global Inspection System',
        choice2: 'Geographic Information System',
        choice3: 'Geodetic Integration Software',
        choice4: 'Generalized Input System',
        answer: '2',
    },
    {
        question: 'In geodetic engineering, what does GNSS stand for?',
        choice1: 'Global Navigation Satellite System',
        choice2: 'Geographic Nation Survey System',
        choice3: 'Geological Network of Space Science',
        choice4: 'General Navigation Sensor System',
        answer: '1',
    },
    {
        question: 'What is the ellipsoid in geodesy?',
        choice1: 'An ancient geodetic map',
        choice2: 'A type of satellite',
        choice3: 'A tool for measuring temperature',
        choice4: 'The theoretical shape of Earth used for calculations',
        answer: '4',
    },
    {
        question: 'Which of the following best describes "triangulation" in geodetic surveys?',
        choice1: 'The process of determining the temperature of Earth’s surface',
        choice2: 'Measuring distances by dividing them into equal parts',
        choice3: 'A method for determining locations by measuring angles from known points',
        choice4: 'Using satellites to observe atmospheric conditions',
        answer: '3',
    },
    {
        question: 'What is the primary use of a "total station" in geodetic engineering?',
        choice1: 'To measure the speed of wind',
        choice2: 'To capture images of distant stars',
        choice3: 'To measure angles and distances precisely in surveys',
        choice4: 'To analyze soil samples',
        answer: '3',
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html'); // Adjust path as needed
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
        choice.parentElement.classList.remove('correct', 'incorrect'); // Clear previous classes
    });

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        } else {
            // Highlight the correct answer in green
            highlightCorrectAnswer();
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

// Function to highlight the correct answer
function highlightCorrectAnswer() {
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        if (number === currentQuestion.answer) {
            choice.parentElement.classList.add('correct');
            setTimeout(() => {
                choice.parentElement.classList.remove('correct');
            }, 1000); // Adjust delay as needed
        }
    });
}

function incrementScore(num) {
    score +=num
    scoreText.innerText = score
}

startGame();
