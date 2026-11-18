/* SpiFx — canvas weather for the cinematic scenes (snow, rain, embers).
   Each function takes a scene element, draws into its .fx-canvas,
   and returns a cleanup function (the shape arc.js hooks expect). */
(function () {
  function setup(scene) {
    const c = scene.querySelector(".fx-canvas");
    if (!c) return null;
    const ctx = c.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; };
    resize();
    window.addEventListener("resize", resize);
    return { c, ctx, dpr, off: () => window.removeEventListener("resize", resize) };
  }

  function loop(s, step) {
    let id;
    const frame = () => { s.ctx.clearRect(0, 0, s.c.width, s.c.height); step(); id = requestAnimationFrame(frame); };
    frame();
    return () => { cancelAnimationFrame(id); s.off(); };
  }

  const SpiFx = {
    snow(scene) {
      const s = setup(scene);
      if (!s) return null;
      const f = Array.from({ length: 150 }, () => ({ x: Math.random(), y: Math.random(), r: 0.6 + Math.random() * 2.2, v: 0.0006 + Math.random() * 0.0016, w: Math.random() * 6 }));
      return loop(s, () => {
        s.ctx.fillStyle = "rgba(225,235,245,0.85)";
        f.forEach(p => {
          p.y += p.v; p.w += 0.01;
          if (p.y > 1.02) { p.y = -0.02; p.x = Math.random(); }
          s.ctx.beginPath();
          s.ctx.arc((p.x + Math.sin(p.w) * 0.01) * s.c.width, p.y * s.c.height, p.r * s.dpr, 0, Math.PI * 2);
          s.ctx.fill();
        });
      });
    },
    rain(scene) {
      const s = setup(scene);
      if (!s) return null;
      const d = Array.from({ length: 240 }, () => ({ x: Math.random() * 1.1, y: Math.random(), l: 0.02 + Math.random() * 0.03, v: 0.012 + Math.random() * 0.012 }));
      return loop(s, () => {
        s.ctx.strokeStyle = "rgba(170,190,220,0.42)";
        s.ctx.lineWidth = s.dpr;
        s.ctx.beginPath();
        d.forEach(p => {
          p.y += p.v; p.x -= p.v * 0.12;
          if (p.y > 1) { p.y = -0.05; p.x = Math.random() * 1.1; }
          s.ctx.moveTo(p.x * s.c.width, p.y * s.c.height);
          s.ctx.lineTo((p.x - p.l * 0.15) * s.c.width, (p.y + p.l) * s.c.height);
        });
        s.ctx.stroke();
      });
    },
    embers(scene) {
      const s = setup(scene);
      if (!s) return null;
      const e = Array.from({ length: 90 }, () => ({ x: Math.random(), y: 1 + Math.random(), r: 0.8 + Math.random() * 2, v: 0.002 + Math.random() * 0.004, w: Math.random() * 6 }));
      return loop(s, () => {
        e.forEach(p => {
          p.y -= p.v; p.w += 0.03;
          if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
          s.ctx.fillStyle = `rgba(255,${120 + Math.floor(p.r * 40)},40,${Math.min(1, p.y + 0.2)})`;
          s.ctx.beginPath();
          s.ctx.arc((p.x + Math.sin(p.w) * 0.01) * s.c.width, p.y * s.c.height, p.r * s.dpr, 0, Math.PI * 2);
          s.ctx.fill();
        });
      });
    }
  };

  window.SpiFx = SpiFx;
})();
