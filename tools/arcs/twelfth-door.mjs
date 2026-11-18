const doors = Array.from({ length: 12 }, (_, i) => {
  const x = 20 + i * 31, last = i === 11;
  return `<g class="k-in" style="--d:${i * 0.12}s"><rect x="${x}" y="${last ? 70 : 90}" width="24" height="${last ? 110 : 90}" fill="${last ? "#2a2620" : "#121214"}" stroke="${last ? "#c9a96a" : "#2a2a2e"}" stroke-width="2"/>${last ? `<rect x="${x + 7}" y="120" width="10" height="12" rx="2" fill="#c9a96a" class="k-pulse"/>` : `<path d="M${x + 2} ${92} L${x + 22} ${178} M${x + 22} ${92} L${x + 2} ${178}" stroke="#5c5a57" stroke-width="2"/>`}</g>`;
}).join("");

export default {
  title: "Arc The Twelfth Door",
  description: "Arc The Twelfth Door: pintu terakhir dalam Kaleidoscope of Death. Dua kunci, Hidup Semu dan Mati Nyata, sebuah pilihan, dan setahun di dunia yang tak mengenal Ruan Nanzhu.",
  tint: "#08080a",
  fonts: "family=Fraunces:ital,opsz,wght@1,9..144,300;1,9..144,500",
  css: "arc-final.css",
  bodyClass: "arc--twelfth",
  drone: 65,
  cineTag: "Pintu Kedua Belas",
  chapters: "Bab 139",
  h1: "The Twelfth Door",
  sub: "Pintu Kedua Belas · terkait dengan Ruan Nanzhu",
  lead: "Sebelas pintu di lorong itu sudah tersegel. Yang tersisa hanya pintu kedua belas di ujung, dengan gembok hitam besar. Di tangan Lin Qiushi ada dua kunci, dan hanya satu yang bisa dipakai.",
  source: "bab 139 “Back to Beginning”",
  defs: "",
  scenes: `      <div class="scene scene--black" data-scene="corridor" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true"><svg viewBox="0 0 400 220"><rect x="0" y="180" width="400" height="4" fill="#2a2a2e"/>${doors}</svg></div></div>
        <p class="scene__caption"><span data-type>Sebelas pintu tersegel. Hanya yang kedua belas yang tersisa.</span><small>Pintu terakhir</small></p>
      </div>

      <div class="scene" data-scene="keys" data-dur="4000" data-sfx="crack@1400">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 220">
            <g class="dust"><circle cx="110" cy="80" r="22" fill="none" stroke="#7aa58f" stroke-width="7"/><rect x="128" y="76" width="90" height="8" fill="#7aa58f"/><text x="160" y="130" text-anchor="middle" font-family="Fraunces, serif" font-style="italic" font-size="20" fill="#f3ead6">Hidup Semu</text></g>
            <g class="k-in" style="--d:0.4s"><circle cx="110" cy="160" r="22" fill="none" stroke="#7aa58f" stroke-width="7"/><rect x="128" y="156" width="90" height="8" fill="#7aa58f"/><text x="290" y="168" text-anchor="middle" font-family="Fraunces, serif" font-style="italic" font-size="20" fill="#c9a96a">Mati Nyata</text></g>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Dua kunci. Satu hancur menjadi debu di telapak tangannya.</span></p>
      </div>

      <div class="scene scene--white" data-scene="light" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 260"><g class="k-grow" style="--from:1;--to:0.35;--s:24;--t:3.4s;transform-origin:200px 240px;transform-box:view-box"><circle cx="200" cy="150" r="12" fill="#08080a"/><rect x="192" y="164" width="16" height="70" rx="6" fill="#08080a"/></g></svg>
        </div></div>
        <p class="scene__caption" style="color:#08080a;text-shadow:none"><span data-type>“Sampai jumpa.” Lalu ia melangkah ke dalam cahaya.</span></p>
      </div>

      <div class="scene scene--black" data-scene="year" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 240">
            <rect x="120" y="60" width="90" height="70" fill="#141418"/><rect x="128" y="68" width="74" height="54" fill="#6a8cff" fill-opacity="0.25" class="k-flicker"/>
            <g class="k-in" style="--d:0.6s"><ellipse cx="270" cy="170" rx="26" ry="14" fill="#c48a4a"/><circle cx="292" cy="158" r="10" fill="#c48a4a"/></g>
            <rect x="230" y="150" width="20" height="40" rx="6" fill="#f3ead6" class="k-in" style="--d:1s"/>
            <text x="200" y="225" text-anchor="middle" font-family="Fraunces, serif" font-style="italic" font-size="22" fill="#c9a96a" class="k-in" style="--d:1.6s">365 malam</text>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Setahun di dunia yang tidak pernah mengenal Ruan Nanzhu.</span></p>
      </div>

      <div class="scene scene--glow" data-scene="verdict" data-dur="3600" data-flash="400">
        <p class="k-verdict">“Lin-ge, Ruan-ge sudah kembali!”<small>Telepon dari Ye Niao</small></p>
      </div>`,
  heroArt: `<div class="k-hero-art" style="background:radial-gradient(ellipse 30% 60% at 78% 50%, rgba(243,234,214,0.18), transparent 70%)"></div>`,
  sections: {
    ringkasan: {
      h2: "Pintu yang tidak pernah dibicarakan",
      prose: [
        "Kunci-kunci yang jatuh dari jam dinding di <a href=\"arc-eleventh-door.html\">pintu kesebelas</a> membawa Lin Qiushi ke lorong yang sangat ia kenal. Dua belas pintu besi hitam, sebelas di antaranya tersegel. Di ujung lorong berdiri pintu kedua belas dengan gembok hitam besar.",
        "Kedua kunci itu identik, kecuali ukirannya. Yang satu bertuliskan <strong>Hidup Semu</strong>, yang lain <strong>Mati Nyata</strong>. Saat Lin Qiushi menggosok permukaannya, kunci Hidup Semu tiba-tiba terasa dingin dan hancur menjadi debu di telapak tangannya."
      ],
      facts: [
        ["Latar", "Lorong dua belas pintu"],
        ["Bentuk ujian", "Sebuah pilihan, bukan monster"],
        ["Kunci", "“Hidup Semu” dan “Mati Nyata”"],
        ["Pintu", "Pintu kedua belas bergembok hitam"],
        ["Harga", "Ruan Nanzhu terhapus dari dunia"],
        ["Lama menunggu", "Satu tahun"]
      ],
      hint: { text: "Hidup Semu · Mati Nyata", note: "Bukan secarik petunjuk, melainkan dua ukiran di dua kunci. Pintu kedua belas adalah soal pilihan ganda." }
    },
    legenda: {
      toc: "Makna di balik pintu",
      h2: "Semu dan nyata",
      prose: [
        "Lin Qiushi akhirnya mengerti. Dunia tempat ia berada adalah ilusi, tempat segalanya berjalan seolah pintu-pintu tak pernah ada. Semua orang yang mati di dalam pintu bisa hidup kembali dengan cara lain dan tinggal di sisinya. Kalau mau, ia bisa memulai dari awal bersama mereka.",
        "“Nyata” berarti kembali ke dunianya yang asli, dunia tempat orang-orang itu benar-benar sudah tiada."
      ],
      versus: [
        ["Hidup Semu", "Tetap tinggal di surga yang muncul setelah begitu banyak neraka. Wu Qi hidup, teman-teman yang gugur kembali, dan ada Ruan Nanzhu yang baru, yang tak mengenalnya."],
        ["Mati Nyata", "Pulang ke kenyataan yang keras, dan tak tahu apa yang dipilih Ruan Nanzhu di pintunya sendiri."]
      ]
    },
    aturan: {
      toc: "Hukum pintu terakhir",
      h2: "Pilihan yang tak bisa ditarik kembali",
      items: [
        ["Ⅰ", "Pintu kedua belas tidak benar-benar ada", "Lin Qiushi akhirnya paham kenapa hampir tak ada yang membicarakan pintu kedua belas. Ujiannya adalah godaan, dan setelah melewati begitu banyak dunia mengerikan, surga di depan mata sangat sulit ditolak."],
        ["Ⅱ", "Setiap orang memilih sendiri", "Ruan Nanzhu menghadapi pilihannya sendiri. Kalau ia menemukan kunci lalu memilih ilusi, Lin Qiushi yang pulang mungkin tak akan pernah melihatnya lagi."],
        ["Ⅲ", "Pengetahuan yang terkunci", "Yang keluar dari pintu kedua belas “dipudarkan”. Orang-orang tanpa sadar mengabaikan keberadaannya, dan tak ada yang bertanya apa isi pintu itu."],
        ["Ⅳ", "Kenangan tetap nyata", "Setiap pintu yang tersegel di lorong itu adalah kenangan bersama Obsidian. Tidak semuanya indah, tetapi semuanya nyata."]
      ]
    },
    kronologi: {
      h2: "Setelah gembok terbuka",
      items: [
        ["Di lorong", "Keputusan yang sudah lama dibuat", "Lin Qiushi tak punya banyak keluarga atau teman. Satu-satunya ikatannya adalah Ruan Nanzhu. Dunia tanpa Ruan Nanzhu adalah dunia palsu baginya, jadi ia tak perlu ragu."],
        ["Jalan pulang", "Lorong cahaya", "Ia memasukkan kunci Mati Nyata ke gembok. Lorong cahaya putih itu lebih panjang dari lorong mana pun yang pernah ia lalui."],
        ["Kamar Ruan Nanzhu", "Yang tidak ada", "Ia terbangun di kamar Ruan Nanzhu, tetapi tak menemukannya di mana pun. Ye Niao bersorak menyambutnya, lalu bingung: “Siapa Ruan Nanzhu?” Pemimpin Obsidian, menurut semua orang, adalah Lin Qiushi sendiri."],
        ["Hari-hari berikutnya", "Semua ingatan benar, kecuali satu", "Tan Zaozao dan Cheng Qianli memang sudah tiada, dan Cheng Yixie memang pergi. Hanya keberadaan Ruan Nanzhu yang lenyap. Semua orang mengira Lin Qiushi terguncang dan mengarang seseorang yang tak pernah ada."],
        ["Bulan-bulan sesudahnya", "Apartemen lama", "Lin Qiushi keluar dari Obsidian, membeli apartemen yang dulu ia sewa, dan merenovasinya persis seperti dulu, berharap suatu pagi Ruan Nanzhu duduk lagi di sisi ranjangnya dan mengucapkan selamat pagi."],
        ["Satu tahun", "Mati rasa", "Ia mendatangi sekolah Ruan Nanzhu dan mencari setiap orang bernama Ruan Nanzhu di seluruh negeri, tanpa hasil. Sebulan penuh ia tak bisa tidur karena seolah mendengar bisikan Ruan Nanzhu di telinganya."]
      ]
    },
    tokoh: {
      h2: "Yang memilih",
      items: [
        ["Pemimpin Obsidian", false, "Lin Qiushi", "Pemimpin Obsidian di dunia yang baru", "Ia memilih kenyataan tanpa ragu, dan berjanji tak akan melupakan Ruan Nanzhu meski seluruh dunia lupa."],
        ["Yang hilang", false, "Ruan Nanzhu", "Dihapus dari dunia", "Pintu kedua belas yang paling dekat dengannya, bahkan mungkin “bencana hati” Lin Qiushi sendiri."],
        ["Obsidian", false, "Ye Niao", "Anggota baru", "Orang pertama yang menyambut Lin Qiushi, dan orang pertama yang membawa kabar."],
        ["Obsidian", false, "Lu Yanxue, Chen Fei", "Penghuni rumah besar", "Mereka ingat semuanya, kecuali satu orang."],
        ["Kucing", false, "Chestnut", "Teman setahun penuh", "Menemani Lin Qiushi menonton siaran ulang berita di malam-malam panjang."]
      ]
    },
    kebenaran: {
      h2: "Pilihan Ruan Nanzhu",
      gate: "akhir kisah",
      before: [
        "Lin Qiushi tak pernah menyalahkan Ruan Nanzhu. Kalau bukan karena pintu-pintu itu, Ruan Nanzhu bisa berbaikan dengan keluarganya dan tak perlu kehilangan begitu banyak teman. Seandainya ia memilih ilusi, Lin Qiushi tetap mencintainya.",
        "Setahun berlalu tanpa ia sadari. Lalu suatu hari ponselnya berdering. Itu Ye Niao, dengan suara yang luar biasa gembira."
      ],
      pull: "“Lin-ge, Ruan-ge sudah kembali! Dia mencarimu ke mana-mana!”",
      after: [
        "Ruan Nanzhu juga memilih kenyataan. Ia hanya butuh waktu lebih lama untuk pulang."
      ]
    },
    keluar: {
      toc: "Kembali ke awal",
      h2: "Kembali ke awal",
      prose: [
        "Kisah <em>Kaleidoscope of Death</em> ditutup dengan judul bab “Back to Beginning”. Lin Qiushi kembali ke apartemen tempat semuanya bermula, dan menunggu di sana sampai orang yang ia tunggu benar-benar datang.",
        "Dari lorong ini, semua pintu sudah tersegel. <a href=\"index.html\" data-leave>Kembali ke lorong Spirealm</a> untuk membuka kisah lain dari awal."
      ]
    }
  }
};
