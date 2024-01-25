'use strict';

const restartPlayerData = playerIndex => {
	const player = players[playerIndex];
	// Name of classes and id's
	const scoreId = player.scoreId;
	const currentScoreId = player.currentScoreId;
	const boardClass = player.boardClass;
	// Elements
	const scoreElement = document.getElementById(scoreId);
	const currentScoreElement = document.getElementById(currentScoreId);
	const boardElement = document.querySelector(`.${boardClass}`);
	// Initialize everyting
	player.score = 0;
	player.currentScore = 0;
	scoreElement.textContent = '0';
	currentScoreElement.textContent = '0';
	// If the player won the lastest game, remove the
	// winner style from their board
	const wasWinner = boardElement.classList.contains('player--winner');
	if (wasWinner) boardElement.classList.remove('player--winner');
	// Print initial data
	console.log(player);
};

const createNewGame = () => {
	restartPlayerData(0);
	restartPlayerData(1);
	dice.classList.remove('hidden');
	holdButton.classList.toggle('hidden');
	rollDiceButton.classList.toggle('hidden');
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
		players[currentPlayerIndex].currentScore = 0;
		// Update current score board to be zero
		updateCurrentScore(0, players[currentPlayerIndex].currentScoreId);
		changePlayers();
	} else {
		players[currentPlayerIndex].currentScore += n;
		updateCurrentScore(
			players[currentPlayerIndex].currentScore,
			players[currentPlayerIndex].currentScoreId
		);
	}
};

const holdScore = () => {
	const player = players[currentPlayerIndex];
	// Add to total score the current score
	player.score += player.currentScore;
	// Set current score to zero
	player.currentScore = 0;
	// Update current score board to be zero
	updateCurrentScore(0, player.currentScoreId);
	// Update score board
	updateScoreBoard(player.score, player.scoreId);

	if (player.score >= 100) {
		setWinner(player.boardClass);
		holdButton.classList.toggle('hidden');
		rollDiceButton.classList.toggle('hidden');
		dice.classList.add('hidden');
	} else {
		changePlayers();
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

const updateScoreBoard = (n, scoreId) => {
	document.querySelector(`#${scoreId}`).textContent = n;
};

const setWinner = boardClass => {
	document.querySelector(`.${boardClass}`).classList.add('player--winner');
};

const changePlayers = () => {
	deactivateBoard(players[currentPlayerIndex].boardClass);
	// If currentPlayerIndex is 0, then it will change to 1.
	// It currentPlayerIndex is 1, then it will change to 0.
	currentPlayerIndex = Number(!currentPlayerIndex);
	activateBoard(players[currentPlayerIndex].boardClass);
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
const holdButton = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

dice.classList.add('hidden');
restartPlayerData(0);
restartPlayerData(1);

rollDiceButton.addEventListener('click', rollDice);
restartButton.addEventListener('click', createNewGame);
holdButton.addEventListener('click', holdScore);
