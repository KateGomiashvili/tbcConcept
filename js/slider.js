document.addEventListener("DOMContentLoaded", function () {
  const offersSection = document.querySelector(".offers");
  const offersSlider = document.querySelector(".offers-slider");
  const scrollbarThumb = document.querySelector(".scrollbar-thumb");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const sliderContainer = document.querySelector(".offers-slider-container");
  const scrollbarLine = document.querySelector(".custom-scrollbar");

  let isDragging = false;
  let startX;
  let scrollLeft;

  function updateScrollbar() {
    const scrollPercent =
      offersSlider.scrollLeft /
      (offersSlider.scrollWidth - offersSlider.clientWidth);
    scrollbarThumb.style.left =
      scrollPercent * (scrollbarLine.clientWidth - scrollbarThumb.clientWidth) +
      "px";
    checkArrows();
  }
  function checkArrows() {
    if (offersSlider.scrollLeft === 0) {
      leftArrow.classList.add("arrow-disabled");
    } else {
      leftArrow.classList.remove("arrow-disabled");
    }

    if (
      offersSlider.scrollLeft >=
      offersSlider.scrollWidth - offersSlider.clientWidth
    ) {
      rightArrow.classList.add("arrow-disabled");
    } else {
      rightArrow.classList.remove("arrow-disabled");
    }
    console.log("moved");
  }
  offersSlider.addEventListener("scroll", updateScrollbar);

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
      offersSlider.scrollLeft =
        scrollPercent * (offersSlider.scrollWidth - offersSlider.clientWidth);
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  leftArrow.addEventListener("click", function () {
    offersSlider.scrollBy({
      left: -offersSlider.clientWidth / 3,
      behavior: "smooth",
    });
  });

  rightArrow.addEventListener("click", function () {
    offersSlider.scrollBy({
      left: offersSlider.clientWidth / 3,
      behavior: "smooth",
    });
  });

  // Adding dragging functionality to the entire offers section
  offersSection.addEventListener("mousedown", function (event) {
    isDragging = true;
    startX = event.pageX - offersSection.offsetLeft;
    scrollLeft = offersSlider.scrollLeft;
    offersSection.style.cursor = "grabbing";
    event.preventDefault();
  });

  offersSection.addEventListener("mouseleave", function () {
    isDragging = false;
    offersSection.style.cursor = "grab";
  });

  offersSection.addEventListener("mouseup", function () {
    isDragging = false;
    offersSection.style.cursor = "grab";
  });

  offersSection.addEventListener("mousemove", function (event) {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - offersSection.offsetLeft;
    const walk = (x - startX) * 3; // Scroll-fast
    offersSlider.scrollLeft = scrollLeft - walk;
    updateScrollbar();
  });

  updateScrollbar();
  checkArrows();
});
