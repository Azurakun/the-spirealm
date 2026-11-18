const lantern = (x, y, d) => `<g class="lantern" style="animation-delay:${d}s"><line x1="${x}" y1="${y - 40}" x2="${x}" y2="${y}" stroke="#3a2418" stroke-width="3"/><ellipse cx="${x}" cy="${y + 34}" rx="26" ry="34" fill="#c4231c"/><ellipse cx="${x}" cy="${y + 34}" rx="14" ry="30" fill="#ff8a5a" fill-opacity="0.45"/><rect x="${x - 10}" y="${y - 2}" width="20" height="6" fill="#e3b04b"/><rect x="${x - 10}" y="${y + 64}" width="20" height="6" fill="#e3b04b"/></g>`;
const lanterns = [[260, 140], [520, 180], [800, 130], [1080, 180], [1340, 140]].map(([x, y], i) => lantern(x, y, -i * 0.4)).join("");
const hands = Array.from({ length: 7 }, (_, i) => { const x = 50 + i * 50; return `<g class="k-in" style="--d:${0.3 + i * 0.25}s;--t:1.2s" fill="#cfd6d2"><rect x="${x - 5}" y="170" width="10" height="28" rx="4"/><ellipse cx="${x}" cy="162" rx="11" ry="13"/><rect x="${x - 11}" y="136" width="5" height="20" rx="2.5"/><rect x="${x - 5}" y="130" width="5" height="24" rx="2.5"/><rect x="${x + 1}" y="132" width="5" height="22" rx="2.5"/><rect x="${x + 7}" y="138" width="5" height="18" rx="2.5"/></g>`; }).join("");

