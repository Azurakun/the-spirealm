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
    const cards = Array.from(cw.querySelectorAll("[data-step-card]"));
    const dots = Array.from(cw.querySelectorAll(".cw__dots li"));
    const label = cw.querySelector("[data-cw-label]");
    const next = cw.querySelector("[data-cw-next]");
    const back = cw.querySelector("[data-cw-back]");
    const leaveBtn = cw.querySelector("[data-cw-leave]");
    const names = ["Peringatan konten", "Headphone", "Suara", "Jumpscare"];
    let step = 0;
    const show = i => {
      step = i;
      cards.forEach((c, j) => c.classList.toggle("is-on", j === i));
      dots.forEach((d, j) => d.classList.toggle("is-on", j <= i));
      label.textContent = `${i + 1} / ${cards.length} · ${names[i]}`;
      back.hidden = i === 0;
      leaveBtn.hidden = i !== 0;
      next.innerHTML = i === cards.length - 1 ? "Aku siap, masuk" : 'Lanjut <span aria-hidden="true">›</span>';
      cw.setAttribute("aria-labelledby", cards[i].getAttribute("aria-labelledby"));
      const h = cards[i].querySelector("h2"); h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true });
    };
    next.addEventListener("click", () => {
      if (step < cards.length - 1) return show(step + 1);
      try { localStorage.setItem(CW_KEY, "1"); } catch (e) { /* ignore */ }
      cw.hidden = true;
      observeReveals();
    });
    back.addEventListener("click", () => show(Math.max(0, step - 1)));
    leaveBtn.addEventListener("click", () => {
      if (history.length > 1) history.back(); else window.location.href = "about:blank";
    });
    cw.addEventListener("keydown", e => {
      if (e.key === "ArrowRight" && step < cards.length - 1) show(step + 1);
      if (e.key === "ArrowLeft" && step > 0) show(step - 1);
    });
    const calm = cw.querySelector("[data-calm-toggle]");
    calm.checked = window.Spi.calm;
    calm.addEventListener("change", () => window.Spi.setCalm(calm.checked));
    show(0);
    next.focus();
  } else {
    startPage();
  }

  /* ---------- The door ring: all doors on one slowly turning cylinder ---------- */
  const track = document.querySelector("[data-track]");
  const ring = track && track.querySelector(".doors");
  const items = Array.from(document.querySelectorAll(".doors__item"));
  const rail = document.querySelector("[data-rail]");
  const cap = document.querySelector("[data-caption]");
  const KEY = "spirealm.door";
  const N = items.length;
  const STEP = 360 / N;
  const mod = (a, n) => ((a % n) + n) % n;
  let pos = 0;          // ring position in doors; unbounded so turning always takes the short way
  let radius = 0, pitch = 1;
  let focusIdx = -1;    // door at the front
  let capIdx = -1;      // door the caption currently describes

  let aim = 0;          // where the ring is heading (pos eases toward it)
  let tween = 0;
  function layout() {
    const w = items[0].offsetWidth;
    pitch = w * 1.1;                                     // arc length between neighbouring doors
    radius = Math.round(pitch * N / (2 * Math.PI));
    ring.style.height = Math.max(...items.map(it => it.offsetHeight)) + "px";
    // Camera at the height of the front door's centre, so we face it straight on.
    const frame = items[0].querySelector(".door__frame");
    const eye = ring.offsetTop + frame.offsetTop + frame.offsetHeight / 2;
    track.style.perspectiveOrigin = `50% ${eye}px`;
    render();
  }
  // Every door sits on a flat circle seen slightly from above. Each door turns to
  // face the viewer, so the doors at the back stay visible (smaller, higher, dimmer).
  function render() {
    items.forEach((it, i) => {
      let d = mod(i - pos, N); if (d > N / 2) d -= N;   // signed distance from the front, in doors
      const th = d * STEP * Math.PI / 180;
      const x = Math.sin(th) * radius;
      const z = (Math.cos(th) - 1) * radius;              // 0 at the front, -2r at the back
      const ad = Math.abs(d);
      const pop = Math.max(0, 1 - ad) * 70;               // the front door steps forward
      it.style.transform = `translate3d(${x.toFixed(1)}px, 0, ${(z + pop).toFixed(1)}px)`;
      it.style.zIndex = String(1000 + Math.round(z));
      it.style.setProperty("--ad", Math.min(ad, 7.5).toFixed(3));
    });
    setFocus(mod(Math.round(pos), N));
  }
  // Ease pos toward aim; nothing moves unless the visitor turns the ring.
  function animate(from, to, ms) {
    cancelAnimationFrame(tween);
    const t0 = performance.now();
    const ease = k => 1 - Math.pow(1 - k, 3);
    const frame = now => {
      const k = Math.min(1, (now - t0) / ms);
      pos = from + (to - from) * ease(k);
      render();
      if (k < 1) tween = requestAnimationFrame(frame);
    };
    tween = requestAnimationFrame(frame);
  }
  function setFocus(i) {
    if (i === focusIdx) return;
    focusIdx = i;
    items.forEach((it, j) => {
      it.classList.toggle("is-focus", j === i);
      it.querySelector(".door").tabIndex = j === i ? 0 : -1;
    });
    document.querySelector("[data-count]").textContent = String(i + 1).padStart(2, "0");
    rail.querySelectorAll("button").forEach((b, j) => b.setAttribute("aria-current", String(j === i)));
  }
  // The caption only changes when the door actually changes, and fades in once.
  function setCaption(i) {
    if (i === capIdx) return;
    capIdx = i;
    const door = items[i].querySelector(".door");
    const d = door.dataset;
    cap.querySelector("[data-cap-num]").textContent = "Pintu " + d.roman;
    cap.querySelector("[data-cap-id]").textContent = d.idName;
    cap.querySelector("[data-cap-name]").textContent = d.name;
    cap.querySelector("[data-cap-tease]").textContent = d.tease;
    cap.querySelector("[data-cap-open]").href = door.getAttribute("href");
    cap.style.setProperty("--cap", door.style.getPropertyValue("--glow"));
    cap.classList.remove("is-swap"); void cap.offsetWidth; cap.classList.add("is-swap");
    try { sessionStorage.setItem(KEY, String(i)); } catch (e) { /* ignore */ }
  }
  function turnTo(p, smooth = true) {
    aim = p;
    setCaption(mod(Math.round(p), N));
    if (!smooth || reduced) { cancelAnimationFrame(tween); pos = p; render(); return; }
    animate(pos, p, 650 + Math.min(4, Math.abs(p - pos)) * 120);
  }
  // Rotate to door i the short way round (I and XV are neighbours).
  function goTo(i, smooth = true) {
    const cur = Math.round(aim);
    let delta = mod(i - cur, N); if (delta > N / 2) delta -= N;
    turnTo(cur + delta, smooth);
  }
  const step = dir => turnTo(Math.round(aim) + dir);

  if (ring && N) {
    items.forEach((it, i) => {
      const d = it.querySelector(".door").dataset;
      const li = document.createElement("li");
      li.innerHTML = `<button type="button" aria-label="Pintu ${d.roman}: ${d.name}">${d.roman}</button>`;
      li.firstChild.addEventListener("click", () => goTo(i));
      rail.appendChild(li);
    });

    // Drag / swipe turns the ring directly; letting go settles on the nearest door.
    let drag = null, dragged = false;
    track.addEventListener("pointerdown", e => {
      if (e.button !== 0) return;
      drag = { x: e.clientX, pos, id: e.pointerId };
      dragged = false;
    });
    track.addEventListener("pointermove", e => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      if (!dragged && Math.abs(dx) < 6) return;
      if (!dragged) { dragged = true; track.setPointerCapture(drag.id); cancelAnimationFrame(tween); track.classList.add("is-dragging"); }
      pos = drag.pos - dx / pitch;
      render();
    });
    const release = () => {
      if (!drag) return;
      track.classList.remove("is-dragging");
      if (dragged) turnTo(Math.round(pos));
      drag = null;
    };
    track.addEventListener("pointerup", release);
    track.addEventListener("pointercancel", release);
    // A drag must not also count as a click on the door under the pointer.
    track.addEventListener("click", e => { if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; } }, true);

    track.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      if (e.key === "Home") { e.preventDefault(); goTo(0); }
      if (e.key === "End") { e.preventDefault(); goTo(N - 1); }
    });
    document.querySelectorAll("[data-step]").forEach(b => b.addEventListener("click", () => step(Number(b.dataset.step))));
    // One wheel notch turns exactly one door; the ring never ends, so neither does the wheel.
    let wheelLock = 0;
    track.addEventListener("wheel", e => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 4) return;
      e.preventDefault();
      const now = performance.now();
      if (now < wheelLock) return;
      wheelLock = now + 450;
      step(delta > 0 ? 1 : -1);
    }, { passive: false });
    cap.querySelector("[data-cap-open]").addEventListener("click", e => {
      e.preventDefault();
      items[focusIdx].querySelector(".door").click();
    });

    let start = 0;
    try { start = Number(sessionStorage.getItem(KEY)) || 0; } catch (e) { /* ignore */ }
    pos = mod(start, N);
    layout();
    turnTo(pos, false);
    window.addEventListener("resize", layout);
  }

  /* ---------- Opening a door ---------- */
  document.querySelectorAll("[data-door]").forEach(door => {
    door.addEventListener("click", e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // allow new-tab
      e.preventDefault();
      if (document.body.classList.contains("is-entering")) return;
      // A door off to the side: walk to it first instead of opening it.
      const idx = items.indexOf(door.closest(".doors__item"));
      if (ring && idx !== focusIdx) { goTo(idx); return; }
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
