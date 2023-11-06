import path from "./config.js";

/** load shared element across all pages */
$(function () {
  // function to load nav bar to reuse
  $("#topNavbar").load(path.topNavbarPath);

  // function to load nav bar to reuse
  $("#footer").load(path.footerPath);
});
