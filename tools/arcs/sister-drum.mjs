const flags = ["#c8322a", "#e8c84a", "#2f6fb0", "#f4efe6", "#3f8a4c"];
const flagRow = Array.from({ length: 10 }, (_, i) => `<path class="flag" style="animation-delay:${-i * 0.15}s" d="M${120 + i * 136} ${210 + Math.abs(5 - i) * 10} h70 v60 h-70 Z" fill="${flags[i % 5]}" fill-opacity="0.75"/>`).join("");
const people = Array.from({ length: 13 }, (_, i) => `<g class="k-pop" style="--d:${0.1 + i * 0.12}s"><circle cx="${40 + i * 26}" cy="120" r="8" fill="${i === 12 ? "#d8962f" : "#e9c9a0"}"/><rect x="${33 + i * 26}" y="130" width="14" height="30" rx="5" fill="${i === 12 ? "#d8962f" : "#e9c9a0"}"/></g>`).join("");
const skulls = Array.from({ length: 6 }, (_, r) => Array.from({ length: 6 - r }, (_, c) => `<g class="k-in" style="--d:${(5 - r) * 0.3 + c * 0.05}s"><circle cx="${200 - (5 - r) * 26 + c * 52}" cy="${330 - r * 52}" r="22" fill="#e6dccb"/><circle cx="${192 - (5 - r) * 26 + c * 52}" cy="${328 - r * 52}" r="5" fill="#1a120c"/><circle cx="${208 - (5 - r) * 26 + c * 52}" cy="${328 - r * 52}" r="5" fill="#1a120c"/></g>`).join("")).join("");

