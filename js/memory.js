// Emojis para las cartas
const CARD_EMOJIS = [
    '🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🦁', '🐯'
].flatMap(emoji => [emoji, emoji]); // Duplicamos cada emoji para crear pares

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let matches = 0;
const totalPairs = CARD_EMOJIS.length / 2;

// Elementos de sonido
const clickSound = document.getElementById('clickSound');
const matchSound = document.getElementById('matchSound');
const errorSound = document.getElementById('errorSound');
const successSound = document.getElementById('successSound');

// Función para inicializar el juego
function initializeGame() {
    const gameBoard = document.getElementById('gameBoard');
    const shuffledEmojis = shuffleArray([...CARD_EMOJIS]);

    gameBoard.innerHTML = ''; // Limpiar el tablero
    attempts = 0;
    matches = 0;
    updateStats();

    // Crear las cartas
    shuffledEmojis.forEach((emoji) => {
        const card = createCard(emoji);
        gameBoard.appendChild(card);
    });

    // Mostrar las cartas por 3 segundos
    const allCards = document.querySelectorAll('.memory-card');
    allCards.forEach(card => card.classList.add('flip'));

    setTimeout(() => {
        allCards.forEach(card => card.classList.remove('flip'));
    }, 3000);
}

// Función para crear una carta
function createCard(emoji) {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.innerHTML = `
        <div class="front-face">${emoji}</div>
        <div class="back-face">❓</div>
    `;
    card.addEventListener('click', () => flipCard(card));
    return card;
}

// Función para voltear una carta
function flipCard(card) {
    if (lockBoard || card.classList.contains('flip') || card.classList.contains('matched')) return;

    playSound(clickSound);
    card.classList.add('flip');

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    attempts++;
    updateStats();
    checkForMatch();
}

// Función para verificar si hay un par
function checkForMatch() {
    const firstEmoji = firstCard.querySelector('.front-face').textContent;
    const secondEmoji = secondCard.querySelector('.front-face').textContent;

    if (firstEmoji === secondEmoji) {
        handleMatch();
    } else {
        handleMismatch();
    }
}

// Función para manejar coincidencias
function handleMatch() {
    playSound(matchSound);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
    matches++;
    updateStats();

    if (matches === totalPairs) {
        setTimeout(showVictoryMessage, 500);
    }
}

// Función para manejar fallos
function handleMismatch() {
    lockBoard = true;
    playSound(errorSound);

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

// Función para reiniciar variables
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Función para mezclar un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para actualizar las estadísticas
function updateStats() {
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('matches').textContent = matches;
}

// Función para mostrar mensaje de victoria
function showVictoryMessage() {
    playSound(successSound);
    document.getElementById('finalAttempts').textContent = attempts;
    document.getElementById('victoryMessage').style.display = 'flex';
}

// Función para reproducir un sonido
function playSound(sound) {
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}

// Función para reiniciar el juego
function restartGame() {
    document.getElementById('victoryMessage').style.display = 'none';
    playSound(clickSound);
    initializeGame();
}

// Inicializar el juego al cargar la página
document.addEventListener('DOMContentLoaded', initializeGame);
