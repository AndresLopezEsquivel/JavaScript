"use strict";

const checkButtonRoutine = () => {
  const guess = Number(inputGuess.value);
  if (!alreadyWon) {
    if (guess >= 1 && guess <= 20) {
      if (score > 0) {
        if (guess === secretNumber) {
          messageLabel.textContent = "Nice! You guessed the secret number!";
          numberLabel.textContent = secretNumber;
          body.style.backgroundColor = "#60b347";
          setHighscore();
          alreadyWon = true;
        } else if (guess > secretNumber) {
          messageLabel.textContent = "Try a little lower";
          scoreLabel.textContent = `Score: ${--score}`;
        } else {
          messageLabel.textContent = "Try a little higher";
          scoreLabel.textContent = `Score: ${--score}`;
        }
      } else {
        messageLabel.textContent = "You've lost. Click the 'Again' button";
      }
    } else {
      messageLabel.textContent = "Provide a valid guess :(";
    }
  }
};
const resetRoutine = () => {
  secretNumber = getSecretNumber();
  score = 20;
  alreadyWon = false;
  body.style.backgroundColor = "#222222";
  inputGuess.value = "";
  messageLabel.textContent = "Start guessing...";
  numberLabel.textContent = "?";
  scoreLabel.textContent = `Score: ${score}`;
  console.log(`Number to be guessed: ${secretNumber}`);
};
const getSecretNumber = () => Math.trunc(Math.random() * 20) + 1;
const setHighscore = () => {
  highscore = highscore < score ? score : highscore;
  hightscoreLabel.textContent = `Highscore: ${highscore}`;
};
let secretNumber = getSecretNumber();
let score = 20;
let highscore = 0;
let alreadyWon = false;
const body = document.querySelector("body");
const inputGuess = document.querySelector(".guess");
const againButton = document.querySelector(".again");
const checkButton = document.querySelector(".check");
const messageLabel = document.querySelector(".message");
const scoreLabel = document.querySelector(".label-score");
const hightscoreLabel = document.querySelector(".label-highscore");
const numberLabel = document.querySelector(".number");

console.log(`Number to be guessed: ${secretNumber}`);

// Restart the game
againButton.addEventListener("click", resetRoutine);
// Check guess
checkButton.addEventListener("click", checkButtonRoutine);
