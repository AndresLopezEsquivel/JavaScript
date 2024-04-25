"use strict";

// To know more about Prototypes, check:
// https://javascript.info/prototypes

// To know more about constructors, check the constructors directory

// Each and every function in JavaScript has a property called prototype

// Every object that is created by a certain constructor function
// will get access to all the methods and properties defined
// in the constructor's prototype property (prototype is actually an object)

const Person = function (name, age) {
  this.name = name;
  this.age = age;
};

// Each object created by using the constructor Person,
// will have __proto__ === Person.prototype

const andrew = new Person("Andrew", 23);

// We can add methods and properties to a prototype so the objects
// that inherit from it can use them

Person.prototype.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`);
};

console.log("andrew.sayHi()");
andrew.sayHi(); // Hi, I'm Andrew

console.log("");
console.log("Person.prototype == andrew.__proto__");
console.log(Person.prototype == andrew.__proto__); // true

console.log("");
console.log("Person.prototype.isPrototypeOf(andrew)");
console.log(Person.prototype.isPrototypeOf(andrew)); // true

// The Person.prototype object will be the prototype of all the objects
// created by using the Person constructor. It is important to keep in mind
// that Person.prototype is not the prototype of Person.prototype, because
// its prototype is Person.prototype.__proto__

console.log("");
console.log("Person.prototype.__proto__.isPrototypeOf(Person.prototype)");
console.log(Person.prototype.__proto__.isPrototypeOf(Person.prototype)); // true

// The prototype of Person.prototype is
// Object.prototype === Person.prototype.__proto__

console.log("");
console.log("Object.prototype.isPrototypeOf(Person.prototype)");
console.log(Object.prototype.isPrototypeOf(Person.prototype));

// Let's see another example
const numbers = new Array(1, 1, 2, 3, 4, 4, 5); // Same as const numbers = [1, 1, 2, 3, 4, 4, 5]

console.log("");
console.log("Array.prototype.isPrototypeOf(numbers)");
console.log(Array.prototype.isPrototypeOf(numbers)); // true

// Let's add a new method to Array.prototype (DON'T DO THIS IN A REAL PROJECT, this is just an experiment)
Array.prototype.unique = function () {
  return [...new Set(this)]; // this === numbers
};

console.log("");
console.log("numbers.unique()");
console.log(numbers.unique()); // [1, 2, 3, 4, 5]
