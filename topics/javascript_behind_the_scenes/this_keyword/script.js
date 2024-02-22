// Use strict mode
"use strict";

// To know more aboth the this keyword, visit
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

console.log(this); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}

// Calling the this keyword from a function
// Here, the function is not attached to any object
const f = function () {
  // In strict mode, this equals undefined
  // In non-strict mode, this equals Window {window: Window, self: Window, document: document, name: '', location: Location, …}
  console.log(this);
};

f(); // this => undefined

const f_arrow = () => {
  // An arrow function uses the this value
  // of its parent's scope
  console.log(this);
};

// In this particular case, the parent scope is the global scope, hence
// this == globalThis, where globalThis = {window: Window, self: Window, document: document, name: '', location: Location, …}
f_arrow();

// Let's try the this keyword inside an object
const obj = {
  // You shouldn't use an arrow function as method
  // because 'this' doesn't point to the object
  // that is calling it. Rather, it points to the value
  // that 'this' has in the parent's scope
  f_arrow: () => {
    console.log(this);
  },
  f: function () {
    console.log(this);
  },
};

obj.f(); // Prints the obj object => {f_arrow: ƒ, f: ƒ}
// Because the lexical context is the global scope, then this === globalThis
obj.f_arrow(); // Prints the Window object => {window: Window, self: Window, document: document, name: '', location: Location, …}

// Let's detach the f function from the obj object
// and let's see what is the value of 'this'
const detached_f = obj.f;
// detached_f is a function that is not attached
// to any object. So, when calling it, it is undefined
detached_f(); // undefined

// var creates properties to the gobal object
var randomProperty = "randomProperty";
console.log(this === globalThis); // true
console.log(globalThis.randomProperty); // randomProperty

// Let's see how arrow functions can come in handy

console.log("Let's use obj2");

const obj2 = {
  someValue: "SomeValue",
  g: function () {
    console.log(this); // this === obj2 => {someValue: 'SomeValue', g: ƒ}

    const self = this;

    const inner_g2 = function () {
      console.log("Inside inner_g2");
      console.log(this); // undefined
      console.log(self); // self === obj2 => {someValue: 'SomeValue', g: ƒ}
    };

    const inner_g3 = () => {
      console.log("Inside inner_g3");
      console.log(this); // this === obj2 => {someValue: 'SomeValue', g: ƒ}
      console.log(self); // self === obj2 => {someValue: 'SomeValue', g: ƒ}
    };

    inner_g2();

    inner_g3();
  },
};

obj2.g();
