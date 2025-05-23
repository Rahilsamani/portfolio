const journeyAnimation = document.getElementById("journey-animation");
const stages = [
  ["programming_journey.webp"],
  [
    "git.png",
    "github.png",
    "html.png",
    "css.png",
    "tailwind.png",
    "bootstrap.png",
    "javascript.png",
    "react.png",
    "redux.png",
  ],
  ["frontend_developer.webp"],
  ["nodejs.png", "expressjs.png", "mongodb.png", "redis.png"],
  ["backend_developer.webp"],
  ["full_stack_web_developer.webp"],
  ["python.png", "java.png"],
  ["flutter.png", "dart.png", "firebase.png"],
  ["app_developer.webp"],
  ["algorithm_winner.jpeg"],
  ["c.png", "c++.png"],
  ["github_consistent.png"],
  ["2024-50.webp"],
  ["girlscript_badge.webp"],
  ["level1.webp", "level2.webp", "level3.webp", "level4.webp"],
  ["2024-100.webp"],
];
let stageIndex = 0;
let logoIndex = 0;
function showNextLogo() {
  if (stageIndex < stages.length) {
    if (logoIndex < stages[stageIndex].length) {
      const img = document.createElement("img");
      img.src = `./assets/img/${stages[stageIndex][logoIndex]}`;
      img.classList.add("logo", "active");
      if (stages[stageIndex].length === 1) img.classList.add("full-size");
      journeyAnimation.appendChild(img);
      logoIndex++;
      setTimeout(showNextLogo, 2000);
    } else {
      logoIndex = 0;
      stageIndex++;
      setTimeout(() => {
        journeyAnimation.innerHTML = "";
        if (stageIndex >= stages.length) stageIndex = 0;
        setTimeout(showNextLogo, 500);
      }, 2000);
    }
  }
}
showNextLogo();
const form = document.getElementById("contact-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const alertBox = document.getElementById("alert");
  const formData = new FormData(e.target);
  try {
    const response = await fetch(e.target.action, {
      method: form.method,
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const result = await response.json();
    alertBox.innerHTML = result.message;
  } catch {
    alertBox.innerHTML =
      "Oops! There was a problem delivering your message, please contact via other means.";
  } finally {
    document.querySelector(".alert_style").style.display = "block";
    setTimeout(() => {
      document.querySelector(".alert_style").style.display = "none";
    }, 4000);
    form.reset();
  }
});
$("#contact-form input, #contact-form textarea")
  .on("input focusin", (e) => {
    const parent = $(e.target).parent();
    parent.addClass("focusIn");
    if ($(e.target).val().trim().length > 0) {
      parent.addClass("valid").removeClass("invalid");
    } else {
      parent.addClass("invalid").removeClass("valid");
    }
  })
  .on("focusout", (e) => {
    $(e.target).parent().removeClass("focusIn");
  });
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
navToggle?.addEventListener("click", () => navMenu.classList.add("show-menu"));
navClose?.addEventListener("click", () =>
  navMenu.classList.remove("show-menu")
);
document.querySelectorAll(".nav_link").forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("show-menu"));
});
const skillHeaders = document.querySelectorAll(".skills_header");
skillHeaders.forEach((header, index) => {
  header.addEventListener("click", () => {
    document.querySelectorAll(".skill")[index].classList.toggle("skills_open");
  });
});
const education = document.getElementById("education");
const work = document.getElementById("work");
const educationHeader = document.getElementById("educationheader");
const workHeader = document.getElementById("workheader");
function toggleQualification(isEducation) {
  if (isEducation) {
    education.classList.remove("qualification-inactive");
    work.classList.add("qualification-inactive");
    educationHeader.style.color = "var(--first-color)";
    workHeader.style.color = "var(--text-color)";
  } else {
    work.classList.remove("qualification-inactive");
    education.classList.add("qualification-inactive");
    workHeader.style.color = "var(--first-color)";
    educationHeader.style.color = "var(--text-color)";
  }
}
educationHeader.addEventListener("click", () => toggleQualification(!0));
workHeader.addEventListener("click", () => toggleQualification(!1));
new Swiper(".mySwiper", {
  cssMode: !0,
  loop: !0,
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  pagination: { el: ".swiper-pagination", clickable: !0 },
  mousewheel: !0,
  keyboard: !0,
});
const sections = document.querySelectorAll("section[id]");
function updateActiveLinks() {
  const scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 50;
    const sectionId = section.getAttribute("id");
    const link = document.querySelector(`.nav_menu a[href*="${sectionId}"]`);
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link?.classList.add("active-link");
    } else {
      link?.classList.remove("active-link");
    }
  });
}
function toggleHeaderStyle() {
  const header = document.getElementById("header");
  header?.classList.toggle("scroll-header", window.scrollY >= 80);
}
function toggleScrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  scrollUp?.classList.toggle("show-scroll", window.scrollY >= 560);
}
window.addEventListener("scroll", updateActiveLinks);
window.addEventListener("scroll", toggleHeaderStyle);
window.addEventListener("scroll", toggleScrollUp);
const themeButton = document.getElementById("theme-button");
const darkThemeClass = "dark-theme";
const iconThemeClass = "uil-sun";
const savedTheme = localStorage.getItem("selected-theme");
const savedIcon = localStorage.getItem("selected-icon");
if (savedTheme) {
  document.body.classList.toggle(darkThemeClass, savedTheme === "dark");
  themeButton.classList.toggle(iconThemeClass, savedIcon === "uil-moon");
}
themeButton.addEventListener("click", () => {
  const isDark = document.body.classList.toggle(darkThemeClass);
  themeButton.classList.toggle(iconThemeClass);
  localStorage.setItem("selected-theme", isDark ? "dark" : "light");
  localStorage.setItem("selected-icon", isDark ? "uil-moon" : "uil-sun");
});
new Typed(".type", {
  strings: [" a Web", " an Android"],
  smartBackspace: !0,
  startDelay: 1000,
  typeSpeed: 130,
  backDelay: 1000,
  backSpeed: 60,
  loop: !0,
});
