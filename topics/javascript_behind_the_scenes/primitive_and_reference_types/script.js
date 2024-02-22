// Use strict mode
"use strict";

// Objects are referenced types

const obj1 = {
  prop_1: "prop_1",
  array_1: [1, 2],
};

const obj2 = obj1;

console.log(obj1); // {prop_1: 'prop_1', array_1: Array(2)}
console.log(obj2); // {prop_1: 'prop_1', array_1: Array(2)}

obj2.prop_1 = "prop_2";

console.log(obj1); // {prop_1: 'prop_2', array_1: Array(2)}
console.log(obj2); // {prop_1: 'prop_2', array_1: Array(2)}

// To make a non-deep copy of an object,
// use the Object.assign method, which merges two objects.
// WARNING: It doesn't make a deep copy. Let's see why

// copy_obj1 is a new object and doesn't point
// to the same object as obj1

// However, as we will see, both objects point
// to the same array_1 array. This is due to
// the non-deep copy Object.assign makes

const copy_obj1 = Object.assign({}, obj1);

console.log(obj1); // {prop_1: 'prop_2', array_1: Array(2)}
console.log(copy_obj1); // {prop_1: 'prop_2', array_1: Array(2)}

copy_obj1.prop_1 = "copy_prop_1";

console.log(obj1); // {prop_1: 'prop_2', array_1: Array(2)}
console.log(copy_obj1); // {prop_1: 'copy_prop_1', array_1: Array(2)}

copy_obj1.array_1.push(3);

console.log(obj1); // {prop_1: 'prop_2', array_1: Array(3)}
console.log(copy_obj1); // {prop_1: 'copy_prop_1', array_1: Array(3´)}
