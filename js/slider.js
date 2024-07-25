function initializeSlider(
  sliderContainerSelector,
  sliderSelector,
  leftArrowSelector,
  rightArrowSelector,
  scrollbarSelector,
  scrollbarThumbSelector
) {
  const sliderContainer = document.querySelector(sliderContainerSelector);
  const slider = document.querySelector(sliderSelector);
  const leftArrow = document.querySelector(leftArrowSelector);
  const rightArrow = document.querySelector(rightArrowSelector);
  const scrollbarLine = document.querySelector(scrollbarSelector);
  const scrollbarThumb = document.querySelector(scrollbarThumbSelector);

  let isDragging = false;
  let startX;
  let scrollLeft;

  function updateScrollbar() {
    const scrollPercent =
      slider.scrollLeft / (slider.scrollWidth - slider.clientWidth);
    scrollbarThumb.style.left =
      scrollPercent * (scrollbarLine.clientWidth - scrollbarThumb.clientWidth) +
      "px";
    checkArrows();
  }

  function checkArrows() {
    if (slider.scrollLeft === 0) {
      leftArrow.classList.add("arrow-disabled");
    } else {
      leftArrow.classList.remove("arrow-disabled");
    }

    if (slider.scrollLeft > slider.scrollWidth - slider.clientWidth) {
      rightArrow.classList.add("arrow-disabled");
    } else {
      rightArrow.classList.remove("arrow-disabled");
    }
  }

  slider.addEventListener("scroll", updateScrollbar);

  scrollbarThumb.addEventListener("mousedown", function (event) {
    const initialX = event.clientX;
    const initialLeft = scrollbarThumb.offsetLeft;

    function onMouseMove(event) {
      const deltaX = event.clientX - initialX;
      const newLeft = Math.min(
        Math.max(initialLeft + deltaX, 0),
        scrollbarLine.clientWidth - scrollbarThumb.clientWidth
      );
      scrollbarThumb.style.left = newLeft + "px";
      const scrollPercent =
        newLeft / (scrollbarLine.clientWidth - scrollbarThumb.clientWidth);
      slider.scrollLeft =
        scrollPercent * (slider.scrollWidth - slider.clientWidth);
      checkArrows();
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  leftArrow.addEventListener("click", function () {
    slider.scrollBy({
      left: -slider.clientWidth / 3,
      behavior: "smooth",
    });
  });

  rightArrow.addEventListener("click", function () {
    slider.scrollBy({
      left: slider.clientWidth / 3,
      behavior: "smooth",
    });
  });

  // Adding dragging functionality to the slider container
  sliderContainer.addEventListener("mousedown", function (event) {
    isDragging = true;
    startX = event.pageX - sliderContainer.offsetLeft;
    scrollLeft = slider.scrollLeft;
    sliderContainer.style.cursor = "grabbing";
    event.preventDefault();
  });

  sliderContainer.addEventListener("mouseleave", function () {
    isDragging = false;
    sliderContainer.style.cursor = "grab";
  });

  sliderContainer.addEventListener("mouseup", function () {
    isDragging = false;
    sliderContainer.style.cursor = "grab";
  });

  sliderContainer.addEventListener("mousemove", function (event) {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - sliderContainer.offsetLeft;
    const walk = (x - startX) * 3; // Scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    updateScrollbar();
  });

  updateScrollbar();
  checkArrows();
}

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the first slider
  initializeSlider(
    ".offers",
    ".offers-slider",
    ".left-arrow",
    ".right-arrow",
    ".custom-scrollbar",
    ".scrollbar-thumb"
  );

  // Initialize another slider with different selectors
  initializeSlider(
    ".awards",
    ".awards-slider",
    ".awards-left-arrow",
    ".awards-right-arrow",
    ".awards-custom-scrollbar",
    ".awards-scrollbar-thumb"
  );
});
