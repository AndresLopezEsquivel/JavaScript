"use strict";
// Arrays are objects, hence they have methods.

// Slice an array using the slice method (it doesn't mutate the array)
const arr1 = [1, 2, 3, 4, 5];

console.log("The slice method: ");
console.log(arr1.slice(1, 3)); // [2, 3] <= The index 3 is not included
console.log(arr1.slice(-2)); // [4, 5] <= Extracts from element with index -2

// To extract a portion of an array an mutate that array, use the splice method
const arr2 = [1, 2, 3, 4, 5];

console.log("The splice method: ");
console.log(arr2.splice(2)); // [3, 4, 5] <= Extracts elements starting from index 2
console.log(arr2); // [1, 2] <= After extracting the elements [3, 4, 5], only [1, 2] are left

// To reverse an array use the reverse method (warning: it mutates the array)
const arr3 = ["A", "n", "d", "r", "é", "s"];

console.log("The reverse method: ");
console.log(arr3); // ['A', 'n', 'd', 'r', 'é', 's']
arr3.reverse();
console.log(arr3); // ['s', 'é', 'r', 'd', 'n', 'A']

// To concatenate two arrays use the concat method
const numbers1 = [1, 2];
const numbers2 = [3, 4];

console.log("The concat method: ");
const numbers = numbers1.concat(numbers2);
console.log(numbers1); // [1, 2]
console.log(numbers2); // [3, 4]
console.log(numbers); // [1, 2, 3, 4]

// You can also concatenate using the spread syntax
const numbersSpread = [...numbers1, ...numbers2];
console.log(numbersSpread); // [1, 2, 3, 4]

// We can also access elements of an array using the at method.
// The at method, unlike the traditional indexing via [], lets us use negative indexes.
// This way, we can access the last element of an array using the index -1.

const vowels = ["a", "e", "i", "o", "u"];

console.log("The at method: ");
console.log(vowels.at(0)); // "a"
console.log(vowels.at(-1)); // "u"