export default {
  title: "Arc River God",
  description: "Arc River God: pintu kesembilan Lin Qiushi dalam Kaleidoscope of Death. Kota berlentera merah, sesaji untuk Dewa Sungai, dan lampu minyak dari lemak manusia.",
  tint: "#0f0907",
  fonts: "family=Noto+Serif+TC:wght@700;900",
  css: "arc-river.css",
  bodyClass: "arc--river",
  drone: 43,
  cineTag: "Dewa Sungai · 河神",
  chapters: "Bab 80–87",
  h1: "River God",
  sub: "Dewa Sungai · 河神",
  lead: "Di kota tua berlentera merah ini, setiap kamar diterangi lampu minyak kecil. Cahayanya hangat dan nyaman, sampai kau tahu minyak apa yang dibakar di dalamnya.",
  source: "bab 80 “Ninth Door” sampai bab 87 “Exit the Town”",
  defs: `      <symbol id="rg-street" viewBox="0 0 1600 900">
        <rect width="1600" height="900" fill="#120806"/>
        <g fill="#050302"><path d="M0 380 L200 300 L400 380 V900 H0 Z"/><path d="M380 360 L640 270 L900 360 V900 H380 Z"/><path d="M880 380 L1120 290 L1360 380 V900 H880 Z"/><path d="M1340 360 L1600 280 V900 H1340 Z"/></g>
        <path d="M0 760 Q400 730 800 760 T1600 750 V900 H0 Z" fill="#1d0e0a"/>
      </symbol>`,
  scenes: `      <div class="scene scene--lantern" data-scene="street" data-dur="3800">
        <svg class="k-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#rg-street"/>${lanterns}</svg>
        <p class="scene__caption"><span data-type>Kota tua berlentera merah. Tak ada yang tersenyum di sini.</span><small>Pintu kesembilan Lin Qiushi</small></p>
      </div>

      <div class="scene" data-scene="river" data-dur="3800" data-sfx="thud@300,thud@1000,wave@1600">
        <div class="scene__art"><div class="k-art k-art--wide" aria-hidden="true">
          <svg viewBox="0 0 800 300">
            <rect x="0" y="180" width="800" height="120" fill="#2a1a10"/>
            <path class="wave-line" d="M0 200 Q50 190 100 200 T200 200 T300 200 T400 200 T500 200 T600 200 T700 200 T800 200 T900 200" stroke="#6b4a2e" stroke-width="3" fill="none"/>
            ${Array.from({ length: 8 }, (_, i) => `<g class="k-in" style="--d:${i * 0.15}s"><circle cx="${80 + i * 70}" cy="120" r="12" fill="#e9c9a0"/><path d="M${68 + i * 70} 176 L${72 + i * 70} 134 H${88 + i * 70} L${92 + i * 70} 176 Z" fill="#c4231c"/></g>`).join("")}
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Arak-arakan berbaju merah menuju sungai. Wajah mereka penuh ketakutan.</span><small>Sesaji untuk Dewa Sungai</small></p>
      </div>

      <div class="scene" data-scene="lamp" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 300">
            <path d="M130 210 Q200 250 270 210 L250 190 H150 Z" fill="#8a5a2a"/>
            <rect x="196" y="160" width="8" height="34" fill="#3a2418"/>
            <g class="k-flicker"><ellipse cx="200" cy="140" rx="18" ry="34" fill="#ffb347"/><ellipse cx="200" cy="148" rx="8" ry="18" fill="#fff3c8"/></g>
            <circle cx="200" cy="140" r="90" fill="#ffb347" fill-opacity="0.08"/>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Lampu minyak yang hangat dan terang. Minyaknya diperas dari manusia.</span></p>
      </div>

      <div class="scene" data-scene="hands" data-dur="3800" data-sfx="wave@200">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 240"><rect x="0" y="190" width="400" height="50" fill="#14100c"/>${hands}<path class="wave-line" d="M0 196 Q25 188 50 196 T100 196 T150 196 T200 196 T250 196 T300 196 T350 196 T400 196 T450 196" stroke="#6b4a2e" stroke-width="3" fill="none"/></svg>
        </div></div>
        <p class="scene__caption"><span data-type>Anak-anak yang dilempar ke sungai tidak pernah benar-benar pergi.</span></p>
      </div>

      <div class="scene scene--glow" data-scene="verdict" data-dur="3400" data-flash="300" data-sfx="sting@300">
        <p class="k-verdict">“Sekali kuucap, dua kali kuulang, bayiku menangis sekuat tenaga…”<small>Mantra penenang tangis malam · petunjuk pintu</small></p>
      </div>`,
  heroArt: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><use href="#rg-street"/>${lanterns}</svg>`,
  sections: {
    ringkasan: {
      h2: "Pintu pertama tanpa Ruan Nanzhu",
      prose: [
        "Untuk pertama kalinya Lin Qiushi masuk pintu tanpa Ruan Nanzhu. Kliennya mengaku “gadis SMA” berbaju crop top biru dan berjepit rambut wortel. Ternyata ia <strong>Gu Longming</strong>, pemuda supel yang paham fengshui. Ini pintu keempatnya.",
        "Mereka tiba di kota tua yang setiap rumahnya digantungi lentera merah, dan menginap di sebuah rumah besar milik <strong>Nyonya Yu</strong>. Pohon pagoda berbaris di halaman dengan genta terikat benang merah. Aliran sungai kecil di dalam halaman dipotong tembok bata. “Air jahat,” gumam Gu Longming."
      ],
      facts: [
        ["Latar", "Kota tua berlentera merah di tepi sungai"],
        ["Klien", "Gu Longming (pintu keempatnya)"],
        ["Entitas", "Nyonya Yu, hantu-hantu sungai"],
        ["Pelindung", "Lampu minyak manusia, mantra tangis malam"],
        ["Pemain berbahaya", "Yan Shihe dan Xiao Qian"],
        ["Kunci", "Di dalam tubuh Nyonya Yu"]
      ],
      hint: { text: "“Sekali kuucap, dua kali kuulang, bayiku menangis sekuat tenaga; siapa pun yang membaca mantra ini…”", note: "Bentuk mantra rakyat untuk menenangkan bayi yang menangis di malam hari. Gu Longming belum pernah mendengarnya. Saat petunjuk dibacakan, mayat bayi dari Waverly Hills di dalam tas Lin Qiushi mulai menangis pelan." }
    },
    legenda: {
      h2: "Bocah yang dipersembahkan",
      prose: [
        "Di masa lalu, hujan di kota ini turun tak henti. Penduduk memutuskan mempersembahkan seorang anak kepada <strong>Dewa Sungai</strong>, dan yang terpilih adalah putra Nyonya Yu, Yu Caizhe. Ibunya mengutuk mereka, tetapi anak itu tetap dilempar ke arus sungai. Hujan pun berhenti, dan hari itu dijadikan Hari Ulang Tahun Dewa Sungai.",
        "Lalu penduduk mulai mati satu per satu, dimakan tanpa suara sampai tulangnya pun habis. Nyonya Yu mengaku putranya datang dalam mimpi membawa jawaban: <em>hanya lampu minyak dari manusia yang bisa menghalau hantu sungai</em>."
      ],
      versus: [
        ["Tradisi sesaji", "Arak-arakan berbaju merah membawa babi hidup ke sungai, diiringi gembreng dan tambur, sambil berdoa agar air tenang."],
        ["Versi di dalam pintu", "Orang-orang yang dulu mengusulkan persembahan itu menjadi minyak lampu pertama. Sejak itu, para pendatang yang menginap menjadi tumbal Festival Dewa Sungai setiap tahun."]
      ]
    },
    aturan: {
      h2: "Aturan malam di kota lentera",
      items: [
        ["壹", "Mantra penenang tangis", "Saat hantu bayi menangis di jendela, membaca mantra dari petunjuk akan mengusirnya. Lin Qiushi melihat penduduk mengucapkannya di upacara sesaji, lalu mencobanya sendiri."],
        ["贰", "Lampu yang menyala sendiri", "Lampu minyak di kamar kadang menyala sendiri. Cahayanya memanggil sesuatu ke jendela. Lin Qiushi berusaha memadamkannya setiap kali menyala."],
        ["叁", "Lubang di kertas jendela", "Kertas jendela kamar yang semula ia tempati penuh lubang kecil. Malam itu ia melihat apa yang mengintip lewat lubang-lubang itu."],
        ["肆", "Batas korban per malam", "Nyonya Yu tidak bisa membunuh sebanyak yang ia mau dalam satu malam. Karena itulah tidak semua orang mati sekaligus."]
      ]
    },
    kronologi: {
      h2: "Festival Dewa Sungai",
      items: [
        ["Hari pertama", "Kata sandi “gadis SMA”", "Lin Qiushi bertemu kliennya dengan kode rahasia, dan mendapati “gadis” itu pemuda yang langsung duduk santai di atas batu."],
        ["Upacara sesaji", "Babi untuk sungai", "Penduduk berbaju merah mengarak babi hidup ke sungai berwarna tanah liat yang bergemuruh. Mereka tampak meriah, tetapi mata mereka penuh rasa takut."],
        ["Malam pertama", "Tangisan di kamar seberang", "Mayat bayi menangis di kamar seberang. Lin Qiushi berjaga sampai lewat tengah malam dan memahami untuk apa lubang-lubang di jendela itu.", true],
        ["Rumah Nyonya Yu", "Wajan berisi daging", "Lin Qiushi dan Gu Longming mengintip Nyonya Yu menggoreng daging hangus sampai keluar minyak bening, lalu menuangkannya ke lampu kecil, sama persis dengan lampu di kamar mereka. Ia menimang seorang bayi yang pucat dan bengkak oleh air."],
        ["Malam kedua", "Bayi di jendela", "Seorang anak berkulit pucat bengkak dan bermata garis mencoba menyelinap lewat jendela. Lin Qiushi membacakan mantra dari petunjuk, dan makhluk itu mundur.", true],
        ["Siang", "Mencuri lampu", "Rombongan Yan Shihe menyelinap mencuri lampu dari kuil leluhur. Lin Qiushi dan Gu Longming mengambil lampu dari rumah Nyonya Yu. Pisaunya menebas tas Lin Qiushi dan hanya mengenai lampu-lampu di dalamnya. Mereka mendapat tujuh lampu."],
        ["Buku silsilah", "Foto-foto yang berubah", "Di bawah cahaya lampu, foto-foto di buku silsilah keluarga yang mereka ambil dari Yan Shihe berubah. Anak-anak menghilang dari beberapa foto. Hanya foto Nyonya Yu bersama Yu Caizhe yang memperlihatkan senyum tulusnya."]
      ]
    },
    tokoh: {
      h2: "Penghuni kota lentera",
      items: [
        ["Pemain · Obsidian", false, "Lin Qiushi", "Pintu kesembilannya", "Pertama kali tanpa Ruan Nanzhu. Ia berjaga sepanjang malam supaya kliennya bisa tidur."],
        ["Klien", false, "Gu Longming", "“Gadis SMA berjepit wortel”", "Cerewet, paham fengshui, dan setia. Lengannya terluka oleh pisau Nyonya Yu."],
        ["Pemain", false, "Yan Shihe", "Pemain lama bersenjata", "Ia merebut kunci dengan todongan pistol, lalu menembak kaki Lin Qiushi “untuk hiburan”."],
        ["Pemain", false, "Xiao Qian", "Gadis yang selalu bersembunyi", "Ia selalu berlindung di belakang Yan Shihe, sampai ia menikamnya dari belakang dan merebut petunjuk."],
        ["NPC", true, "Nyonya Yu", "Pemilik rumah besar", "Ibu yang kehilangan anaknya karena sesaji, lalu menjadi pembuat lampu minyak manusia."],
        ["Arwah", false, "Yu Caizhe", "Dewa Sungai pertama", "Bocah yang dilempar ke sungai. Satu-satunya senyum tulus ibunya ada di fotonya."],
        ["Arwah", false, "Hantu bayi sungai", "Anak-anak yang ditenggelamkan", "Kulit pucat bengkak, mata segaris, dan gigi berjejal. Mereka menangis di jendela pada malam hari."]
      ]
    },
    kebenaran: {
      h2: "Dewa Sungai yang baru",
      gate: "kisah Nyonya Yu",
      before: [
        "Setelah orang-orang yang mengusulkan persembahan menjadi minyak lampu dan kematian berhenti, Nyonya Yu mengucapkan sesuatu yang membuat seluruh kota terdiam: “Kita butuh Dewa Sungai yang baru.” Jarinya yang berkuku merah menunjuk seorang anak polos di gendongan ibunya.",
        "Sejak itu, anak-anak terus dilempar ke sungai, dan setiap tahun para pendatang yang menginap di rumahnya dijadikan tumbal festival. Lampu-lampu yang melindungi penduduk dari hantu sungai menyala dengan minyak dari tubuh mereka."
      ],
      pull: "Bayi-bayi yang bengkak oleh air itu berjatuhan dari langit-langit kuil, dan mulai mengunyah.",
      after: [
        "Di kuil leluhur, Nyonya Yu mengamuk dengan pisau dan menebas sederet papan nama arwah. Tangisan bayi terdengar dari langit-langit. Hantu-hantu bayi berjatuhan ke tubuhnya dan memakannya, daging dulu lalu tulang. Saat tulang terakhir habis, sebuah <strong>kunci tembaga hijau</strong> berdenting di genangan darah. Wajah-wajah bengkak itu kembali menjadi wajah bayi, tangisan berubah menjadi tawa kecil, lalu mereka memudar menjadi cahaya."
      ]
    },
    keluar: {
      h2: "Pintu di dalam lemari",
      prose: [
        "Di halaman, dua orang tergeletak terbelah di pinggang. Pintu besi ternyata tersembunyi di <strong>lemari kamar tidur Nyonya Yu yang lain</strong>. Saat Lin Qiushi hendak membukanya, Yan Shihe muncul membawa pistol, merampas kunci, dan menembak kaki Lin Qiushi.",
        "Lalu Xiao Qian, yang selama ini gemetar di belakang Yan Shihe, menikam punggungnya, memungut petunjuk yang jatuh, dan pergi lebih dulu sambil berterima kasih. Gu Longming memungut pistol itu dan memapah Lin Qiushi masuk. <em>Pistol itu ternyata benda dari dalam pintu</em>, dan kelak dipakai Lin Qiushi untuk menembak Hakobito."
      ]
    }
  }
};
