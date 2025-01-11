document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");
  const navLinks = document.querySelectorAll(".nav_link");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }

  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }

  const linkAction = () => {
    navMenu.classList.remove("show-menu");
  };

  navLinks.forEach((link) => link.addEventListener("click", linkAction));

  const scrollHeader = () => {
    const header = document.getElementById("header");
    if (window.scrollY >= 80) {
      header.classList.add("scroll-header");
    } else {
      header.classList.remove("scroll-header");
    }
  };

  window.addEventListener("scroll", scrollHeader);

  const themeButton = document.getElementById("theme-button");
  const darkThemeClass = "dark-theme";
  const iconThemeClass = "uil-sun";

  const selectedTheme = localStorage.getItem("selected-theme");
  const selectedIcon = localStorage.getItem("selected-icon");

  if (selectedTheme) {
    document.body.classList.toggle(darkThemeClass, selectedTheme === "dark");
    themeButton.classList.toggle(iconThemeClass, selectedIcon === "uil-moon");
  }

  const getCurrentTheme = () =>
    document.body.classList.contains(darkThemeClass) ? "dark" : "light";
  const getCurrentIcon = () =>
    themeButton.classList.contains(iconThemeClass) ? "uil-moon" : "uil-sun";

  themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkThemeClass);
    themeButton.classList.toggle(iconThemeClass);

    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });
});
