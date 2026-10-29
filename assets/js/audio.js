/* ==========================================================================
   SpiAudio — tiny synthesized soundscape (no audio files).
   Off by default; the choice is remembered per browser.
   ========================================================================== */
(function () {
  const KEY = "spirealm.sound";
  let ctx = null;
  let master = null;
  let drone = null;

  function readPref() {
    try { return localStorage.getItem(KEY) === "on"; } catch (e) { return false; }
  }
  function writePref(on) {
    try { localStorage.setItem(KEY, on ? "on" : "off"); } catch (e) { /* private mode */ }
  }

  let enabled = readPref();

  function ensure() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    return ctx;
  }

  function noiseBuffer(seconds) {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  function startDrone(base) {
    if (!ctx || drone) return;
    const g = ctx.createGain();
    g.gain.value = 0.0001;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 280;
    lp.Q.value = 6;
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const o3 = ctx.createOscillator();
    o1.type = "sawtooth"; o1.frequency.value = base;
    o2.type = "sawtooth"; o2.frequency.value = base * 1.006;
    o3.type = "sine";     o3.frequency.value = base / 2;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.07;
    lfoGain.gain.value = 120;
    lfo.connect(lfoGain).connect(lp.frequency);
    [o1, o2, o3].forEach(o => o.connect(lp));
    lp.connect(g).connect(master);
    [o1, o2, o3, lfo].forEach(o => o.start());
    g.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 4);
    drone = { g, nodes: [o1, o2, o3, lfo] };
  }

  const sfx = {
    // dull floor knock — "tek"
    thud() {
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(140, t);
      o.frequency.exponentialRampToValueAtTime(42, t + 0.18);
      g.gain.setValueAtTime(0.9, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      o.connect(g).connect(master);
      o.start(t); o.stop(t + 0.32);
    },
    // iron door creak
    creak() {
      const t = ctx.currentTime;
      const src = ctx.createBufferSource();
      src.buffer = noiseBuffer(1.6);
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass"; bp.Q.value = 18;
      bp.frequency.setValueAtTime(380, t);
      bp.frequency.linearRampToValueAtTime(900, t + 0.6);
      bp.frequency.linearRampToValueAtTime(520, t + 1.4);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.7, t + 0.15);
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
      src.connect(bp).connect(g).connect(master);
      src.start(t);
    },
    // sea swell
    wave() {
      const t = ctx.currentTime;
      const src = ctx.createBufferSource();
      src.buffer = noiseBuffer(3.2);
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(200, t);
      lp.frequency.linearRampToValueAtTime(900, t + 1.4);
      lp.frequency.linearRampToValueAtTime(160, t + 3);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.45, t + 1.3);
      g.gain.exponentialRampToValueAtTime(0.001, t + 3.1);
      src.connect(lp).connect(g).connect(master);
      src.start(t);
    },
    // stone crack
    crack() {
      const t = ctx.currentTime;
      for (let i = 0; i < 5; i++) {
        const s = ctx.createBufferSource();
        s.buffer = noiseBuffer(0.12);
        const hp = ctx.createBiquadFilter();
        hp.type = "highpass"; hp.frequency.value = 1400 + Math.random() * 1800;
        const g = ctx.createGain();
        const at = t + i * (0.05 + Math.random() * 0.08);
        g.gain.setValueAtTime(0.6, at);
        g.gain.exponentialRampToValueAtTime(0.001, at + 0.1);
        s.connect(hp).connect(g).connect(master);
        s.start(at);
      }
    },
    // heartbeat
    heart() {
      const t = ctx.currentTime;
      [0, 0.22].forEach((off, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(70, t + off);
        o.frequency.exponentialRampToValueAtTime(38, t + off + 0.15);
        g.gain.setValueAtTime(i ? 0.5 : 0.8, t + off);
        g.gain.exponentialRampToValueAtTime(0.001, t + off + 0.22);
        o.connect(g).connect(master);
        o.start(t + off); o.stop(t + off + 0.25);
      });
    },
    // sharp sting for the reveal
    sting() {
      const t = ctx.currentTime;
      [523, 554, 740].forEach(f => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "square";
        o.frequency.value = f;
        g.gain.setValueAtTime(0.12, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
        o.connect(g).connect(master);
        o.start(t); o.stop(t + 1.25);
      });
      sfx.thud();
    }
  };

  const listeners = new Set();

  const api = {
    get enabled() { return enabled; },
    droneBase: 55,
    async set(on) {
      enabled = on;
      writePref(on);
      if (on) {
        if (!ensure()) return;
        try { await ctx.resume(); } catch (e) { /* blocked */ }
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0.8, ctx.currentTime, 0.4);
        startDrone(api.droneBase);
      } else if (ctx) {
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
      }
      listeners.forEach(fn => fn(enabled));
    },
    toggle() { return api.set(!enabled); },
    play(name) {
      if (!enabled || !ctx || ctx.state !== "running" || !sfx[name]) return;
      sfx[name]();
    },
    onChange(fn) { listeners.add(fn); fn(enabled); },
    /* Try to resume a remembered "on" preference after the first gesture. */
    wake() {
      if (!enabled) return;
      const go = () => { api.set(true); window.removeEventListener("pointerdown", go); window.removeEventListener("keydown", go); };
      window.addEventListener("pointerdown", go, { once: true });
      window.addEventListener("keydown", go, { once: true });
      // Browsers may allow it right away if the user interacted on the previous page.
      api.set(true);
    }
  };

  /* Wire every [data-sound-toggle] button on the page. */
  function bindToggles() {
    document.querySelectorAll("[data-sound-toggle]").forEach(btn => {
      btn.addEventListener("click", () => api.toggle());
    });
    api.onChange(on => {
      document.querySelectorAll("[data-sound-toggle]").forEach(btn => {
        btn.setAttribute("aria-pressed", String(on));
        const label = btn.querySelector("[data-sound-label]");
        if (label) label.textContent = on ? "Suara: Hidup" : "Suara: Mati";
      });
    });
  }

  window.SpiAudio = api;
  document.addEventListener("DOMContentLoaded", () => { bindToggles(); api.wake(); });
})();
