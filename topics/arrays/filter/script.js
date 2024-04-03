"use strict";
// To filter elements from a array (select those that meet a condition), use the filter method.
const numbers = [-2, -1, 0, 1, 2];
// The filter method receives a callback function
// The callback function return a boolean to indicate whether
// the element met the condition (true) or not (false)
const nonZeroPositiveNumbers = numbers.filter((number) => number > 0);

console.log(numbers); // [-2, -1, 0, 1, 2]
console.log(nonZeroPositiveNumbers); // [1, 2]
