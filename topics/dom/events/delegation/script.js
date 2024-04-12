"use strict";

// To know more about delegation and bubbling and capturing,
// I highly recommend the next websites:
// https://javascript.info/event-delegation
// https://javascript.info/bubbling-and-capturing

// Create a tree that shows/hides node children on click:

const list = document.querySelector(".stuff-list");

list.addEventListener("click", function (event) {
  const eventElement = event.target;
  if (eventElement.tagName != "LI") return;
  for (const child of eventElement.children) {
    child.hidden = !child.hidden;
  }
});