export default {
  title: "Arc Sister Drum",
  description: "Arc Sister Drum: pintu ketiga Lin Qiushi dalam Kaleidoscope of Death. Tur wisata ke kuil di dataran tinggi, pagoda tulang, dan genderang dari kulit seorang gadis.",
  tint: "#120c08",
  fonts: "family=Eczar:wght@500;700",
  css: "arc-sister.css",
  bodyClass: "arc--sister",
  drone: 46,
  cineTag: "Genderang Saudari",
  chapters: "Bab 29–38",
  h1: "Sister Drum",
  sub: "Genderang Saudari · 阿姐鼓",
  lead: "Rombongan wisata dipandu seorang perempuan berbaju merah ke kuil yang dikelilingi bendera doa. Setiap sore pemandu menghitung kepala. Suatu hari hitungannya kurang satu, padahal tak ada yang hilang.",
  source: "bab 29 “The Third Door” sampai bab 38 “Leaving”",
  defs: `      <symbol id="sd-temple" viewBox="0 0 1600 900">
        <rect width="1600" height="900" fill="#1a120c"/>
        <path d="M0 560 L320 330 L560 470 L820 260 L1100 480 L1380 340 L1600 450 V900 H0 Z" fill="#0f0a07"/>
        <g fill="#060403"><rect x="660" y="430" width="280" height="300"/><path d="M620 440 L800 330 L980 440 Z"/><rect x="770" y="560" width="60" height="170" fill="#2a0c0c"/></g>
        <path d="M0 720 H1600 V900 H0 Z" fill="#0a0705"/>
      </symbol>`,
  scenes: `      <div class="scene scene--plateau" data-scene="flags" data-dur="3800" data-sfx="thud@500,thud@1200,thud@1900">
        <svg class="k-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#sd-temple"/><path d="M100 200 Q800 300 1500 200" stroke="#6b5440" stroke-width="3" fill="none"/>${flagRow}</svg>
        <p class="scene__caption"><span data-type>Tur wisata ke sebuah kuil di dataran tinggi. Dari jauh terdengar genderang.</span><small>Pintu ketiga Lin Qiushi</small></p>
      </div>

      <div class="scene" data-scene="count" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 380 200"><rect x="6" y="40" width="3" height="120" fill="#e9c9a0"/><path d="M9 40 h40 l-10 14 l10 14 h-40 Z" fill="#c8322a"/>${people}</svg>
        </div></div>
        <p class="scene__caption"><span data-type>Pemandu menghitung: dua belas. Padahal mereka tiga belas.</span><small>Salah satu dari mereka bukan manusia</small></p>
      </div>

      <div class="scene" data-scene="pagoda" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true"><svg viewBox="0 0 400 360">${skulls}</svg></div></div>
        <p class="scene__caption"><span data-type>Pagoda yang tersusun dari ribuan tulang manusia.</span></p>
      </div>

      <div class="scene" data-scene="drum" data-dur="3800" data-sfx="thud@0,thud@670,thud@1340,thud@2010,thud@2680">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 260">
            <path d="M110 90 V190 Q200 230 290 190 V90" fill="#6e1a14"/>
            <ellipse class="drum-skin" cx="200" cy="90" rx="90" ry="30" fill="#e9c9a0"/>
            <path d="M150 84 Q200 98 250 84" stroke="#b08a66" stroke-width="2" fill="none"/>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Genderang kecil merah. Kulitnya berasal dari seorang gadis.</span></p>
      </div>

      <div class="scene scene--glow" data-scene="verdict" data-dur="3200" data-flash="300" data-sfx="sting@300">
        <p class="k-verdict">“Adikku tersayang… ke mana saja kau selama ini?”<small>Sang kakak yang tak berkulit</small></p>
      </div>`,
  heroArt: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><use href="#sd-temple"/></svg>`,
  sections: {
    ringkasan: {
      h2: "Rombongan wisata yang dihitung ulang",
      prose: [
        "Pintu ketiga Lin Qiushi adalah pintu kelima <strong>Cheng Qianli</strong>, remaja ceria anggota Obsidian. Ruan Nanzhu ikut, padahal baru saja keluar dari pintu kesepuluhnya, tempat ia kehilangan seorang rekan. Di dalam pintu ini tubuhnya terasa dingin dan seringan bulu.",
        "Di jalan setapak, Lin Qiushi bertemu gadis yang menangis bernama <strong>Xu Jin</strong> dan membawanya ke rombongan. Mereka adalah peserta tur. Seorang pemandu bertopi safari dan berbendera merah akan mengantar mereka ke tempat-tempat wisata setempat, termasuk kuil dan pagoda yang dikelilingi bendera doa warna-warni. Di rombongan itu juga ada pria bersuara manis yang mengaku bernama <strong>Meng Yu</strong>."
      ],
      facts: [
        ["Latar", "Kuil dan pagoda di dataran tinggi"],
        ["Peran pemain", "Peserta tur wisata"],
        ["Pemilik pintu", "Cheng Qianli (pintu kelimanya)"],
        ["Entitas", "Gadis tanpa kulit, sang kakak"],
        ["Benda kunci", "Buku harian sang adik, seruling tulang"],
        ["Pintu keluar", "Di bawah kulit genderang"]
      ],
      hint: { text: "“Sister Drum”", note: "Judul sebuah lagu tentang seorang adik yang mencari kakak bisunya ke mana-mana, sampai ia mendengar suara genderang." }
    },
    legenda: {
      h2: "Genderang dari kulit seorang gadis",
      prose: [
        "Cheng Qianli menyelidiki latar lagu itu. Konon di masa lalu ada kebiasaan religius menguliti seorang gadis suci hidup-hidup dan menjadikan kulitnya genderang. Menabuh genderang itu dipercaya menghubungkan dunia hidup dan mati.",
        "Kulit yang dipilih harus milik gadis yang belum pernah jatuh cinta. Lebih baik lagi jika ia bisu, karena orang bisu tak bisa berbohong. Dalam lagu, sang kakak bisu katanya menyerahkan diri dengan sukarela, tetapi apakah benar sukarela, itu yang selalu diperdebatkan."
      ],
      versus: [
        ["Lagu “Sister Drum”", "Kisah sedih seorang adik yang setia mencari kakaknya yang tiba-tiba menghilang, sampai ia mendengar mantra dan suara genderang."],
        ["Versi di dalam pintu", "Kedua saudari itu kembar. Yang satu menjadi genderang dan kini merayap tanpa kulit di atap kuil yang dijahit dari kulit manusia. Yang satu lagi lari dan bersembunyi di antara rombongan, dengan nama Xu Jin."]
      ]
    },
    aturan: {
      h2: "Tur yang tak boleh dilanggar",
      items: [
        ["༡", "Ikuti pemandu", "Setiap pagi pemandu mengulang penjelasan yang sama kata demi kata, melepas rombongan menjelajah, lalu menjemput mereka saat senja. Di luar kuil pernah turun hujan bilah tajam dari langit yang menyisakan mayat tanpa kulit, dan pemandu tetap tersenyum seolah tak melihat apa-apa."],
        ["༢", "Hitungan kepala", "Saat pemandu mengumumkan jumlah yang kurang satu dari kenyataan, rombongan sadar bahwa salah satu dari mereka bukan manusia."],
        ["༣", "Malam setelah ke pagoda", "Hanya pada malam setelah rombongan mengunjungi pagoda, jejak tangan berdarah muncul di lantai bawah ranjang. Itu tanda bahwa waktu mereka hampir habis."],
        ["༤", "Jangan menyentuh genderang", "Di puncak pagoda ada genderang kecil dari kulit manusia. Lin Qiushi sempat menekan permukaannya dan pingsan mendengar jeritan makhluk kulit itu."]
      ]
    },
    kronologi: {
      h2: "Hari-hari di dataran tinggi",
      items: [
        ["Hari pertama", "Gadis yang menangis", "Xu Jin menempel pada Lin Qiushi dan terus mengeluh. Ruan Nanzhu, yang berdandan sebagai perempuan sakit-sakitan, diam-diam memperhatikannya."],
        ["Di kuil", "Hujan bilah", "Rombongan dibebaskan menjelajah kuil. Ruan Nanzhu memutuskan mereka tak boleh bermalam di sana. Saat keluar, hujan bilah yang sempat menancap di tanah sudah lenyap, menyisakan satu mayat tanpa kulit.", true],
        ["Puncak pagoda", "Buku harian sang adik", "Di lantai teratas pagoda mereka menemukan sebuah buku catatan. Cheng Qianli langsung teringat petunjuknya: “Apa ini ditulis sang adik?” Mereka menyimpannya diam-diam. Satu halamannya robek."],
        ["Lantai empat pagoda", "Lengan-lengan merah", "Seorang perempuan menjerit. Dari dinding menjulur banyak lengan merah tanpa kulit. Meng Yu mengingatkan semua orang tentang aturan yang disampaikan pemandu.", true],
        ["Sore berikutnya", "Dua belas, bukan tiga belas", "Pemandu menghitung dua belas orang, padahal ada tiga belas. Semua pasangan mulai saling curiga, dan Xu Jin melirik Ruan Nanzhu: “Kau yang paling cantik di antara kita…”"],
        ["Pagoda tulang", "Seruling dan runtuhnya menara", "Ruan Nanzhu mengukir seruling dari tulang di pagoda dan memainkan lagu “Sister Drum”. Menara itu runtuh, menumpahkan ribuan kerangka, lalu terdengar genderang dan suara gadis bernyanyi mantra."],
        ["Tengah malam", "Gadis yang menguliti diri", "Lin Qiushi membuntuti Xu Jin ke hutan dan melihatnya melepas pakaian, lalu menguliti dirinya sendiri. Di tas kulit dombanya ditemukan halaman buku harian yang hilang dan foto dua anak kembar."]
      ]
    },
    tokoh: {
      h2: "Rombongan tur",
      items: [
        ["Pemain", false, "Lin Qiushi", "Pintu ketiganya", "Ia membuntuti Xu Jin di tengah malam, keputusan berbahaya yang membuka seluruh misteri."],
        ["Pemain · Obsidian", false, "Ruan Nanzhu", "Baru keluar dari pintu kesepuluh", "Fisiknya lemah tetapi pikirannya tetap tajam. Ia memainkan seruling tulang untuk memanggil sang kakak."],
        ["Pemain · Obsidian", false, "Cheng Qianli", "Pemilik pintu", "Remaja usil yang berani. Dialah yang meneliti latar lagu “Sister Drum”."],
        ["Pemain · White Deer", false, "Meng Yu", "Bersuara manis", "Nama samaran Li Dongyuan, ketua White Deer. Ini kemunculan pertamanya, dan ia menenangkan seorang pemuda bersenjata pisau hanya dengan satu sentuhan."],
        ["Bukan manusia", true, "Xu Jin", "Gadis yang ditemukan di jalan", "Penakut, cerewet, dan selalu menempel pada Lin Qiushi. Ia adalah “orang ketiga belas” itu."],
        ["Entitas", false, "Sang kakak", "Gadis tanpa kulit", "Genderang yang hidup. Ia memerintah makhluk-makhluk kuil dan tak pernah berhenti mencari adiknya."],
        ["NPC", false, "Pemandu wisata", "Baju merah, bendera merah", "Selalu ceria, selalu mengulang kalimat yang sama, dan tak pernah melihat mayat."]
      ]
    },
    kebenaran: {
      h2: "Dua saudari, satu kulit",
      gate: "siapa Xu Jin",
      before: [
        "Ruan Nanzhu membawa genderang kecil itu keluar dari pagoda. Esoknya, seperti dugaannya, Xu Jin diam-diam mengikuti mereka ke hutan dan ditangkap makhluk-makhluk kuil. Ia diseret ke panggung kayu di atas kuil, ke hadapan gadis tanpa kulit yang duduk di atas genderang.",
        "Xu Jin menjerit, “Kakak, hentikan!” Sang kakak mengelupas kulit adiknya dan memakainya sendiri, seperti mengenakan gaun pengantin yang sudah lama ditunggu. Ia berubah menjadi gadis kecil yang manis, persis seperti anak kembar di foto itu."
      ],
      pull: "“Adikku tersayang, pernahkah kau merindukanku, sekali saja, setelah kau meninggalkanku?”",
      after: [
        "Kini Xu Jin yang tak berkulit, berlutut dan terpaksa berterima kasih kepada Lin Qiushi dan kawan-kawan. Seandainya mereka tidak mengambil genderangnya, ia tak akan mengejar mereka dan tertangkap. Sang kakak berjanji akan “meminjamkan” tulang betis orang-orang lain kepada adiknya begitu mereka semua mati."
      ]
    },
    keluar: {
      h2: "Pintu di bawah genderang",
      prose: [
        "Sang kakak meminta seruling tulang itu kembali, karena itu tulangnya sendiri. Dengan sekali kibas, seruling itu merobek permukaan genderang di bawah tubuhnya, dan di baliknya muncul <strong>pintu besi hitam</strong>. Ruan Nanzhu membukanya dengan kunci dan memungut secarik petunjuk yang jatuh.",
        "Saat Lin Qiushi hendak melangkah masuk, gadis itu menepuk punggungnya keras-keras: “Dia sangat menyukaimu, jadi aku sama sekali tidak menyukaimu.” Di dunia nyata, Lin Qiushi ambruk karena pneumonia akut dan nyaris masuk ICU. <em>Buku harian sang adik</em> ikut terbawa keluar, dan kelak menyelamatkan nyawanya di pintu Slenderman."
      ]
    }
  }
};
