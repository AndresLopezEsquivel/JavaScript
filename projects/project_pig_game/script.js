'use strict';

const restartPlayerData = playerIndex => {
	// Name of classes and id's
	const scoreId = players[playerIndex].scoreId;
	const currentScoreId = players[playerIndex].currentScoreId;
	// Elements
	const scoreElement = document.getElementById(scoreId);
	const currentScoreElement = document.getElementById(currentScoreId);
	// Initialize everyting
	players[playerIndex].score = 0;
	players[playerIndex].currentScore = 0;
	scoreElement.textContent = '0';
	currentScoreElement.textContent = '0';
	// Print initial data
	console.log(players[playerIndex]);
};

const createNewGame = () => {
	restartPlayerData(0);
	restartPlayerData(1);
	deactivateBoard('player--0');
	activateBoard('player--1');
	currentPlayerIndex = 1;
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
		score: 0,
		currentScore: 0,
		boardClass: 'player--0',
		scoreId: 'score--0',
		currentScoreId: 'current--0',
	},
	// Player 1 data
	1: {
		score: 0,
		currentScore: 0,
		boardClass: 'player--1',
		scoreId: 'score--1',
		currentScoreId: 'current--1',
	},
};

let currentPlayerIndex = 0;
const rollDiceButton = document.querySelector('.btn--roll');
const restartButton = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');

dice.classList.add('hidden');
restartPlayerData(0);
restartPlayerData(1);

rollDiceButton.addEventListener('click', rollDice);
restartButton.addEventListener('click', createNewGame);
