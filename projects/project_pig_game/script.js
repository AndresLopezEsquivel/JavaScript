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
		players[currentPlayerIndex].deactivateBoard();
		// If currentPlayerIndex is 0, then it will change to 1.
		// It currentPlayerIndex is 1, then it will change to 0.
		currentPlayerIndex = Number(!currentPlayerIndex);
		players[currentPlayerIndex].activateBoard();
	}
};

// Check the following site to know more about 'this'
// https://stackoverflow.com/questions/7043509/this-inside-object
const players = {
	// Player 0 data
	0: {
		boardClassName: 'player--0',
		boardElement: document.querySelector(`.player--0`),
		activateBoard: function () {
			this.boardElement.classList.add('player--active');
		},
		deactivateBoard: function () {
			this.boardElement.classList.remove('player--active');
		},
	},
	// Player 1 data
	1: {
		boardClassName: 'player--1',
		boardElement: document.querySelector(`.player--1`),
		activateBoard: function () {
			this.boardElement.classList.add('player--active');
		},
		deactivateBoard: function () {
			this.boardElement.classList.remove('player--active');
		},
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
