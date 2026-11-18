const frame = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0c0d10" stroke="#a88a4a" stroke-width="6"/>`;
const frames = [[30, 30], [150, 20], [270, 40], [40, 160], [160, 150], [280, 170]].map(([x, y], i) =>
  frame(x, y, 90, 110) + (i === 4 ? `<g class="k-in" style="--d:1.4s;--t:1.6s"><circle cx="${x + 45}" cy="${y + 45}" r="18" fill="#cdbfae"/><path d="M${x + 20} ${y + 110} Q${x + 45} ${y + 60} ${x + 70} ${y + 110} Z" fill="#3a2a2a"/></g>` : "")).join("");
const seats = Array.from({ length: 10 }, (_, i) => {
  const x = 70 + i * 30;
  return i === 6
    ? `<circle class="k-pulse" cx="${x}" cy="96" r="11" fill="none" stroke="#f4efe6" stroke-dasharray="3 3"/>`
    : `<circle class="k-in" style="--d:${0.1 + i * 0.1}s" cx="${x}" cy="96" r="11" fill="#cdbfae"/>`;
}).join("");

export default {
  title: "Arc Woman of the Rain",
  description: "Arc Woman of the Rain: pintu keempat Lin Qiushi dalam Kaleidoscope of Death. Kastil tua, lukisan terkutuk, dan bingkai yang menelan orang satu per satu.",
  tint: "#0b0d12",
  fonts: "family=Bodoni+Moda:ital,wght@0,500;1,500",
  css: "arc-rainwoman.css",
  bodyClass: "arc--rainwoman",
  drone: 53,
  cineTag: "Perempuan Hujan",
  chapters: "Bab 40–45",
  h1: "Woman of the Rain",
  sub: "Perempuan Hujan · sebuah lukisan terkutuk",
  lead: "Di taman kastil yang basah oleh hujan, seorang perempuan bergaun hitam dan bertopi lebar berdiri membelakangi jendela. Setiap malam ia berdiri lebih dekat.",
  source: "bab 40 “The Fourth Door” sampai bab 45 “Returning to Reality”",
  defs: `      <symbol id="wr-castle" viewBox="0 0 1600 900">
        <rect width="1600" height="900" fill="#111724"/>
        <g fill="#05070b"><rect x="520" y="300" width="560" height="600"/><rect x="460" y="200" width="120" height="700"/><rect x="1020" y="220" width="120" height="680"/><path d="M450 200 L520 120 L590 200 Z"/><path d="M1010 220 L1080 140 L1150 220 Z"/></g>
        <g fill="#e8c88a" fill-opacity="0.45"><rect x="600" y="380" width="40" height="60"/><rect x="960" y="460" width="40" height="60"/><rect x="760" y="340" width="40" height="60" fill="#b23a48" fill-opacity="0.6"/></g>
        <path d="M0 820 H1600 V900 H0 Z" fill="#05070a"/>
        <g fill="#000"><circle cx="300" cy="760" r="14"/><path d="M270 770 Q300 700 330 770 L340 840 H260 Z"/><ellipse cx="300" cy="752" rx="40" ry="8"/></g>
      </symbol>`,
  scenes: `      <div class="scene scene--castle" data-scene="castle" data-dur="3800">
        <svg class="k-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#wr-castle"/></svg>
        <canvas class="fx-canvas" aria-hidden="true"></canvas>
        <p class="scene__caption"><span data-type>Sebuah kastil tua. Hujan tak pernah benar-benar berhenti.</span><small>Pintu keempat Lin Qiushi</small></p>
      </div>

      <div class="scene" data-scene="painting" data-dur="3800" data-sfx="thud@700,thud@1400,thud@2100">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 300">
            <rect x="60" y="20" width="280" height="260" fill="#1a2232" stroke="#a88a4a" stroke-width="12"/>
            <g class="k-grow" style="--from:0.35;--to:1.15;--s:3;--t:2.4s;transform-origin:200px 250px;transform-box:view-box">
              <ellipse cx="200" cy="120" rx="46" ry="10" fill="#000"/><circle cx="200" cy="132" r="18" fill="#000"/><path d="M170 150 Q200 120 230 150 L246 260 H154 Z" fill="#000"/>
            </g>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Setiap malam, perempuan di lukisan itu berdiri lebih dekat.</span></p>
      </div>

      <div class="scene" data-scene="frames" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true"><svg viewBox="0 0 400 300">${frames}</svg></div></div>
        <p class="scene__caption"><span data-type>Bingkai kosong tersembunyi di seluruh kastil. Satu per satu terisi wajah.</span></p>
      </div>

      <div class="scene" data-scene="banquet" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 200">
            <rect x="20" y="20" width="360" height="160" fill="#1a1414" stroke="#a88a4a" stroke-width="10"/>
            <rect x="50" y="110" width="300" height="20" fill="#5a2a22"/>
            ${seats}
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Sepuluh kursi di lukisan perjamuan. Satu wajah selalu kosong.</span></p>
      </div>

      <div class="scene scene--fire" data-scene="burn" data-dur="3400" data-flash="2200" data-sfx="crack@400,sting@2200">
        <canvas class="fx-canvas" aria-hidden="true"></canvas>
        <p class="k-verdict">Bakar lukisannya.<small>Sebuah kunci jatuh dari abunya</small></p>
      </div>`,
  heroArt: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><use href="#wr-castle"/></svg>`,
  script: `    window.arcHooks = { castle: SpiFx.rain, burn: SpiFx.embers };`,
  sections: {
    ringkasan: {
      h2: "Kastil sang nyonya pelukis",
      prose: [
        "Pintu keempat Lin Qiushi adalah pintu ketiga <strong>Tan Zaozao</strong>, aktris terkenal yang dijuluki “ratu dingin” layar kaca. Di dalam pintu ia tampil biasa saja dan tidur tengkurap dengan pantat terangkat. Ruan Nanzhu memberi Lin Qiushi sebuah gelang perak agar mereka bisa masuk ke pintu yang sama.",
        "Mereka tinggal di sebuah kastil yang selalu diguyur hujan, milik seorang <strong>nyonya pelukis</strong> yang dilayani seorang pengurus rumah. Lukisan tergantung di setiap sudut. Malam pertama, Lin Qiushi melihat sosok bergaun hitam bertopi lebar berdiri di taman, membelakangi jendela."
      ],
      facts: [
        ["Latar", "Kastil berlantai tujuh di tengah hujan"],
        ["Pemilik pintu", "Tan Zaozao (pintu ketiganya)"],
        ["Jumlah pemain", "10 orang"],
        ["Entitas", "Perempuan Hujan, nyonya pelukis"],
        ["Ancaman tersembunyi", "Seorang “pemula” palsu"],
        ["Kunci", "Di balik lukisan perjamuan"]
      ],
      hint: { text: "“The Woman of the Rain”", note: "Nama sebuah lukisan terkenal. Ruan Nanzhu meneliti latarnya sebelum masuk dan menceritakannya kepada Lin Qiushi." }
    },
    legenda: {
      h2: "Lukisan yang dikembalikan tiga kali",
      prose: [
        "<em>The Woman of the Rain</em> adalah lukisan bernuansa gelap: seorang perempuan misterius di tengah hujan, berwarna dingin dan suram. Menurut kisah yang beredar, lukisan itu dibeli tiga orang berbeda dan ketiganya mengembalikannya.",
        "Para pembeli mengaku merasa diawasi, dan setiap malam perempuan di lukisan itu tampak makin dekat, sampai mereka tak tahan lagi."
      ],
      versus: [
        ["Kisah lukisan", "Sebuah karya seni yang terasa “hidup”: perempuan di dalamnya mendekat malam demi malam kepada siapa pun yang memilikinya."],
        ["Versi di dalam pintu", "Perempuan itu berdiri di taman kastil, di bawah hujan. Ia tak bisa menyerang langsung, tetapi bingkai-bingkai tersembunyi menarik orang masuk ke dunia lukisan. Yang hilang kembali sebagai potret."]
      ]
    },
    aturan: {
      h2: "Jangan sampai terbingkai",
      items: [
        ["i", "Bingkai yang tersembunyi", "Bingkai pipih disembunyikan di bawah karpet, di bawah cermin kamar mandi, di sisi ranjang. Siapa yang “terbingkai” ditarik ke dunia lukisan. Ruan Nanzhu menghancurkan setiap bingkai yang ia temukan."],
        ["ii", "Potret orang hilang", "Setiap pagi seseorang hilang, dan potretnya muncul di antara lukisan. Pengurus rumah lalu membawa potret itu ke ruang lukisan belum selesai di lantai enam."],
        ["iii", "Studio di lantai tujuh", "Sang nyonya hanya melukis pada malam hari, di studio berlapis kain hitam di lantai tujuh. Xiao Su menghilang setelah mendatangi lantai itu, meski menurut rekannya mereka tidak masuk ke studio."],
        ["iv", "Musuh di dalam rombongan", "Tidak semua yang hilang adalah korban hantu. Seseorang memakai bingkai baru setiap kali untuk menyingkirkan rekannya sendiri."]
      ]
    },
    kronologi: {
      h2: "Malam-malam di kastil",
      items: [
        ["Malam pertama", "Sosok di taman", "Lin Qiushi melihat bayangan hitam bertopi lebar di taman. Ia tak berani mematikan lampu sepanjang malam."],
        ["Hari kedua", "Lantai demi lantai", "Kastil terlalu luas untuk dijelajahi dalam sehari. Ruan Nanzhu tidak suka kehujanan. Malamnya sosok itu berdiri lagi di luar jendela, kali ini lebih dekat."],
        ["Lantai tujuh", "Studio sang nyonya", "Xiao Su hilang. Ruan Nanzhu mengetuk pintu studio tiga kali, lalu membongkar kuncinya. Tan Zaozao berbisik, “Seberapa besar nyalinya?”", true],
        ["Malam berikutnya", "Ruan Nanzhu menghilang", "Ruan Nanzhu terbangun, menemukan bingkai di sisi ranjang, dan sempat masuk ke dunia lukisan sebelum kembali. Ia menyimpulkan pembunuhnya memakai bingkai baru setiap kali."],
        ["Malam itu juga", "Yang Meishu", "Di kamarnya, Yang Meishu tersenyum. Rencananya berjalan: “Si cantik itu cari mati sendiri.” Dua kematian sudah terkonfirmasi. Ia tak tahu Ruan Nanzhu sudah membaca semuanya."],
        ["Pagi terakhir", "Ruang lukisan belum selesai", "Mereka membuntuti pengurus rumah ke lantai enam. Kanvas yang dulu kosong kini terisi Perempuan Hujan yang berdiri di setiap sudut kastil, bahkan di dalam potret Xiao Su.", true]
      ]
    },
    tokoh: {
      h2: "Penghuni kastil",
      items: [
        ["Pemain · Obsidian", false, "Lin Qiushi", "Pintu keempatnya", "Ialah yang mengusulkan membakar lukisan perjamuan. “Bukankah kau ada di sini bersamaku?”"],
        ["Pemain · Obsidian", false, "Ruan Nanzhu", "Benci hujan", "Ia merokok di balkon sambil membalas tatapan Perempuan Hujan sampai sosok itu menghilang."],
        ["Pemain · Obsidian", false, "Tan Zaozao", "Pemilik pintu", "Aktris terkenal yang tidur di lantai sepanjang malam karena ranjangnya “diambil”. Penakut, tetapi tetap ikut ke mana pun mereka pergi."],
        ["Pemain", true, "Yang Meishu", "“Pemula”", "Ia membunuh rekan-rekannya demi petunjuk khusus yang hanya didapat penyintas terakhir."],
        ["Korban", true, "Xiao Su", "Potret pertama", "Ia menghilang setelah naik ke lantai tujuh. Potretnya kemudian muncul, dengan Perempuan Hujan di latar belakangnya."],
        ["NPC", false, "Sang nyonya", "Pelukis kastil", "Ia melukis setiap malam. Mimpinya adalah menyelesaikan satu lukisan perjamuan."],
        ["NPC", false, "Pengurus rumah", "Pembawa potret", "Ia menegakkan aturan kastil dan diam-diam memindahkan potret korban ke lantai enam."]
      ]
    },
    kebenaran: {
      h2: "Mimpi yang tak akan pernah selesai",
      gate: "petunjuk kedua dan kunci",
      before: [
        "Pintu ini ternyata punya dua petunjuk. Yang kedua adalah secarik kertas milik Yang Meishu, “pemula” yang sebenarnya sudah berpengalaman. Isinya sebuah puisi pendek tentang orang yang memandang pemandangan sementara dirinya sendiri dipandang orang lain, tentang bulan yang menghias jendela, dan tentang menghiasi mimpi orang lain.",
        "Lin Qiushi membacanya begini: mereka di dalam kastil memandangi lukisan, seseorang memandang mereka dari tempat lain, bingkai membingkai jendela mereka, dan mereka <em>menghiasi mimpi orang lain</em>. Mimpi itu adalah lukisan perjamuan di lantai atas: sepuluh orang di satu meja, sama dengan jumlah mereka."
      ],
      pull: "“Dia tidak akan pernah menyelesaikan lukisan itu.”",
      after: [
        "Menurut hukum dunia pintu, rombongan tak pernah musnah seluruhnya. Selalu ada satu yang selamat. Karena itu satu wajah di kanvas akan selamanya kosong, dan menunggu sang nyonya selesai sama saja menunggu mati. Pagi itu Ruan Nanzhu menyalakan pemantik di studio lantai tujuh, saat sang nyonya tidak melukis."
      ]
    },
    keluar: {
      h2: "Pintu di dalam lukisan",
      prose: [
        "Di ruang lukisan belum selesai, setelah setengah jam mengaduk-aduk tumpukan kanvas, Lin Qiushi menemukan sebuah lukisan sudut kastil dengan <strong>pintu besi hitam</strong> tersembunyi di bayangannya. Di tangga kanan lantai dua, mereka mengangkat sebuah lukisan pemandangan dan menemukan tombol. Dinding pun terbelah dan pintu itu muncul.",
        "Lalu mereka membakar lukisan perjamuan. Lin Qiushi mendengar jeritan samar dari dalam kanvas yang terbakar, dan sebuah <em>kunci perunggu</em> jatuh berdenting. Sang nyonya meraung dari bawah. Wajahnya terbelah, rahangnya menggantung, dan ia mengayunkan bingkai raksasa. Mereka berlari lewat pintu samping menuju lantai dua dan keluar."
      ]
    }
  }
};
