let hint = document.querySelector("#hint span");
let remainingGuesses = document.querySelector("#guesses span");
let wrongLettersDisplay = document.querySelector("#wrong span");
let inputsContainer = document.querySelector(".inputs");
let resetButton = document.querySelector(".reset-button");
let win = document.querySelector(".win");
let lose = document.querySelector(".lose");

let chosenWord, wrongLetters, correctLetters, maxGuesses;

// Game set up
function randomObj() {
    let random = wordList[Math.floor(Math.random() * wordList.length)]; 
    chosenWord = random.word.toLowerCase(); 
    hint.innerText = random.hint;

    wrongLetters = [];
    correctLetters = Array(chosenWord.length).fill("");
    maxGuesses = 8;

    // Reset UI
    remainingGuesses.innerText = maxGuesses;
    wrongLettersDisplay.innerText = "";
    
    // Hide win or lose messages 
    win.style.display = "none";
    lose.style.display = "none";
    win.textContent = "";
    lose.textContent = "";

    // Clear previous input boxes and generate new ones
    inputsContainer.innerHTML = ""; 
    for (let i = 0; i < chosenWord.length; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.disabled = true;
        inputsContainer.appendChild(input);
    }
}

// Function to handle user input
document.addEventListener("keydown", (event) => {
    let letter = event.key.toLowerCase();
    if (!letter.match(/[a-z]/) || letter.length > 1) return;
    
    if (chosenWord.includes(letter)) {
        chosenWord.split("").forEach((char, index) => {
            if (char === letter) {
                correctLetters[index] = letter;
                inputsContainer.children[index].value = letter;
            }
        });
    } else {
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            maxGuesses--;
        }
    }

    remainingGuesses.innerText = maxGuesses;
    wrongLettersDisplay.innerText = wrongLetters.join(", ");

    checkGameStatus();
});

// Function to check and display win/lose
function checkGameStatus() {
    let guessedWord = correctLetters.join("");

    if (guessedWord === chosenWord) {
        win.style.display = "block"
        win.textContent = "Congrats! You guessed the word correctly";
        return;

    } else if (maxGuesses <= 0) {
        lose.style.display = "block";
        lose.textContent = `You lost. The word was "${chosenWord}"`;
        return;
    }
}

// Reset button event
resetButton.addEventListener("click", randomObj);

// Initialize game
randomObj();
