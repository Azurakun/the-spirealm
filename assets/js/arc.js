/* ==========================================================================
   ARC — cinematic sequencer + story page behaviour.
   Pages may define window.arcHooks = { sceneName(el, dur) { ...; return cleanupFn } }
   before this script loads; each hook runs when its scene becomes active.
   ========================================================================== */
(function () {
  const { reduced, observeReveals, lift, leave } = window.Spi;
  const body = document.body;
  const hooks = window.arcHooks || {};

  if (window.SpiAudio && body.dataset.drone) window.SpiAudio.droneBase = Number(body.dataset.drone);

  /* ---------------- Cinematic ---------------- */
  const cine = document.querySelector("[data-cine]");
  const scenes = cine ? Array.from(cine.querySelectorAll("[data-scene]")) : [];
  const bar = cine && cine.querySelector("[data-cine-progress]");
  const flashEl = cine && cine.querySelector(".cine__flash");
  let timers = [];
  let cleanups = [];
  let raf = 0;
  let firstRunDone = false;

  const later = (fn, ms) => timers.push(setTimeout(fn, ms));

  function splitType(el) {
    if (el.dataset.split) return Array.from(el.querySelectorAll(".ch"));
    const text = el.textContent;
    el.setAttribute("aria-label", text);
    el.textContent = "";
    const frag = document.createDocumentFragment();
    for (const c of text) {
      const s = document.createElement("span");
      s.className = "ch";
      s.setAttribute("aria-hidden", "true");
      s.textContent = c;
      frag.appendChild(s);
    }
    el.appendChild(frag);
    el.dataset.split = "1";
    return Array.from(el.querySelectorAll(".ch"));
  }

  function runType(scene, dur) {
    scene.querySelectorAll("[data-type]").forEach(el => {
      const chars = splitType(el);
      chars.forEach(c => c.classList.remove("on"));
      const start = Number(el.dataset.typeDelay || 150);
      const step = Math.max(18, Math.min(55, (dur * 0.55) / chars.length));
      chars.forEach((c, i) => later(() => c.classList.add("on"), start + i * step));
    });
  }

  function runSfx(scene) {
    const spec = scene.dataset.sfx;
    if (!spec || !window.SpiAudio) return;
    spec.split(",").forEach(part => {
      const [name, at] = part.trim().split("@");
      later(() => window.SpiAudio.play(name), Number(at || 0));
    });
  }

  function runFlash(scene) {
    if (!scene.dataset.flash || !flashEl) return;
    later(() => {
      flashEl.classList.remove("is-on");
      void flashEl.offsetWidth;
      flashEl.classList.add("is-on");
    }, Number(scene.dataset.flash));
  }

  function activate(i) {
    cleanups.forEach(fn => fn && fn());
    cleanups = [];
    scenes.forEach((s, j) => {
      s.classList.toggle("is-active", j === i);
      s.classList.toggle("is-past", j < i);
    });
    const s = scenes[i];
    const dur = Number(s.dataset.dur || 3000);
    runType(s, dur);
    runSfx(s);
    runFlash(s);
    const hook = hooks[s.dataset.scene];
    if (hook) cleanups.push(hook(s, dur));
  }

  function stop() {
    timers.forEach(clearTimeout);
    timers = [];
    cancelAnimationFrame(raf);
    cleanups.forEach(fn => fn && fn());
    cleanups = [];
  }

  function finish() {
    stop();
    cine.classList.add("is-done");
    body.classList.remove("is-locked");
    scenes.forEach(s => s.classList.remove("is-active", "is-past"));
    if (!firstRunDone) {
      firstRunDone = true;
      lift(document.querySelector("[data-curtain]"));
      observeReveals();
    }
    const title = document.querySelector("[data-arc-title]");
    if (title) { title.setAttribute("tabindex", "-1"); title.focus({ preventScroll: true }); }
    window.scrollTo(0, 0);
  }

  function play() {
    if (!cine || !scenes.length) return finish();
    stop();
    body.classList.add("is-locked");
    cine.classList.remove("is-done");
    const durs = scenes.map(s => Number(s.dataset.dur || 3000));
    const total = durs.reduce((a, b) => a + b, 0);
    let acc = 0;
    durs.forEach((d, i) => { later(() => activate(i), acc); acc += d; });
    later(finish, total);

    const t0 = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - t0) / total);
      if (bar) bar.style.width = (p * 100).toFixed(2) + "%";
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const skip = cine.querySelector("[data-skip]");
    if (skip) skip.focus({ preventScroll: true });
  }

  if (cine) {
    cine.querySelector("[data-skip]").addEventListener("click", finish);
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !cine.classList.contains("is-done")) finish();
    });
    document.querySelectorAll("[data-replay]").forEach(b => b.addEventListener("click", play));
  }

  // Lift the black curtain so the cinematic (which has its own black stage) can fade in.
  lift(document.querySelector("[data-curtain]"));
  if (reduced) { finish(); } else { play(); }

  /* ---------------- Reading progress ---------------- */
  const prog = document.querySelector("[data-read-progress]");
  if (prog) {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      prog.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Table of contents ---------------- */
  const tocLinks = Array.from(document.querySelectorAll(".toc a"));
  if (tocLinks.length && "IntersectionObserver" in window) {
    const map = new Map(tocLinks.map(a => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          tocLinks.forEach(a => a.classList.remove("is-current"));
          const a = map.get(e.target.id);
          if (a) a.classList.add("is-current");
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------------- Spoiler reveal ---------------- */
  document.querySelectorAll("[data-truth]").forEach(box => {
    const btn = box.querySelector("[data-truth-btn]");
    const content = box.querySelector(".truth__body");
    content.setAttribute("aria-hidden", "true");
    btn.addEventListener("click", () => {
      box.classList.add("is-revealed");
      content.removeAttribute("aria-hidden");
      window.SpiAudio && window.SpiAudio.play("sting");
      const first = content.querySelector("p, h3");
      if (first) { first.setAttribute("tabindex", "-1"); first.focus({ preventScroll: true }); }
    });
  });

  /* ---------------- Leaving through the corridor ---------------- */
  document.querySelectorAll("[data-leave]").forEach(a => {
    a.addEventListener("click", e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      window.SpiAudio && window.SpiAudio.play("creak");
      leave(a.getAttribute("href"), 700);
    });
  });
})();
