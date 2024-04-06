"use strict";
// Jonas Schmedtmann says:
// 1) A closure is a variable environment attached to a function,
// exactly as it was at the time and place the function was created.
// 2) A closure is a closed-over variable environment of the execution
// context in which a function was created, even after that execution context is gone.
// 3) A closure makes sure that a function doesn't lose connection
// to variables that existed at the function's birth place.

// Example 1

const incrementCreator = function () {
  let times = 0;
  return function () {
    times++;
    console.log(`Times the function has been called: ${times}`);
  };
};

const increment = incrementCreator();

increment(); // Times the function has been called: 1
increment(); // Times the function has been called: 2
increment(); // Times the function has been called: 3

// Example 2

let mul;

const multiplierCreator = function (k) {
  mul = (a) => a * k;
};

multiplierCreator(2);

console.log(mul(2)); // 4
console.log(mul(4)); // 8
