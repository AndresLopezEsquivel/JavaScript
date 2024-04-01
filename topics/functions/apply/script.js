"use strict";
// The apply method is similar to the call method (check the directory named 'call'),
// however, instead of receiving the arguments by commas, the apply method
// receives the arguments through an array

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

// The apply function calls the sum function and sets the 'this' keyword to
// point either to the pointA object or the pointB object

sum.apply(pointA);
mul.apply(pointA);
sum.apply(pointB);
mul.apply(pointB);

console.log(pointA); // {x: 3, y: 2, operations: [{operation: "sum", result: 5}, {operation: "mul", result: 6}]}
console.log(pointB); // {x: 5, y: 8, operations: [{operation: "sum", result: 13}, {operation: "mul", result: 40}]}

// When using the applt method, first indicate the object you want to work with
// and, then, indicate the array with the arguments to be passed to the function you are calling.

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

addPassenger.apply(flightOne, ["Andrés", "Mexican"]);
addPassenger.apply(flightTwo, ["Satori", "Japanese"]);

console.log(flightOne); // {numberOfFlight: 1, passengers: [{name: "Andrés", nationality: "Mexican"}]}
console.log(flightTwo); // {numberOfFlight: 2, passengers: [{name: "Satori", nationality: "Japanese"}]}
