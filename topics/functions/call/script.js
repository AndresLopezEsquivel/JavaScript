"use strict";
// The value of the 'this' keyword depends on the context it is being used.
// There might be methods that process the attributes of an object,
// hence the use of the 'this' keyword. But what if we want the same
// method to work with different objects? The 'this' keyword should point
// to the object we are interested to work on. Here is where the call method arrives.
// Basically, the call method allows us to point the this keyword whenever we want.

const pointA = {
  x: 3,
  y: 2,
  operations: [],
};

const pointB = {
  x: 5,
  y: 8,
  operations: [],
};

const sum = function () {
  const sumResult = this.x + this.y;
  this.operations.push({ operation: "sum", result: sumResult });
};

const mul = function () {
  const mulResult = this.x * this.y;
  this.operations.push({ operation: "mul", result: mulResult });
};

// The call function calls the sum function and sets the 'this' keyword to
// point either to the pointA object or the pointB object

sum.call(pointA);
mul.call(pointA);
sum.call(pointB);
mul.call(pointB);

console.log(pointA); // {x: 3, y: 2, operations: [{operation: "sum", result: 5}, {operation: "mul", result: 6}]}
console.log(pointB); // {x: 5, y: 8, operations: [{operation: "sum", result: 13}, {operation: "mul", result: 40}]}

// When using the call method, first indicate the object you want to work with
// and, then, indicate the arguments of the function you are calling.

const flightOne = {
  numberOfFlight: 1,
  passengers: [],
};

const flightTwo = {
  numberOfFlight: 2,
  passengers: [],
};

const addPassenger = function (name, nationality) {
  this.passengers.push({ name, nationality });
};

addPassenger.call(flightOne, "Andrés", "Mexican");
addPassenger.call(flightTwo, "Satori", "Japanese");

console.log(flightOne); // {numberOfFlight: 1, passengers: [{name: "Andrés", nationality: "Mexican"}]}
console.log(flightTwo); // {numberOfFlight: 2, passengers: [{name: "Satori", nationality: "Japanese"}]}
