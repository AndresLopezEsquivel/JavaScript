let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

const generateTarget = () => Math.floor(Math.random() * 10);

const compareGuesses = (userGuess, computerGuess, target) => {
  // Returns true if user's guess is the closest to the target.
  // Returns false if computer's guess is the closest to the target.
  // If a tie happens, user wins by default.
  const userDelta = getAbsoluteDistance(target, userGuess);
  const computerDelta = getAbsoluteDistance(target, computerGuess);
  return userDelta == computerDelta || userDelta < computerDelta;
}

const updateScore = winner => {
  humanScore += winner === 'human' ? 1 : 0;
  computerScore += winner === 'computer' ? 1 :  0;
}

const advanceRound = () => currentRoundNumber += 1;

const getAbsoluteDistance = (d1, d2) => Math.abs(d1 - d2);
