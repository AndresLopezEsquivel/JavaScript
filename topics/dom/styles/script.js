"use strict";

// From The Complete JavaScript Course 2024: From Zero to Expert! by Jonas Schmedtmann
// Section: Advanced DOM and Events
// Class: Styles, attributes and classes

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

const header = document.querySelector(".header");

const cookiesMessage = document.createElement("div");
cookiesMessage.classList.add("cookie-meesage");
cookiesMessage.innerHTML =
  'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>';
header.append(cookiesMessage);
// To remove the cookies message
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    cookiesMessage.parentElement.removeChild(cookiesMessage);
  });

// Styles
// To know more about the style property, check:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style

cookiesMessage.style.backgroundColor = "#D0D3D4";
// cookiesMessage.style.width = "120%";

// When reading the style property, it only let us read the inline styles.
console.log(cookiesMessage.style.height); // Nothing <- it wasn't written as a inline style
console.log(cookiesMessage.style.backgroundColor); // rgb(208, 211, 212)

// If you want to retrieve all the style (including those that are not inline)
// use the getComputedStyle method
// To know more about, check:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
// https://www.w3schools.com/jsref/jsref_getcomputedstyle.asp

console.log(window.getComputedStyle(cookiesMessage).color); // rgb(68, 68, 68)
console.log(window.getComputedStyle(cookiesMessage).height); // 43.5px

// The height is a number such as 43.5px. To extract, for example,
// the float number 43.5 and remove the px unit, use, in this case,
// the Number.parseFloat method

const newHeight =
  Number.parseFloat(window.getComputedStyle(cookiesMessage).height) + 40 + "px";
cookiesMessage.style.height = newHeight;

// Now, let's work with custom CSS properties (check the style.css file)
// :root is equivalent to document.documentElement
document.documentElement.style.setProperty("--color-primary", "orangered");

// Now, let us work with the attributes of HTML elements
const logo = document.querySelector(".nav__logo");
console.log(logo.alt); // Bankist logo
// logo.src writes the absolute path
console.log(logo.src); // file:///Users/andreslopezesquivel/Andres/JavaScript/topics/dom/styles/img/logo.png
console.log(logo.className); // nav__logo
console.log(logo.getAttribute("src")); // img/logo.png <- As written in the HTML
logo.setAttribute("company", "bankist");
console.log(logo.getAttribute("company")); // bankist

// Data attributes
logo.setAttribute("data-version-number", "3.0");
console.log(logo.dataset.versionNumber); // 3.0

// Classes
// Common methods:
// logo.classList.add()
// logo.classList.remove()
// logo.classList.toggle()
// logo.classList.contains()
