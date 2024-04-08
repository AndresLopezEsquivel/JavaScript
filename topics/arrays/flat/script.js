"use strict";

// The flat method let us retrieve the elements from nested arrays at N levels deep.
// By default, N = 1

let numbers = [[1, 2], [3, 5], 5, 6];

console.log(numbers.flat()); // [1, 2, 3, 5, 5, 6]

numbers = [[1, [2, 3, [4, 5]]], 6];

console.log(numbers.flat()); // [1, Array(3), 6]

// Go 3 levels deep
console.log(numbers.flat(3)); // [1, 2, 3, 4, 5, 6]
