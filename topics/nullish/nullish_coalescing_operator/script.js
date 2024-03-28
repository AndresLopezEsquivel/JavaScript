// There exists the nullish coalesing operator
// Check more at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

// Mozilla says:
// The nullish coalescing (??) operator is a logical operator that returns its right-hand
// side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.

const nullValue = null;
const emptyText = ""; // falsy
const someNumber = 42;

const valA = nullValue ?? "default for A";
const valB = emptyText ?? "default for B";
const valC = someNumber ?? 0;

console.log(valA); // "default for A"
console.log(valB); // "" (as the empty string is not null or undefined)
console.log(valC); // 42

// As with the AND and OR assignment operator, there is the nullish assignment operator
// val ??= X same as val = val ?? X
let val = null;
val ??= 10; // Because val is null, it will be assigned the value of ten
console.log(`val = ${val}`); // val = 10
val = undefined;
val ??= 20; // Because val is undefined, it will be assigned the valued of twenty
console.log(`val = ${val}`); // val = 20
val = 0;
val ??= 30; // val is zero, hence its value won't be updated.
console.log(`val = ${val}`); // val = 0
