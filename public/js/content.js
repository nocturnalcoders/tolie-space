window.TOLIE=(()=>{
'use strict';
/* =====================================================================
   CONTENT — edit the words here
   English lives in the main lists. Indonesian goes in fields ending in
   _id and in the ID block at the bottom; anything without a translation
   falls back to English.
   ===================================================================== */
const C={
  name:'Christianto Lie', role:'Senior Software Engineer', location:'Singapore', location_id:'Singapura',
  summary:'I design and build high-performance, scalable applications with solid system architecture: mostly on the backend, comfortable on the frontend, and always pushing for code that the next person can actually maintain.',
  summary_id:'Saya merancang dan membangun aplikasi berperforma tinggi dan skalabel dengan arsitektur sistem yang solid: lebih banyak di backend, nyaman di frontend, dan selalu mengusahakan kode yang benar-benar bisa dirawat oleh orang berikutnya.',
  site:'https://tolie.space',
  github:'https://github.com/nocturnalcoders',
  linkedin:'https://www.linkedin.com/in/christianto-lie',
  blog:'https://blog.tolie.space', lab:'https://lab.tolie.space',
  feed:'https://blog.tolie.space/feed.xml',   // latest posts on the writing desk and in the plain view; '' turns it off (see README)
  cv:''            // e.g. 'assets/christianto-lie-cv.pdf' — the CV links appear once this is set
};
/* Work history. Leave empty to point people at LinkedIn instead.
   {role:'Senior Software Engineer',company:'Acme',period:'2023 to now',period_id:'2023 sampai sekarang',note:'One line on what you did.',note_id:'Satu kalimat.'} */
const CAREER=[];
const EDU={school:'Universitas Bunda Mulia',period:'2017 to 2021',period_id:'2017 sampai 2021',
  degree:'Bachelor of Computer Science, majoring in Information Systems (Sistem Informasi)',degree_id:'Sarjana Komputer, jurusan Sistem Informasi'};
const SKILLS=[
  {area:'Backend',items:['Java','Spring Boot','Go','Python','Node.js','C# / .NET','PHP']},
  {area:'Frontend',items:['TypeScript','JavaScript','React','Redux','Angular','Vue','Tailwind']},
  {area:'Data',items:['PostgreSQL','MySQL','MongoDB','Redis']},
  {area:'DevOps',items:['Docker','Linux','Nginx','Jenkins','GitHub Actions']},
  {area:'Testing',items:['JUnit','Jest','Cypress','SonarQube']}
];
/* url = live site (optional), repo = source (optional) */
const PROJECTS=[
  {name:'tolie.space Lab',stack:['React','Flask','PostgreSQL','Docker'],url:C.lab,repo:C.github+'/tolie-lab',
    blurb:'A learn-to-code platform: free courses with Python exercises that run in the browser, quizzes, progress tracking and verifiable certificates, in Indonesian and English.',
    blurb_id:'Platform belajar coding: kursus gratis dengan latihan Python yang berjalan di browser, kuis, pelacakan kemajuan, dan sertifikat yang bisa diverifikasi, dalam bahasa Indonesia dan Inggris.'},
  {name:'tolie.space notes',stack:['React','Flask','PostgreSQL','Docker'],url:C.blog,repo:C.github+'/tolie-blog',
    blurb:'The blog behind this town. A React frontend, a Flask API and PostgreSQL, self-hosted with Docker Compose.',
    blurb_id:'Blog di balik kota ini. Frontend React, API Flask, dan PostgreSQL, di-host sendiri dengan Docker Compose.'},
  {name:'FOODWISE',stack:['React','FastAPI','PostgreSQL'],url:'https://foodwise-murex.vercel.app',repo:C.github+'/foodwise',
    blurb:'A household food management app: track what’s in the kitchen, plan meals and cut waste, with photo scan and AI recipe ideas.',
    blurb_id:'Aplikasi pengelolaan makanan rumah tangga: catat isi dapur, rencanakan menu, dan kurangi makanan terbuang, dengan pindai foto dan ide resep dari AI.'},
  {name:'Commerce API suite',stack:['Java'],repo:C.github+'/payment-api',
    blurb:'Four Java services covering payments, promo codes, e-vouchers and the store.',
    blurb_id:'Empat layanan Java untuk pembayaran, kode promo, e-voucher, dan toko.'},
  {name:'e-Kost platform',stack:['Go','Vue'],repo:C.github+'/BackendEkost',
    blurb:'A boarding-house (kost) platform built end to end: Go services and a Vue frontend.',
    blurb_id:'Platform kost yang dibangun dari ujung ke ujung: layanan Go dan frontend Vue.'},
  {name:'tolie.space',stack:['JavaScript','Canvas'],url:C.site,repo:C.github+'/tolie-space',
    blurb:'This little town. Drawn entirely in code on a canvas, with no game engine.',
    blurb_id:'Kota kecil ini. Digambar seluruhnya dengan kode di canvas, tanpa game engine.'}
];
/* shown under “Off the clock” in the plain view; k = key in DL */
const INTERESTS=[
  {t:'Futsal',k:'trophy'},{t:'Barça',k:'barca'},{t:'Anime',k:'tv'},
  {t:'Movies',t_id:'Film',k:'movies'},{t:'Reading',t_id:'Membaca',k:'readshelf'},{t:'New tech',t_id:'Teknologi baru',k:'techdesk'}
];
const CONTACT={
  to:'hi@tolie.space',
  web3formsKey:'330515c4-3205-4ed8-bd27-f4071df5d3b9',
  endpoint:''
};
/* Optional visitor stats with a self-hosted Umami (see README). Nothing is loaded while these are empty. */
const ANALYTICS={src:'',websiteId:''};

/* one line per place, shown in the town guide (map board, M key). Keys: world + the building ids */
const PLACE_INFO={
  world:{d:'The signpost, the mailbox for messages, a cat, and a futsal challenge.',d_id:'Papan penunjuk, kotak surat untuk pesan, seekor kucing, dan tantangan futsal.'},
  home:{d:'Who I am: education, business card, and where the late-night building happens.',d_id:'Tentang saya: pendidikan, kartu nama, dan tempat membangun sampai larut malam.'},
  work:{d:'The professional side: career, projects, and skills.',d_id:'Sisi profesional: karier, project, dan keahlian.'},
  blog:{d:'Writing: notes on building software and what I’m learning.',d_id:'Tulisan: catatan tentang membangun software dan hal yang sedang saya pelajari.'},
  lab:{d:'Experiments, prototypes, and half-baked ideas.',d_id:'Eksperimen, prototipe, dan ide setengah matang.'},
  den:{d:'Off the clock: Barça, anime, movies, books, and new tech.',d_id:'Di luar jam kerja: Barça, anime, film, buku, dan teknologi baru.'}
};

/* what each object in the town says. {n} in a page is filled in by the game. */
const DL={
  sign:{name:'Signpost',pages:['Welcome to tolie.space.','I’m Christianto Lie, but most people call me tolie. Senior software engineer, futsal player, night walker.','Wander around, peek inside the houses, and kick the ball on the court. Everything here is me, one way or another.','Anything with a little star above it has something to say. The map board by the house, or the M key, shows what you haven’t found yet.']},
  mail:{name:'Mailbox',pages:['Want to say hi? I’m nocturnalcoders on GitHub.','Longer thoughts live on the blog, and the half-baked experiments live in the lab.'],links:[{t:'GitHub',u:C.github},{t:'Blog',u:C.blog},{t:'Lab',u:C.lab}]},
  cat:{name:'Cat',pages:['Mrrp.','(The cat has no opinion on your code, but it approves of your company.)','(It seems to have decided to follow you.)']},
  map:{name:'Map board',pages:[]},
  friend:{name:'Futsal buddy',pages:['Oi! You look like you can play.','Challenge: put 3 goals in the net. Stand next to the ball and press E to shoot.','Come back when you’re done.']},
  friendGo:{name:'Futsal buddy',pages:['{n} of 3 so far. Keep shooting.']},
  friendDone:{name:'Futsal buddy',pages:['Three goals. Clean finishing!','Futsal is tolie’s reset button. If you ever want a game, drop a note in the mailbox.']},
  homeDesk:{name:'My desk',pages:['This is where the late-night building happens.','Senior software engineer by day, tinkerer by night.'],links:[{t:'GitHub',u:C.github}]},
  trophy:{name:'Futsal shelf',pages:['Boots by the door, ball on the shelf.','Futsal is my reset button. Nothing clears my head like a fast game.']},
  poster:{name:'Poster',pages:['A night walk through the city, painted the way I like to remember it.']},
  bed:{name:'Bed',pages:['Tempting. But there’s still one more commit to push.']},
  card:{name:'Business card',pages:[]},
  workDesk:{name:'Workstation',pages:['Senior Software Engineer.','I like building things that are fast, reliable, and pleasant to use, then sanding off the rough edges.'],links:[{t:'LinkedIn',u:C.linkedin},{t:'GitHub',u:C.github}]},
  board:{name:'Whiteboard',pages:['Architecture, trade-offs, and the occasional doodle.','Good engineering is mostly good decisions made calmly.']},
  rack:{name:'Server rack',pages:['Blinking lights make everything feel productive.']},
  coffee:{name:'Coffee machine',pages:['Fuel. Always fuel.']},
  career:{name:'Career log',pages:[]},
  projects:{name:'Project wall',pages:['Things I’ve built outside the day job.']},
  blogDesk:{name:'Writing desk',pages:['This is where posts get drafted.','Notes on building software, things I’m learning, and the odd tangent.'],links:[{t:'Open the blog',u:C.blog}]},
  books:{name:'Bookshelf',pages:['Half read, half intended to be read.']},
  nook:{name:'Reading nook',pages:['A good chair, a warm lamp, and a long article.']},
  labScreen:{name:'Experiment console',pages:['Prototypes, odd ideas, and things that might break.','If it’s half-baked but interesting, it lives here.'],links:[{t:'Open the lab',u:C.lab},{t:'GitHub',u:C.github}]},
  bench:{name:'Workbench',pages:['Please do not drink the blue one.']},
  compute:{name:'Compute',pages:['Quietly humming away at something.']},
  barca:{name:'Barça shirt',pages:['Visca Barça!','I love Barcelona, and I love Messi. Watching him play is pure joy.']},
  tv:{name:'The TV',pages:['I watch anime. A lot of it.','It’s how I unwind. The Ghibli look of this little town is no accident.']},
  movies:{name:'Movie poster',pages:['I love watching movies.','Lights off, snacks out. Best way to spend an evening.']},
  readshelf:{name:'Bookshelf',pages:['I love reading.','Books, long articles, docs, anything with a good idea in it.']},
  readnook:{name:'Reading chair',pages:['My favourite spot to get lost in a book.']},
  techdesk:{name:'Research desk',pages:['I’m a tech geek. I love researching and learning about new tech.','New frameworks, AI, hardware, how things work under the hood. If it’s new, I’m reading about it.']},
  edu:{name:'Diploma',pages:[]}
};

/* =====================================================================
   INDONESIAN
   dl:  same keys as DL (linkT = button labels, in the same order as links)
   str: every other piece of text, keyed by its English wording
   ===================================================================== */
const ID={
  dl:{
    sign:{name:'Papan penunjuk',pages:['Selamat datang di tolie.space.','Saya Christianto Lie, tapi kebanyakan orang memanggil saya tolie. Senior software engineer, pemain futsal, pejalan malam.','Jalan-jalan saja, intip isi rumah-rumahnya, dan tendang bola di lapangan. Semua yang ada di sini adalah saya, dengan satu atau lain cara.','Apa pun yang ada bintang kecil di atasnya punya cerita. Papan peta di dekat rumah, atau tombol M, menunjukkan apa yang belum kamu temukan.']},
    mail:{name:'Kotak surat',pages:['Mau menyapa? Saya nocturnalcoders di GitHub.','Tulisan yang lebih panjang ada di blog, dan eksperimen setengah matang ada di lab.']},
    cat:{name:'Kucing',pages:['Mrrp.','(Kucing ini tidak punya pendapat soal kodemu, tapi dia senang ditemani.)','(Sepertinya dia memutuskan untuk mengikutimu.)']},
    map:{name:'Papan peta'},
    friend:{name:'Teman futsal',pages:['Oi! Kelihatannya kamu bisa main.','Tantangan: cetak 3 gol. Berdiri di dekat bola lalu tekan E untuk menendang.','Balik lagi kalau sudah selesai.']},
    friendGo:{name:'Teman futsal',pages:['Baru {n} dari 3. Tendang terus.']},
    friendDone:{name:'Teman futsal',pages:['Tiga gol. Penyelesaian yang rapi!','Futsal itu tombol reset-nya tolie. Kalau mau main bareng, tinggalkan pesan di kotak surat.']},
    homeDesk:{name:'Meja saya',pages:['Di sinilah semua dibangun sampai larut malam.','Senior software engineer di siang hari, tukang utak-atik di malam hari.']},
    trophy:{name:'Rak futsal',pages:['Sepatu di dekat pintu, bola di rak.','Futsal itu tombol reset saya. Tidak ada yang menjernihkan kepala seperti satu pertandingan cepat.']},
    poster:{name:'Poster',pages:['Jalan malam menyusuri kota, dilukis seperti cara saya ingin mengingatnya.']},
    bed:{name:'Kasur',pages:['Menggoda. Tapi masih ada satu commit lagi yang harus di-push.']},
    card:{name:'Kartu nama'},
    workDesk:{name:'Meja kerja',pages:['Senior Software Engineer.','Saya suka membangun sesuatu yang cepat, andal, dan enak dipakai, lalu menghaluskan bagian-bagian yang masih kasar.']},
    board:{name:'Papan tulis',pages:['Arsitektur, trade-off, dan sesekali coretan iseng.','Engineering yang baik sebagian besar adalah keputusan baik yang diambil dengan tenang.']},
    rack:{name:'Rak server',pages:['Lampu yang berkedip membuat semuanya terasa produktif.']},
    coffee:{name:'Mesin kopi',pages:['Bahan bakar. Selalu bahan bakar.']},
    career:{name:'Catatan karier'},
    projects:{name:'Dinding project',pages:['Hal-hal yang saya bangun di luar pekerjaan utama.']},
    blogDesk:{name:'Meja tulis',pages:['Di sinilah tulisan-tulisan dirancang.','Catatan tentang membangun software, hal-hal yang sedang saya pelajari, dan sesekali melantur.'],linkT:['Buka blog']},
    books:{name:'Rak buku',pages:['Separuh sudah dibaca, separuh lagi niatnya dibaca.']},
    nook:{name:'Pojok baca',pages:['Kursi yang enak, lampu yang hangat, dan artikel yang panjang.']},
    labScreen:{name:'Konsol eksperimen',pages:['Prototipe, ide aneh, dan hal-hal yang mungkin rusak.','Kalau setengah matang tapi menarik, tempatnya di sini.'],linkT:['Buka lab','GitHub']},
    bench:{name:'Meja lab',pages:['Tolong jangan minum yang biru.']},
    compute:{name:'Komputasi',pages:['Berdengung pelan mengerjakan sesuatu.']},
    barca:{name:'Jersey Barça',pages:['Visca Barça!','Saya cinta Barcelona, dan saya cinta Messi. Menonton dia bermain itu kebahagiaan murni.']},
    tv:{name:'TV',pages:['Saya nonton anime. Banyak sekali.','Begitulah cara saya bersantai. Tampilan ala Ghibli di kota kecil ini bukan kebetulan.']},
    movies:{name:'Poster film',pages:['Saya suka nonton film.','Lampu mati, camilan siap. Cara terbaik menghabiskan malam.']},
    readshelf:{name:'Rak buku',pages:['Saya suka membaca.','Buku, artikel panjang, dokumentasi, apa saja yang punya ide bagus.']},
    readnook:{name:'Kursi baca',pages:['Tempat favorit saya untuk tenggelam dalam buku.']},
    techdesk:{name:'Meja riset',pages:['Saya penggila teknologi. Saya suka meriset dan belajar teknologi baru.','Framework baru, AI, hardware, cara kerja sesuatu di balik layar. Kalau baru, pasti saya baca.']},
    edu:{name:'Ijazah'}
  },
  str:{
    /* language switch: the button shows the language you would switch TO */
    langBtn:'EN', langName:'English', langAria:'Switch to English',
    /* title + HUD */
    'Christianto Lie’s little town':'Kota kecil Christianto Lie',
    'Loading…':'Memuat…',
    'Press Enter or tap to start':'Tekan Enter atau ketuk untuk mulai',
    'Best with sound on':'Lebih seru dengan suara menyala',
    'Skip the game, just the résumé →':'Lewati game, langsung ke résumé →',
    'WASD or arrows to move · Shift to run · E to interact or shoot':'WASD atau panah untuk bergerak · Shift untuk lari · E untuk interaksi atau menendang',
    'Goals':'Gol', 'GOALS':'GOL', 'GOAL!':'GOL!',
    'Plain view: skip the game':'Tampilan biasa: lewati game',
    'Day / night (N)':'Siang / malam (N)', 'Sound (V)':'Suara (V)', 'Town guide (M)':'Panduan kota (M)',
    /* places */
    'Tolie town':'Kota Tolie','Futsal court':'Lapangan futsal','The plaza':'Alun-alun','Lily pond':'Kolam teratai','Home street':'Jalan rumah',
    'Office row':'Deretan kantor','Blog lane':'Gang blog','Hobby den':'Ruang hobi','Lab yard':'Halaman lab',
    'Home':'Rumah','Office':'Kantor','Den':'Ruang hobi','Around town':'Sekitar kota',
    /* discoveries */
    'Town guide':'Panduan kota',
    '{n} of {m} found. A star marks what you haven’t opened yet.':'{n} dari {m} ditemukan. Bintang menandai yang belum kamu buka.',
    'You found everything!':'Semua sudah ditemukan!',
    'You are here':'Kamu di sini',
    'Challenge complete!':'Tantangan selesai!',
    /* generated dialog text */
    '{role}, based in {loc}.':'{role}, berbasis di {loc}.',
    'The full timeline lives on LinkedIn.':'Riwayat lengkapnya ada di LinkedIn.',
    '{role} at {company}, {period}.':'{role} di {company}, {period}.',
    'More on GitHub':'Lainnya di GitHub','Download CV':'Unduh CV',
    'Latest on the blog: {list}.':'Terbaru di blog: {list}.',
    /* contact form */
    'Contact me':'Hubungi saya',
    'Drop a note in the mailbox and it lands in my inbox.':'Tinggalkan pesan di kotak surat, nanti langsung masuk ke inbox saya.',
    'Your email':'Email kamu','Subject':'Subjek','Message':'Pesan','Send':'Kirim','Sending…':'Mengirim…',
    'Enter a valid email so I can reply.':'Masukkan email yang valid supaya saya bisa membalas.',
    'Add a short subject.':'Tambahkan subjek singkat.',
    'Write a message of at least a few words.':'Tulis pesan minimal beberapa kata.',
    'Sent. Thanks, I’ll get back to you soon.':'Terkirim. Terima kasih, saya akan segera membalas.',
    'Give it a few seconds before sending another.':'Tunggu beberapa detik sebelum mengirim lagi.',
    'Couldn’t send that. Please try again in a moment.':'Gagal mengirim. Coba lagi sebentar lagi.',
    'Couldn’t reach the mail service. ':'Tidak bisa menghubungi layanan email. ',
    'Email me directly instead.':'Kirim email langsung saja.',
    'The form isn’t connected yet, so I opened your email app instead.':'Formulir belum tersambung, jadi saya bukakan aplikasi email kamu.',
    /* business card */
    'Phone':'Telepon','Show number':'Tampilkan nomor','Made after dark.':'Dibuat setelah gelap.','Flip card':'Balik kartu',
    'Click the card to flip it. Esc to close.':'Klik kartu untuk membaliknya. Esc untuk menutup.',
    /* plain view */
    '← Back to the town':'← Kembali ke kota','Enter the town →':'Masuk ke kota →','Send a message':'Kirim pesan',
    'Experience':'Pengalaman','Projects':'Project','Skills':'Keahlian','Education':'Pendidikan','Off the clock':'Di luar jam kerja',
    'Visit':'Kunjungi','Source':'Kode sumber','Writing':'Tulisan','Save as PDF':'Simpan sebagai PDF','Link to this section':'Tautan ke bagian ini'
  }
};
/* English for the few keys that are not their own wording */
const STR={langBtn:'ID',langName:'Bahasa Indonesia',langAria:'Ganti ke Bahasa Indonesia'};

return {C,CONTACT,ANALYTICS,DL,PLACE_INFO,ID,STR,CAREER,EDU,SKILLS,PROJECTS,INTERESTS};
})();
