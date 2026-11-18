const girl = (x, d) => `<g class="k-in" style="--d:${d}s"><path d="M${x - 36} 214 L${x - 20} 104 Q${x} 94 ${x + 20} 104 L${x + 36} 214 Z" fill="#7a0d14"/><circle cx="${x}" cy="72" r="24" fill="#e6dad0"/><path d="M${x - 26} 70 Q${x} 30 ${x + 26} 70 L${x + 28} 116 L${x + 18} 82 Q${x} 58 ${x - 18} 82 L${x - 28} 116 Z" fill="#050304"/><circle cx="${x - 8}" cy="76" r="2.6" fill="#050304"/><circle cx="${x + 8}" cy="76" r="2.6" fill="#050304"/></g>`;

export default {
  title: "Arc Fitcher's Bird",
  description: "Arc Fitcher's Bird: pintu kedua Lin Qiushi dalam Kaleidoscope of Death. Pesta ulang tahun anak kembar tiga di lantai empat belas, dan telur yang tak boleh ternoda darah.",
  tint: "#120a0d",
  fonts: "family=UnifrakturMaguntia",
  css: "arc-fitcher.css",
  bodyClass: "arc--fitcher",
  drone: 58,
  cineTag: "Burung Fitcher",
  chapters: "Bab 18–26",
  h1: "Fitcher's Bird",
  sub: "Burung Fitcher · dongeng Grimm",
  lead: "Seorang ibu yang ramah mengundang kalian ke pesta ulang tahun ketiga putri kembarnya, tujuh hari lagi. Selama menunggu, ia memasak untuk kalian setiap hari. Jangan tanya daging apa yang ia pakai.",
  source: "bab 18 “The Second Door” sampai bab 26 “Back to Reality”",
  defs: `      <symbol id="fb-tower" viewBox="0 0 1600 900">
        <rect width="1600" height="900" fill="#0b080b"/>
        <rect x="620" y="60" width="360" height="840" fill="#050405"/>
        <g fill="#1a141a">${Array.from({ length: 14 }, (_, r) => Array.from({ length: 4 }, (_, c) => `<rect x="${650 + c * 82}" y="${90 + r * 56}" width="40" height="30"/>`).join("")).join("")}</g>
        <rect x="732" y="90" width="40" height="30" fill="#e8c84a" fill-opacity="0.8"/>
      </symbol>`,
  scenes: `      <div class="scene scene--tower" data-scene="tower" data-dur="3800">
        <svg class="k-full k-zoom" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#fb-tower"/></svg>
        <p class="scene__caption"><span data-type>Gedung apartemen tua. Satu jendela menyala di lantai empat belas.</span><small>Pintu kedua Lin Qiushi</small></p>
      </div>

      <div class="scene" data-scene="triplets" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 220">${girl(110, 0.2)}${girl(200, 0.6)}${girl(290, 1)}</svg>
        </div></div>
        <p class="scene__caption"><span data-type>Tiga anak kembar yang sama persis. “Ingat baik-baik namaku, ya.”</span></p>
      </div>

      <div class="scene" data-scene="egg" data-dur="3800" data-sfx="thud@1300">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 260">
            <defs><clipPath id="fb-eggclip"><ellipse cx="200" cy="150" rx="70" ry="92"/></clipPath></defs>
            <g class="k-fall" style="--t:1.2s">
              <ellipse cx="200" cy="150" rx="70" ry="92" fill="#f2e6d0"/>
              <g clip-path="url(#fb-eggclip)"><path class="stain" d="M120 150 C150 120 170 170 200 140 C230 110 250 160 280 140 L290 260 L110 260 Z" fill="#8e0f14"/></g>
            </g>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Telur yang ternoda darah tak akan pernah bisa bersih lagi.</span></p>
      </div>

      <div class="scene" data-scene="cake" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 300">
            <rect x="90" y="190" width="220" height="60" fill="#efe6dc"/><rect x="110" y="140" width="180" height="52" fill="#f3ebe2"/><rect x="130" y="98" width="140" height="44" fill="#f7f1ea"/>
            <path d="M90 200 Q120 214 150 200 T210 200 T270 200 T310 200" stroke="#8e0f14" stroke-width="7" fill="none"/>
            <g class="k-out" style="--d:1.8s"><rect x="165" y="56" width="8" height="42" fill="#f4efe6"/><rect x="196" y="56" width="8" height="42" fill="#f4efe6"/><rect x="227" y="56" width="8" height="42" fill="#f4efe6"/>
              <g class="k-flicker"><ellipse cx="169" cy="50" rx="5" ry="9" fill="#ffb347"/><ellipse cx="200" cy="50" rx="5" ry="9" fill="#ffb347"/><ellipse cx="231" cy="50" rx="5" ry="9" fill="#ffb347"/></g></g>
            <g class="k-in" style="--d:2.2s" fill="#d9cbb5"><path d="M163 98 V60 Q160 50 169 52 Q178 50 175 60 V98 Z"/><path d="M194 98 V60 Q191 50 200 52 Q209 50 206 60 V98 Z"/><path d="M225 98 V60 Q222 50 231 52 Q240 50 237 60 V98 Z"/></g>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Kue ulang tahun tiga lapis. Merah di dalamnya.</span></p>
      </div>

      <div class="scene scene--black" data-scene="verdict" data-dur="3200" data-flash="300" data-sfx="sting@300">
        <p class="k-verdict">“Siapa aku?”<small>Pertanyaan yang tak boleh salah dijawab</small></p>
      </div>`,
  heroArt: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><use href="#fb-tower"/></svg>`,
  sections: {
    ringkasan: {
      h2: "Pesta ulang tahun di lantai empat belas",
      prose: [
        "Pintu kedua Lin Qiushi adalah pintu pertamanya bersama <strong>Ruan Nanzhu</strong>. Malam itu Ruan Nanzhu datang ke rumahnya dalam wujud perempuan yang sangat cantik dan memperkenalkan diri di dalam pintu sebagai “Zhu Meng”. Ia juga sedang menjalankan pekerjaan: melindungi seseorang yang membayarnya.",
        "Seorang ibu paruh baya menyambut rombongan di lantai empat belas sebuah gedung apartemen tua, bersama tiga putri kembarnya. Ia berterima kasih karena mereka bersedia menghadiri <strong>pesta ulang tahun anak-anaknya tujuh hari lagi</strong>, lalu menyerahkan empat kunci kamar."
      ],
      facts: [
        ["Latar", "Gedung apartemen tua, lantai 14"],
        ["Tugas", "Menghadiri pesta ulang tahun"],
        ["Batas waktu", "7 hari"],
        ["Tuan rumah", "Seorang ibu dan anak kembar tiga"],
        ["Tetangga", "Nenek tuli di lantai 1, pemuda di lantai 4"],
        ["Kunci", "Di dalam tubuh sang ibu"]
      ],
      hint: { text: "“Fitcher's Bird”", note: "Judul dongeng Grimm. Lin Qiushi sempat mencarinya di perpustakaan, dan hanya menemukan bahwa itu dongeng anak-anak yang sangat kejam." }
    },
    legenda: {
      toc: "Dongeng di balik pintu",
      h2: "Tiga saudari, satu telur, satu kamar terlarang",
      prose: [
        "Dalam dongeng Grimm, seorang penyihir menculik tiga saudari satu per satu. Kepada masing-masing ia memberi sebutir telur dan sebuah kunci, dan melarang mereka membuka satu kamar. Dua saudari pertama melanggar, menjatuhkan telurnya ke baskom darah, dan nodanya tak bisa dihapus. Penyihir tahu, lalu membunuh mereka.",
        "Saudari ketiga menyimpan telurnya di tempat aman, menghidupkan kembali kakak-kakaknya, lalu menyamar sebagai “burung Fitcher” yang dilumuri madu dan bulu untuk lolos."
      ],
      versus: [
        ["Dongeng Grimm", "Penyihir, tiga saudari, telur sebagai alat penguji kepatuhan, dan noda darah sebagai bukti pelanggaran."],
        ["Versi di dalam pintu", "Sang ibu adalah penyihirnya, dan para pemain adalah telurnya. “Kita semua telur sekarang,” kata Ruan Nanzhu. Siapa pun yang ternoda darah akan ditandai, lalu mati."]
      ]
    },
    aturan: {
      h2: "Jangan sampai ternoda",
      items: [
        ["Ⅰ", "Noda darah", "Tang Yaoyao terciprat darah saat sang ibu dicincang. Beberapa hari kemudian lengannya gatal dan memerah. Warna merah itu menjalar ke seluruh tubuhnya sampai ia kaku dan mati, utuh tapi merah dari ujung kepala sampai bola mata."],
        ["Ⅱ", "Ingat nama mereka", "Ketiga anak itu selalu bertanya, “Siapa namaku?” Mereka bernama Xiao Yi, Xiao Shi, dan Xiao Tu. Ruan Nanzhu diam-diam menaburkan serbuk berkilau ke salah satunya supaya bisa membedakan mereka. Menjawab salah bisa menjadi syarat kematian."],
        ["Ⅲ", "Masakan sang ibu", "Awalnya hanya sayuran. Lalu muncul sup bakso merah yang ia kunyah sampai terdengar bunyi tulang remuk, dan kaldu tulang yang mengepul. Tak ada yang tahu pasti dari mana dagingnya."],
        ["Ⅳ", "Membunuhnya tidak berguna", "Zhong Chengjian mencincang sang ibu dalam amarah. Keesokan paginya ibu itu kembali memasak seolah tak terjadi apa-apa, sementara Zhong Chengjian sudah tidak ada."]
      ]
    },
    kronologi: {
      h2: "Tujuh hari menuju pesta",
      items: [
        ["Hari pertama", "Bayi di pancuran", "Saat mandi di kamar mandi umum, Zeng Ruguo, pengusaha perhiasan yang berlumur darah sejak tiba, tidak melihat sesuatu yang menempel di kepala pancuran. Lin Qiushi melihatnya: mayat bayi yang cacat."],
        ["Hari kedua", "Nama-nama si kembar", "Si kembar memperkenalkan diri sebagai Xiao Yi, Xiao Shi, dan Xiao Tu. Rombongan menjelajahi lantai bawah: sebuah inti apel, bercak darah lama di depan pintu, dan nenek tuli di lantai satu."],
        ["Hari ketiga", "Xiao Yi mati", "Sang ibu menjerit menemukan putrinya terpotong-potong, lalu memunguti potongan tubuhnya dengan lembut: “Mama bawa kamu pulang, ya.” Ruan Nanzhu melihat sepatunya berlumur darah. Ibu itu sendiri pembunuhnya.", true],
        ["Malam itu", "Mata di lubang dinding", "Pukul tiga pagi Lin Qiushi terbangun oleh suara aneh dan mengintip lewat lubang kecil di dinding. Sebuah bola mata menatap balik tanpa berkedip, lalu menghilang."],
        ["Hari keempat dan kelima", "Dua korban lagi", "Zeng Ruguo tewas. Zhong Chengjian mencincang sang ibu sampai tak berbentuk, lalu menghilang. Ibu itu hidup lagi keesokan harinya.", true],
        ["Hari keenam", "Merah yang menjalar", "Xiao Shi ditemukan terpotong di kamar mandi. Pemuda di lantai empat tewas. Tang Yaoyao, yang gagal menyebut nama si kembar dan ternoda darah, berubah merah seluruh tubuhnya lalu mati.", true],
        ["Malam sebelum pesta", "Gudang di atap", "Di ruang peralatan atap, Lin Qiushi dan Ruan Nanzhu menemukan wadah-wadah berisi cairan putih, daging merah, dan stoples penuh bola mata manusia. Mereka bisa menebak dari siapa semua itu berasal."]
      ]
    },
    tokoh: {
      h2: "Tamu dan tuan rumah",
      items: [
        ["Pemain", false, "Lin Qiushi", "Nama di dalam pintu: Yu Linlin", "Dikenal sebagai “pacar” Zhu Meng. Ia tetap tenang ketika Ruan Nanzhu berlumur darah, dan malah menyeka darah dari wajahnya."],
        ["Pemain · Obsidian", false, "Ruan Nanzhu", "Menyamar sebagai “Zhu Meng”", "Mengaku baru di pintu keduanya, padahal ia pemimpin rombongan yang sebenarnya. Ia menandai si kembar dengan serbuk berkilau."],
        ["Pemain baru", false, "Xu Xiaocheng", "Gadis yang selalu menangis", "Pintu pertamanya. Ia selamat sampai akhir, sebagian karena memuntahkan semua makanan dari sang ibu."],
        ["Pemain", true, "Tang Yaoyao", "Bertampang biasa", "Ia gemar mencurigai orang lain dan kesal dikerjai si kembar. Darah di lengannya menjadi akhir hidupnya."],
        ["Pemain", true, "Zeng Ruguo", "Pengusaha perhiasan", "Sombong, berlumur darah sejak tiba, dan takut tidur sendirian."],
        ["NPC", false, "Sang ibu", "Ramah dan bersenandung", "Selalu sibuk di dapur, selalu tersenyum, dan selalu bangkit lagi setiap kali dibunuh."],
        ["NPC", false, "Si kembar tiga", "Xiao Yi, Xiao Shi, Xiao Tu", "Mereka berdiri bergandengan di ambang pintu dan menatap ibu mereka makan. Saat salah satunya mati, dua yang lain tak menunjukkan duka."]
      ]
    },
    kebenaran: {
      h2: "Kue yang tidak boleh dimakan",
      gate: "pesta ulang tahun",
      before: [
        "Pada hari pesta, langit gelap total. Ruangan dihias pita dan konfeti, dan lagu “Happy Birthday” dalam bahasa Inggris diputar dengan suara sumbang. Anak terakhir duduk di sofa berbaju merah dan bertanya, “Siapa aku?” Ruan Nanzhu menjawab tanpa ragu: <strong>Xiao Tu</strong>. Kakak-kakaknya? “Mereka sudah mati.” Anak itu mengangguk: “Aku tahu.”",
        "Sang ibu mendorong masuk kue tiga lapis berlapis krim putih, dihiasi buah merah dan tiga lilin besar. Xiao Tu memotongnya, dan isinya merah. Ia membagikan potongan kue kepada semua orang. Ruan Nanzhu menolak, lalu membalik meja."
      ],
      pull: "Kue merah itu adalah daging cincang, krimnya otak, buahnya bola mata, dan tiga lilinnya tulang.",
      after: [
        "Sebelum sang ibu sempat bereaksi, Ruan Nanzhu menikamnya dan mencincangnya dengan pisau. Xiao Tu bertepuk tangan sambil tertawa: “Mama mati! Mama mati!” Kuncinya tidak ada di dalam kue. Kunci perunggu itu ada <strong>di dalam tubuh sang ibu</strong>."
      ]
    },
    keluar: {
      h2: "Pintu di atap",
      prose: [
        "Saat mereka berlari keluar, potongan tubuh sang ibu menyatu kembali dengan cepat. Ia bangkit, memutar lehernya ke sudut yang mustahil, mengambil pisau kue, dan merangkak naik tangga mengejar mereka.",
        "Ruan Nanzhu membongkar gembok besi <em>pintu menuju atap</em>, sementara Lin Qiushi berjaga di belakangnya. Empat orang selamat sampai akhir. Setelah pintu ini, Lin Qiushi demam tinggi dan dirawat di rumah sakit."
      ]
    }
  }
};
