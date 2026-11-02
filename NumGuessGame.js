
const BASE_URL = "http://localhost:8081/game1";

let currentSecretNumber = null;
let isGameOver = false;

window.onload = function() {
    setupGame();
};

async function setupGame() {
    isGameOver = false;
    const outputPara = document.getElementById("output");
    outputPara.innerHTML = "Connecting to Java Backend... 🔄";

    try {
        const response = await fetch(`${BASE_URL}/restart`);
        const textMessage = await response.text();

        if (textMessage.includes(":")) {
            const parts = textMessage.split(":");
            currentSecretNumber = parseInt(parts[1].trim());
        } else {
            currentSecretNumber = Math.floor(Math.random() * 100) + 1;
        }

        generateBubbles(currentSecretNumber);
        outputPara.innerHTML = "10 Bubbles are ready! Pick your lucky one.";
    } catch (error) {
        outputPara.innerHTML = "❌ Error: Java backend server is offline or unreachable!";
    }
}

function generateBubbles(correctNum) {
    const container = document.getElementById("bubbleContainer");
    container.innerHTML = "";

    let numbersSet = new Set();
    numbersSet.add(correctNum);

    while (numbersSet.size < 10) {
        let randomVal = Math.floor(Math.random() * 100) + 1;
        numbersSet.add(randomVal);
    }

    let finalArray = Array.from(numbersSet);
    finalArray.sort(() => Math.random() - 0.5);

    finalArray.forEach(num => {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerText = num;

        bubble.onclick = () => handleGuessEvaluation(bubble, num);
        container.appendChild(bubble);
    });
}

async function handleGuessEvaluation(bubbleElement, selectedNumber) {
    if (isGameOver) return;

    const outputPara = document.getElementById("output");

    try {
        const response = await fetch(`${BASE_URL}/guess?num=${selectedNumber}`);
        const resultText = await response.text();

        if (resultText.includes("Congrulation")) {
            isGameOver = true;

            bubbleElement.innerText = "😍";
            bubbleElement.style.fontSize = "26px";
            bubbleElement.style.background = "radial-gradient(circle at 30% 30%, #b7e4c7, #2d6a4f)";
            bubbleElement.style.color = "white";

            setTimeout(() => {
                bubbleElement.className = "bubble burst-pop";
                outputPara.innerHTML = "<b>Congratulations! You got the number!</b>";
                disableAllRemainingBubbles();
            }, 1200);

        } else {
            bubbleElement.classList.add("checking");
            bubbleElement.innerText = "";

            let isGreater = resultText.includes("Greater");

            let containerClass = isGreater ? "arrow-container up-wave" : "arrow-container";

            bubbleElement.innerHTML = `
                <div class="${containerClass}">
                    <div class="chevron"></div>
                    <div class="chevron"></div>
                    <div class="chevron"></div>
                </div>
            `;

            setTimeout(() => {
                bubbleElement.classList.remove("checking");
                bubbleElement.className = "bubble wrong";
                bubbleElement.innerHTML = selectedNumber;

                if (isGreater) {
                    outputPara.innerHTML = `Wrong Guess! Hint: Choose a <b>Greater</b> Number <span class="animated-arrow">⬆</span>`;
                } else {
                    outputPara.innerHTML = `Wrong Guess! Hint: Choose a <b>Smaller</b> Number <span class="animated-arrow">⬇</span>`;
                }
            }, 1200);
        }
    } catch (error) {
        outputPara.innerText = "❌ Communication channel dropped validation frames.";
    }
}

function disableAllRemainingBubbles() {
    const bubbles = document.querySelectorAll(".bubble");

    bubbles.forEach(b => {
        if (!b.classList.contains("burst-pop")) {
            b.classList.add("disabled");
        }
    });
}

function restartGame() {
    setupGame();
}
