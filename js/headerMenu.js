let headerButtons = document.getElementsByClassName("dropdown");
let whiteBackground = document.getElementById("white_background");
let headerDropdown = document.getElementsByClassName("header-dropdown");
function dropdownFunction(element) {
  let activeMenu = document.getElementById(element);

  if (activeMenu.style.display === "flex") {
    activeMenu.style.display = "none";
    whiteBackground.style.display = "none";
  } else {
    for (let i = 0; i < headerButtons.length; i++) {
      headerButtons[i].style.display = "none";
    }
    whiteBackground.style.display = "block";
    activeMenu.style.display = "flex";
  }
}
// Function to close all dropdowns
function closeAllDropdowns() {
  for (let i = 0; i < headerButtons.length; i++) {
    headerButtons[i].style.display = "none";
  }
  whiteBackground.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("loadedfinally");
  // Event listener to close dropdowns when clicking outside
  document.addEventListener("click", function (event) {
    var isClickInside = false;
    var dropdowns = document.querySelectorAll(".header-dropdown");

    dropdowns.forEach(function (dropdown) {
      if (dropdown.contains(event.target)) {
        isClickInside = true;
      }
    });

    if (!isClickInside) {
      closeAllDropdowns();
    }
  });
});
