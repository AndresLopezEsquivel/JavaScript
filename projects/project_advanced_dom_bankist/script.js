"use strict";

// This project is part of the  The Complete JavaScript Course 2024: From Zero to Expert!
// By Jonas Schmedtmann

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Scrolling
const btnScroll = document.querySelector(".btn--scroll-to");
const sectionOne = document.querySelector("#section--1");

const scroll = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
  // https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
  // left and top are relative to the viewport
  let { left, top } = sectionOne.getBoundingClientRect();
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollX
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
  let [currScrollX, currScrollY] = [window.scrollX, window.scrollY];
  // Viewport's width and height
  let viewportHeight = document.documentElement.clientHeight;
  let viewportWidth = document.documentElement.clientWidth;

  // console.log(`Before scrolling: `);
  // console.log(`sectionOne: left, top = ${left}, ${top}`);
  // console.log(`window: scrollX, scrollY = ${currScrollX}, ${currScrollY}`);
  // console.log(`viewport: width, height = ${viewportWidth}, ${viewportHeight}`);

  window.scrollTo({
    top: top + currScrollY,
    left: left + currScrollX,
    behavior: "smooth",
  });

  // Just for debugging purposes:
  // Note: In order for the next section to work, the behaviour option
  // should be 'instant'. If it is 'smooth', the code would
  // be executed before the transition movement finishes.

  // ({ a, b } = obj); // parentheses are required
  // Check: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

  // ({ left, top } = sectionOne.getBoundingClientRect());
  // [currScrollX, currScrollY] = [window.scrollX, window.scrollY];
  // viewportHeight = document.documentElement.clientHeight;
  // viewportWidth = document.documentElement.clientWidth;

  // console.log("");
  // console.log(`After scrolling: `);
  // console.log(`sectionOne: left, top = ${left}, ${top}`);
  // console.log(`window: scrollX, scrollY = ${currScrollX}, ${currScrollY}`);
  // console.log(`viewport: width, height = ${viewportWidth}, ${viewportHeight}`);

  // Another recent option to scroll to a desired position, is
  // the scrollIntoView method.
  // Check more at: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  // To see it work, comment the window.scrollTo section
  // sectionOne.scrollIntoView({ behavior: "smooth" });
};

btnScroll.addEventListener("click", scroll);
