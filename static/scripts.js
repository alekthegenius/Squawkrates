const btn = document.querySelector(".btn-toggle");
const icn = document.getElementById("search_icon");

if (window.location.port == '') {
  var currentlocation = window.location.protocol + "//" + window.location.hostname;
} else {
  var currentlocation = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
}


const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");



const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
  icn.src = "/static/resources/iconDark.png";
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
  icn.src = "/static/resources/iconLight.png";
}

function toggleIcon() {
    if (icn.src == `${currentlocation}/static/resources/iconDark.png`) {
        icn.src =  "/static/resources/iconLight.png";
    } else {
        icn.src =  "/static/resources/iconDark.png";
    }
}


document.getElementById('inputbox').addEventListener('keydown', function(e) {
  if (e.key == 'Enter' && !e.shiftKey) {
    e.preventDefault();
    document.getElementById('search-form').submit();
  } else if (e.key == 'Enter' && e.shiftKey) {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + new line + text after caret
    this.value = this.value.substring(0, start) + "\n" + this.value.substring(end);

    // put caret at right position again (add one for the line break)
    this.selectionStart = this.selectionEnd = start + 1;
  }
});


btn.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    toggleIcon();
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    toggleIcon();
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});