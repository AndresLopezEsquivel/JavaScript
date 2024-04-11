"use strict";

// To know more about events, check:
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
// https://developer.mozilla.org/en-US/docs/Web/Events
// https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event

const msgLabel = document.querySelector("#message");
const changeColorBtn = document.querySelector("#change-color-btn");
const destroyEventBtn = document.querySelector("#destroy-event-btn");

const changeTextColor = () => {
  msgLabel.style.color = "#EC7063";

  setTimeout(() => {
    msgLabel.style.color = "#273746";
  }, 2000);
};

const destroyEvent = () => {
  // To know more about removing an event, check:
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
  changeColorBtn.removeEventListener("click", changeTextColor);
};

changeColorBtn.addEventListener("click", changeTextColor);
destroyEventBtn.addEventListener("click", destroyEvent);
