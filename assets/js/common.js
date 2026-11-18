/* Shared helpers: curtain fade-in, scroll reveal, page exit. */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function lift(curtain) {
    if (!curtain) return;
    requestAnimationFrame(() => requestAnimationFrame(() => curtain.classList.remove("curtain--start")));
  }

  function observeReveals(root) {
    const els = (root || document).querySelectorAll(".reveal:not(.is-in)");
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(el => io.observe(el));
  }

  /* Fade to black, then navigate. */
  function leave(href, delay) {
    const curtain = document.querySelector("[data-curtain]");
    if (curtain) curtain.classList.add("is-on");
    setTimeout(() => { window.location.href = href; }, reduced ? 0 : (delay ?? 700));
  }

  /* Calm mode: no flashes, flicker or screen shake (photosensitivity). */
  const CALM_KEY = "spirealm.calm";
  let calm = false;
  try { calm = localStorage.getItem(CALM_KEY) === "1"; } catch (e) { /* ignore */ }
  document.documentElement.classList.toggle("calm", calm);
  function setCalm(on) {
    calm = !!on;
    document.documentElement.classList.toggle("calm", calm);
    try { localStorage.setItem(CALM_KEY, calm ? "1" : "0"); } catch (e) { /* ignore */ }
  }

  window.Spi = { reduced, observeReveals, leave, lift, get calm() { return calm; }, setCalm };

  // Pages restored from the back/forward cache keep their faded state; reset it.
  window.addEventListener("pageshow", e => {
    if (e.persisted) {
      const c = document.querySelector("[data-curtain]");
      if (c) c.classList.remove("is-on", "curtain--start");
      document.body.classList.remove("is-entering");
      document.querySelectorAll(".is-opening, .is-target").forEach(el => el.classList.remove("is-opening", "is-target"));
    }
  });
})();
