const ghosts = [
  // triplets
  `<g class="k-in" style="--d:1.6s"><circle cx="60" cy="230" r="10" fill="#e9ecff"/><circle cx="84" cy="230" r="10" fill="#e9ecff"/><circle cx="108" cy="230" r="10" fill="#e9ecff"/></g>`,
  // crawler
  `<g class="k-in" style="--d:1.9s"><path d="M280 250 C290 226 320 226 330 250 L344 262 M280 250 L266 262" stroke="#e9ecff" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="305" cy="232" r="11" fill="#e9ecff"/></g>`,
  // frame
  `<g class="k-in" style="--d:2.2s"><rect x="160" y="210" width="34" height="44" fill="none" stroke="#e9ecff" stroke-width="4"/><circle cx="177" cy="228" r="6" fill="#e9ecff"/></g>`,
  // tall man
  `<g class="k-in" style="--d:2.5s"><circle cx="228" cy="196" r="7" fill="#e9ecff"/><rect x="224" y="204" width="8" height="58" fill="#e9ecff"/></g>`,
].join("");

export default {
  title: "Arc The Eleventh Door",
  description: "Arc The Eleventh Door: pintu keempat belas Lin Qiushi dalam Kaleidoscope of Death. Kehidupan seolah pintu-pintu tak pernah ada, tanpa Ruan Nanzhu, dan malam yang membawa semua hantu lama kembali.",
  tint: "#07080d",
  fonts: "family=Space+Grotesk:wght@500;700",
  css: "arc-final.css",
  bodyClass: "arc--eleventh",
  drone: 40,
  cineTag: "Pintu Kesebelas",
  chapters: "Bab 129–138",
  h1: "The Eleventh Door",
  sub: "Pintu Kesebelas · petunjuk: “Tanpa Jawaban”",
  lead: "Lin Qiushi terbangun di apartemen lamanya. Kucingnya minta makan, dan sahabatnya mengajak makan sate seolah tak terjadi apa-apa. Nomor Ruan Nanzhu tidak terdaftar, dan ibunya sendiri tak pernah mendengar namanya.",
  source: "bab 129 “The Fourteenth Door” sampai bab 138 “Twelve”",
  defs: "",
  scenes: `      <div class="scene" data-scene="home" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 260">
            <rect x="40" y="40" width="150" height="96" rx="4" fill="#1a2240"/><rect x="48" y="48" width="134" height="80" fill="#6a8cff" fill-opacity="0.35" class="k-flicker"/>
            <rect x="200" y="150" width="170" height="60" rx="14" fill="#141826"/><rect x="190" y="130" width="190" height="30" rx="14" fill="#1b2033"/>
            <g class="k-in" style="--d:0.8s"><ellipse cx="300" cy="140" rx="34" ry="18" fill="#c48a4a"/><circle cx="330" cy="124" r="13" fill="#c48a4a"/><path d="M322 114 L326 102 L332 114 M332 114 L338 102 L342 116" fill="#c48a4a"/><circle cx="334" cy="124" r="2.5" fill="#4adf8a"/></g>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Pagi yang biasa. Seolah pintu-pintu itu tak pernah ada.</span><small>Pintu keempat belas Lin Qiushi</small></p>
      </div>

      <div class="scene" data-scene="phone" data-dur="4200">
        <div class="scene__art">
          <div class="phone" aria-hidden="true">
            <div class="bubble bubble--sys k-in" style="--d:0.3s">Nomor yang Anda tuju tidak terdaftar.</div>
            <div class="bubble bubble--sys k-in" style="--d:1.2s">22.00</div>
            <div class="bubble bubble--in k-in" style="--d:1.8s">Aku baik-baik saja. Qiushi, bagaimana denganmu?</div>
            <div class="bubble bubble--out k-in" style="--d:2.6s">Aku baik. Jangan khawatirkan aku.</div>
            <div class="bubble bubble--in k-in" style="--d:3.3s">Kau benar-benar Qiushi?</div>
          </div>
        </div>
        <p class="scene__caption"><small>Telepon hanya tersambung pada malam hari</small></p>
      </div>

      <div class="scene" data-scene="clock" data-dur="3900" data-sfx="thud@2300,thud@2700,thud@3100">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 280">
            <circle cx="200" cy="150" r="74" fill="#0e1120" stroke="#b8c6ff" stroke-width="4" transform="translate(0 -60) scale(1 1)"/>
            <g transform="translate(0 -60)"><rect class="clock-hand clock-hand--h" x="197" y="104" width="6" height="48" fill="#e9ecff"/><rect class="clock-hand clock-hand--m" x="198.5" y="88" width="3" height="64" fill="#6a8cff"/><circle cx="200" cy="150" r="5" fill="#e9ecff"/></g>
            ${ghosts}
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Saat jam berdentang malam, mereka semua kembali.</span><small>Hantu-hantu dari pintu-pintu lama</small></p>
      </div>

      <div class="scene" data-scene="track" data-dur="3800">
        <div class="scene__art"><div class="k-art" aria-hidden="true">
          <svg viewBox="0 0 400 240">
            <rect x="20" y="40" width="360" height="160" rx="80" fill="none" stroke="#7a3a2a" stroke-width="22"/>
            <rect x="20" y="40" width="360" height="160" rx="80" fill="none" stroke="#e9ecff" stroke-width="1" stroke-dasharray="6 6"/>
            <g class="runner-a"><circle cx="200" cy="112" r="8" fill="#e9ecff"/><rect x="195" y="122" width="10" height="26" rx="4" fill="#e9ecff"/></g>
            <g class="runner-b"><circle cx="200" cy="112" r="8" fill="#6a8cff"/><rect x="195" y="122" width="10" height="26" rx="4" fill="#6a8cff"/></g>
          </svg>
        </div></div>
        <p class="scene__caption"><span data-type>Lintasan lari sebuah sekolah, tengah malam. Satu-satunya tempat mereka bisa bertemu.</span></p>
      </div>

      <div class="scene scene--black" data-scene="verdict" data-dur="3200" data-flash="300" data-sfx="sting@300">
        <p class="k-verdict">Petunjuk: “Tanpa Jawaban.”<small>Hampir semua orang mendapat petunjuk yang sama untuk pintu kesebelas</small></p>
      </div>`,
  heroArt: `<div class="k-hero-art" style="background:radial-gradient(ellipse 40% 50% at 75% 40%, rgba(106,140,255,0.22), transparent 70%)"></div>`,
  sections: {
    ringkasan: {
      h2: "Dunia tanpa pintu, dunia tanpa dia",
      prose: [
        "Dua tahun setelah pintu Minotaur, Obsidian sudah banyak berubah. Cheng Yixie keluar dan menghilang tanpa jejak, anggota baru bernama <strong>Ye Niao</strong> bergabung, dan Lin Qiushi masuk pintu kira-kira dua kali sebulan. Ruan Nanzhu sudah dua kali melewati pintu kesepuluh demi memastikan petunjuk pintu kesebelas tidak berubah lagi.",
        "Petunjuk mereka berdua sama: <strong>Tanpa Jawaban</strong>. Petunjuk Cheng Yixie berbeda: <em>Hidup dan Mati</em>. Di dalam pintu, Lin Qiushi terbangun di apartemen sewaannya yang lama bersama kucingnya, Chestnut. Sahabatnya, Wu Qi, menelepon mengajaknya makan malam, di tanggal dan jam yang sama dengan hari pertama ia keluar dari pintu dulu. Tetapi kecelakaan yang seharusnya terjadi hari itu tidak pernah terjadi."
      ],
      facts: [
        ["Latar", "Kehidupan Lin Qiushi seolah pintu tak pernah ada"],
        ["Pemain", "Lin Qiushi dan Ruan Nanzhu, di dunia terpisah"],
        ["Siang hari", "Aman, normal, dan terasa palsu"],
        ["Malam hari", "Hantu dari pintu-pintu lama kembali"],
        ["Batas waktu", "Malam yang terus memendek"],
        ["Kunci", "Di dalam jam dinding"]
      ],
      hint: { text: "“Tanpa Jawaban”", note: "Diterima Lin Qiushi dan Ruan Nanzhu. Pintu ini tidak memberi jalan pasti. Jalan hidup bisa tersembunyi di detail sekecil apa pun, atau tidak ada sama sekali." }
    },
    legenda: {
      toc: "Dunia di balik pintu",
      h2: "Kehidupan yang seharusnya",
      prose: [
        "Siang hari terasa terlalu normal. Wu Qi masih bekerja, pacarnya baik-baik saja, dan bosnya menunggu Lin Qiushi kembali ke kantor. Orang-orang yang tak berhubungan dengan pintu hidup seperti biasa di dunia ini.",
        "Tetapi Ruan Nanzhu tidak ada. Nomornya tidak terdaftar. Saat Lin Qiushi mendatangi rumah keluarga Ruan, ibunya hanya mengenal satu putra, Ruan Baiye. Di dunia ini, tak ada orang bernama Ruan Nanzhu."
      ],
      versus: [
        ["Siang", "Kucing yang manja, sate dengan sahabat, dan pekerjaan kantor yang menunggu. Hidup yang mungkin ia jalani kalau pintu-pintu itu tak pernah datang."],
        ["Malam", "Begitu jam berdentang, para penghuni pintu-pintu lama muncul satu per satu: si kembar tiga dengan kue yang meleleh, gadis tanpa kulit, mayat yang jatuh dari atas, bingkai-bingkai di pohon."]
      ]
    },
    aturan: {
      h2: "Bertahan sampai subuh",
      items: [
        ["01", "Siang aman, malam tidak", "Apa pun yang terjadi semalam, Lin Qiushi selalu terbangun di ranjangnya sendiri saat pagi, dengan Chestnut di sebelah bantal."],
        ["02", "Hantu-hantu lama", "Musuh-musuh dari pintu sebelumnya datang kembali, sering dengan isyarat yang hanya dimengerti orang yang pernah selamat dari mereka. Salah satu anak kembar menunjuk ke atas kepala Lin Qiushi tepat sebelum sebuah mayat jatuh."],
        ["03", "Bayangan palsu", "Pintu ini juga menunjukkan hal yang tidak nyata, seperti wajah Ruan Nanzhu yang hangus terbakar. Akal Lin Qiushi tahu itu palsu, tapi hatinya tetap goyah."],
        ["04", "Malam yang memendek", "Malam yang tadinya enam jam menjadi lima, lalu empat. Kalau kunci tak ditemukan sebelum malam habis, mungkin mereka terjebak selamanya."]
      ]
    },
    kronologi: {
      h2: "Malam demi malam",
      items: [
        ["Hari pertama", "Telepon dari Wu Qi", "Sate di depan kompleks, bir, dan pertanyaan tentang pacar Wu Qi. Lin Qiushi tersesat di depan pintunya sendiri: kalau ini di dalam pintu, ke mana Ruan Nanzhu dan semua orang Obsidian?"],
        ["Malam pertama", "Kue yang meleleh", "Di lorong apartemen, si kembar tiga mengelilingi kue berlilin putih yang meneteskan cairan merah sambil bernyanyi selamat ulang tahun. Sebuah mayat jatuh dari atas dan pecah di tanah.", true],
        ["Malam yang sama", "Pesan terakhir", "Lin Qiushi mengirim pesan ke nomor Ruan Nanzhu, dan tersambung. “Dia datang. Harus pergi, sayang, aku mencintaimu.” Itu pesan terakhir malam itu. Paginya nomor itu kembali tak terdaftar."],
        ["Malam berikutnya", "Raksasa berkapak", "Sosok raksasa menyeret kapak di jalan. Lin Qiushi bersembunyi di dalam peti mati, mendengar makhluk itu mengendus-endus di dekatnya. Yang menolongnya adalah <strong>Li Dongyuan</strong>, yang sudah lama mati."],
        ["Hujan malam", "Gadis tanpa kulit", "Tanpa Xu Jin yang menghalangi, sang kakak dari pintu Sister Drum tak menahan diri untuk membunuh Lin Qiushi. Bingkai-bingkai hitam tergantung di pohon sepanjang jalan.", true],
        ["Kota lain", "Penerbangan yang tertunda", "Lin Qiushi menemui Cheng Qianli, lalu terjebak di kota asing saat pesawatnya terlambat dan malam tiba. Satchan menemaninya sampai ia tertidur."],
        ["Sekolah Ruan Nanzhu", "Tengah malam di lintasan lari", "Lin Qiushi menyelinap ke SMA tempat Ruan Nanzhu pertama kali memasuki pintu. Tepat pukul dua belas, udara berubah. Di ujung lintasan lari muncul Ruan Nanzhu, melambai. Sejak itu mereka bertemu di sana setiap malam."]
      ]
    },
    tokoh: {
      h2: "Yang hidup dan yang kembali",
      items: [
        ["Pemain · Obsidian", false, "Lin Qiushi", "Pintu keempat belasnya", "Sendirian di dunia yang melupakan orang yang paling ia cintai."],
        ["Pemain · Obsidian", false, "Ruan Nanzhu", "Di garis waktu lain", "Ia membalas pesan setiap malam, dan bertanya hal yang sama: “Kau benar-benar ada di sana?”"],
        ["NPC", false, "Wu Qi", "Sahabat lama", "Hidup, sehat, dan khawatir. Di dunia nyata ia sudah tewas karena orang-orang di pintu."],
        ["NPC", false, "Chestnut", "Kucing Lin Qiushi", "Penghiburan satu-satunya di malam-malam panjang."],
        ["Arwah", false, "Li Dongyuan", "Ketua White Deer", "Sudah mati, tetapi muncul dan menyelamatkan Lin Qiushi dengan senyum lamanya."],
        ["Arwah", false, "Satchan", "Dari pintu kelima", "Menemani Lin Qiushi tidur di kota asing."],
        ["NPC", false, "Ibu Ruan", "Ibu dari Ruan Baiye", "Ia tak mengenal putra bernama Ruan Nanzhu."]
      ]
    },
    kebenaran: {
      h2: "“Kau benar-benar ada di sana?”",
      gate: "makna pintu kesebelas",
      before: [
        "Pintu ini menguji hal yang paling ditakuti Lin Qiushi sejak awal: apakah Ruan Nanzhu benar-benar ada, atau hanya sesuatu yang ia butuhkan untuk bertahan? Pesan-pesan malam itu bisa saja dikirim seseorang yang menyembunyikan lukanya, atau bukan siapa-siapa.",
        "Di lintasan lari sekolah, mereka tetap mencari kunci bersama setiap malam, tanpa hasil. Monster datang makin banyak sampai suatu malam keduanya terluka parah dan Lin Qiushi nyaris tewas. Setelah itu jumlah monster terus berkurang, dan malam terus memendek."
      ],
      pull: "“Apakah ini hal yang baik?” Seharusnya begitu. Tapi Lin Qiushi tak bisa merasa lega.",
      after: [
        "Jawabannya ternyata ada di benda yang sudah tergantung di kamarnya sejak ia menyewa apartemen itu: sebuah jam dinding biasa yang berdentang setiap jam, dari satu sampai dua belas."
      ]
    },
    keluar: {
      toc: "Kunci di dalam jam",
      h2: "Memutar jam ke belakang",
      prose: [
        "Lin Qiushi memutar jarum jam berlawanan arah. Saat jarum melewati angka dua belas dan menunjuk sebelas, ingatan-ingatan bermunculan di depan matanya. Di angka sepuluh ia melihat dunia Hako Onna. Seluruh pintu yang pernah ia lewati berputar seperti di dalam kaleidoskop raksasa, dan di setiap ingatan ada Ruan Nanzhu yang mengulurkan tangan, atau berkata dingin, “Selamat datang di Obsidian.”",
        "Dari permukaan jam jatuh <strong>dua kunci tembaga hijau</strong> yang identik. Bedanya hanya ukiran samar di permukaannya, dan kedua kunci itu membawanya ke <a href=\"arc-twelfth-door.html\">pintu kedua belas</a>."
      ]
    }
  }
};
