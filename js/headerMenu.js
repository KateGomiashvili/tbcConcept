let headerButtons = document.getElementsByClassName("dropdown");
let whiteBackground = document.getElementById("white_background");
let headerDropdown = document.getElementsByClassName("header-dropdown");
let borderLine = document.getElementsByClassName("border-line");
let digitalBank = document.querySelector("digital-bank");
const mobileMenuButton = document.querySelector(".topnav");
let mobileMenu = document.getElementById("header-mobile-menu");
const mobileHeadings = document.getElementsByClassName("menu-headings");
const arrows = document.getElementsByClassName("mobile-arrow");
const dropdownContent = document.getElementsByClassName("mobile-dropdown");
const language = document.getElementsByClassName("change-lang");
const originalContent = mobileMenuButton.innerHTML;
let menuIsShown = false;
console.log(originalContent);

function showMenu() {
  if (menuIsShown == false) {
    menuIsShown = true;
    mobileMenu.style.display = "block";
    language[0].style.display = "none";
    // mobileMenuButton.innerHTML =
    //   '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 8 L8 24 M8 8 L24 24" stroke="#555F62" stroke-width="2" stroke-linecap="round" /></svg>';
    mobileMenuButton.classList.toggle("active");
  } else {
    menuIsShown = false;
    mobileMenu.style.display = "none";
    // mobileMenuButton.innerHTML =
    //   '<div class="topnav-line-1"></div><div class="topnav-line-2"></div><div class="topnav-line-3"></div>';
    mobileMenuButton.classList.toggle("active");
  }
}

function mobileDropdown(e) {
  dropdownContent[e].classList.toggle("hidden");
  arrows[e].classList.toggle("down");
  for (let i = 0; i < dropdownContent.length; i++) {
    if (i !== e) {
      dropdownContent[i].classList.add("hidden");
    }
  }
}

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
