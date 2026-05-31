/* Mobile navigation */
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

function closeNavMenu() {
  if (!navMenu || !navToggle) return;
  navMenu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNavMenu);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 991) {
      closeNavMenu();
    }
  });
}

/* Highlight active nav link on scroll */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

function setActiveNav() {
  let current = "";

  sections.forEach(function (section) {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);
setActiveNav();

/* Footer year */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* Theme toggle */
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    const current = root.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });

  const currentTheme = root.getAttribute("data-theme") || "dark";
  themeToggle.setAttribute(
    "aria-label",
    currentTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
}

/* Image lightbox */
document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = lightbox ? lightbox.querySelector(".lightbox-img") : null;
  const lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;

  function openLightbox(img) {
    if (!lightbox || !lightboxImg || !img) return;
    const src = img.currentSrc || img.getAttribute("src");
    lightboxImg.src = src;
    lightboxImg.alt = img.alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.removeAttribute("src");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".image-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const img = link.querySelector("img");
      openLightbox(img);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
});

/* Project read more / read less */
document.querySelectorAll("[data-read-more]").forEach(function (button) {
  var panelId = button.getAttribute("aria-controls");
  var panel = panelId ? document.getElementById(panelId) : null;
  if (!panel) return;

  button.addEventListener("click", function () {
    var isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", isExpanded ? "false" : "true");
    panel.hidden = isExpanded;
    button.textContent = isExpanded ? "Read more" : "Read less";
  });
});
