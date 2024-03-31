// forEach is a higher order function that receives a callback function.
// In every iteration, forEach calls the callback function and passes to it
// the element of the current iteration.

const numbers = [1, 2, 3];
// The number parameter will receive the number of each iteration
const showNumber = (number) => console.log(number);

numbers.forEach(showNumber);
// Outputs:
// 1
// 2
// 3

// forEach also sends to the callback function the index of the current
// iteration and the array it is looping through.

numbers.forEach((number, index, array) => {
  console.log(`${index}) ${number}`);
});

// Outputs:
// 0) 1
// 1) 2
// 2) 3

// Warning: break and continue don't work in forEach
// If you need to break/continue at some point, use the traditional for loop

// We can also iterate maps using forEach

const mapExample = new Map([
  ["Val1", 1],
  ["Val2", 2],
  ["Val3", 3],
]);

mapExample.forEach((value, key, map) => {
  console.log(`${key} => ${value}`);
});

// Val1 => 1
// Val2 => 2
// Val3 => 3

// We can also iterate sets using forEach
const setExample = new Set(["USD", "MXN", "USD", "EUR", "EUR"]);

// The second parameters of the callback function is set to _
// because it representes the same value as the first parameter, so
// we can refer either to the first parameter or to the second

setExample.forEach((value, _, set) => {
  console.log(set);
  console.log(value);
  console.log();
});
