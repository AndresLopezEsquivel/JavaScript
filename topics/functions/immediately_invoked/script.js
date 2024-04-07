// Immediately Invoked Function Expressions are functions that are called and
// executed only once.

(function () {
  console.log("I will run only once.");
})(); // I will run only once.

(() => console.log("I will run only once, too"))(); // I will run only once, too
