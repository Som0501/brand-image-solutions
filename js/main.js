/* =================================================================
   BRAND IMAGE SOLUTIONS — interactions
   Vanilla JS. Lit back-bar hero, reveal-on-scroll, pinned approach,
   count-up ledger, filterable vitrine gallery, prev/next lightbox,
   enquiry form, loader.
   ================================================================= */
(() => {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine   = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ============ Project data ============ */
  const PROJECTS = [
    // Glenfiddich
    { src: "images/glenfiddich/glenfiddich-event-bar-blue-01.jpg",        cat: "glenfiddich",    brand: "Glenfiddich",        type: "Event bar" },
    { src: "images/glenfiddich/glenfiddich-outdoor-bar-01.jpg",           cat: "glenfiddich",    brand: "Glenfiddich",        type: "Outdoor bar" },
    { src: "images/glenfiddich/glenfiddich-event-counter-01.jpg",         cat: "glenfiddich",    brand: "Glenfiddich",        type: "Event counter" },
    { src: "images/glenfiddich/glenfiddich-display-stand-01.jpg",         cat: "glenfiddich",    brand: "Glenfiddich",        type: "Display stand" },
    // Glenlivet
    { src: "images/glenlivet/glenlivet-shop-interior-01.jpg",             cat: "glenlivet",      brand: "The Glenlivet",      type: "Shop interior" },
    { src: "images/shops/glenlivet-barrel-lounge-01.jpg",                 cat: "glenlivet",      brand: "The Glenlivet",      type: "Barrel lounge" },
    { src: "images/shops/glenlivet-wood-lounge-01.jpg",                   cat: "glenlivet",      brand: "The Glenlivet",      type: "Lounge build" },
    { src: "images/shops/glenlivet-reception-counter-01.jpg",             cat: "glenlivet",      brand: "The Glenlivet",      type: "Reception counter" },
    // Chivas
    { src: "images/chivas/chivas-lounge-display-01.jpg",                  cat: "chivas",         brand: "Chivas Regal",       type: "Lounge display" },
    { src: "images/chivas/chivas-glenlivet-shop-01.jpg",                  cat: "chivas",         brand: "Chivas · Glenlivet", type: "Premium shop" },
    { src: "images/chivas/chivas-lounge-armchairs-01.jpg",                cat: "chivas",         brand: "Chivas Regal",       type: "Lounge seating" },
    { src: "images/chivas/chivas-display-wall-01.jpg",                    cat: "chivas",         brand: "Chivas Regal",       type: "Display wall" },
    { src: "images/chivas/chivas-lounge-seating-01.jpg",                  cat: "chivas",         brand: "Chivas Regal",       type: "Lounge build" },
    { src: "images/shops/chivas-glenlivet-counter-01.jpg",               cat: "chivas",         brand: "Chivas · Glenlivet", type: "Counter build" },
    // Ballantine's
    { src: "images/ballantines/ballantines-neon-bar-blue-01.jpg",        cat: "ballantines",    brand: "Ballantine's",       type: "Neon bar" },
    { src: "images/ballantines/ballantines-shop-aisle-01.jpg",           cat: "ballantines",    brand: "Ballantine's",       type: "Shop aisle" },
    { src: "images/ballantines/ballantines-counter-wood-01.jpg",         cat: "ballantines",    brand: "Ballantine's",       type: "Wood counter" },
    { src: "images/ballantines/ballantines-neon-storefront-01.jpg",      cat: "ballantines",    brand: "Ballantine's",       type: "Neon storefront" },
    { src: "images/ballantines/ballantines-100pipers-aisle-01.jpg",      cat: "ballantines",    brand: "Ballantine's",       type: "Retail aisle" },
    // Jameson
    { src: "images/jameson/jameson-premium-shop-01.jpg",                 cat: "jameson",        brand: "Jameson",            type: "Premium shop" },
    { src: "images/jameson/jameson-shop-interior-01.jpg",                cat: "jameson",        brand: "Jameson",            type: "Shop interior" },
    { src: "images/jameson/jameson-glenfiddich-aisle-01.jpg",            cat: "jameson",        brand: "Jameson",            type: "Branded aisle" },
    // Johnnie Walker
    { src: "images/johnnie-walker/johnnie-walker-signature-blend-01.jpg", cat: "johnnie-walker", brand: "Johnnie Walker",     type: "Signature display" },
    { src: "images/johnnie-walker/johnnie-walker-wall-display-01.jpg",    cat: "johnnie-walker", brand: "Johnnie Walker",     type: "Wall display" },
    { src: "images/events/gold-label-reserve-tray-01.jpg",               cat: "johnnie-walker", brand: "Gold Label Reserve", type: "Event service" },
    // Black Dog
    { src: "images/black-dog/black-dog-counter-gold-01.jpg",             cat: "black-dog",      brand: "Black Dog",          type: "Gold counter" },
    // Blenders Pride / Royal Stag / Oaken Glow
    { src: "images/blenders-royalstag/oaken-glow-bar-counter-01.jpg",    cat: "blenders",       brand: "Oaken Glow",         type: "Bar counter" },
    { src: "images/blenders-royalstag/blenders-pride-aisle-01.jpg",      cat: "blenders",       brand: "Blenders Pride",     type: "Branded aisle" },
    { src: "images/blenders-royalstag/oaken-glow-counter-01.jpg",        cat: "blenders",       brand: "Oaken Glow",         type: "Counter build" },
    { src: "images/shops/royal-stag-shop-wall-01.jpg",                   cat: "blenders",       brand: "Royal Stag",         type: "Shop wall" },
    { src: "images/blenders-royalstag/retail-floor-display-island-01.jpg", cat: "blenders",     brand: "Blenders Pride",     type: "Floor island" },
    // 100 Pipers
    { src: "images/100-pipers/100pipers-display-stand-01.jpg",           cat: "pipers",         brand: "100 Pipers",         type: "Display stand" },
    { src: "images/shops/100pipers-bar-counter-01.jpg",                  cat: "pipers",         brand: "100 Pipers",         type: "Bar counter" },
    { src: "images/shops/100pipers-shop-floor-01.jpg",                   cat: "pipers",         brand: "100 Pipers",         type: "Shop floor" },
    // Premium shops & interiors
    { src: "images/shops/talisker-island-display-01.jpg",                cat: "shops",          brand: "Talisker",           type: "Island display" },
    { src: "images/shops/talisker-arch-display-01.jpg",                  cat: "shops",          brand: "Talisker",           type: "Arch display" },
    { src: "images/shops/monkey-shoulder-counter-01.jpg",                cat: "shops",          brand: "Monkey Shoulder",    type: "Counter build" },
    { src: "images/shops/premium-shop-central-island-01.jpg",            cat: "shops",          brand: "Premium Retail",     type: "Central island" },
    { src: "images/shops/wine-shop-interior-island-01.jpg",              cat: "shops",          brand: "Wine Retail",        type: "Shop interior" },
    { src: "images/shops/jacobs-creek-wine-wall-01.jpg",                 cat: "shops",          brand: "Jacob's Creek",      type: "Wine wall" },
    { src: "images/shops/passport-green-counter-01.jpg",                 cat: "shops",          brand: "Passport",           type: "Counter build" },
    { src: "images/shops/bright-shop-floor-01.jpg",                      cat: "shops",          brand: "Premium Retail",     type: "Full fit-out" },
    { src: "images/shops/long-aisle-shop-01.jpg",                        cat: "shops",          brand: "Premium Retail",     type: "Aisle fit-out" },
    { src: "images/shops/airport-style-shop-01.jpg",                     cat: "shops",          brand: "Premium Retail",     type: "Travel-retail style" },
    { src: "images/events/campo-viejo-colourful-bar-01.jpg",             cat: "shops",          brand: "Campo Viejo",        type: "Event bar" },
  ];

  /* ============ Hero: the lit back-bar wall ============ */
  const heroGrid = document.getElementById("heroGrid");
  if (heroGrid) {
    // A curated, visually rich subset for the wall (24 = 6×4 on desktop).
    const WALL = [
      "images/chivas/chivas-lounge-display-01.jpg",
      "images/glenfiddich/glenfiddich-event-bar-blue-01.jpg",
      "images/shops/glenlivet-barrel-lounge-01.jpg",
      "images/shops/talisker-arch-display-01.jpg",
      "images/blenders-royalstag/oaken-glow-bar-counter-01.jpg",
      "images/johnnie-walker/johnnie-walker-wall-display-01.jpg",
      "images/ballantines/ballantines-neon-bar-blue-01.jpg",
      "images/jameson/jameson-premium-shop-01.jpg",
      "images/shops/monkey-shoulder-counter-01.jpg",
      "images/shops/talisker-island-display-01.jpg",
      "images/chivas/chivas-lounge-armchairs-01.jpg",
      "images/shops/100pipers-bar-counter-01.jpg",
      "images/blenders-royalstag/blenders-pride-aisle-01.jpg",
      "images/shops/royal-stag-shop-wall-01.jpg",
      "images/shops/passport-green-counter-01.jpg",
      "images/glenlivet/glenlivet-shop-interior-01.jpg",
      "images/ballantines/ballantines-shop-aisle-01.jpg",
      "images/shops/wine-shop-interior-island-01.jpg",
      "images/black-dog/black-dog-counter-gold-01.jpg",
      "images/events/campo-viejo-colourful-bar-01.jpg",
      "images/shops/glenlivet-wood-lounge-01.jpg",
      "images/jameson/jameson-shop-interior-01.jpg",
      "images/shops/airport-style-shop-01.jpg",
      "images/blenders-royalstag/oaken-glow-counter-01.jpg",
    ];
    const frag = document.createDocumentFragment();
    WALL.forEach((src, i) => {
      const cell = document.createElement("div");
      cell.className = "niche";
      const img = document.createElement("img");
      img.src = src; img.alt = "";
      img.loading = i < 12 ? "eager" : "lazy";
      img.decoding = "async";
      cell.appendChild(img);
      frag.appendChild(cell);
    });
    heroGrid.appendChild(frag);

    // The spotlight: brighten niches near the cursor. Desktop + motion only.
    const niches = [...heroGrid.querySelectorAll(".niche")];
    const imgs = niches.map((n) => n.querySelector("img"));
    if (fine && !reduce) {
      const RADIUS = 360;          // px of influence
      let rects = [], raf = 0, mx = -9999, my = -9999, dirty = false;
      const measure = () => { rects = niches.map((n) => n.getBoundingClientRect()); };
      const paint = () => {
        raf = 0;
        for (let i = 0; i < rects.length; i++) {
          const r = rects[i];
          const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          const d = Math.hypot(mx - cx, my - cy);
          const lit = Math.max(0, 1 - d / RADIUS);
          imgs[i].style.setProperty("--lit", (lit * lit).toFixed(3));
        }
      };
      const hero = document.querySelector(".hero");
      hero.addEventListener("pointermove", (e) => {
        mx = e.clientX; my = e.clientY;
        if (!dirty) { measure(); dirty = true; }   // measure lazily on first move
        if (!raf) raf = requestAnimationFrame(paint);
      });
      hero.addEventListener("pointerleave", () => {
        mx = my = -9999;
        if (!raf) raf = requestAnimationFrame(paint);
      });
      window.addEventListener("resize", () => { dirty = false; }, { passive: true });
      window.addEventListener("scroll", () => { if (dirty) { measure(); if (!raf) raf = requestAnimationFrame(paint); } }, { passive: true });
    } else {
      // Touch / reduced motion: a gentle static illumination so the wall still reads as "lit".
      imgs.forEach((img, i) => img.style.setProperty("--lit", (0.32 + (i % 5) * 0.12).toFixed(2)));
    }
  }

  /* ============ Render gallery ============ */
  const gallery = document.getElementById("gallery");
  if (gallery) {
    const frag = document.createDocumentFragment();
    PROJECTS.forEach((p, i) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "card";
      card.dataset.cat = p.cat;
      card.dataset.index = i;
      card.setAttribute("aria-label", `${p.brand} — ${p.type}. Open larger view.`);
      card.innerHTML =
        `<span class="card__imgwrap"><img src="${p.src}" alt="${p.brand} — ${p.type}, designed and built by Brand Image Solutions" loading="lazy" decoding="async"></span>` +
        `<span class="card__meta"><span class="card__brand">${p.brand}</span><span class="card__type">${p.type}</span></span>`;
      frag.appendChild(card);
    });
    gallery.appendChild(frag);
  }

  /* ============ Filters ============ */
  const filterWrap = document.getElementById("filters");
  if (filterWrap && gallery) {
    filterWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      filterWrap.querySelectorAll(".filter").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      const f = btn.dataset.filter;
      gallery.querySelectorAll(".card").forEach((c) => {
        const show = f === "all" || c.dataset.cat === f;
        if (show) {
          c.classList.remove("is-hidden");
          if (!reduce) {
            c.classList.add("is-entering");
            requestAnimationFrame(() => requestAnimationFrame(() => c.classList.remove("is-entering")));
          }
        } else {
          c.classList.add("is-hidden");
        }
      });
    });
  }

  /* ============ Lightbox with prev / next ============ */
  const lb = document.getElementById("lightbox");
  if (lb && gallery) {
    const lbImg   = document.getElementById("lightboxImg");
    const lbCap   = document.getElementById("lightboxCap");
    const lbSub   = document.getElementById("lightboxSub");
    const lbCount = document.getElementById("lightboxCount");
    let order = [], pos = 0;

    const visibleIndices = () =>
      [...gallery.querySelectorAll(".card")]
        .filter((c) => !c.classList.contains("is-hidden"))
        .map((c) => +c.dataset.index);

    const show = (i) => {
      const p = PROJECTS[i];
      lbImg.src = p.src;
      lbImg.alt = `${p.brand} — ${p.type}, designed and built by Brand Image Solutions`;
      lbCap.textContent = p.brand;
      lbSub.textContent = p.type;
      lbCount.textContent = `${pos + 1} / ${order.length}`;
    };
    const step = (dir) => {
      if (!order.length) return;
      pos = (pos + dir + order.length) % order.length;
      show(order[pos]);
    };

    gallery.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if (!card) return;
      order = visibleIndices();
      pos = order.indexOf(+card.dataset.index);
      show(order[pos]);
      lb.showModal();
    });
    document.getElementById("lightboxClose").addEventListener("click", () => lb.close());
    document.getElementById("lightboxPrev").addEventListener("click", () => step(-1));
    document.getElementById("lightboxNext").addEventListener("click", () => step(1));
    lb.addEventListener("click", (e) => {
      // close only when clicking the backdrop area, not the figure/controls
      if (e.target === lb) lb.close();
    });
    lb.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    });
  }

  /* ============ Reveal on scroll ============ */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ============ Count-up ledger ============ */
  const nums = document.querySelectorAll(".ledger__num [data-count]");
  if (nums.length) {
    const run = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      if (reduce) { el.textContent = target + suffix; return; }
      const t0 = performance.now(), dur = 1500;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * e) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io2.unobserve(en.target); } });
    }, { threshold: 0.6 });
    nums.forEach((n) => io2.observe(n));
  }

  /* ============ Nav: solid on scroll + mobile menu ============ */
  const nav = document.getElementById("nav");
  const onNav = () => nav.classList.toggle("is-solid", window.scrollY > 24);
  onNav();
  window.addEventListener("scroll", onNav, { passive: true });

  const toggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    mobileMenu.classList.toggle("is-open", !open);
  });
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      toggle.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
    }
  });

  /* ============ Approach: pinned numbered build sequence ============ */
  const track = document.getElementById("approachTrack");
  const stepEls = [...document.querySelectorAll(".step")];
  const fill = document.getElementById("approachFill");
  const ghost = document.getElementById("approachGhost");
  if (track && stepEls.length && !reduce && window.matchMedia("(min-width:1025px)").matches) {
    const steps = stepEls.length;
    let active = -1;
    const setActive = (i) => {
      if (i === active) return;
      active = i;
      stepEls.forEach((el, j) => el.classList.toggle("is-active", j === i));
      if (fill) fill.style.width = (((i + 1) / steps) * 100).toFixed(1) + "%";
      if (ghost) ghost.textContent = String(i + 1).padStart(2, "0");
    };
    let ticking = false;
    const onScroll = () => {
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      setActive(Math.min(Math.floor(progress * steps), steps - 1));
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();
  } else if (stepEls.length) {
    stepEls.forEach((el) => el.classList.add("is-active"));
    if (fill) fill.style.width = "100%";
  }

  /* ============ Enquiry form (mailto handoff) ============ */
  const form = document.getElementById("enquiryForm");
  if (form) {
    const status = document.getElementById("formStatus");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const d = new FormData(form);
      const subject = encodeURIComponent(`Project enquiry — ${d.get("company")}`);
      const body = encodeURIComponent(
        `Name: ${d.get("name")}\nCompany: ${d.get("company")}\nEmail: ${d.get("email")}\n\n${d.get("message")}`
      );
      window.location.href = `mailto:rajan@brandimagesolutions.co.in?subject=${subject}&body=${body}`;
      status.textContent = "Opening your email app with the enquiry pre-filled…";
      form.reset();
    });
  }

  /* ============ Footer year ============ */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ============ Loader: dismiss once the page is ready ============ */
  const loader = document.getElementById("loader");
  if (loader) {
    if (reduce) { loader.remove(); }
    else {
      const done = () => { loader.classList.add("is-done"); setTimeout(() => loader.remove(), 900); };
      const start = performance.now();
      window.addEventListener("load", () => {
        const wait = Math.max(0, 1500 - (performance.now() - start)); // let the "lights up" play
        setTimeout(done, wait);
      });
      // safety: never trap the user behind the loader
      setTimeout(done, 4000);
    }
  }
})();
