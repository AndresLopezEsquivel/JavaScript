const numbers = [1, 2, 3, 4, 5];
// The map method receives a callback function and produces a new array after processing
// the one it is iterating.
// The callback function receives each element of the array that is being iterating.
// The callback function processes each element.
const squaredNumbers = numbers.map(function (number) {
  return number ** 2;
});
// In this example, I'm gonna use an arrow function for simplicity
const squaredNumbersV2 = numbers.map((number) => number ** 2);

console.log(numbers); // [1, 2, 3, 4, 5]
console.log(squaredNumbers); // [1, 4, 9, 16, 25]
console.log(squaredNumbersV2); // [1, 4, 9, 16, 25]

// The map method also receives the element, index and the array
const movements = [100, -20, -50, 400];
const messages = movements.map(
  (movement, i, movements) =>
    `${i + 1}) ${movement > 0 ? "Deposited" : "Withdrew"} ${Math.abs(movement)}`
);

console.log(movements); // [100, -20, -50, 400]
console.log(messages); // ['1) Deposited 100', '2) Withdrew 20', '3) Withdrew 50', '4) Deposited 400']
