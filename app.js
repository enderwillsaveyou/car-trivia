let cars = [];
let queue = [];
let currentCar = null;
let score = 0;
let totalAnswered = 0;
let choices = [];
let hasAnswered = false;

const ASSET_ROOT = 'public';

// DOM Elements
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const carImage = document.getElementById('car-image');
const imagePlaceholder = document.getElementById('image-placeholder');
const answersContainer = document.getElementById('answers-container');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackText = document.getElementById('feedback-text');
const nextButton = document.getElementById('next-button');

// Screens
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const startButton = document.getElementById('start-button');
const playAgainButton = document.getElementById('play-again-button');
const finalScoreEl = document.getElementById('final-score');
const finalTotalEl = document.getElementById('final-total');
const finalPercentEl = document.getElementById('final-percent');
const finalGradeEl = document.getElementById('final-grade');

function resolveAssetPath(assetPath) {
    if (!assetPath) return '';
    if (/^(https?:|data:)/.test(assetPath)) return assetPath;

    const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
    return cleanPath.startsWith(`${ASSET_ROOT}/`) ? cleanPath : `${ASSET_ROOT}/${cleanPath}`;
}

function setImageState(message, isLoaded = false) {
    imagePlaceholder.querySelector('span').textContent = message;
    imagePlaceholder.classList.toggle('is-hidden', isLoaded);
    carImage.classList.toggle('is-hidden', !isLoaded);
}

// Initialize game
async function initGame() {
    try {
        const response = await fetch('src/data/carTriviaData.json');
        cars = await response.json();

        // Validate cars
        const isValid = cars.every(c =>
            c.id &&
            c.answer &&
            c.image &&
            Array.isArray(c.choices) &&
            c.choices.length === 4 &&
            c.choices.includes(c.answer)
        );
        if (!isValid) {
            console.error("Invalid car trivia data found. Ensure id, answer, image, and exactly 4 choices are present.");
        }

        if (cars && cars.length > 0) {
            startButton.addEventListener('click', () => {
                showScreen('game');
                startNewGame();
            });
            playAgainButton.addEventListener('click', () => {
                showScreen('game');
                startNewGame();
            });
            nextButton.addEventListener('click', startRound);

            // Handle image load errors to show placeholder
            carImage.addEventListener('error', () => {
                setImageState('Image unavailable');
            });
            carImage.addEventListener('load', () => {
                setImageState('', true);
            });
        } else {
            console.error("No cars found in manifest.");
        }
    } catch (error) {
        console.error("Error loading manifest:", error);
    }
}

// Toggle between start / game / end screens
function showScreen(name) {
    startScreen.classList.toggle('is-hidden', name !== 'start');
    gameScreen.classList.toggle('is-hidden', name !== 'game');
    endScreen.classList.toggle('is-hidden', name !== 'end');
}

// Reset state and build a fresh shuffled queue of all cars
function startNewGame() {
    score = 0;
    totalAnswered = 0;
    scoreEl.textContent = score;
    totalEl.textContent = totalAnswered;
    queue = shuffleArray([...cars]);
    startRound();
}

// Start a new round; when the queue is empty, the round is over
function startRound() {
    if (queue.length === 0) {
        showEndScreen();
        return;
    }

    hasAnswered = false;
    feedbackContainer.classList.add('hidden');
    answersContainer.replaceChildren();

    currentCar = queue.pop();

    // Use pre-existing choices from the data
    choices = shuffleArray([...currentCar.choices]);

    // Render UI
    renderUI();
}

function showEndScreen() {
    const total = totalAnswered > 0 ? totalAnswered : cars.length;
    const percent = Math.round((score / total) * 100);

    finalScoreEl.textContent = score;
    finalTotalEl.textContent = total;
    finalPercentEl.textContent = `${percent}% correct`;
    finalGradeEl.textContent = gradeForPercent(percent);

    showScreen('end');
}

function gradeForPercent(percent) {
    if (percent >= 90) return 'Gear Head';
    if (percent >= 75) return 'Garage Regular';
    if (percent >= 50) return 'Shade Tree Mechanic';
    if (percent >= 25) return 'Weekend Tinkerer';
    return 'Fresh Off the Lot';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderUI() {
    // Hide image and show placeholder initially until it loads
    setImageState('Loading car image');

    carImage.alt = 'Mysterious close-up clue of a classic American car front end';
    carImage.src = resolveAssetPath(currentCar.image);

    // Create buttons
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = choice;
        btn.addEventListener('click', () => handleAnswer(choice, btn));
        answersContainer.appendChild(btn);
    });
}

function handleAnswer(selectedChoice, selectedBtn) {
    if (hasAnswered) return;
    hasAnswered = true;
    totalAnswered++;

    const isCorrect = selectedChoice === currentCar.answer;

    if (isCorrect) {
        score++;
    }
    renderFeedback(isCorrect);

    // Update score UI
    scoreEl.textContent = score;
    totalEl.textContent = totalAnswered;

    // Show feedback
    feedbackContainer.classList.remove('hidden');

    // Label the Next button as the round-closer on the final car
    nextButton.textContent = queue.length === 0 ? 'See Results' : 'Next Car';

    // Style buttons
    const allBtns = answersContainer.querySelectorAll('.answer-btn');
    allBtns.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentCar.answer) {
            btn.classList.add('correct');
        } else if (btn === selectedBtn && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
}

function renderFeedback(isCorrect) {
    feedbackText.replaceChildren();
    feedbackText.className = isCorrect ? 'feedback-message is-correct' : 'feedback-message is-incorrect';

    const result = document.createElement('span');
    result.className = 'feedback-result';
    result.textContent = isCorrect ? 'Correct! Nice eye.' : 'Not quite.';
    feedbackText.appendChild(result);

    if (currentCar.hint) {
        const hint = document.createElement('span');
        hint.className = 'feedback-hint';
        hint.textContent = `Hint: ${currentCar.hint}`;
        feedbackText.appendChild(hint);
    }
}

// Start app
document.addEventListener('DOMContentLoaded', initGame);
