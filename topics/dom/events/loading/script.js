"use strict";

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOMContentLoaded");
  console.log(event);
});

window.addEventListener("load", function (event) {
  console.log("load");
  console.log(event);
});

window.addEventListener("beforeunload", function (event) {
  event.preventDefault();
  console.log(event);
  e.returnValue = "";
});
