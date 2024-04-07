"use strict";

const sum = function (x = 0, y = 0) {
  return x + y;
};

console.log(sum()); // 0
console.log(sum(...[3, 2])); // 5
