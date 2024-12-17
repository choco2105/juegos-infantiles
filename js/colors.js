// Definición de los colores y nombres
const COLORS = [
    { name: "Rojo", value: "#FF0000" },
    { name: "Azul", value: "#0000FF" },
    { name: "Verde", value: "#00FF00" },
    { name: "Amarillo", value: "#FFFF00" },
    { name: "Morado", value: "#800080" },
    { name: "Naranja", value: "#FFA500" }
];

let score = 0;
let matchedPairs = 0;
let selectedColor = null;
let selectedName = null;

// **Sonidos**
const clickSound = new Audio("sounds/click.mp3");
const matchSound = new Audio("sounds/match.mp3");
const errorSound = new Audio("sounds/error.mp3");
const successSound = new Audio("sounds/success.mp3");

// **Inicialización del juego**
function initGame() {
    const colorsContainer = document.getElementById("colorsContainer");
    const colorNamesContainer = document.getElementById("colorNames");
    score = 0;
    matchedPairs = 0;
    updateScore();

    // **Mezclar colores y nombres**
    const shuffledColors = shuffleArray([...COLORS]);
    const shuffledNames = shuffleArray([...COLORS]);

    // **Crear las cajas de colores**
    colorsContainer.innerHTML = "";
    shuffledColors.forEach((color) => {
        const colorBox = document.createElement("div");
        colorBox.className = "color-box";
        colorBox.style.backgroundColor = color.value;
        colorBox.dataset.color = color.name;
        colorBox.onclick = () => selectColor(colorBox);
        colorsContainer.appendChild(colorBox);
    });

    // **Crear botones de nombres**
    colorNamesContainer.innerHTML = "";
    shuffledNames.forEach((color) => {
        const colorName = document.createElement("button");
        colorName.className = "color-name";
        colorName.textContent = color.name;
        colorName.dataset.color = color.name;
        colorName.onclick = () => selectName(colorName);
        colorNamesContainer.appendChild(colorName);
    });
}

// **Seleccionar un color**
function selectColor(element) {
    if (element.classList.contains("matched")) return;

    playSound(clickSound);

    // **Deseleccionar el color previo**
    if (selectedColor) selectedColor.classList.remove("selected");

    // **Seleccionar nuevo color**
    element.classList.add("selected");
    selectedColor = element;

    checkMatch();
}

// **Seleccionar un nombre**
function selectName(element) {
    if (element.classList.contains("matched")) return;

    playSound(clickSound);

    // **Deseleccionar el nombre previo**
    if (selectedName) selectedName.classList.remove("selected");

    // **Seleccionar nuevo nombre**
    element.classList.add("selected");
    selectedName = element;

    checkMatch();
}

// **Verificar coincidencia**
function checkMatch() {
    if (!selectedColor || !selectedName) return;

    if (selectedColor.dataset.color === selectedName.dataset.color) {
        // **Coincidencia correcta**
        playSound(matchSound);
        selectedColor.classList.add("matched");
        selectedName.classList.add("matched");

        selectedColor.classList.remove("selected");
        selectedName.classList.remove("selected");

        selectedColor = null;
        selectedName = null;

        matchedPairs++;
        score++;
        updateScore();

        // **Verificar si el jugador ha ganado**
        if (matchedPairs === COLORS.length) {
            setTimeout(showVictoryMessage, 500);
        }
    } else {
        // **Coincidencia incorrecta**
        playSound(errorSound);

        setTimeout(() => {
            selectedColor.classList.remove("selected");
            selectedName.classList.remove("selected");
            selectedColor = null;
            selectedName = null;
        }, 500);
    }
}

// **Actualizar la puntuación**
function updateScore() {
    document.getElementById("score").textContent = score;
}

// **Mostrar mensaje de victoria**
function showVictoryMessage() {
    playSound(successSound);
    document.getElementById("victoryMessage").style.display = "flex";
}

// **Reiniciar juego**
function restartGame() {
    document.getElementById("victoryMessage").style.display = "none";
    initGame();
}

// **Mezclar un arreglo (algoritmo Fisher-Yates)**
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// **Reproducir sonido**
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

// **Inicializar el juego cuando se carga la página**
document.addEventListener("DOMContentLoaded", () => {
    initGame();
});
