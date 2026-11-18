const keys = Array.from({ length: 15 }, (_, i) => {
  const x = 40 + (i % 5) * 70, y = 40 + Math.floor(i / 5) * 70, hot = i === 8;
  return `<g class="k-in${hot ? " k-pulse" : ""}" style="--d:${i * 0.07}s"><line x1="${x + 14}" y1="${y - 14}" x2="${x + 14}" y2="${y}" stroke="#5a5a5a" stroke-width="2"/><circle cx="${x + 14}" cy="${y + 8}" r="8" fill="none" stroke="${hot ? "#7aa58f" : "#8a6a3a"}" stroke-width="4"/><rect x="${x + 12}" y="${y + 15}" width="4" height="26" fill="${hot ? "#7aa58f" : "#8a6a3a"}"/></g>`;
}).join("");

export default {
  title: "Arc Mirror Hotel",
  description: "Arc Mirror Hotel: pintu kedelapan Lin Qiushi dalam Kaleidoscope of Death. Gedung berlapis cermin, kebakaran yang hanya terlihat di pantulan, dan kunci di kamar yang terbakar.",
  tint: "#0c0a0a",
  fonts: "family=Michroma",
  css: "arc-mirror.css",
  bodyClass: "arc--mirror",
  drone: 55,
  cineTag: "Hotel Cermin",
  chapters: "Bab 71–77",
  h1: "Mirror Hotel",
  sub: "Hotel Cermin · pintu kesembilan Cheng Yixie",
  lead: "Gedung tiga puluh empat lantai ini dilapisi cermin di dalam dan luar. Di dunia nyata lorongnya gelap dan sepi. Di dalam cermin, ujung lorong itu sedang terbakar.",
  source: "bab 71 “The Eighth Door” sampai bab 77 “What Happened Inside the Door”",
  defs: `      <symbol id="mh-tower" viewBox="0 0 1600 900">
        <rect width="1600" height="900" fill="#14100e"/>
        <rect x="620" y="40" width="360" height="860" fill="#1c1d21"/>
        <g fill="#8a939c" fill-opacity="0.25">${Array.from({ length: 17 }, (_, r) => `<rect x="630" y="${54 + r * 50}" width="340" height="40"/>`).join("")}</g>
        <path d="M620 40 L980 40 L980 900 L620 900 Z" fill="url(#mh-sheen)"/>
        <rect x="630" y="604" width="340" height="40" fill="#ff8a3d" fill-opacity="0.35"/>
      </symbol>
      <linearGradient id="mh-sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#ffd2a8" stop-opacity="0.18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`,
  scenes: `      <div class="scene scene--glass" data-scene="tower" data-dur="3800">
        <svg class="k-full k-zoom" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#mh-tower"/></svg>
        <p class="scene__caption"><span data-type>Gedung tiga puluh empat lantai, berlapis cermin.</span><small>Pintu kedelapan Lin Qiushi</small></p>
      </div>

      <div class="scene" data-scene="split" data-dur="3900">
        <div class="scene__art"><div class="split" aria-hidden="true"><div class="split__real"></div><div class="split__mirror"></div><canvas class="fx-canvas"></canvas></div></div>
        <p class="scene__caption"><span data-type>Lorong yang nyata gelap dan sunyi. Di dalam cermin, ujungnya terbakar.</span></p>
      </div>

      <div class="scene" data-scene="crack" data-dur="3800" data-sfx="crack@900">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 300">
            <rect x="80" y="20" width="240" height="260" fill="#1e2228" stroke="#8a939c" stroke-width="8"/>
            <path class="k-draw" style="--len:500;--d:0.8s;--t:0.8s" d="M200 140 L150 40 M200 140 L290 80 M200 140 L260 270 M200 140 L110 230 M200 140 L90 120 M200 140 L230 30" stroke="#e9ece8" stroke-width="2.5" fill="none"/>
            <circle class="k-pop" style="--d:1.8s" cx="200" cy="140" r="30" fill="#ff8a3d" fill-opacity="0.6"/>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Memecahkan cermin berarti mati. Terbakar dari dalam.</span></p>
      </div>

      <div class="scene" data-scene="keys" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true"><svg viewBox="0 0 400 260"><rect x="10" y="10" width="380" height="240" fill="#1a0d08"/>${keys}</svg></div></div>
        <p class="scene__caption"><span data-type>Di kamar yang terbakar, kunci tergantung di dinding. Bukan hanya satu.</span></p>
      </div>

      <div class="scene scene--glow" data-scene="verdict" data-dur="3400" data-flash="300" data-sfx="sting@300">
        <p class="k-verdict">“Dengan perunggu sebagai cermin, kau merapikan pakaianmu.”<small>Petunjuk pintu · Li Shimin</small></p>
      </div>`,
  heroArt: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><use href="#mh-tower"/></svg>`,
  script: `    window.arcHooks = { split: SpiFx.embers };`,
  sections: {
    ringkasan: {
      h2: "Gedung yang tak pernah selesai terbakar",
      prose: [
        "Lin Qiushi memutuskan ikut masuk ke <strong>pintu kesembilan Cheng Yixie</strong>, kakak kembar Cheng Qianli yang pendiam, bersama Ruan Nanzhu. “Pintu kesembilan jauh lebih sulit. Bahkan aku tak bisa menjamin kau keluar dengan selamat,” kata Ruan Nanzhu. “Pintu ini bisa jadi yang terakhir bagimu.”",
        "Mereka tinggal di gedung tiga puluh empat lantai yang dilapisi cermin di lorong, lantai, langit-langit, bahkan restoran. Dari tukang koran tua di sebelah gedung mereka mendengar ceritanya: dua tahun lalu satu lantai habis terbakar dan sebuah keluarga pendatang tewas. Karena dinding luarnya menghitam oleh asap, gedung itu ditutup dengan cermin."
      ],
      facts: [
        ["Latar", "Gedung 34 lantai berlapis cermin"],
        ["Pemilik pintu", "Cheng Yixie (pintu kesembilannya)"],
        ["Korban kebakaran", "Satu keluarga bertiga, jasad sang ayah tak ditemukan"],
        ["Entitas", "Ibu dan anak di dalam cermin"],
        ["Sekutu tak terduga", "Luo Qianshan dan Luo Qianshui"],
        ["Kunci", "Di dinding kamar yang terbakar"]
      ],
      hint: { text: "“Dengan perunggu sebagai cermin, kau bisa merapikan pakaian; dengan sejarah sebagai cermin, kau memahami pasang surut nasib; dengan manusia sebagai cermin, kau belajar dari kehilangan.”", note: "Ucapan Kaisar Li Shimin dari Dinasti Tang yang diajarkan di buku sekolah. Petunjuk pintu-pintu tingkat atas tak lagi memberi arah yang jelas." }
    },
    legenda: {
      toc: "Cermin di balik pintu",
      h2: "Tiga cermin Li Shimin",
      prose: [
        "Kutipan itu berasal dari ucapan Kaisar Taizong kepada menterinya: cermin perunggu menunjukkan rupa, sejarah menunjukkan jatuh-bangunnya negeri, dan manusia menunjukkan benar-salahnya diri sendiri.",
        "Di dalam pintu, setiap baris menjadi petunjuk. “Cermin perunggu” adalah cermin yang ada di mana-mana. “Sejarah” adalah kebakaran dua tahun lalu. “Manusia sebagai cermin” adalah makna yang belum terbaca, sampai seseorang benar-benar kehilangan."
      ],
      versus: [
        ["Petunjuk", "Cermin perunggu, sejarah, dan manusia: tiga cara untuk melihat diri sendiri dan belajar dari kesalahan."],
        ["Versi di dalam pintu", "Pantulan menunjukkan masa lalu yang masih terbakar. Ibu dan anak yang tewas berkeliaran di dalam cermin. Jasad sang ayah yang tak pernah ditemukan mungkin menjadi kunci terobosannya."]
      ]
    },
    aturan: {
      h2: "Aturan kaca",
      items: [
        ["Ⅰ", "Tutup cermin", "Di kamar mereka, sebuah cermin di lantai sudah ditutupi handuk. Di gedung ini, apa yang tampak di pantulan tidak sama dengan kenyataan."],
        ["Ⅱ", "Jangan pecahkan cermin", "Wenjing tewas terbakar dari dalam tubuhnya sendiri setelah memecahkan cermin. Teman sekamarnya menyalahkan Xia-jie: “Kalau bukan karena omonganmu, dia tak akan mati!”"],
        ["Ⅲ", "Bau hangus tengah malam", "Pukul dua belas malam Cheng Yixie mencium bau terbakar dan mengerok kertas dinding. Di baliknya, dinding itu hangus hitam. Di cermin langit-langit lorong, satu kamar sedang terbakar hebat."],
        ["Ⅳ", "Hanya pada malam hari", "Kuncinya ada di kamar yang terbakar, tetapi hanya bisa diambil saat malam. Siapa pun yang masuk bergantung sepenuhnya pada waktu, dan pada orang di dalam cermin yang menjaga pintunya."]
      ]
    },
    kronologi: {
      h2: "Api di balik pantulan",
      items: [
        ["Malam pertama", "Bau hangus", "Cheng Yixie membangunkan Lin Qiushi. Ketiganya keluar dengan handuk basah. Di cermin, ujung lorong dilalap api dan pintu besinya melengkung. Di lorong yang nyata, tak ada apa-apa."],
        ["Pagi kedua · restoran", "Terbakar dari dalam", "Seorang perempuan di kamar single tiba-tiba berasap. Api menyala dari dalam tubuhnya, dan dalam semenit ia menjadi mayat hangus di depan semua orang.", true],
        ["Siang", "Sejarah gedung", "Dari para pemilik toko dan tukang koran, Ruan Nanzhu yang berdandan perempuan mendapat ceritanya: satu lantai terbakar habis, satu keluarga tewas, dan ada tangisan setiap malam."],
        ["Pagi berikutnya", "Wenjing kembali", "Wenjing, yang terbakar semalam, muncul utuh di restoran. Teman sekamarnya, Xiao Mian, bertengkar dengan Xia-jie yang tampaknya memancing kematian itu."],
        ["Kesepakatan", "Kakak-beradik Luo", "Luo Qianshan menawarkan informasi letak kunci asal ia dan adiknya dibawa keluar. Ternyata Luo Qianshui sudah mati di pintu lain dan kini bisa masuk ke dalam cermin, tetapi hanya selama lima menit."],
        ["Malam penentuan", "Lima menit", "Lin Qiushi bersikeras masuk sendiri ke kamar yang terbakar, sementara Luo Qianshui menahan ibu dan anak di dalam cermin. Detik demi detik berlalu. Luo Qianshui keluar lima detik terlalu cepat, dan pintu kamar menutup."]
      ]
    },
    tokoh: {
      h2: "Penghuni gedung kaca",
      items: [
        ["Pemain · Obsidian", false, "Lin Qiushi", "Pintu kedelapannya", "Ia bersikeras menggantikan Ruan Nanzhu masuk ke kamar yang terbakar."],
        ["Pemain · Obsidian", false, "Ruan Nanzhu", "Menyamar sebagai “Zhu Meng”", "Tenang di depan api dan kejam terhadap siapa pun yang membahayakan Lin Qiushi."],
        ["Pemain · Obsidian", false, "Cheng Yixie", "Pemilik pintu", "Kembaran Cheng Qianli, pendiam dan tajam. Ia yang pertama mencium bau hangus."],
        ["Pemain", false, "Luo Qianshan", "Kakak yang licik", "Ia menawar informasi dengan keselamatan dirinya dan adiknya."],
        ["Bukan manusia", false, "Luo Qianshui", "Gadis di dalam cermin", "Sudah mati di pintu lain, tetapi masih bisa berjalan di antara pantulan."],
        ["Pemain", true, "Wenjing", "Pemecah cermin", "Tewas terbakar, lalu muncul lagi keesokan paginya."],
        ["Pemain", false, "Xia-jie", "Pembawa rombongan", "Ia menasihati semua orang agar patuh aturan, tetapi dicurigai mendorong orang lain menuju kematian."]
      ]
    },
    kebenaran: {
      h2: "Manusia sebagai cermin",
      gate: "kamar yang terbakar",
      before: [
        "Kunci itu memang tergantung di dinding kamar, tetapi bukan satu-satunya. Luo Qianshan yakin kalau Zhu Meng yang masuk, ia pasti bisa mengambil yang benar. Kamar itu menutup sebelum Lin Qiushi keluar, dan sesaat sebelum pintu tertutup, sebuah <strong>kunci tembaga hijau</strong> dilempar ke lorong. Kuncinya berhasil keluar, tetapi orangnya terkurung.",
        "Ruan Nanzhu menempelkan pisau makan ke leher Luo Qianshan. “Satu menit penuh. Kurang sedetik saja, kakakmu mati di sini.” Ia menyerahkan pisau itu kepada Cheng Yixie, lalu berlari ke kamar yang terbakar."
      ],
      pull: "“Kalian sepakat lima menit, dan kau keluar lebih cepat. Kalau dia mati, kalian semua kukubur bersamanya.”",
      after: [
        "Ruan Nanzhu menggendong Lin Qiushi yang pingsan menembus api. Langkah-langkah pendek itu terasa seperti jembatan melewati neraka. Ia berguling di lorong untuk memadamkan api di tubuhnya, lalu bangkit lagi dengan luka bakar yang mengubah rupanya. Ia lega Lin Qiushi tidak sadar, karena wajahnya sedang tidak cantik."
      ]
    },
    keluar: {
      h2: "Pintu darurat",
      prose: [
        "Luo Qianshan mengaku tidak tahu di mana pintunya. Mereka harus mencarinya lantai demi lantai, padahal Ruan Nanzhu mungkin tak bertahan selama itu. Dengan suara serak oleh asap, Ruan Nanzhu mengucapkan dua kata: <strong>“pintu darurat.”</strong> Seluruh lorong mulai terbakar.",
        "Mereka keluar. Ruan Nanzhu dirawat lama di rumah sakit, dan pengurus organisasi lain datang “menjenguk” untuk mengorek informasi. Di sana Lin Qiushi teringat bahwa Ruan Nanzhu sudah melewati pintu kesepuluhnya, dan mungkin sudah memegang petunjuk pintu kesebelas."
      ]
    }
  }
};
