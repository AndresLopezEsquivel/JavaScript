"use strict";
// Higher order function are functions that receive functions as arguments,
// return functions or both (receive and return)

// Functions that receive functions
const sum = (x, y) => x + y;
const mul = (x, y) => x * y;
const operate = (x, y, f) => f(x, y);

// As you can see, sum is being passed without (). That is known as a callback
console.log(operate(2, 3, sum)); // 5
console.log(operate(2, 3, mul)); // 6

// Functions that return functions
const greet = (text) => (person) => `${text}, ${person}`;
const sayHelloTo = greet("Hello");
const sayHiTo = greet("Hi");

console.log(sayHelloTo("Andrés")); // Hello, Andrés
console.log(sayHiTo("Andrés")); // Hi, Andrés
