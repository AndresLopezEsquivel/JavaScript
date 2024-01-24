'use strict';

const restartGame = () => {
	// Initialize with 0 both score elements
	score0Element.textContent = '0';
	score1Element.textContent = '0';
	// Initially, hide the dice element
	dice.classList.add('hidden');
};

const getRandomDiceNumber = () => Math.trunc(Math.random() * 6) + 1;

const rollDice = () => {
	// 1 <= n <= 6
	const n = getRandomDiceNumber();
	// Flag to change player when n === 1
	const changePlayer = n === 1;
	// Assign new number to dice element
	dice.src = `./dice-${n}.png`;
	dice.classList.remove('hidden');
	// Routine when it is time to change player
	if (changePlayer) {
		deactivateBoard(players[currentPlayerIndex].boardClass);
		// If currentPlayerIndex is 0, then it will change to 1.
		// It currentPlayerIndex is 1, then it will change to 0.
		currentPlayerIndex = Number(!currentPlayerIndex);
		activateBoard(players[currentPlayerIndex].boardClass);
	} else {
		players[currentPlayerIndex].currentScore += n;
		updateCurrentScore(
			players[currentPlayerIndex].currentScore,
			players[currentPlayerIndex].currentScoreId
		);
	}
};

const activateBoard = boardClassName => {
	document.querySelector(`.${boardClassName}`).classList.add('player--active');
};

const deactivateBoard = boardClassName => {
	document
		.querySelector(`.${boardClassName}`)
		.classList.remove('player--active');
};

const updateCurrentScore = (n, currentScoreId) => {
	document.querySelector(`#${currentScoreId}`).textContent = n;
};

// Check the following site to know more about 'this'
// https://stackoverflow.com/questions/7043509/this-inside-object
const players = {
	// Player 0 data
	0: {
		currentScore: 0,
		boardClass: 'player--0',
		currentScoreId: 'current--0',
	},
	// Player 1 data
	1: {
		currentScore: 0,
		boardClass: 'player--1',
		currentScoreId: 'current--1',
	},
};

let currentPlayerIndex = 0;
const rollDiceButton = document.querySelector('.btn--roll');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const player0Board = document.querySelector('.player--0');
const player1Board = document.querySelector('.player--1');
const dice = document.querySelector('.dice');

restartGame();

rollDiceButton.addEventListener('click', rollDice);
