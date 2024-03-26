// To know more about the spread syntax, check:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

// The spread syntax lets us unpack the elements of an array.
// The retrieved values are separated by commas
const arr = [5, 6, 7, 8];
console.log([1, 2, 3, 4, ...arr]); // [1, 2, 3, 4, 5, 6, 7, 8]
console.log([...arr, 9, 10, 11, 12]); // [5, 6, 7, 8, 9, 10, 11, 12]

// Create a shallow copy of an array
// Each array element retains its identity without getting copied.
// Shallow copies: https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy
const copy_arr = [...arr];

// Join two or more arrays
const letters_1 = ['a', 'b', 'c'];
const letters_2 = ['d', 'e', 'f'];
const letters_3 = ['g', 'h', 'i'];
const letters = [...letters_1, ...letters_2, ...letters_3];
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

// Pass arguments to a function
const sum = (x, y, z) => x + y + z ;
// Same as sum(1, 2, 3)
console.log(sum(...[1, 2, 3])); // 6

// In fact, the spread syntax is not only applied to arrays but also
// to all iterables (strings, sets, maps, etc.).
console.log(..."ANDREW"); // A N D R E W

// In recent versions of JS, the spread syntax can be used with objects.
// Check more about at:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals
// Shallow copies: https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy

const obj1 = { foo: "bar", x: 42 };
const obj2 = { bar: "baz", y: 13 };

const mergedObj = { ...obj1, ...obj2 };
// { foo: "bar", x: 42, bar: "baz", y: 13 }
