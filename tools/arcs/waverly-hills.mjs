const portraits = Array.from({ length: 8 }, (_, i) => {
  const x = 30 + (i % 4) * 88, y = 30 + Math.floor(i / 4) * 120;
  const face = i === 6 ? `<g class="k-in" style="--d:1.6s"><circle cx="${x + 26}" cy="${y + 40}" r="12" fill="#cfd8d2"/><circle cx="${x + 46}" cy="${y + 40}" r="12" fill="#cfd8d2"/></g>` : `<circle class="k-in" style="--d:${i * 0.1}s" cx="${x + 36}" cy="${y + 42}" r="16" fill="#9fb3a8"/>`;
  return `<rect x="${x}" y="${y}" width="72" height="96" fill="#0b0f0d" stroke="#3d4a43" stroke-width="5"/>${face}`;
}).join("");

export default {
  title: "Arc Waverly Hills",
  description: "Arc Waverly Hills Sanatorium: pintu ketujuh Lin Qiushi dalam Kaleidoscope of Death. Sanatorium tuberkulosis, perawat yang terus melompat dari atap, dan kamar 502.",
  tint: "#0a0f0d",
  fonts: "family=Old+Standard+TT:ital,wght@0,400;0,700;1,400",
  css: "arc-waverly.css",
  bodyClass: "arc--waverly",
  drone: 47,
  cineTag: "Sanatorium Waverly Hills",
  chapters: "Bab 63–69",
  h1: "Waverly Hills",
  sub: "Sanatorium Waverly Hills · Kentucky",
  lead: "Sebuah sanatorium tuberkulosis yang berbau disinfektan. Peraturan pertama: jangan keluar kamar setelah pukul delapan. Setiap malam, terdengar tubuh yang menghantam tanah, lalu suara sepatu hak tinggi naik tangga lagi.",
  source: "bab 63 “The Seventh Door” sampai bab 69 “Match Made in Heaven”",
  defs: `      <symbol id="wh-building" viewBox="0 0 1600 900">
        <rect width="1600" height="900" fill="#0d1311"/>
        <rect x="300" y="160" width="1000" height="740" fill="#050806"/>
        <g fill="#1b2620">${Array.from({ length: 5 }, (_, r) => Array.from({ length: 10 }, (_, c) => `<rect x="${340 + c * 96}" y="${200 + r * 120}" width="48" height="70"/>`).join("")).join("")}</g>
        <rect x="532" y="200" width="48" height="70" fill="#cfe6d8" fill-opacity="0.5"/>
        <path d="M0 860 H1600 V900 H0 Z" fill="#040605"/>
      </symbol>`,
  scenes: `      <div class="scene scene--ward" data-scene="building" data-dur="3800">
        <svg class="k-full k-zoom" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#wh-building"/></svg>
        <p class="scene__caption"><span data-type>Sanatorium tuberkulosis. Dilarang keluar kamar setelah pukul delapan.</span><small>Pintu ketujuh Lin Qiushi</small></p>
      </div>

      <div class="scene scene--ward" data-scene="jump" data-dur="3900" data-sfx="thud@1100,thud@2400,thud@3700">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 500">
            <rect x="0" y="0" width="200" height="500" fill="#050806"/>
            <g class="jumper"><circle cx="230" cy="40" r="10" fill="#e9ece8"/><path d="M220 52 H240 L246 96 H214 Z" fill="#e9ece8"/></g>
            <rect x="0" y="470" width="400" height="30" fill="#141c18"/>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Setiap malam, perawat itu melompat lagi. Lalu merangkak naik untuk melompat sekali lagi.</span></p>
      </div>

      <div class="scene" data-scene="room502" data-dur="3800" data-sfx="thud@600,thud@900,thud@1200,thud@2200,thud@2500,thud@2800">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 300">
            <rect x="120" y="20" width="160" height="280" fill="#0f1512" stroke="#3d4a43" stroke-width="6"/>
            <g class="tag502"><line x1="200" y1="60" x2="200" y2="80" stroke="#9fb3a8" stroke-width="2"/><rect x="160" y="80" width="80" height="40" fill="#cfd8d2"/><text x="200" y="108" text-anchor="middle" font-family="Old Standard TT, serif" font-size="24" font-weight="700" fill="#0a0f0d">502</text></g>
            <circle cx="255" cy="170" r="6" fill="#9fb3a8"/>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Papan nomor kamar 502. Siapa yang menyimpannya, akan didatangi.</span></p>
      </div>

      <div class="scene" data-scene="portraits" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true"><svg viewBox="0 0 400 270">${portraits}</svg></div></div>
        <p class="scene__caption"><span data-type>Potret-potret duka di ruang direktur. Bingkai terakhir akhirnya terisi berdua.</span></p>
      </div>

      <div class="scene scene--black" data-scene="verdict" data-dur="3200" data-flash="300" data-sfx="sting@300">
        <p class="k-verdict">Direktur itu tidak pernah pergi. Ia bersembunyi di dalam tubuh kalian.<small>Kebenaran sanatorium</small></p>
      </div>`,
  heroArt: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><use href="#wh-building"/></svg>`,
  sections: {
    ringkasan: {
      h2: "Pekerjaan dari internet",
      prose: [
        "Untuk pertama kalinya Lin Qiushi masuk pintu bersama klien yang ditemukan lewat internet. Ruan Nanzhu memperingatkan bahwa pekerjaan semacam itu selalu berisiko, jadi identitas asli harus disembunyikan. Lin Qiushi kembali berdandan sebagai <strong>gadis bisu</strong> yang berkomunikasi lewat ponsel, ditemani Ruan Nanzhu.",
        "Klien mereka adalah <strong>Feng Yongle</strong>, pemuda tujuh belasan tahun bertopi hitam. Pintu ini membawa mereka ke sanatorium yang namanya tertulis di petunjuk. Seorang perawat membacakan aturan: hanya boleh makan di ruang makan, dilarang membawa makanan dari luar, dan <em>dilarang keluar kamar setelah pukul delapan malam</em>."
      ],
      facts: [
        ["Latar", "Sanatorium tuberkulosis bertingkat enam"],
        ["Klien", "Feng Yongle"],
        ["Jumlah pemain", "± 14 orang"],
        ["Entitas", "Perawat yang bunuh diri, sang direktur"],
        ["Benda penting", "Papan kamar 502, mayat bayi"],
        ["Kunci", "Di balik bingkai potret pasangan"]
      ],
      hint: { text: "“Waverly Hills Sanatorium”", note: "Nama sebuah sanatorium tuberkulosis sungguhan di Kentucky, Amerika Serikat, yang terkenal dengan kisah-kisah hantunya." }
    },
    legenda: {
      h2: "Sanatorium paling angker di Amerika",
      prose: [
        "Waverly Hills Sanatorium dibangun untuk merawat penderita tuberkulosis pada awal abad ke-20. Ribuan pasien meninggal di sana. Jenazah dikeluarkan lewat terowongan panjang ke kaki bukit yang dijuluki “terowongan kematian”, agar pasien lain tak melihatnya.",
        "Legenda paling terkenal menyangkut <strong>kamar 502</strong>: konon seorang perawat gantung diri di sana, dan perawat lain melompat dari gedung. Keduanya dikaitkan dengan kehamilan yang dirahasiakan."
      ],
      versus: [
        ["Legenda nyata", "Kamar 502, perawat yang bunuh diri, terowongan jenazah, dan penampakan di lorong-lorong kosong."],
        ["Versi di dalam pintu", "Perawat itu terus menghidupkan ulang kematiannya: melompat, merangkak kembali ke dalam, lalu melompat lagi. Ia memburu satu orang, ayah dari bayi yang digugurkannya, yaitu sang direktur sanatorium."]
      ]
    },
    aturan: {
      h2: "Aturan bangsal",
      items: [
        ["Ⅰ", "Jam malam pukul delapan", "Lewat pukul delapan, terdengar sepatu hak tinggi menyusuri lorong. Perawat itu bisa menyerang siapa saja yang berkeliaran, termasuk para NPC."],
        ["Ⅱ", "Papan kamar 502", "Ruan Nanzhu menemukan papan nomor 502 dan memindahkannya ke kamar kosong di seberang. Malam itu sesuatu mengetuk pintu kamar seberang semakin keras, sampai pintunya jebol."],
        ["Ⅲ", "Tubuh pinjaman", "Sang direktur bersembunyi di dalam tubuh para pendatang. Selama ia menempati tubuh orang luar, perawat itu harus mengikuti aturan dan tak bisa membunuhnya sesuka hati."],
        ["Ⅳ", "Bayi di laci", "Di laci ruang direktur ada mayat bayi. Benda itu hanya boleh dikeluarkan pada malam hari. Kalau dipindahkan siang hari, ia menangis."]
      ]
    },
    kronologi: {
      h2: "Malam-malam di Waverly",
      items: [
        ["Hari pertama", "Jiang Yingrui", "Seorang pria ramah bernama Jiang Yingrui terus mendekati “gadis bisu” itu. Suatu kali Lin Qiushi membantingnya lebih dulu, lalu meringkuk seperti kelinci ketakutan. Feng Yongle percaya Jiang Yingrui yang bersalah."],
        ["Malam pertama", "Bunyi tubuh jatuh", "Lin Qiushi akhirnya mengenali suara yang membangunkannya: seseorang melompat dari atas dan menghantam tanah. Perawat itu merangkak kembali dengan kaki remuk, naik ke lantai di atas kamar mereka, lalu melompat lagi.", true],
        ["Malam kedua", "Ketukan di pintu seberang", "Papan kamar 502 yang mereka pindahkan memancing sesuatu. Ketukan makin keras, lalu pintu kamar seberang jebol. Untung papan itu tidak di pintu mereka."],
        ["Pagi berikutnya", "Kematian Jiang Yingrui", "Jiang Yingrui ditemukan tewas tanpa ada yang tahu sebabnya. Di sakunya Ruan Nanzhu menemukan sebuah benda pelindung, alasan ia tak mati pada malam sebelumnya. Sebelas orang tersisa.", true],
        ["Ruang mayat", "Kantong jenazah yang berkurang", "Sepertiga kantong jenazah yang dulu bertumpuk sampai langit-langit sudah hilang, mungkin dibawa ke terowongan."],
        ["Malam itu · ruang direktur", "Hu Die", "Mereka memergoki Hu Die keluar dari ruang direktur membawa mayat bayi terbungkus kain. “Lepaskan aku, kalau dia kembali dan bayinya hilang, kita semua mati!”"],
        ["Malam terakhir", "Sang direktur diseret", "Pukul delapan tak ada bunyi hak sepatu. Yang terdengar justru jeritan seorang pria. Perawat itu menyeret mayat berjas dokter, mayat sang direktur, naik ke lantai atas.", true]
      ]
    },
    tokoh: {
      h2: "Pasien dan pengunjung",
      items: [
        ["Pemain · Obsidian", false, "Lin Qiushi", "Menyamar sebagai gadis bisu", "Ia berkomunikasi lewat ketikan, dan instingnya membawa pulang mayat bayi yang menyelamatkan mereka."],
        ["Pemain · Obsidian", false, "Ruan Nanzhu", "Pendamping sang “gadis”", "Ialah yang menyimpulkan sang direktur bersembunyi di antara para pendatang."],
        ["Klien", false, "Feng Yongle", "Pemuda bertopi hitam", "Pintunya. Ia canggung karena dua “perempuan” selalu menanggung risiko untuknya."],
        ["Pemain", true, "Jiang Yingrui", "Terlalu ramah", "Tubuhnya sempat menjadi tempat persembunyian sang direktur."],
        ["Pemain", false, "Hu Die", "“Kupu-kupu”", "Tubuh berikutnya yang ditempati sang direktur. Ia mencuri bayi itu dan mengaku hanya ingin memeriksanya."],
        ["Arwah", false, "Sang perawat", "Kamar 502", "Ia terus menghidupkan ulang lompatannya, dan akhirnya mendapatkan yang ia cari."],
        ["Arwah", true, "Sang direktur", "Ayah dari bayi itu", "Ia ingin semua orang cepat mati, agar tubuh pinjamannya menjadi satu-satunya penyintas."]
      ]
    },
    kebenaran: {
      h2: "Bingkai terakhir",
      gate: "direktur, perawat, dan kunci",
      before: [
        "Mayat bayi di laci adalah bayi sang perawat yang digugurkan, dan sang direktur adalah ayahnya. Setelah perawat itu mati, sang direktur bertahan hidup dengan menumpang di tubuh para pendatang, mula-mula Jiang Yingrui, lalu Hu Die. Selama ia berada di tubuh orang luar, perawat itu harus menunggu.",
        "Begitu ia kehilangan tubuh pinjamannya, sang direktur menjadi mangsa empuk. Di ruang direktur ada deretan potret duka dengan satu bingkai kosong. Bingkai itu akhirnya terisi."
      ],
      pull: "Potret seorang dokter berwajah kaku, di samping perawat yang tersenyum puas.",
      after: [
        "Ruan Nanzhu menurunkan bingkai itu dan menemukan <strong>kunci</strong> tergantung di baliknya. Tapi bingkai itu tak bisa digantung kembali. Wajah-wajah di potret lain mulai bergerak, merentangkan tangan, lalu keluar dari bingkai. Tangga berubah menjadi lingkaran tanpa ujung."
      ]
    },
    keluar: {
      h2: "Yang mereka takuti",
      prose: [
        "Ruan Nanzhu menyerahkan kunci dan sebuah gelang giok merah, “benda yang bisa menyelamatkan nyawamu sekali”, kepada Lin Qiushi dan menyuruhnya lari sendiri. Lin Qiushi menolak: “Kalau pergi, kita pergi bersama.” Lalu, menuruti naluri, ia mengeluarkan <strong>mayat bayi</strong> yang sempat ia ambil dari laci.",
        "Sosok-sosok bermata dan bermulut hitam itu mundur ketakutan. Keduanya menerobos ke bawah, melewati lorong-lorong tempat pasien saling menyerang, dan bertemu Feng Yongle di <em>pintu terowongan</em>. Mayat bayi itu ikut terbawa keluar, dan kelak menangis untuk memperingatkan Lin Qiushi di pintu River God."
      ]
    }
  }
};
