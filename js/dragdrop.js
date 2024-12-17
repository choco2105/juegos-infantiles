document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".item");
    const dropzones = document.querySelectorAll(".dropzone");
    const progressText = document.getElementById("found");
    const successSound = new Audio("sounds/success.mp3"); // Sonido de victoria
    const matchSound = new Audio("sounds/match.mp3"); // Sonido de relación correcta
    const clickSound = new Audio("sounds/click.mp3"); // Sonido al iniciar un arrastre
    const victoryMessage = document.getElementById("victoryMessage");

    let matchedCount = 0;

    // Función para aleatorizar las figuras al inicio
    const randomizeItems = () => {
        const container = document.querySelector(".shapes-container");
        const shuffledItems = Array.from(items).sort(() => Math.random() - 0.5);
        shuffledItems.forEach(item => container.appendChild(item));
    };

    // Llamar a la función para desordenar las figuras
    randomizeItems();

    // Configurar los eventos de arrastrar para las figuras
    items.forEach((item) => {
        item.addEventListener("dragstart", () => {
            clickSound.currentTime = 0; // Reinicia el sonido
            clickSound.play(); // Sonido al iniciar arrastre
            item.classList.add("dragging");
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
        });
    });

    // Configurar los eventos de las zonas de destino
    dropzones.forEach((zone) => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();
            zone.classList.add("hover");
        });

        zone.addEventListener("dragleave", () => {
            zone.classList.remove("hover");
        });

        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            const draggedItem = document.querySelector(".dragging");
            const shape = draggedItem.dataset.shape;

            // Verificar coincidencia
            if (shape === zone.dataset.shape && !zone.classList.contains("matched")) {
                matchSound.currentTime = 0; // Reinicia el sonido
                matchSound.play(); // Sonido de coincidencia correcta

                zone.classList.remove("hover");
                zone.classList.add("matched");
                zone.textContent = draggedItem.textContent; // Mostrar la figura en la zona
                draggedItem.remove();
                matchedCount++;

                // Actualizar progreso
                progressText.textContent = matchedCount;

                // Mostrar mensaje de victoria si se completan todas las coincidencias
                if (matchedCount === items.length) {
                    setTimeout(() => {
                        successSound.play();
                        victoryMessage.style.display = "flex";
                    }, 500);
                }
            } else {
                // Si no hay coincidencia, mostrar error visual
                zone.classList.add("error");
                setTimeout(() => zone.classList.remove("error"), 500);
            }
        });
    });
});

// Función para volver al menú principal
function backToMenu() {
    window.location.href = "index.html";
}

// Función para reiniciar el juego
function restartGame() {
    window.location.reload();
}
