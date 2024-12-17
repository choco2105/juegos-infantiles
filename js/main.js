// Elementos de audio
const backSound = document.getElementById('backSound');
const clickSound = document.getElementById('clickSound');

// Función para cargar los juegos
function loadGame(gameType) {
    clickSound.currentTime = 0;
    clickSound.play();

    setTimeout(() => {
        switch (gameType) {
            case 'memory':
                window.location.href = 'memory.html';
                break;
            case 'colors':
                window.location.href = 'colors.html';
                break;
            case 'dragdrop':
                window.location.href = 'dragdrop.html';
                break;
        }
    }, 100); // Pequeño retraso para que se escuche el sonido
}

// Función para volver al menú principal
let isBackClicked = false;

function backToMenu() {
    if (!isBackClicked) {
        isBackClicked = true;
        backSound.currentTime = 0;
        backSound.play();

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 300); // Retardo para asegurar el sonido
    }
}
