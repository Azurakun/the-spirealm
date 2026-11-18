/* ==========================================================================
   SpiScore — generative background music, one original piece per page.
   Everything is synthesized with Web Audio (no audio files). Each theme has
   continuous layers (setup) and a beat function the scheduler calls ahead of
   time, so the same code can render live or into an OfflineAudioContext.
   ========================================================================== */
(function () {
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);

  /* ---------------- small helpers ---------------- */
  function rng(seed) { // mulberry32
    let a = seed >>> 0;
    return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

  const noiseCache = new WeakMap();
  function noise(ctx, kind = "white") {
    let byKind = noiseCache.get(ctx);
    if (!byKind) { byKind = {}; noiseCache.set(ctx, byKind); }
    if (byKind[kind]) return byKind[kind];
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      if (kind === "brown") { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
      else if (kind === "crackle") { d[i] = Math.random() < 0.0006 ? (Math.random() * 2 - 1) : w * 0.02; }
      else d[i] = w;
    }
    return (byKind[kind] = buf);
  }

  function impulse(ctx, seconds, decay) {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  // Output bus: dry + reverb. Voices connect to bus.in.
  function makeBus(ctx, out, opts) {
    const input = ctx.createGain();
    const dry = ctx.createGain(); dry.gain.value = 1 - (opts.reverb ?? 0.35) * 0.5;
    const conv = ctx.createConvolver(); conv.buffer = impulse(ctx, opts.room ?? 3.5, opts.decay ?? 2.6);
    const wet = ctx.createGain(); wet.gain.value = opts.reverb ?? 0.35;
    const level = ctx.createGain(); level.gain.value = 0.0001;
    input.connect(dry).connect(level);
    input.connect(conv).connect(wet).connect(level);
    level.connect(out);
    level.gain.setTargetAtTime(opts.level ?? 0.5, ctx.currentTime + 0.05, 1.6); // slow fade in
    return { in: input, level };
  }

  /* ---------------- instruments ---------------- */
  // Every voice: (ctx, dest, t, freq, opts) and cleans itself up.
  function envGain(ctx, dest, t, a, peak, hold, rel) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + a);
    g.gain.setValueAtTime(peak, t + a + hold);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + hold + rel);
    g.connect(dest);
    return g;
  }
  function osc(ctx, type, f, t, end, dest, detune = 0) {
    const o = ctx.createOscillator();
    o.type = type; o.frequency.setValueAtTime(f, t); o.detune.value = detune;
    o.connect(dest); o.start(t); o.stop(end + 0.05);
    return o;
  }

  const I = {
    bell(ctx, dest, t, f, o = {}) {
      const partials = o.partials || [1, 2.76, 5.4, 8.93];
      const amps = o.amps || [1, 0.45, 0.22, 0.1];
      const decay = o.decay ?? 4;
      partials.forEach((p, i) => {
        const g = envGain(ctx, dest, t, 0.004, (o.gain ?? 0.12) * amps[i], 0, decay / (1 + i * 0.6));
        osc(ctx, "sine", f * p, t, t + decay, g, (o.detune || 0) * (i + 1));
      });
    },
    musicBox(ctx, dest, t, f, o = {}) {
      const decay = o.decay ?? 1.8;
      const g = envGain(ctx, dest, t, 0.003, o.gain ?? 0.1, 0, decay);
      osc(ctx, "sine", f, t, t + decay, g, o.detune || 0);
      const g2 = envGain(ctx, dest, t, 0.002, (o.gain ?? 0.1) * 0.25, 0, decay * 0.35);
      osc(ctx, "sine", f * 4.02, t, t + decay, g2, o.detune || 0);
    },
    pluck(ctx, dest, t, f, o = {}) { // koto / plucked string
      const decay = o.decay ?? 1.4;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 2;
      lp.frequency.setValueAtTime(o.bright ?? 3200, t);
      lp.frequency.exponentialRampToValueAtTime(Math.max(120, f * 1.2), t + decay * 0.6);
      const g = envGain(ctx, lp, t, 0.003, o.gain ?? 0.14, 0, decay);
      lp.connect(dest);
      const ob = osc(ctx, "sawtooth", f * (o.bend ? 1.03 : 1), t, t + decay, g);
      if (o.bend) ob.frequency.exponentialRampToValueAtTime(f, t + 0.12);
    },
    piano(ctx, dest, t, f, o = {}) {
      const decay = o.decay ?? 2.6;
      const g = envGain(ctx, dest, t, 0.006, o.gain ?? 0.1, 0, decay);
      osc(ctx, "triangle", f, t, t + decay, g);
      const g2 = envGain(ctx, dest, t, 0.004, (o.gain ?? 0.1) * 0.3, 0, decay * 0.4);
      osc(ctx, "sine", f * 2, t, t + decay, g2);
    },
    epiano(ctx, dest, t, f, o = {}) { // simple 2-op FM
      const decay = o.decay ?? 2.2;
      const g = envGain(ctx, dest, t, 0.005, o.gain ?? 0.09, 0, decay);
      const car = osc(ctx, "sine", f, t, t + decay, g);
      const mod = ctx.createOscillator(); mod.frequency.value = f;
      const idx = ctx.createGain();
      idx.gain.setValueAtTime(f * 1.6, t); idx.gain.exponentialRampToValueAtTime(f * 0.05, t + decay * 0.5);
      mod.connect(idx).connect(car.frequency); mod.start(t); mod.stop(t + decay + 0.05);
    },
    bowed(ctx, dest, t, f, o = {}) { // erhu / horn-ish sustained
      const dur = o.dur ?? 2;
      const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = o.formant ?? f * 2.2; bp.Q.value = o.q ?? 1.4;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = o.cutoff ?? 2600;
      const g = envGain(ctx, bp, t, o.attack ?? 0.35, o.gain ?? 0.12, Math.max(0, dur - 0.6), o.release ?? 0.9);
      bp.connect(lp).connect(dest);
      const ob = osc(ctx, o.type || "sawtooth", o.from ?? f, t, t + dur + 1, g);
      if (o.from) ob.frequency.exponentialRampToValueAtTime(f, t + (o.slide ?? 0.25));
      const lfo = ctx.createOscillator(); lfo.frequency.value = o.vib ?? 5.2;
      const lg = ctx.createGain(); lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(o.depth ?? 14, t + 0.6);
      lfo.connect(lg).connect(ob.detune); lfo.start(t); lfo.stop(t + dur + 1);
    },
    breath(ctx, dest, t, f, o = {}) { // shakuhachi-ish
      const dur = o.dur ?? 3;
      const g = envGain(ctx, dest, t, 0.5, o.gain ?? 0.09, Math.max(0, dur - 1.2), 1.2);
      const ob = osc(ctx, "sine", f, t, t + dur + 1.5, g);
      const lfo = ctx.createOscillator(); lfo.frequency.value = 4.5;
      const lg = ctx.createGain(); lg.gain.value = 9; lfo.connect(lg).connect(ob.detune); lfo.start(t); lfo.stop(t + dur + 1.5);
      const n = ctx.createBufferSource(); n.buffer = noise(ctx); n.loop = true;
      const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = f * 2; bp.Q.value = 6;
      const ng = envGain(ctx, dest, t, 0.25, (o.gain ?? 0.09) * 0.55, Math.max(0, dur - 1), 1);
      n.connect(bp).connect(ng); n.start(t); n.stop(t + dur + 1.5);
    },
    pad(ctx, dest, t, freqs, o = {}) {
      const dur = o.dur ?? 8;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = o.cutoff ?? 900; lp.Q.value = 0.7;
      const a = o.attack ?? dur * 0.35;
      const g = envGain(ctx, lp, t, a, o.gain ?? 0.05, Math.max(0, dur - a - 1), o.release ?? 3);
      lp.connect(dest);
      freqs.forEach(f => [-1, 1].forEach(s => osc(ctx, o.type || "sawtooth", f, t, t + dur + 3.2, g, s * (o.detune ?? 7))));
    },
    choir(ctx, dest, t, freqs, o = {}) {
      const dur = o.dur ?? 8;
      const sum = ctx.createGain(); sum.gain.value = 1;
      (o.formants || [700, 1150, 2700]).forEach((ff, i) => {
        const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = ff; bp.Q.value = 7;
        const lg = ctx.createGain(); lg.gain.value = [1, 0.6, 0.25][i] || 0.2;
        sum.connect(bp).connect(lg).connect(dest);
      });
      const a = o.attack ?? dur * 0.4;
      const g = envGain(ctx, sum, t, a, o.gain ?? 0.22, Math.max(0, dur - a - 1), o.release ?? 3);
      freqs.forEach(f => [-1, 1].forEach(s => {
        const ob = osc(ctx, "sawtooth", f, t, t + dur + 3.2, g, s * 9);
        const lfo = ctx.createOscillator(); lfo.frequency.value = 4.8 + s * 0.3;
        const lgv = ctx.createGain(); lgv.gain.value = 8; lfo.connect(lgv).connect(ob.detune); lfo.start(t); lfo.stop(t + dur + 3.2);
      }));
    },
    thump(ctx, dest, t, o = {}) { // soft low pulse (frame drum, heartbeat, wood)
      const g = envGain(ctx, dest, t, 0.004, o.gain ?? 0.18, 0, o.decay ?? 0.35);
      const ob = osc(ctx, "sine", o.from ?? 110, t, t + (o.decay ?? 0.35) + 0.1, g);
      ob.frequency.exponentialRampToValueAtTime(o.to ?? 48, t + (o.decay ?? 0.35) * 0.6);
    },
    tick(ctx, dest, t, o = {}) {
      const g = envGain(ctx, dest, t, 0.001, o.gain ?? 0.02, 0, 0.04);
      osc(ctx, "square", o.f ?? 2400, t, t + 0.06, g);
    },
  };

  /* ---------------- continuous layers ---------------- */
  const L = {
    drone(ctx, dest, f, o = {}) {
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = o.cutoff ?? 260; lp.Q.value = o.q ?? 2;
      const g = ctx.createGain(); g.gain.value = o.gain ?? 0.06;
      lp.connect(g).connect(dest);
      const t = ctx.currentTime;
      (o.ratios || [1, 1.004, 0.5]).forEach((r, i) => osc(ctx, i === 2 ? "sine" : (o.type || "sawtooth"), f * r, t, t + 36000, lp));
      if (o.sweep) {
        const lfo = ctx.createOscillator(); lfo.frequency.value = o.sweep;
        const lg = ctx.createGain(); lg.gain.value = (o.cutoff ?? 260) * 0.5;
        lfo.connect(lg).connect(lp.frequency); lfo.start();
      }
    },
    bed(ctx, dest, kind, o = {}) {
      const src = ctx.createBufferSource();
      src.buffer = noise(ctx, kind === "crackle" ? "crackle" : (kind === "sea" || kind === "fire" ? "brown" : "white"));
      src.loop = true;
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain(); g.gain.value = o.gain ?? 0.03;
      const presets = {
        wind: ["bandpass", 700, 0.8], rain: ["highpass", 1800, 0.5], sea: ["lowpass", 500, 0.7], stream: ["bandpass", 900, 0.9],
        fire: ["lowpass", 380, 0.7], crackle: ["highpass", 1500, 0.5], static: ["bandpass", 3200, 0.6],
      };
      const [type, freq, q] = presets[kind];
      f.type = type; f.frequency.value = freq; f.Q.value = q;
      src.connect(f).connect(g).connect(dest);
      src.start();
      if (o.swell) { // slow amplitude/filter breathing
        const lfo = ctx.createOscillator(); lfo.frequency.value = o.swell;
        const lg = ctx.createGain(); lg.gain.value = (o.gain ?? 0.03) * 0.8;
        lfo.connect(lg).connect(g.gain); lfo.start();
        const lf = ctx.createGain(); lf.gain.value = freq * 0.5; lfo.connect(lf).connect(f.frequency);
      }
    },
    hum(ctx, dest, f, gain) {
      const g = ctx.createGain(); g.gain.value = gain;
      g.connect(dest);
      osc(ctx, "sine", f, ctx.currentTime, ctx.currentTime + 36000, g);
      osc(ctx, "sine", f * 2, ctx.currentTime, ctx.currentTime + 36000, g);
    },
  };

  /* ---------------- the pieces ---------------- */
  // Each: { title, bpm, reverb, level, setup(ctx, bus, r), beat(ctx, bus, t, n, r) }
  const THEMES = {
    // Corridor — slow organ-like minor chords, a far-off bell, faint wind.
    hub: {
      title: "Lorong Dua Belas Pintu", bpm: 40, reverb: 0.5, room: 5,
      setup(c, b) { L.drone(c, b.in, mtof(38), { gain: 0.05, cutoff: 220, sweep: 0.04 }); L.bed(c, b.in, "wind", { gain: 0.012, swell: 0.05 }); },
      beat(c, b, t, n, r) {
        const prog = [[50, 53, 57], [46, 50, 53], [43, 46, 50], [45, 49, 52]]; // Dm Bb Gm A
        if (n % 8 === 0) I.pad(c, b.in, t, prog[(n / 8) % 4].map(mtof), { dur: 12, gain: 0.04, cutoff: 700, type: "triangle", detune: 5 });
        if (n % 16 === 6) I.bell(c, b.in, t, mtof(pick(r, [74, 77, 81])), { gain: 0.05, decay: 6 });
      },
    },
    // 1 · Snow Village — icy shimmer, sparse celesta in A minor pentatonic, wind.
    snow: {
      title: "Salju di Atas Peti", bpm: 50, reverb: 0.55, room: 4.5,
      setup(c, b) { L.bed(c, b.in, "wind", { gain: 0.03, swell: 0.07 }); L.drone(c, b.in, mtof(33), { gain: 0.035, cutoff: 160, ratios: [1, 1.5, 0.5], type: "sine" }); },
      beat(c, b, t, n, r) {
        if (n % 12 === 0) I.pad(c, b.in, t, [69, 76, 81].map(mtof), { dur: 14, gain: 0.025, cutoff: 3000, type: "sine", detune: 12 });
        if (r() < 0.5) I.bell(c, b.in, t + (r() < 0.3 ? 0.6 : 0), mtof(pick(r, [81, 84, 86, 88, 91, 93])), { gain: 0.045, decay: 3, partials: [1, 4, 9.2], amps: [1, 0.35, 0.1] });
        if (n % 24 === 18) I.bell(c, b.in, t, mtof(57), { gain: 0.05, decay: 7 }); // the coffin bell
      },
    },
    // 2 · Fitcher's Bird — warped music-box waltz in C minor that slowly drifts out of tune.
    fitcher: {
      title: "Lagu Ulang Tahun yang Salah", bpm: 92, reverb: 0.3,
      setup() {},
      beat(c, b, t, n, r) {
        const mel = [72, null, 75, 74, 72, 67, 68, null, 67, 65, 63, 62, 63, null, 67, 72, null, 71, 72, 75, 74, 72, 68, 67];
        const bar = Math.floor(n / 3) % 8, drift = Math.sin(n / 40) * 30 + (n % 48) * 0.6;
        const m = mel[n % mel.length];
        if (m) I.musicBox(c, b.in, t, mtof(m), { gain: 0.07, detune: drift + (r() - 0.5) * 12, decay: 1.6 });
        if (n % 3 === 0) I.piano(c, b.in, t, mtof([48, 44, 43, 41, 48, 44, 43, 43][bar]), { gain: 0.05, decay: 2 });
        if (n % 3 !== 0 && r() < 0.6) I.musicBox(c, b.in, t, mtof([63, 60, 62, 60, 63, 60, 59, 59][bar] + 12), { gain: 0.025, detune: drift, decay: 0.8 });
      },
    },
    // 3 · Sister Drum — throat-singing drone, singing bowls, soft frame-drum heartbeat.
    sister: {
      title: "Genderang di Atap Kuil", bpm: 60, reverb: 0.45, room: 4,
      setup(c, b) {
        I.choir(c, b.in, c.currentTime, [mtof(33), mtof(40)], { dur: 36000, gain: 0.2, attack: 6, formants: [500, 800, 2400] });
      },
      beat(c, b, t, n, r) {
        if (n % 6 === 0) I.bell(c, b.in, t, mtof(n % 12 === 0 ? 57 : 64), { gain: 0.06, decay: 9, partials: [1, 2.71, 5.1, 8.2], amps: [1, 0.5, 0.2, 0.08], detune: 3 });
        if (n % 4 === 0) { I.thump(c, b.in, t, { gain: 0.09, from: 90, to: 50, decay: 0.5 }); I.thump(c, b.in, t + 0.42, { gain: 0.05, from: 85, to: 50, decay: 0.4 }); }
        if (n % 16 === 10) I.breath(c, b.in, t, mtof(pick(r, [69, 72, 76])), { dur: 4, gain: 0.03 });
      },
    },
    // 4 · Woman of the Rain — melancholic piano waltz in A minor over rain.
    rainwoman: {
      title: "Waltz untuk Lukisan Basah", bpm: 66, reverb: 0.4,
      setup(c, b) { L.bed(c, b.in, "rain", { gain: 0.018 }); },
      beat(c, b, t, n, r) {
        const chords = [[45, 60, 64], [41, 57, 60], [38, 57, 62], [40, 56, 59]]; // Am F Dm E
        const bar = Math.floor(n / 3) % 4, beatInBar = n % 3, ch = chords[bar];
        if (beatInBar === 0) I.piano(c, b.in, t, mtof(ch[0]), { gain: 0.08, decay: 3 });
        else { I.piano(c, b.in, t, mtof(ch[1]), { gain: 0.035 }); I.piano(c, b.in, t, mtof(ch[2]), { gain: 0.035 }); }
        const mel = [76, null, 74, 72, null, 71, 69, null, null, 68, null, 71];
        const m = mel[n % 12];
        if (m && Math.floor(n / 12) % 2 === 1) I.piano(c, b.in, t, mtof(m), { gain: 0.06, decay: 3.4 });
      },
    },
    // 5 · Satchan — sparse koto in the miyako-bushi scale, fluorescent hum.
    teke: {
      title: "Koto untuk Kelas 2", bpm: 72, reverb: 0.35,
      setup(c, b) { L.hum(c, b.in, 100, 0.004); L.drone(c, b.in, mtof(28), { gain: 0.03, cutoff: 140, type: "sine", ratios: [1, 1.002, 0.5] }); },
      beat(c, b, t, n, r) {
        const phrase = [64, null, 65, 69, null, 71, 72, null, null, 71, 69, 65, 64, null, null, null];
        const m = phrase[n % 16];
        if (m) I.pluck(c, b.in, t, mtof(m + (Math.floor(n / 16) % 3 === 2 ? -12 : 0)), { gain: 0.12, decay: 1.8, bend: r() < 0.3 });
        if (n % 32 === 28) I.pluck(c, b.in, t, mtof(77), { gain: 0.06, decay: 2.5 }); // the one wrong note
      },
    },
    // 6 · Slenderman — beating low cluster, tape-warble whole-tone tones, static.
    slender: {
      title: "Statik di Hutan", bpm: 30, reverb: 0.5, room: 5,
      setup(c, b) {
        L.bed(c, b.in, "static", { gain: 0.006, swell: 0.11 });
        L.drone(c, b.in, mtof(36), { gain: 0.045, cutoff: 300, ratios: [1, 1.0595, 0.5], sweep: 0.03 });
      },
      beat(c, b, t, n, r) {
        if (n % 2 === 0) {
          const f = mtof(pick(r, [72, 74, 76, 78, 80, 82]));
          I.bowed(c, b.in, t, f * 0.97, { dur: 4, gain: 0.03, type: "sine", vib: 0.6, depth: 35, attack: 1.2, release: 2, formant: f, q: 0.5 });
        }
        if (n % 4 === 3) I.thump(c, b.in, t, { gain: 0.06, from: 70, to: 38, decay: 0.6 });
      },
    },
    // 7 · Waverly Hills — scratchy gramophone waltz in F minor.
    waverly: {
      title: "Gramofon Bangsal Lima", bpm: 96, reverb: 0.25,
      setup(c, b) { L.bed(c, b.in, "crackle", { gain: 0.05 }); },
      beat(c, b, t, n, r) {
        const bar = Math.floor(n / 3) % 8, inBar = n % 3;
        const bass = [41, 36, 41, 37, 39, 36, 41, 36][bar];
        const tone = { type: "square", formant: 1400, q: 0.9, cutoff: 2200, vib: 5.5, depth: 10 };
        if (inBar === 0) I.pluck(c, b.in, t, mtof(bass), { gain: 0.08, bright: 900, decay: 0.9 });
        else I.pluck(c, b.in, t, mtof(bass + 24 + (inBar === 1 ? 3 : 7)), { gain: 0.035, bright: 1500, decay: 0.5 });
        const mel = [68, 67, 65, 64, null, 65, 67, null, 72, 70, 68, 67, null, null, 65, 68, 67, 65, 64, 65, 67, 65, null, null];
        const m = mel[n % 24];
        if (m) I.bowed(c, b.in, t, mtof(m), { ...tone, dur: 0.55, gain: 0.05, attack: 0.04, release: 0.25 });
      },
    },
    // 8 · Mirror Hotel — glass-harmonica tones with slow beating, a low fire rumble.
    mirror: {
      title: "Harmonika Kaca", bpm: 54, reverb: 0.6, room: 5,
      setup(c, b) { L.bed(c, b.in, "fire", { gain: 0.035, swell: 0.06 }); },
      beat(c, b, t, n, r) {
        const notes = [64, 66, 67, 70, 71, 74, 76];
        if (n % 2 === 0) {
          const m = notes[(notes.length - 1) - (Math.floor(n / 2) % notes.length)] + (Math.floor(n / 14) % 2 ? 0 : 12);
          [0, 2.2].forEach(d => I.bowed(c, b.in, t, mtof(m) + d, { dur: 2.6, gain: 0.03, type: "sine", vib: 0.01, depth: 0, attack: 0.9, release: 2.4, formant: mtof(m), q: 0.3 }));
        }
        if (n % 16 === 0) I.pad(c, b.in, t, [40, 47].map(mtof), { dur: 14, gain: 0.03, cutoff: 400 });
      },
    },
    // 9 · River God — erhu-like sliding melody in D minor pentatonic over flowing water.
    river: {
      title: "Ratapan Dewa Sungai", bpm: 56, reverb: 0.45,
      setup(c, b) { L.bed(c, b.in, "stream", { gain: 0.02, swell: 0.09 }); L.drone(c, b.in, mtof(38), { gain: 0.035, cutoff: 200, ratios: [1, 1.5, 0.5], type: "triangle" }); },
      beat(c, b, t, n, r) {
        const mel = [74, null, 72, 69, null, null, 67, 69, 65, null, 62, null, null, null, 69, 72];
        const m = mel[n % 16];
        if (m) { const prev = mel[(n + 15) % 16] || m; I.bowed(c, b.in, t, mtof(m), { dur: 1.9, gain: 0.07, from: mtof(prev), slide: 0.3, vib: 6, depth: 22, formant: 1400, q: 1 }); }
        if (n % 8 === 4) I.thump(c, b.in, t, { gain: 0.04, from: 900, to: 700, decay: 0.12 }); // muyu
      },
    },
    // 10 · Teru Teru Bozu — shakuhachi phrases in the in scale, rain, rare wind chime.
    teru: {
      title: "Seruling dalam Hujan", bpm: 48, reverb: 0.5, room: 4,
      setup(c, b) { L.bed(c, b.in, "rain", { gain: 0.03, swell: 0.04 }); L.drone(c, b.in, mtof(31), { gain: 0.03, cutoff: 150, type: "sine" }); },
      beat(c, b, t, n, r) {
        const phrase = [[67, 3], null, null, [70, 2], null, [69, 4], null, null, null, [62, 3], null, null, [63, 5], null, null, null];
        const p = phrase[n % 16];
        if (p) I.breath(c, b.in, t, mtof(p[0]), { dur: p[1], gain: 0.07 });
        if (n % 20 === 13) [0, 0.18, 0.41].forEach((d, i) => I.bell(c, b.in, t + d, mtof(pick(r, [86, 89, 91, 93])), { gain: 0.02, decay: 2.5, partials: [1, 2.9], amps: [1, 0.2] }));
      },
    },
    // 11 · Sculpture — choir cluster slowly rising over a quiet heartbeat.
    patung: {
      title: "Paduan Suara Plester", bpm: 60, reverb: 0.55, room: 4.5,
      setup() {},
      beat(c, b, t, n, r) {
        const chords = [[48, 55, 63], [48, 55, 62, 63], [44, 51, 60], [43, 50, 59]]; // Cm Cm(add9) Ab G
        if (n % 8 === 0) I.choir(c, b.in, t, chords[(n / 8) % 4].map(mtof), { dur: 9, gain: 0.16 });
        I.thump(c, b.in, t, { gain: 0.07, from: 64, to: 40, decay: 0.25 });
        I.thump(c, b.in, t + 0.26, { gain: 0.045, from: 60, to: 40, decay: 0.22 });
      },
    },
    // 12 · Hako Onna — a lullaby music box heard from inside a closed chest.
    hako: {
      title: "Ninabobo dari Dalam Peti", bpm: 70, reverb: 0.3,
      setup(c, b) {
        const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 900; lp.Q.value = 1.5; lp.connect(b.in);
        b.box = lp; // the "closed lid"
        L.drone(c, b.in, mtof(33), { gain: 0.035, cutoff: 120, ratios: [1, 1.003, 0.5], type: "sine" });
      },
      beat(c, b, t, n, r) {
        const mel = [69, 70, 74, 76, 74, 70, 69, null, 65, 69, 70, 69, 65, 64, null, null];
        const block = Math.floor(n / 16) % 4;
        const m = mel[n % 16];
        if (m && block !== 3) I.musicBox(c, b.box, t, mtof(m + 12), { gain: 0.16, decay: 1.8, detune: (r() - 0.5) * 8 }); // lid shut every 4th phrase
        if (n % 4 === 0 && block !== 3) I.musicBox(c, b.box, t, mtof(57), { gain: 0.08, decay: 2 });
      },
    },
    // 13 · Minotaur — sea swell and a low horn motif in E phrygian dominant.
    minator: {
      title: "Labirin di Atas Ombak", bpm: 44, reverb: 0.5, room: 4.5,
      setup(c, b) { L.bed(c, b.in, "sea", { gain: 0.05, swell: 0.08 }); L.drone(c, b.in, mtof(28), { gain: 0.04, cutoff: 180, ratios: [1, 1.5, 0.5] }); },
      beat(c, b, t, n, r) {
        const motif = [[40, 2.4], null, [41, 1.2], [44, 2.6], null, null, [45, 1.2], [44, 2], null, [41, 1.4], [40, 3], null, null, null, null, null];
        const p = motif[n % 16];
        if (p) I.bowed(c, b.in, t, mtof(p[0]), { dur: p[1], gain: 0.09, formant: 520, q: 0.9, cutoff: 1200, vib: 4, depth: 6, attack: 0.5 });
        if (n % 16 === 0) I.choir(c, b.in, t, [mtof(52), mtof(59)], { dur: 12, gain: 0.08, formants: [500, 900, 2500] });
      },
    },
    // 14 · The Eleventh Door — lo-fi electric piano at night, a quiet clock.
    eleventh: {
      title: "Lagu Malam Tanpa Jawaban", bpm: 76, reverb: 0.35,
      setup() {},
      beat(c, b, t, n, r) {
        const chords = [[53, 57, 60, 64], [52, 55, 59, 62], [50, 53, 57, 60], [48, 52, 55, 59], [53, 56, 60, 64]]; // Fmaj7 Em7 Dm7 Cmaj7 Fm(maj7)
        const bar = Math.floor(n / 4) % 5, ch = chords[bar];
        if (n % 4 === 0) { I.epiano(c, b.in, t, mtof(ch[0] - 12), { gain: 0.06, decay: 3 }); ch.forEach(m => I.epiano(c, b.in, t + 0.02, mtof(m), { gain: 0.03, decay: 2.6 })); }
        I.epiano(c, b.in, t + 60 / 76 / 2, mtof(ch[(n * 2 + 1) % 4] + 12), { gain: 0.02, decay: 1.2 });
        I.tick(c, b.in, t, { gain: 0.008, f: n % 2 ? 2600 : 2200 });
      },
    },
    // 15 · The Twelfth Door — warm, bittersweet major pad with a slow bell melody.
    twelfth: {
      title: "Kembali ke Awal", bpm: 52, reverb: 0.55, room: 5,
      setup() {},
      beat(c, b, t, n, r) {
        const chords = [[48, 55, 64], [45, 52, 60], [41, 53, 57], [43, 50, 59], [48, 55, 64], [45, 52, 60], [41, 53, 56], [43, 50, 59]]; // C Am F G C Am Fm G
        if (n % 4 === 0) I.pad(c, b.in, t, chords[(n / 4) % 8].map(mtof), { dur: 7, gain: 0.035, cutoff: 1400, type: "triangle", detune: 6, attack: 2 });
        const mel = [76, null, 74, 72, null, null, 69, 72, 67, null, null, null, 72, 74, 76, null];
        const m = mel[n % 16];
        if (m && Math.floor(n / 16) % 2 === 1) I.bell(c, b.in, t, mtof(m), { gain: 0.05, decay: 4.5, partials: [1, 2, 3.01], amps: [1, 0.25, 0.08] });
      },
    },
  };

  // Per-piece output level, balanced so every piece sits at a similar loudness (measured offline).
  const LEVELS = { hub: 0.28, snow: 0.4, fitcher: 1.0, sister: 0.68, rainwoman: 1.0, teke: 0.69, slender: 0.59, waverly: 2.0, mirror: 0.56, river: 0.6, teru: 0.4, patung: 0.65, hako: 0.36, minator: 0.43, eleventh: 1.35, twelfth: 0.42 };

  // Which piece belongs to which page (used when <body data-score> is absent).
  const BY_FILE = {
    "": "hub", "index.html": "hub",
    "arc-snow-village.html": "snow", "arc-fitchers-bird.html": "fitcher", "arc-sister-drum.html": "sister",
    "arc-woman-of-the-rain.html": "rainwoman", "arc-teke-teke.html": "teke", "arc-slenderman.html": "slender",
    "arc-waverly-hills.html": "waverly", "arc-mirror-hotel.html": "mirror", "arc-river-god.html": "river",
    "arc-teru-teru-bozu.html": "teru", "arc-patung.html": "patung", "arc-hako-onna.html": "hako",
    "arc-minator.html": "minator", "arc-eleventh-door.html": "eleventh", "arc-twelfth-door.html": "twelfth",
  };

  function themeForPage() {
    const explicit = document.body && document.body.dataset.score;
    if (explicit) return explicit;
    const file = location.pathname.split("/").pop();
    return BY_FILE[file] || null;
  }

  // Start a piece; returns { schedule(untilTime), stop() } or null if unknown.
  function start(ctx, out, name) {
    const th = THEMES[name];
    if (!th) return null;
    const bus = makeBus(ctx, out, { ...th, level: th.level ?? LEVELS[name] ?? 0.5 });
    const r = rng(name.split("").reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7));
    th.setup(ctx, bus, r);
    const spb = 60 / th.bpm;
    let next = ctx.currentTime + 0.2, n = 0;
    return {
      title: th.title,
      schedule(until) {
        if (next < ctx.currentTime) next = ctx.currentTime + 0.05; // resumed after a pause: don't burst
        while (next < until) { th.beat(ctx, bus, next, n, r); n++; next += spb; } },
      stop() { bus.level.gain.setTargetAtTime(0, ctx.currentTime, 0.3); setTimeout(() => bus.level.disconnect(), 2000); },
    };
  }

  // Offline render for testing: resolves to { rms, peak } of the first `seconds`.
  async function render(name, seconds = 12) {
    const sr = 22050;
    const oc = new OfflineAudioContext(2, sr * seconds, sr);
    const ctl = start(oc, oc.destination, name);
    ctl.schedule(seconds);
    const buf = await oc.startRendering();
    const d = buf.getChannelData(0);
    let sum = 0, peak = 0, from = Math.floor(sr * 4); // skip the fade-in
    for (let i = from; i < d.length; i++) { const v = Math.abs(d[i]); sum += v * v; if (v > peak) peak = v; }
    return { rms: Math.sqrt(sum / (d.length - from)), peak };
  }

  /* ---------------- jump-scare stingers ----------------
     Four layered hits, picked per door. All share a sub-bass impact and a short
     dark reverb tail; the top layer gives each its character. */
  const STING_FOR = {
    fitcher: "screech", rainwoman: "screech", teke: "screech", slender: "screech", waverly: "screech", teru: "screech", eleventh: "screech",
    snow: "choir", sister: "choir", patung: "choir", river: "choir",
    mirror: "metal", hako: "metal",
    minator: "boom",
  };

  function stinger(ctx, out, variant, t = ctx.currentTime) {
    const tail = ctx.createConvolver(); tail.buffer = impulse(ctx, 2.6, 3);
    const wet = ctx.createGain(); wet.gain.value = 0.55;
    // Trim + limiter: the hit should jump well above the music but never clip.
    const limit = ctx.createDynamicsCompressor();
    limit.threshold.value = -8; limit.knee.value = 2; limit.ratio.value = 16; limit.attack.value = 0.002; limit.release.value = 0.25;
    limit.connect(out);
    const bus = ctx.createGain(); bus.gain.value = 0.5;
    bus.connect(limit); bus.connect(tail).connect(wet).connect(limit);

    // Shared: sub impact + a short burst of air.
    const sub = envGain(ctx, bus, t, 0.005, 0.55, 0.05, 1.6);
    const so = osc(ctx, "sine", 72, t, t + 1.8, sub); so.frequency.exponentialRampToValueAtTime(26, t + 1.2);
    const n = ctx.createBufferSource(); n.buffer = noise(ctx);
    const nf = ctx.createBiquadFilter(); nf.type = "highpass"; nf.frequency.value = 1200;
    const ng = envGain(ctx, bus, t, 0.003, 0.18, 0.02, 0.25);
    n.connect(nf).connect(ng); n.start(t); n.stop(t + 0.4);

    // Shared: dissonant low brass stab (minor 2nd + tritone) with a filter that bites then closes.
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 3;
    lp.frequency.setValueAtTime(200, t); lp.frequency.exponentialRampToValueAtTime(2200, t + 0.06); lp.frequency.exponentialRampToValueAtTime(260, t + 1.4);
    const bg = envGain(ctx, lp, t, 0.01, variant === "boom" ? 0.16 : 0.1, 0.15, 1.3); lp.connect(bus);
    (variant === "boom" ? [36.7, 38.9, 55] : [55, 58.3, 77.8]).forEach(f => [-8, 8].forEach(d => osc(ctx, "sawtooth", f, t, t + 1.6, bg, d)));

    if (variant === "screech") { // violin-section screech gliding upward
      const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2600; bp.Q.value = 0.9;
      const g = envGain(ctx, bp, t, 0.012, 0.075, 0.3, 1.1); bp.connect(bus);
      [1318, 1396, 1480, 1568, 1661].forEach((f, i) => {
        const o = osc(ctx, "sawtooth", f, t, t + 1.6, g, i * 9);
        o.detune.linearRampToValueAtTime(i * 9 + 220, t + 0.7);
        const lfo = ctx.createOscillator(); lfo.frequency.value = 11 + i;
        const lg = ctx.createGain(); lg.gain.value = 45; lfo.connect(lg).connect(o.detune); lfo.start(t); lfo.stop(t + 1.6);
      });
    } else if (variant === "choir") { // a choir that screams, pitches rising
      const sum = ctx.createGain();
      [[800, 1], [1200, 0.6], [2800, 0.3]].forEach(([ff, a]) => {
        const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = ff; bp.Q.value = 6;
        const ag = ctx.createGain(); ag.gain.value = a; sum.connect(bp).connect(ag).connect(bus);
      });
      const g = envGain(ctx, sum, t, 0.03, 0.6, 0.35, 1.4);
      [880, 932, 1319].forEach((f, i) => [-12, 12].forEach(d => {
        const o = osc(ctx, "sawtooth", f, t, t + 2, g, d);
        o.frequency.exponentialRampToValueAtTime(f * 1.12, t + 0.5);
        const lfo = ctx.createOscillator(); lfo.frequency.value = 7 + i;
        const lg = ctx.createGain(); lg.gain.value = 30; lfo.connect(lg).connect(o.detune); lfo.start(t); lfo.stop(t + 2);
      }));
    } else if (variant === "metal") { // struck iron + a scrape across glass
      I.bell(ctx, bus, t, 180, { gain: 0.16, decay: 2.4, partials: [1, 2.32, 3.86, 5.4, 7.13], amps: [1, 0.8, 0.6, 0.4, 0.3] });
      const sc = ctx.createBufferSource(); sc.buffer = noise(ctx);
      const sf = ctx.createBiquadFilter(); sf.type = "bandpass"; sf.Q.value = 12;
      sf.frequency.setValueAtTime(4200, t); sf.frequency.exponentialRampToValueAtTime(1400, t + 0.9);
      const sg = envGain(ctx, bus, t, 0.02, 0.35, 0.4, 0.6);
      sc.connect(sf).connect(sg); sc.start(t); sc.stop(t + 1.3);
    } else { // boom: a deep, long low hit with a rumble
      const rb = ctx.createBufferSource(); rb.buffer = noise(ctx, "brown");
      const rf = ctx.createBiquadFilter(); rf.type = "lowpass"; rf.frequency.value = 220;
      const rg = envGain(ctx, bus, t, 0.01, 0.5, 0.3, 2.2);
      rb.connect(rf).connect(rg); rb.start(t); rb.stop(t + 3);
    }
    setTimeout(() => { try { bus.disconnect(); } catch (e) { /* already gone */ } }, 6000);
  }

  // Offline loudness check for a stinger.
  async function renderSting(variant) {
    const sr = 22050, oc = new OfflineAudioContext(2, sr * 3, sr);
    stinger(oc, oc.destination, variant, 0.05);
    const d = (await oc.startRendering()).getChannelData(0);
    let peak = 0, sum = 0; for (let i = 0; i < d.length; i++) { const v = Math.abs(d[i]); sum += v * v; if (v > peak) peak = v; }
    return { rms: Math.sqrt(sum / d.length), peak };
  }

  window.SpiScore = { THEMES, start, render, themeForPage, stinger, renderSting, stingFor: name => STING_FOR[name] || "screech" };
})();
