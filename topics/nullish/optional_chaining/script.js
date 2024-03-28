// OPTIONAL CHAINING
// Check more about optional chaining at:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

// Mozilla says:
// The optional chaining (?.) operator accesses an object's property or calls a function.
// If the object accessed or function called using this operator is undefined or null,
// the expression short circuits and evaluates to undefined instead of throwing an error.

const adventurer = {
  name: "Alice",
  adventures: 0,
  cat: {
    name: "Dinah",
  },
};

const dogName = adventurer.dog?.name;
console.log(dogName); // undefined
console.log(dogName || "No dog"); // No dog
console.log(adventurer.someNonExistentMethod?.()); // Expected output: undefined

const calculator = {
  sum(x, y) {
    return x + y;
  },
  mul(x, y) {
    return x * y;
  },
};
// Just to look nice, I'll use the spread operator (so fucking unnecessary)
console.log(`3 + 2 = ${calculator.sum?.(...[3, 2])}`); // 3 + 2 = 5
console.log(`3 * 2 = ${calculator.mul?.(...[3, 2])}`); // 3 * 2 = 6
console.log(
  `3 / 2 = ${calculator.div?.(...[3, 2]) ?? "non-existent operation"}`
); // 3 / 2 = non-existent operation
