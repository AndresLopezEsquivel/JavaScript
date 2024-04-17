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

const btnScroll = document.querySelector(".btn--scroll-to");
const sectionOne = document.querySelector("#section--1");
const navLinks = document.querySelector(".nav__links");
const operationsTabContainer = document.querySelector(
  ".operations__tab-container"
);
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

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

const scrollToSection = (section) => {
  let { left, top } = section.getBoundingClientRect();
  let [currScrollX, currScrollY] = [window.scrollX, window.scrollY];
  window.scrollTo({
    top: top + currScrollY,
    left: left + currScrollX,
    behavior: "smooth",
  });
};

const goToSectionHandler = function (event) {
  event.preventDefault(); // To prevent the default behaviour of an anchor tag
  const elementEvent = event.target; // Determine what element generated the event
  if (!elementEvent.classList.contains("nav__link")) return;
  if (elementEvent.classList.contains("nav__link--btn")) return;
  const sectionId = elementEvent.getAttribute("href");
  scrollToSection(document.querySelector(sectionId));
  // console.log(sectionId);
  // console.log(elementEvent.getAttribute("href"));
};

// Version 1 of selectOperation
const selectOperationV1 = function (event) {
  const elementEvent = event.target;
  let tabNumber;
  // if (elementEvent === this) return;
  if (elementEvent.tagName !== "BUTTON") return;
  for (let childElement of operationsTabContainer.children) {
    tabNumber = Array.from(childElement.classList)
      .join(" ")
      .match(/operations__tab--(?<tab_number>\d)/).groups.tab_number;

    childElement.classList.remove("operations__tab--active");

    document
      .querySelector(`.operations__content--${tabNumber}`)
      .classList.remove("operations__content--active");
  }
  elementEvent.classList.add("operations__tab--active");
  // For regex, check:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences#using_groups
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
  // For Array.from, check:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  tabNumber = Array.from(elementEvent.classList)
    .join(" ")
    .match(/operations__tab--(?<tab_number>\d)/).groups.tab_number;
  document
    .querySelector(`.operations__content--${tabNumber}`)
    .classList.add("operations__content--active");
};

const selectOperation = function (event) {
  const clicked = event.target.closest(".operations__tab");
  if (!clicked) return;
  document
    .querySelectorAll(".operations__content")
    .forEach((element) =>
      element.classList.remove("operations__content--active")
    );
  document
    .querySelectorAll(".operations__tab")
    .forEach((element) => element.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
};

const hoverLink = function (event) {
  const link = event.target;
  const opacity = this; // The value of opacity was set using the bind method
  if (!link.classList.contains("nav__link")) return;
  document.querySelectorAll(".nav__item").forEach((list_item) => {
    if (list_item !== link.parentElement) list_item.style.opacity = opacity;
  });
  document.querySelector(".nav__logo").style.opacity = opacity;
};

// Version 1 of stickHeader
const stickHeaderV1 = function () {
  // const { top } = sectionOne.getBoundingClientRect();
  // console.log(top);
  // if (top < 10) {
  //   nav.classList.add("sticky");
  // } else {
  //   nav.classList.remove("sticky");
  // }
  // console.log(`top: ${sectionOneInitial.top}, scrollY: ${window.scrollY}`);
  if (window.scrollY > sectionOneInitial.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const stickHeader = function (entries, observer) {
  // entries is a list of instances of IntersectionObserverEntry
  // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry
  // In this case, entries will have only one element
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky"); // When the header is no longer visible, stick the menu
  } else {
    nav.classList.remove("sticky"); // When as soon as the header is visible, unstick the menu
  }
};

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
  } else {
    entry.target.classList.add("section--hidden");
  }
};

btnScroll.addEventListener("click", scroll);
navLinks.addEventListener("click", goToSectionHandler);
operationsTabContainer.addEventListener("click", selectOperation);
// To know more about moving-the-mouse events
// check: https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave
// To know more about the bind method, check:
// https://javascript.info/bind
nav.addEventListener("mouseover", hoverLink.bind(0.5));
nav.addEventListener("mouseout", hoverLink.bind(1.0));
// Implement a sticky navigation

// https://www.w3schools.com/jsref/obj_window.asp
// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
// const sectionOneInitial = sectionOne.getBoundingClientRect();
// window.addEventListener("scroll", stickHeader);

// Implementing stick navigation using Intersection Observer API
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const observerOptions = {
  root: null, // root is the viewport
  threshold: 0, // We want the callback function to be called once the header is no longer visible or when as soon as even one pixel is visible
  rootMargin: `-${nav.getBoundingClientRect().height}px`, // Decrease the margin of the viewport by -90 px
};
const stickyObserver = new IntersectionObserver(stickHeader, observerOptions);
stickyObserver.observe(header);

// Implementing section revealing using Intersection Observer API
const revealSectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

document.querySelectorAll(".section").forEach((sectionElement) => {
  sectionElement.classList.add("section--hidden");
  revealSectionObserver.observe(sectionElement);
});
