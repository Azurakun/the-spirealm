// Builds the generated door pages, re-links every door page in list order,
// and rewrites the hub's door grid.  Run:  node tools/build-arcs.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DOORS } from "./doors.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const SOUND_BTN = `<button class="btn-ghost" type="button" data-sound-toggle aria-pressed="false">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6h3l4-3v10l-4-3H2z" fill="currentColor"/><path d="M11 5.5c1 .8 1 4.2 0 5M13 3.5c2 1.8 2 7.2 0 9" stroke="currentColor" fill="none"/></svg>
        <span data-sound-label>Suara: Mati</span>
      </button>`;

const KEY_SVG = `<svg viewBox="0 0 120 60" aria-hidden="true">
              <circle cx="22" cy="30" r="16" fill="none" stroke="#6f9f86" stroke-width="6"/>
              <rect x="36" y="27" width="76" height="7" fill="#6f9f86"/>
              <rect x="92" y="34" width="6" height="12" fill="#6f9f86"/>
              <rect x="104" y="34" width="6" height="16" fill="#6f9f86"/>
            </svg>`;

function navHTML(prev, next) {
  const a = (door, dir, align) => door
    ? `<a href="${door.file}" data-leave>
      <span class="arc-nav__dir">${dir}</span>
      <span class="arc-nav__name">${esc(door.plate)}</span>
    </a>`
    : `<a href="index.html" data-leave>
      <span class="arc-nav__dir">${align === "prev" ? "← Kembali" : "Kembali →"}</span>
      <span class="arc-nav__name">Lorong Spirealm</span>
    </a>`;
  return `<nav class="arc-nav" aria-label="Pintu lain">
    ${a(prev, `← Pintu ${prev ? prev.roman : ""}`, "prev")}
    ${a(next, `Pintu ${next ? next.roman : ""} →`, "next")}
  </nav>`;
}

function section(id, num, label, h2, body) {
  return `<section id="${id}" aria-labelledby="h-${id}">
          <div class="sec-head reveal">
            <span class="sec-num">${num} · ${label}</span>
            <h2 id="h-${id}" class="sec-title">${h2}</h2>
          </div>
          ${body}
        </section>`;
}

const prose = ps => `<div class="prose reveal">\n            ${ps.map(p => `<p>${p}</p>`).join("\n            ")}\n          </div>`;

function render(d, door, prev, next) {
  const s = d.sections;
  const toc = [
    ["ringkasan", "Ringkasan"], ["legenda", s.legenda.toc || "Legenda di balik pintu"], ["aturan", s.aturan.toc || "Syarat kematian"],
    ["kronologi", "Kronologi"], ["tokoh", "Tokoh"], ["kebenaran", "Kebenaran"], ["keluar", s.keluar.toc || "Kunci & pintu keluar"],
  ];
  const body = [
    section("ringkasan", "01", "Ringkasan", s.ringkasan.h2, `${prose(s.ringkasan.prose)}
          <dl class="facts reveal" style="margin-top:28px">
            ${s.ringkasan.facts.map(([t, v]) => `<div><dt>${t}</dt><dd>${v}</dd></div>`).join("\n            ")}
          </dl>
          <div class="hint reveal">
            <span class="hint__label">Petunjuk pintu</span>
            <p class="hint__text">${s.ringkasan.hint.text}</p>
            <p class="hint__note">${s.ringkasan.hint.note}</p>
          </div>`),
    section("legenda", "02", s.legenda.toc || "Legenda di balik pintu", s.legenda.h2, `${prose(s.legenda.prose)}
          <div class="versus reveal">
            ${s.legenda.versus.map(([h, p]) => `<div><h3>${h}</h3><p>${p}</p></div>`).join("\n            ")}
          </div>`),
    section("aturan", "03", s.aturan.toc || "Syarat kematian", s.aturan.h2, `<ol class="deathrules" role="list">
            ${s.aturan.items.map(([m, h, p]) => `<li class="deathrule reveal">
              <span class="deathrule__mark" aria-hidden="true">${m}</span>
              <div><h3>${h}</h3><p>${p}</p></div>
            </li>`).join("\n            ")}
          </ol>`),
    section("kronologi", "04", "Kronologi", s.kronologi.h2, `<ol class="timeline" role="list">
            ${s.kronologi.items.map(([w, h, p, death]) => `<li class="tl${death ? " tl--death" : ""} reveal">
              <span class="tl__when">${w}</span>
              <h3>${h}</h3>
              <p>${p}</p>
            </li>`).join("\n            ")}
          </ol>`),
    section("tokoh", "05", "Tokoh", s.tokoh.h2, `<div class="cast">
            ${s.tokoh.items.map(([role, dead, name, alias, p]) => `<article class="person reveal">
              <span class="person__role${dead ? " person__role--dead" : ""}">${role}</span>
              <h3>${name}</h3>
              <p class="person__alias">${alias}</p>
              <p>${p}</p>
            </article>`).join("\n            ")}
          </div>`),
    section("kebenaran", "06", "Kebenaran", s.kebenaran.h2, `<div class="truth reveal" data-truth>
            <div class="truth__gate">
              <p>Spoiler: ${s.kebenaran.gate}</p>
              <button class="btn-solid" type="button" data-truth-btn>Ungkap kebenaran</button>
            </div>
            <div class="truth__body prose">
              ${s.kebenaran.before.map(p => `<p>${p}</p>`).join("\n              ")}
              <blockquote class="pull">${s.kebenaran.pull}</blockquote>
              ${s.kebenaran.after.map(p => `<p>${p}</p>`).join("\n              ")}
            </div>
          </div>`),
    section("keluar", "07", s.keluar.toc || "Kunci &amp; pintu keluar", s.keluar.h2, `<div class="exit reveal">
            ${KEY_SVG}
            <div class="prose">
              ${s.keluar.prose.map(p => `<p>${p}</p>`).join("\n              ")}
            </div>
          </div>`),
  ].join("\n\n        ");

  return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(d.title)} — Pintu ${door.roman} · The Spirealm</title>
  <meta name="description" content="${esc(d.description)}">
  <meta name="theme-color" content="${d.tint}">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 28'%3E%3Crect x='1' y='1' width='18' height='26' fill='%235a3a22' stroke='%23${door.glow.slice(1)}'/%3E%3Ccircle cx='15' cy='15' r='1.5' fill='%23e9e2d6'/%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?${d.fonts}&family=IM+Fell+English+SC&family=Special+Elite&family=Spectral:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/base.css">
  <link rel="stylesheet" href="assets/css/arc.css">
  <link rel="stylesheet" href="assets/css/arc-kit.css">
  <link rel="stylesheet" href="assets/css/${d.css}">
</head>
<body class="atmos arc ${d.bodyClass} is-locked" data-drone="${d.drone}">
  <div class="curtain curtain--start" data-curtain aria-hidden="true"></div>
  <div class="read-progress" data-read-progress aria-hidden="true"></div>

  <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
    <defs>
${d.defs || ""}
    </defs>
  </svg>

  <!-- ================= CINEMATIC ================= -->
  <div class="cine" data-cine role="region" aria-label="Adegan pembuka ${esc(d.title)}">
    <div class="cine__top">
      <span class="eyebrow">Pintu ${door.roman} <span class="dot">◆</span> ${d.cineTag}</span>
      ${SOUND_BTN}
    </div>

    <div class="cine__stage">
${d.scenes}
    </div>

    <div class="cine__flash" data-flash aria-hidden="true"></div>
    <div class="cine__ui">
      <span class="cine__label">Tekan Esc untuk melewati</span>
      <button class="btn-ghost" type="button" data-skip>Lewati adegan <span aria-hidden="true">›</span></button>
    </div>
    <div class="cine__progress" aria-hidden="true"><span data-cine-progress></span></div>
  </div>

  <!-- ================= PAGE ================= -->
  <header class="topbar">
    <a class="topbar__brand" href="index.html" data-leave aria-label="Kembali ke lorong pintu">
      <svg viewBox="0 0 14 20" aria-hidden="true"><rect x="0.5" y="0.5" width="13" height="19" fill="none" stroke="currentColor"/><circle cx="10.5" cy="10.5" r="1" fill="currentColor"/></svg>
      ← Lorong
    </a>
    <div class="topbar__actions">
      ${SOUND_BTN}
    </div>
  </header>

  <main>
    <section class="arc-hero" aria-labelledby="arc-title">
      <div class="arc-hero__bg" aria-hidden="true">
        ${d.heroArt}
      </div>
      <div class="arc-hero__inner">
        <p class="eyebrow">Pintu ${door.roman} <span class="dot">◆</span> ${d.chapters} <span class="dot">◆</span> Kaleidoscope of Death</p>
        <h1 id="arc-title" class="arc-title" data-arc-title>
          <span class="arc-title__pre">Arc</span>
          ${d.h1}
        </h1>
        <p class="arc-sub">${d.sub}</p>
        <p class="lead arc-hero__lead">${d.lead}</p>
        <div class="arc-hero__actions">
          <a class="btn-solid" href="#ringkasan">Baca kisahnya</a>
          <button class="btn-ghost" type="button" data-replay>↺ Putar ulang adegan</button>
        </div>
      </div>
    </section>

    <div class="arc-body">
      <nav class="toc" aria-label="Daftar isi">
        <p class="eyebrow toc__label">Isi berkas</p>
        <ol>
          ${toc.map(([id, l]) => `<li><a href="#${id}">${l}</a></li>`).join("\n          ")}
        </ol>
      </nav>

      <article class="story">
        ${body}
      </article>
    </div>
  </main>

  ${navHTML(prev, next)}

  <footer class="sources">
    <p><strong>Sumber:</strong> <em>Kaleidoscope of Death</em> (死亡万花筒) karya Xi Zi Xu, ${d.source} (terjemahan Inggris di WebNovel). Ringkasan ditulis ulang dalam bahasa Indonesia. Nama tokoh mengikuti terjemahan tersebut.</p>
  </footer>

  <script src="assets/js/fx.js"></script>
  <script>
${d.script || "    window.arcHooks = {};"}
  </script>
  <script src="assets/js/score.js"></script>
  <script src="assets/js/audio.js"></script>
  <script src="assets/js/common.js"></script>
  <script src="assets/js/arc.js"></script>
</body>
</html>
`;
}

