"use strict";

// A great tutorial about DOM traversing is
// https://javascript.info/dom-navigation

// Here I solve some of the recommended questions to enforce
// my understanding of this topic.

// Different ways to access the <div> element:
console.log("Different ways to access the <div> element:");
console.log(document.body.firstElementChild);
console.log(document.body.children[0]);
console.log(document.body.childNodes[1]);
console.log(document.body.querySelector("div"));
console.log(
  document.body.lastElementChild.previousElementSibling.previousElementSibling
);

// Different ways of accessing the <ul> element:
console.log("");
console.log("Different ways of accessing the <ul> element");
console.log(document.body.querySelector("ul"));
console.log(document.body.lastElementChild.previousElementSibling);
console.log(document.body.children[1]);

// Different ways of accessing the second <li> (with Pete)
console.log("");
console.log("Different ways of accessing the second <li> (with Pete)");
console.log(document.querySelector("ul").lastElementChild);
console.log(
  document.body.lastElementChild.previousElementSibling.lastElementChild
);
