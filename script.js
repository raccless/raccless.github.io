/* =========================
   GET ELEMENTS
========================= */

const titleScreen = document.getElementById("title-screen");
const dungeonScreen = document.getElementById("dungeon-screen");
const endScreen = document.getElementById("end-screen");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

const infoPanel = document.getElementById("info-panel");
const closePanel = document.getElementById("close-panel");

const panelTitle = document.getElementById("panel-title");
const panelText = document.getElementById("panel-text");

const hiddenMessages = document.querySelectorAll(".hidden-message");
const endButton = document.getElementById("end-button");

const discoveredTopics = new Set();

/* =========================
   PRESENTATION CONTENT
========================= */

const topics = {

    story: {
        title: "The Story",
        text:
            "You enter a forgotten dungeon where darkness hides more than the path ahead. The torch becomes your connection to the history buried inside the world."
    },

    gameplay: {
        title: "The Core Mechanic",
        text:
            "Light reveals what darkness hides. Exploring with the torch allows the player to discover hidden runes, objects and clues."
    },

    progression: {
        title: "Progression",
        text:
            "What you discover helps you solve puzzles and open new paths. Exploration and progression are connected."
    },

    world: {
        title: "The World",
        text:
            "A connected dungeon filled with rooms, puzzles and environmental storytelling. The player is encouraged to look closely and explore."
    }

};


/* =========================
TORCH EVENT + HIDDEN MESSAGES
========================== */

const dungeon = document.querySelector(".dungeon");

dungeon.addEventListener("pointermove", (event) => {

    const x = event.clientX;
    const y = event.clientY;

    dungeon.style.setProperty("--torch-x", `${x}px`);
    dungeon.style.setProperty("--torch-y", `${y}px`);

    hiddenMessages.forEach((message) => {

        const topic = message.dataset.topic;

        // Already discovered messages stay visible
        if (discoveredTopics.has(topic)) {
            message.style.opacity = "1";
            message.style.pointerEvents = "auto";
            return;
        }

        const rect = message.getBoundingClientRect();

        const messageX = rect.left + rect.width / 2;
        const messageY = rect.top + rect.height / 2;

        const distance = Math.hypot(
            x - messageX,
            y - messageY
        );

        if (distance < 180) {
            message.style.opacity = "1";
            message.style.pointerEvents = "auto";
        } else {
            message.style.opacity = "0";
            message.style.pointerEvents = "none";
        }

    });

});


/* =========================
   START PRESENTATION
========================= */

startButton.addEventListener("click", () => {

    titleScreen.classList.remove("active");

    dungeonScreen.classList.add("active");

});

/* =========================
   HIDDEN MESSAGE CLICKS
========================== */

hiddenMessages.forEach((message) => {

    message.addEventListener("click", () => {

        const topic = message.dataset.topic;
        const content = topics[topic];

        panelTitle.textContent = content.title;
        panelText.textContent = content.text;

        infoPanel.classList.remove("hidden");

        discoveredTopics.add(topic);

        message.style.opacity = "1";
        message.style.pointerEvents = "auto";

        if (discoveredTopics.size === hiddenMessages.length) {
            endButton.disabled = false;
        }

    });

});


/* =========================
   CLOSE PANEL
========================= */

closePanel.addEventListener("click", () => {

    infoPanel.classList.add("hidden");

});


/* =========================
   RESTART
========================= */

restartButton.addEventListener("click", () => {

    endScreen.classList.remove("active");

    titleScreen.classList.add("active");

});

/* =========================
   END PRESENTATION
========================== */

endButton.addEventListener("click", () => {

    dungeonScreen.classList.remove("active");
    endScreen.classList.add("active");

});
