console.log("In JS");
const homePage = document.getElementById("homePage");
if (homePage) {
    idValue = "#home"
}

const uploadPage = document.getElementById("uploadPage");
if (uploadPage) {
    idValue = "#upload"
}

const visualisationPage = document.getElementById("visualisationPage");
if (visualisationPage) {
    idValue = "#visualisation"
}

var $sidebarItem = $(idValue);
$sidebarItem.addClass('noHover');
$sidebarItem.addClass('active');