"use strict";

// The every method let us know if all the elements of an array
// meet a condition provided via a callback function.

const numbers = [0, 1, 2, 3, 4, 5];

// All numbers are greater than zero?
console.log(numbers.every((number) => number > 0)); // false

// All numbers are greater or equal to zero?
console.log(numbers.every((number) => number >= 0)); // true
