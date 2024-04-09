"use strict";

const startTimer = (seconds) => {
  let remainingTime = seconds;

  const timerHandler = () => {
    const min = `${Math.floor(remainingTime / 60)}`.padStart(2, "0");
    const sec = `${remainingTime % 60}`.padStart(2, "0");
    timerLabel.textContent = `${min}:${sec}`;
    if (remainingTime === 0) clearInterval(timer);
    remainingTime--;
  };

  setInterval(timerHandler, 1000);
};

const timerLabel = document.querySelector(".timer");
startTimer(150);
