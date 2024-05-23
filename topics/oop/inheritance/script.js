"use strict";

// Check: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#classical_inheritance_with_object.create

const Person = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};


// anyPerson = new Person("Andrés", "López");
// anyPerson.constructor === Person // <= true
// Object.getPrototypeOf(anyPerson) === Person.prototype // <= true
// Object.getPrototypeOf(anyPerson) === anyPerson.__proto__ // <= true

const Developer = function(firstName, lastName, stack) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
  // When invoked as a standalone function (not attached to an object: func()),
  // 'this' typically refers to the global object (in non-strict mode) or undefined (in strict mode).

  // Here, Person is not being used as a constructor but as a function.
  // The purpose of calling the Person function is to add and set the
  // firstName and lastName properties of the object produced by the Developer constructor.
  // The call method is being used on Person to keep the current context
  // and avoid 'this' to be undefined inside Person.
  Person.call(this, firstName, lastName); // Add firstName and lastName properties to the object at which 'this' points to
  this.stack = stack;
}

const anyDeveloper = new Developer("Andrés", "López", "RoR");
// anyDeveloper.constructor === Developer // <= true
// anyDeveloper.__proto__ === Developer.prototype // <= true
// anyDeveloper.__proto__.__proto__ === Object.prototype // <= true
// anyDeveloper.__proto__.__proto__ === Person.prototype // <= false
// Object.getPrototypeOf(Developer.prototype) === Object.prototype // <= true
// Object.getPrototypeOf(Developer.prototype) === Person.prototype // <= false