function hubDoor(door) {
  return `<li class="doors__item">
          <a class="door" href="${door.file}" data-door data-arc="${door.n}" data-roman="${door.roman}" data-name="${esc(door.plate)}" data-id-name="${esc(door.id)}" data-tease="${esc(door.tease)}" style="--glow:${door.glow}">
            <span class="door__ord" aria-hidden="true">${String(door.n).padStart(2, "0")}</span>
            <span class="door__frame" aria-hidden="true">
              <span class="door__light"></span>
              <span class="door__leaf">
                <span class="door__panel door__panel--top"></span>
                <span class="door__panel door__panel--bottom"></span>
                <span class="door__knob"></span>
                <span class="door__numeral">${door.roman}</span>
              </span>
            </span>
            <span class="door__plate">${esc(door.plate)}</span>
            <span class="door__meta">Pintu ${door.roman} <span class="dot">·</span> ${esc(door.id)}</span>
          </a>
        </li>`;
}

const only = process.argv[2];
for (let i = 0; i < DOORS.length; i++) {
  const door = DOORS[i], prev = DOORS[i - 1], next = DOORS[i + 1];
  const path = join(ROOT, door.file);
  if (door.built !== false) {
    const stem = door.file.replace(/^arc-|\.html$/g, "");
    const dataPath = join(ROOT, "tools", "arcs", `${stem}.mjs`);
    if (!existsSync(dataPath)) { console.log(`skip ${door.file} (no data yet)`); continue; }
    if (only && only !== stem) continue;
    const { default: d } = await import(pathToFileURL(dataPath).href + `?t=${Date.now()}`);
    writeFileSync(path, render(d, door, prev, next));
    console.log(`built ${door.file}`);
  } else if (existsSync(path)) {
    const html = readFileSync(path, "utf8");
    const out = html.replace(/<nav class="arc-nav"[\s\S]*?<\/nav>/, navHTML(prev, next));
    writeFileSync(path, out);
    console.log(`relinked ${door.file}`);
  }
}

// Hub grid
const hubPath = join(ROOT, "index.html");
const hub = readFileSync(hubPath, "utf8");
const grid = DOORS.filter(d => d.built === false || existsSync(join(ROOT, "tools", "arcs", d.file.replace(/^arc-|\.html$/g, "") + ".mjs"))).map(hubDoor).join("\n        ");
writeFileSync(hubPath, hub.replace(/<!-- DOORS:START -->[\s\S]*?<!-- DOORS:END -->/, `<!-- DOORS:START -->\n        ${grid}\n        <!-- DOORS:END -->`));
console.log("hub updated");
