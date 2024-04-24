"user strict";

// These examples and notes are based on the
// The Complete JavaScript Course 2024: From Zero to Expert!
// by Jonas Schmedtmann

// JavaScript doesn't really have classes. It works with objects and prototypes.

// A constructor function let us create objects
// We call a constructor function using the new operator

// Either a function expression or declaration would work,
// but an arrow function wouldn't because it uses the 'this' value of its parent

const Person = function (name, age) {
  console.log(this); // Person {}
  this.name = name;
  this.age = age;

  // Although it is possible, it is not a good practice to create methods
  // inside a constructor function. If we create N objects using a constructor function,
  // then we would be creating N-times the same methods.
  // To solve this, we use prototypes and delegation (prototype inheritance).

  // So, don't do this:

  // this.sayHello = function () {
  //   console.log(`Hi! I'm ${this.name}`);
  // }
};

// Here is what happens when calling a function using the new keyword:
// 1) An empty object ({}) is created
// 2) The this value is assigned to the recently created empty object => this = {}
// 3) The object is linked to a prototype
// 4) The function returns the object (the object could already have properties and methods)

const andrew = new Person("Andrew", 23);
const isabel = new Person("Isabel", 25);

console.log(andrew); // Person {name: 'Andrew', age: 23}
console.log(andrew instanceof Person); // true
console.log(isabel); // Person {name: 'Isabel', age: 25}
console.log(isabel instanceof Person); // true
