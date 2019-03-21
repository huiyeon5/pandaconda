const homePage = document.getElementById("homePage");
if (homePage) {
  idValue = "#home";
}

const uploadPage = document.getElementById("uploadPage");
if (uploadPage) {
  idValue = "#upload";
}

const visualisationPage = document.getElementById("visualisationPage");
if (visualisationPage) {
  idValue = "#visualisation";
}

const managePage = document.getElementById("managePage");
if (managePage) {
  idValue = "#manage";
}

var sidebarItem = document.querySelector(idValue);
// $sidebarItem.addClass('noHover');
sidebarItem.classList.add("active");
