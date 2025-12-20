// Enhanced main.js - Sliding header, glass effect, mobile menu
(function () {
  const topbar = document.querySelector(".topbar");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  // Active nav highlight
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href === path) a.classList.add("active");
  });

  // Set topbar height CSS variable
  function setTopbarHeight() {
    if (!topbar) return;
    const h = topbar.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--topbar-h", `${Math.ceil(h)}px`);
  }
  window.addEventListener("resize", setTopbarHeight);
  setTopbarHeight();

  // Sliding topbar on scroll (hide going down, show going up)
  let lastY = window.scrollY || 0;
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const y = window.scrollY || 0;
      const down = y > lastY + 8;
      const up = y < lastY - 8;

      if (topbar) {
        if (down && y > 140) topbar.classList.add("topbar--hidden");
        if (up) topbar.classList.remove("topbar--hidden");
      }

      lastY = y;
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu toggle
  if (navToggle && nav) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.contains("nav-open");
      
      if (isOpen) {
        nav.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.innerHTML = "☰";
      } else {
        nav.classList.add("nav-open");
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.innerHTML = "✕";
      }
    });

    // Close menu when clicking nav link
    document.querySelectorAll(".nav a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.innerHTML = "☰";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.innerHTML = "☰";
      }
    });
  }

  // Scroll reveal
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

  // Particles
  const wrap = document.querySelector(".particles");
  if (wrap) {
    const n = 22;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = Math.random() * 6 + "s";
      s.style.animationDuration = 6 + Math.random() * 10 + "s";
      wrap.appendChild(s);
    }
  }

  // Image lightbox (click to zoom)
  function openLightbox(src, alt) {
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML = `<div class="lightbox-inner"><img src="${src}" alt="${alt || ""}"></div>`;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add("open"));

    const onKey = (e) => {
      if (e.key === "Escape") close();
    };

    const close = () => {
      overlay.classList.remove("open");
      setTimeout(() => overlay.remove(), 180);
      document.removeEventListener("keydown", onKey);
    };

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target.classList.contains("lightbox-inner")) close();
    });
    document.addEventListener("keydown", onKey);
  }

  document.querySelectorAll(".zoomable").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });
})();
