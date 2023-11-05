import path from "./config.js";

/** load shared element across all pages */
// function to load nav bar to reuse
$(function () {
  // $("#topNavbar").load("../top-navbar/top-navbar.html");
  $("#topNavbar").load(path.topNavbarPath);
});

// function to load nav bar to reuse
$(function () {
  $("#footer").load(path.footerPath);
});
