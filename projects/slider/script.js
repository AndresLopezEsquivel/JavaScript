const slides = document.querySelectorAll(".slide");
const sliderRightBtn = document.querySelector(".slider__btn--right");
const sliderLeftBtn = document.querySelector(".slider__btn--left");
const dotsDiv = document.querySelector(".dots");
let currSlide = 0;

const createDots = () => {
  for (let i = 0; i < slides.length; i++) {
    dotsDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="dots__dot" data-slide="${i}"></div>`
    );
  }
};

const markDotAsActive = (dotIdx) => {
  document.querySelectorAll(".dots__dot").forEach((dot) => {
    dot.classList.remove("active--dot");
  });
  document
    .querySelector(`.dots__dot[data-slide="${dotIdx}"]`)
    .classList.add("active--dot");
};

const goToSlide = function (slide_idx) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - slide_idx) * 100}%)`;
  });
};

const nextSlide = function () {
  currSlide++;
  if (currSlide === slides.length) {
    currSlide = 0;
  }
  goToSlide(currSlide);
  markDotAsActive(currSlide);
};

const prevSlide = function () {
  currSlide--;
  if (currSlide < 0) {
    currSlide = slides.length - 1;
  }
  goToSlide(currSlide);
  markDotAsActive(currSlide);
};

// To know more about transformations, check: https://www.youtube.com/watch?v=qdeIy9_fbxE
createDots();
goToSlide(0);
markDotAsActive(0);

sliderRightBtn.addEventListener("click", nextSlide);
sliderLeftBtn.addEventListener("click", prevSlide);

document.addEventListener("keydown", (e) => {
  e.key === "ArrowLeft" && prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

dotsDiv.addEventListener("click", function (event) {
  const clickedDot = event.target;
  if (!clickedDot.classList.contains("dots__dot")) return;
  currSlide = clickedDot.dataset.slide;
  goToSlide(currSlide);
  markDotAsActive(currSlide);
});
