export default {
  title: "Arc Snow Village",
  description: "Arc Snow Village: pintu pertama Lin Qiushi dalam Kaleidoscope of Death. Desa pegunungan bersalju, peti mati merah, dan dewi di pilar kuil yang harus dikenyangkan.",
  tint: "#0a1016",
  fonts: "family=Marcellus+SC",
  css: "arc-snow.css",
  bodyClass: "arc--snow",
  drone: 50,
  cineTag: "Desa Bersalju",
  chapters: "Bab 1–12",
  h1: "Snow Village",
  sub: "Desa Bersalju · pintu pertama",
  lead: "Sebelas orang terdampar di desa pegunungan yang tertutup salju. Kepala desa meminta satu hal sederhana: buatkan peti mati untuk tahun depan. Tak ada yang bertanya untuk siapa.",
  source: "bab 1 “Crossing the First Threshold” sampai bab 12 “The Key to the Door”",
  defs: `      <symbol id="sv-village" viewBox="0 0 1600 900">
        <path d="M0 520 L260 300 L430 420 L640 220 L900 460 L1120 280 L1360 430 L1600 330 V900 H0 Z" fill="#0d141b"/>
        <path d="M0 640 Q400 600 800 640 T1600 630 V900 H0 Z" fill="#dfe8f0" fill-opacity="0.16"/>
        <g fill="#040608">
          <path d="M520 640 V560 L600 520 L680 560 V640 Z"/><path d="M700 650 V540 L800 480 L900 540 V650 Z"/>
          <path d="M930 650 V570 L1000 530 L1070 570 V650 Z"/><rect x="760" y="590" width="26" height="60" fill="#c4161c" fill-opacity="0.55"/>
        </g>
        <g fill="#f2d9a0" fill-opacity="0.55"><rect x="560" y="580" width="14" height="14"/><rect x="830" y="560" width="14" height="14"/></g>
      </symbol>
      <symbol id="sv-coffin" viewBox="0 0 400 200">
        <path d="M30 70 L370 50 L390 150 L50 170 Z" fill="#6e0b0f"/>
        <path d="M30 70 L370 50 L390 150 L50 170 Z" fill="url(#sv-sheen)"/>
      </symbol>
      <linearGradient id="sv-sheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.18"/><stop offset="0.5" stop-color="#fff" stop-opacity="0"/></linearGradient>`,
  scenes: `      <div class="scene scene--sky" data-scene="snow" data-dur="3800">
        <svg class="k-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#sv-village"/></svg>
        <canvas class="fx-canvas" aria-hidden="true"></canvas>
        <p class="scene__caption"><span data-type>Desa di pegunungan. Salju turun dan tak mau berhenti.</span><small>Pintu pertama Lin Qiushi</small></p>
      </div>

      <div class="scene" data-scene="pillar" data-dur="3800" data-sfx="thud@1800">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 420">
            <rect x="130" y="0" width="140" height="420" fill="#1a1612"/>
            <rect x="130" y="0" width="140" height="420" fill="none" stroke="#3a2f24" stroke-width="4"/>
            <path class="k-draw" style="--len:900;--t:2.4s" d="M200 60 C170 60 165 100 170 130 C150 150 145 200 150 240 C140 270 150 330 165 400 M200 60 C230 60 235 100 230 130 C250 150 255 200 250 240 C260 270 250 330 235 400 M170 130 C150 190 120 230 90 260 L70 300 M230 130 C250 190 280 230 310 260 L330 300 M180 70 C150 120 140 180 130 220 M220 70 C250 120 260 180 270 220" stroke="#d9cbb5" stroke-width="3" fill="none" stroke-linecap="round"/>
            <g class="k-pop" style="--d:2.2s"><circle cx="188" cy="96" r="4" fill="#c4161c"/><circle cx="212" cy="96" r="4" fill="#c4161c"/></g>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Di pilar kuil, sesuatu menggeliat ingin keluar.</span></p>
      </div>

      <div class="scene" data-scene="well" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 300">
            <ellipse cx="200" cy="120" rx="130" ry="40" fill="#050505" stroke="#5a5048" stroke-width="10"/>
            <path d="M70 120 V230 Q200 290 330 230 V120" fill="#14100c" stroke="#5a5048" stroke-width="10"/>
            <rect class="k-fall" style="--d:1.2s" x="186" y="20" width="28" height="60" rx="6" fill="#d9cbb5"/>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Isi sumur itu dalam tiga hari. Dengan sesuatu yang sudah mati.</span><small>Di desa ini tak ada satu pun makhluk hidup</small></p>
      </div>

      <div class="scene" data-scene="coffin" data-dur="3800" data-sfx="creak@1200">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 220">
            <path d="M40 90 L360 72 L378 168 L58 186 Z" fill="#2a0406"/>
            <g class="key-glint"><circle cx="210" cy="128" r="12" fill="none" stroke="#7aa58f" stroke-width="5"/><rect x="220" y="125" width="60" height="6" fill="#7aa58f"/></g>
            <g class="coffin-lid"><use href="#sv-coffin" x="0" y="10" width="400" height="200"/></g>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Peti mati merah yang indah. Catnya berbau logam, dan licin.</span></p>
      </div>

      <div class="scene scene--black" data-scene="verdict" data-dur="3200" data-flash="300" data-sfx="sting@300">
        <p class="k-verdict">“Kalau dia tidak dikenyangkan, dia akan datang untuk kalian.”<small>Kata tukang kayu desa</small></p>
      </div>`,
  heroArt: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><use href="#sv-village"/></svg>`,
  script: `    window.arcHooks = { snow: SpiFx.snow };`,
  sections: {
    ringkasan: {
      h2: "Peti mati untuk tahun depan",
      prose: [
        "Lin Qiushi, karyawan kantoran yang kelelahan, membuka sebuah pintu besi hitam di rumahnya dan mendapati dirinya di jalan setapak berlumpur menuju desa pegunungan. Di sampingnya berjalan <strong>Ruan Baijie</strong>, gadis tinggi berdarah campuran yang mengaku juga baru saja membuka pintu yang sama.",
        "Sebelas orang tinggal di rumah kayu tiga lantai di samping rumah kepala desa. Dua veteran, <strong>Xiong Qi</strong> yang ramah dan <strong>Xiao Ke</strong> yang dingin, menjelaskan aturan dasar dunia pintu: cari kuncinya, cari pintunya, lalu pulang. Kepala desa memberi satu tugas: <em>buatkan peti mati untuk tahun depan, bantulah tukang kayu</em>."
      ],
      facts: [
        ["Latar", "Desa pegunungan di musim salju"],
        ["Jumlah pemain", "11 orang"],
        ["Tugas", "Membuat peti mati bersama tukang kayu"],
        ["Entitas", "Perempuan dari pilar kuil"],
        ["Batas waktu", "Sumur harus diisi dalam 3 hari"],
        ["Kunci", "Di dalam peti mati merah"]
      ],
      hint: { text: "— tidak ada —", note: "Pintu pertama Lin Qiushi. Satu-satunya arahan datang dari kepala desa: buat peti mati. Xiong Qi langsung menyebutnya petunjuk paling penting." }
    },
    legenda: {
      toc: "Ritual di balik pintu",
      h2: "Empat langkah membuat peti mati",
      prose: [
        "Tukang kayu tua yang menghisap pipa memberi resepnya, sepotong demi sepotong: tebang pohon, potong kayunya dan antarkan kepadanya, berdoa di kuil tua di samping desa, lalu <strong>isi sumur</strong>. Setelah itu peti mati akan siap.",
        "Masalahnya, setiap langkah ternyata meminta korban, dan tukang kayu itu tidak pernah menjelaskan bagian itu."
      ],
      versus: [
        ["Yang diminta kepala desa", "Membuat peti mati sebagai persiapan menyambut tahun baru, pekerjaan pertukangan yang tampak tak berbahaya."],
        ["Yang sebenarnya terjadi", "Peti mati gunanya untuk menampung orang mati. Sumur harus diisi bangkai, dan perempuan di pilar kuil harus dikenyangkan. Penduduk desa sendiri menolak membantu tahun ini, sehingga tugas itu jatuh ke tangan para pendatang."]
      ]
    },
    aturan: {
      h2: "Salju yang tidak memaafkan",
      items: [
        ["壹", "Nasihat yang menyesatkan", "Mengikuti petunjuk tukang kayu, rombongan memikul kayu gelondongan di bahu. Dua orang tewas tertimpa kayu. Esoknya Xiong Qi mengubah cara: kayu diikat tali lalu diseret bersama-sama, supaya tak ada yang bisa disalahkan."],
        ["贰", "Isi sumur dengan yang mati", "“Ayam, bebek, anjing, apa saja yang mati, lempar ke sumur dalam tiga hari lalu timbun dengan tanah.” Tapi di musim dingin ini tak ada satu pun makhluk hidup di desa. Diam-diam semua orang mulai berharap orang lain mati."],
        ["叁", "Dia harus kenyang", "Perempuan yang merayap keluar dari ukiran pilar kuil memakan mayat. Jika tidak dikenyangkan, semua yang ikut membuat peti mati harus “melayaninya”."],
        ["肆", "Jangan percaya yang datang malam hari", "Pada malam pertama, “Ruan Baijie” duduk di tepi ranjang dan mengajak Lin Qiushi melihat sumur, padahal Ruan Baijie yang asli masih tidur di sebelahnya. Sesuatu di desa ini pandai meniru."]
      ]
    },
    kronologi: {
      h2: "Tiga hari di desa salju",
      items: [
        ["Malam pertama", "Dua Ruan Baijie", "Lin Qiushi terbangun dan melihat seorang perempuan bersuara Ruan Baijie duduk di samping ranjang, mengajaknya keluar ke sumur. Ia menampar Ruan Baijie yang asli sampai bangun, dan sosok itu pun pergi."],
        ["Pagi kedua", "Darah di lantai tiga", "Pintu sebuah kamar terbuka sedikit dan lantainya berlumur darah beku. Korban pertama sudah jatuh. Kepala desa datang dan menyampaikan tugas membuat peti mati.", true],
        ["Menebang pohon", "Kayu yang menimpa", "Dua anggota rombongan tewas tertimpa kayu gelondongan. Dalam perjalanan pulang di tengah badai, Lin Qiushi menggendong Ruan Baijie dan merasa yang ada di punggungnya seringan kertas, dingin dan lembap.", true],
        ["Sore yang sama", "Mayat yang dimakan", "Mayat-mayat di lantai tiga hilang. Yang tersisa hanya noda hitam di dinding dan genangan darah. “Dimakan,” isak seorang gadis."],
        ["Malam · kuil tua", "Perempuan dari pilar", "Ukiran di pilar kuil menggeliat. Sesosok perempuan telanjang berambut panjang merayap keluar dan mengejar mereka di jalan bersalju. Xiao Ke terpeleset dan menjerit minta tolong."],
        ["Hari ketiga", "Menggali mayat", "Ruan Baijie mengingatkan bahwa dua korban kayu gelondongan sudah terkubur salju. Mereka pun “benda mati”. Rombongan menggali dan menyeret mayat itu pulang untuk mengisi sumur."],
        ["Malam terakhir", "Suara mengunyah sampai subuh", "Perempuan itu berdiri di pagar dan menatap mereka sepanjang malam sambil mengunyah. Saat fajar ia menghilang. Lin Qiushi merasa ia sempat bersendawa, seperti orang yang sudah kenyang.", true]
      ]
    },
    tokoh: {
      h2: "Penghuni rumah kayu",
      items: [
        ["Pemain baru", false, "Lin Qiushi", "Pintu pertamanya", "Pegawai kantoran yang pendengarannya tajam. Ia lembut hati: masih ingin membawa Xiong Qi dan Xiao Ke pulang bersamanya."],
        ["Pemain", false, "Ruan Baijie", "Gadis tinggi berdarah campuran", "Ia cengeng di depan orang, tetapi selalu selangkah di depan. Dialah yang menemukan cara mengisi sumur dan letak pintunya."],
        ["Veteran", false, "Xiong Qi", "Pemimpin yang sabar", "Ia menjawab setiap pertanyaan pendatang baru dan memimpin rombongan dengan pembagian kerja yang adil."],
        ["Veteran", false, "Xiao Ke", "Gadis 15–16 tahun", "Dingin dan ketus kepada Ruan Baijie. Ia sempat menasihati Lin Qiushi: jangan terlalu percaya pada orang lain."],
        ["Pemain", false, "Cheng Wen", "Emosi tak stabil", "Ia yakin Wang Xiaoyi “bukan manusia” dan mudah meledak marah."],
        ["NPC", false, "Tukang kayu", "Pria tua berpipa", "Satu-satunya sumber petunjuk. Ia menyampaikan informasi sepotong-sepotong, dan kadang menjebak."],
        ["Entitas", false, "Perempuan pilar", "Dewi jahat kuil tua", "Ia lahir dari ukiran relief yang terlalu indah untuk desa semiskin itu, dan ia harus diberi makan."]
      ]
    },
    kebenaran: {
      h2: "Siapa sebenarnya Ruan Baijie",
      gate: "identitas dan isi peti",
      before: [
        "Aturan sumur adalah jebakan yang kejam. Karena tak ada makhluk hidup di desa, satu-satunya “benda mati” yang tersedia adalah mayat rekan sendiri. Begitu aturan itu dipahami, setiap orang diam-diam menunggu orang lain mati. Ruan Baijie membalik jebakan itu dengan menggali mayat yang sudah ada.",
        "Peti mati merah yang dijemput dari rumah tukang kayu tampak sempurna. Tapi catnya berbau logam dan terasa licin, dan peti itu seringan bulu. Di dalamnya ada sebuah kunci perunggu tua yang gagangnya berlumur cairan merah, dan Lin Qiushi tahu itu bukan cat."
      ],
      pull: "“Tandai dulu barang milikmu, baru urus pekerjaan.”",
      after: [
        "Sebelum pulang, Ruan Baijie menindik telinga Lin Qiushi dengan anting tanpa izin. Rahasia terbesarnya baru terbongkar setelah mereka keluar: “gadis” itu adalah <strong>Ruan Nanzhu</strong>, pemimpin organisasi Obsidian, yang sengaja menyamar sebagai perempuan. Sejak pintu pertama inilah ia memilih Lin Qiushi."
      ]
    },
    keluar: {
      h2: "Kunci di dalam peti",
      prose: [
        "Mereka menebang pohon, berdoa di kuil, dan mengisi sumur. Langkah terakhir adalah menjemput peti mati. Xiao Ke yang pertama melongok ke dalamnya dan berteriak kegirangan: <strong>kuncinya ada di sana</strong>.",
        "Ruan Baijie berbisik bahwa ia sudah menemukan letak <em>pintu besi</em>, sangat dekat dari rumah mereka, dan mereka bisa pergi malam itu. Lin Qiushi bersikeras membawa Xiong Qi dan Xiao Ke ikut serta. “Kau terlalu lembut,” kata Ruan Baijie, “tapi aku suka kau yang seperti ini.”"
      ]
    }
  }
};
