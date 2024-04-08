"use strict";
// The some method let us know if there is at least one element in an array
// that meets a certain condition (the condition is provided via a callback function).
// You can know more about this method at:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
const numbers = [-3, -2, -1, 0, 1, 2, 3];

// Is there any positive number?
console.log(numbers.some((number) => number > 0)); // true

// Is there any negative number?
console.log(numbers.some((number) => number < 0)); // true

// Is there any number greater than 3?
console.log(numbers.some((number) => number > 3)); // false
