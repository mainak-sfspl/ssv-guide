// Active nav highlight + scroll reveal + particles + topbar slide + image lightbox.
(function () {
  const topbar = document.querySelector(".topbar");

  // active nav
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href === path) a.classList.add("active");
  });

  // set topbar height so content never hides behind it
  function setTopbarHeight() {
    if (!topbar) return;
    const h = topbar.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--topbar-h", `${Math.ceil(h)}px`);
  }
  window.addEventListener("resize", setTopbarHeight);
  setTopbarHeight();

  // topbar slide on scroll (hide going down, show going up)
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

  // scroll reveal
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

  // particles
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

  // image lightbox (click to zoom)
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
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", onKey);
  }

  document.querySelectorAll(".zoomable").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });
})();
