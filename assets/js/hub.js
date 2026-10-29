/* HUB — content warning, door opening, sealed doors, title flicker. */
(function () {
  const CW_KEY = "spirealm.cw";
  const { reduced, observeReveals, lift, leave } = window.Spi;

  /* ---------- Content warning (first visit only) ---------- */
  const cw = document.querySelector("[data-cw]");
  let seen = false;
  try { seen = localStorage.getItem(CW_KEY) === "1"; } catch (e) { /* ignore */ }

  function startPage() {
    lift(document.querySelector("[data-curtain]"));
    observeReveals();
  }

  if (!seen && cw) {
    cw.hidden = false;
    document.querySelector("[data-curtain]").classList.remove("curtain--start");
    const accept = cw.querySelector("[data-cw-accept]");
    accept.focus();
    accept.addEventListener("click", () => {
      try { localStorage.setItem(CW_KEY, "1"); } catch (e) { /* ignore */ }
      cw.hidden = true;
      observeReveals();
    });
    cw.querySelector("[data-cw-leave]").addEventListener("click", () => {
      if (history.length > 1) history.back(); else window.location.href = "about:blank";
    });
  } else {
    startPage();
  }

  /* ---------- Opening a door ---------- */
  document.querySelectorAll("[data-door]").forEach(door => {
    door.addEventListener("click", e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // allow new-tab
      e.preventDefault();
      if (document.body.classList.contains("is-entering")) return;
      const href = door.getAttribute("href");
      try { sessionStorage.setItem("spirealm.entered", door.dataset.arc); } catch (err) { /* ignore */ }
      window.SpiAudio && window.SpiAudio.play("creak");
      door.classList.add("is-opening");
      door.closest(".doors__item").classList.add("is-target");
      document.body.classList.add("is-entering");
      if (reduced) { leave(href, 0); return; }
      setTimeout(() => leave(href, 650), 900);
    });
  });

  /* ---------- Sealed doors ---------- */
  const toast = document.querySelector("[data-toast]");
  const lines = [
    "Pintu ini masih tersegel. Belum ada yang kembali dari baliknya.",
    "Rantainya dingin. Dari celah bawah pintu, terdengar seseorang bernapas.",
    "Segelnya belum pecah. Petunjuknya belum ditemukan."
  ];
  let toastTimer, lineIdx = 0;
  document.querySelectorAll("[data-sealed]").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.remove("is-shaking");
      void btn.offsetWidth; // restart animation
      btn.classList.add("is-shaking");
      window.SpiAudio && window.SpiAudio.play("thud");
      toast.textContent = lines[lineIdx++ % lines.length];
      toast.classList.add("is-on");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("is-on"), 2800);
    });
  });

  /* ---------- Occasional flicker on the title ---------- */
  const title = document.querySelector("[data-flicker]");
  if (title && !reduced) {
    const flicker = () => {
      title.classList.remove("is-flicker");
      void title.offsetWidth;
      title.classList.add("is-flicker");
      setTimeout(flicker, 5000 + Math.random() * 7000);
    };
    setTimeout(flicker, 2500);
  }
})();
