const slider = document.querySelector(".slider");
const slides = document.querySelector(".slides");
const slideImages = document.querySelectorAll(".slides img");

let currentIndex = 0;
const slideWidth = slideImages[0].clientWidth;
const totalSlides = slideImages.length;

slides.innerHTML += slides.innerHTML;

function moveToNextSlide() {
  currentIndex++;
  slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  if (currentIndex === totalSlides) {
    setTimeout(() => {
      slides.style.transition = "none";
      currentIndex = 0;
      slides.style.transform = "translateX(0px)";

      setTimeout(() => {
        slides.style.transition = "transform 2s ease-in-out";
      });
    }, 2000);
  }
}

setInterval(moveToNextSlide, 3000);
