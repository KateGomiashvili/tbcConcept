document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".offers-slider");
  const scrollbarThumb = document.querySelector(".scrollbar-thumb");

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; // Scroll speed
    slider.scrollLeft = scrollLeft - walk;
    updateScrollbarThumb();
  });

  const updateScrollbarThumb = () => {
    const scrollWidth = slider.scrollWidth - slider.clientWidth;
    const thumbWidth = (slider.clientWidth / slider.scrollWidth) * 100;
    const scrollLeft = (slider.scrollLeft / scrollWidth) * 100;

    scrollbarThumb.style.width = `${thumbWidth}%`;
    scrollbarThumb.style.transform = `translateX(${scrollLeft}%)`;
  };

  slider.addEventListener("scroll", updateScrollbarThumb);
  updateScrollbarThumb(); // Initial call
});
