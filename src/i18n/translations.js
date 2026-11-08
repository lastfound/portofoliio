import imgDigiUp from '../assets/sertifikat DigiUp.jpg';
import imgElevAlte from '../assets/elevAlte.jpg';
import imgDilesin from '../assets/Dilesin.jpg';

const translations = {
  /* ─────────────────────────────────────────
     NAVBAR
  ───────────────────────────────────────── */
  navbar: {
    links: {
      intro:      { id: 'Intro',       en: 'Intro'   },
      tentang:    { id: 'Tentang',     en: 'About'   },
      keahlian:   { id: 'Keahlian',    en: 'Skills'  },
      projek:     { id: 'Karya',       en: 'Work'    },
      sertifikat: { id: 'Sertifikat',  en: 'Certs'   },
      kontak:     { id: 'Kontak',      en: 'Contact' },
    },
    available: { id: 'Tersedia',   en: 'Available' },
  },

  /* ─────────────────────────────────────────
     INTRODUCTION (HERO)
  ───────────────────────────────────────── */
  intro: {
    label:     { id: 'Portofolio — 2025',  en: 'Portfolio — 2025'  },
    roles: {
      id: ['AI Architecture Enthusiast', 'Full Stack Developer', 'App Developer', 'Software Engineer'],
      en: ['AI Architecture Enthusiast', 'Full Stack Developer', 'App Developer', 'Software Engineer'],
    },
    bio: {
      id: 'Saya membangun pengalaman digital yang presisi dan berkinerja tinggi — menggabungkan arsitektur modern dengan interaksi yang mulus dan performa optimal.',
      en: 'I engineer high-performance, precision digital experiences — combining modern architecture with seamless interactions and optimal performance.',
    },
    stats: {
      id: [
        { num: '3+',   label: 'Proyek'    },
        { num: '3',    label: 'Sertifikat' },
        { num: '100%', label: 'Dedikasi'  },
      ],
      en: [
        { num: '3+',   label: 'Projects'  },
        { num: '3',    label: 'Certs'     },
        { num: '100%', label: 'Dedicated' },
      ],
    },
    viewWork:     { id: 'Lihat Karya →',   en: 'View Work →' },
    exploreAbout: { id: 'Tentang Saya ↓',  en: 'About Me ↓' },
    avatarSub:    { id: 'AI & Software Engineer', en: 'AI & Software Engineer' },
    badgeStatus:  { id: 'Buka untuk Kerja',   en: 'Open to Work' },
  },

  /* ─────────────────────────────────────────
     ABOUT (NARASI TULISAN: MINAT & PENDIDIKAN)
  ───────────────────────────────────────── */
  about: {
    eyebrow:      { id: '// 02 — TENTANG SAYA',        en: '// 02 — ABOUT ME' },
    title:        { id: 'Eksplorasi &',               en: 'Exploration &' },
    titleAccent:  { id: 'Perjalanan',                 en: 'Journey' },

    // Bab 1: Minat & Visi Karir AI Architecture & Riset
    chapter1: {
      tag: '// 01. ASPIRASI & ARSITEKTUR AI',
      role: { id: 'Web & AI Developer — Riset & Machine Learning', en: 'Web & AI Developer — Machine Learning & Research' },
      title: {
        id: 'Pengembangan Web, Machine Learning, dan Riset AI Masa Depan',
        en: 'Web Engineering, Machine Learning, and Future AI Research'
      },
      lead: {
        id: 'Halo! Saya adalah siswa kelas 12 SMK yang berfokus pada pengembangan web dan kecerdasan buatan. Saat ini saya sedang aktif mempelajari dasar-dasar Machine Learning dan bercita-cita untuk berkontribusi dalam riset AI di masa depan.',
        en: 'Hello! I am a 12th-grade vocational high school student dedicated to modern web development and artificial intelligence. Currently, I am actively exploring the fundamentals of Machine Learning with an ambition to contribute to future AI research.'
      },
      paragraphs: [
        {
          id: 'Perjalanan teknologi saya berakar dari ketertarikan kuat dalam menyatukan rekayasa web yang presisi dengan sistem kecerdasan buatan. Sebagai siswa kelas 12 di SMK Telkom Purwokerto, saya mendedikasikan waktu untuk membedah bagaimana algoritma Machine Learning bekerja dari fondasi dasarnya — mulai dari pengolahan data terstruktur, pelatihan model, hingga integrasi model inferensi cerdas ke dalam aplikasi web produksi yang interaktif.',
          en: 'My journey is driven by a deep fascination with bridging high-precision web engineering and artificial intelligence systems. As a 12th-grade student at SMK Telkom Purwokerto, I dedicate my focus to understanding how Machine Learning algorithms function from first principles — from structured data preprocessing and model training to integrating intelligent inference models into interactive production web apps.'
        },
        {
          id: 'Bagi saya, mendalami AI bukan hanya soal memanfaatkan model yang sudah jadi, melainkan menyelami arsitektur komputasi dan prinsip ilmiah di balik penalaran mesin. Aspirasi terbesar saya adalah melangkah ke garis depan eksplorasi teknologi — merancang arsitektur sistem yang scalable serta turut aktif berkontribusi dalam riset kecerdasan buatan yang berdampak luas bagi peradaban.',
          en: 'To me, exploring AI is not simply about consuming pre-existing models, but delving into computational architectures and the scientific principles behind machine reasoning. My greatest aspiration is to advance to the frontiers of technological innovation — architecting scalable systems and actively contributing to impactful AI research for the future.'
        }
      ],
      quote: {
        id: '“Dari bangku SMK menuju batas inovasi: mengasah logika komputasi hari ini untuk membuka jalan kontribusi nyata dalam riset kecerdasan buatan di masa depan.”',
        en: '“From vocational high school foundations to the frontiers of innovation: sharpening computational logic today to pave the way for real contributions to future AI research.”'
      }
    },

    // Bab 2: Riwayat Perjalanan Pendidikan
    chapter2: {
      tag: '// 02. JEJAK PENDIDIKAN',
      title: {
        id: 'Formasi Disiplin & Perjalanan Akademik',
        en: 'Academic Formation & Educational Pathway'
      },
      lead: {
        id: 'Setiap jenjang sekolah menjadi babak penting yang menumbuhkan cara berpikir analitis, disiplin logika, dan dedikasi saya terhadap dunia teknologi komputasi.',
        en: 'Every educational stage represents an essential chapter nurturing my analytical mindset, logical rigor, and dedication to computing technology.'
      },
      journey: [
        {
          tag: 'SMK',
          school: 'SMK TELKOM PURWOKERTO',
          period: '2023 — Sekarang',
          status: { id: 'Sedang Berjalan (Kelas 12)', en: 'In Progress (Grade 12)' },
          level: { id: 'Rekayasa Perangkat Lunak', en: 'Software Engineering' },
          story: {
            id: 'Menempuh pendidikan kejuruan di bidang Rekayasa Perangkat Lunak (RPL). Di sinilah kemampuan teknis saya diasah secara intensif — mulai dari arsitektur web modern, algoritma pemrograman terstruktur, pengelolaan database, hingga eksplorasi mendalam pada sistem AI terapan dan proyek kolaboratif nyata.',
            en: 'Pursuing vocational studies in Software Engineering (RPL). This is where my technical craftsmanship is rigorously honed — encompassing modern web architecture, structured algorithms, database management, and hands-on explorations into applied AI systems and collaborative real-world projects.'
          }
        },
        {
          tag: 'SMP',
          school: 'SMP AL-IRSYAD AL-ISLAMIYYAH PURWOKERTO',
          period: '2020 — 2023',
          status: { id: 'Tamat Belajar', en: 'Graduated' },
          level: { id: 'Pendidikan Menengah Pertama', en: 'Junior Secondary' },
          story: {
            id: 'Fase penting dalam mengasah logika berpikir, kedisiplinan belajar, dan ketertarikan awal pada dunia komputer dan sains. Menjadi fondasi pembentukan etos kerja analitis dan rasa ingin tahu yang tidak pernah padam terhadap teknologi digital.',
            en: 'A pivotal phase in sharpening analytical thinking, study discipline, and early fascination with computing and science. It laid the foundation for an analytical mindset and an unquenchable curiosity toward digital technology.'
          }
        },
        {
          tag: 'SD',
          school: 'SD ISLAM AL-IZZAH PURWOKERTO',
          period: '2014 — 2020',
          status: { id: 'Tamat Belajar', en: 'Graduated' },
          level: { id: 'Pendidikan Dasar', en: 'Primary Education' },
          story: {
            id: 'Tempat pertama di mana nilai-nilai integritas, karakter mandiri, dan rasa ingin tahu terhadap sains mulai dibangun. Menjadi pijakan awal yang kokoh dalam proses belajar dan cara saya memandang eksplorasi ilmu pengetahuan hingga saat ini.',
            en: 'Where values of integrity, independent character, and scientific curiosity were first cultivated. It established the bedrock for my learning philosophy and continuous exploration of knowledge today.'
          }
        }
      ]
    }
  },

  /* ─────────────────────────────────────────
     KEAHLIAN (CORE SKILLS & CAPABILITIES)
  ───────────────────────────────────────── */
  keahlian: {
    eyebrow:      { id: '// 03 — SPESIALISASI TEKNIS', en: '// 03 — TECHNICAL SPECIALIZATION' },
    title:        { id: 'Pilar',                       en: 'Core' },
    titleAccent:  { id: 'Keahlian',                    en: 'Skills' },
    lead: {
      id: 'Empat domain keahlian inti yang saya tekuni secara mendalam untuk merancang arsitektur, mengembangkan aplikasi modern, dan mengolah data komputasi.',
      en: 'Four core specialization domains deeply cultivated to architect, engineer modern software, and orchestrate computational data.'
    },
    items: [
      {
        num: '01',
        title: 'App Dev',
        role: { id: 'Mobile Application Engineering', en: 'Mobile Application Engineering' },
        desc: {
          id: 'Pengembangan aplikasi mobile modern dengan arsitektur reaktif, manajemen state efisien, performa native yang mulus, serta integrasi endpoint API di ekosistem Android.',
          en: 'Modern mobile app engineering with reactive architecture, robust state management, smooth native performance, and seamless API integration across the Android ecosystem.'
        },
        tags: ['Android', 'Kotlin', 'React Native', 'Mobile Architecture', 'Offline-First'],
      },
      {
        num: '02',
        title: 'Web Dev',
        role: { id: 'Full Stack Web Engineering', en: 'Full Stack Web Engineering' },
        desc: {
          id: 'Perancangan dan implementasi aplikasi web skala penuh end-to-end, RESTful API yang aman, optimasi kecepatan render, serta struktur database yang scalable.',
          en: 'End-to-end full stack web architecture, secure RESTful systems, high-speed render optimization, and scalable modern database structures.'
        },
        tags: ['React.js', 'Node.js', 'Laravel', 'Express', 'Tailwind', 'RESTful API'],
      },
      {
        num: '03',
        title: 'Data Science',
        role: { id: 'Data Science & Machine Learning', en: 'Data Science & Machine Learning' },
        desc: {
          id: 'Analisis dataset kompleks, pemodelan statistik, eksplorasi pipeline AI inferensi, manipulasi data matematis, dan visualisasi analitik untuk sistem cerdas.',
          en: 'Complex dataset analysis, statistical modeling, inference AI pipeline exploration, mathematical data manipulation, and analytical visualization for intelligent systems.'
        },
        tags: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'PyTorch Basics', 'Data Pipeline'],
      },
      {
        num: '04',
        title: 'UI/UX Designer',
        role: { id: 'Interface & User Experience Design', en: 'Interface & User Experience Design' },
        desc: {
          id: 'Perancangan antarmuka visual presisi tinggi yang ergonomis dan intuitif, wireframing, sistem desain konsisten, serta prototipe interaktif berfokus kenyamanan pengguna.',
          en: 'High-precision, ergonomic, and intuitive visual interface design, structured wireframing, cohesive design systems, and interactive user-centered prototyping.'
        },
        tags: ['Figma', 'Design Systems', 'Wireframing', 'Prototyping', 'User Research', 'Ergonomics'],
      },
    ],
  },

  /* ─────────────────────────────────────────
     PROJEK (CINEMATIC SHOWCASE)
  ───────────────────────────────────────── */
  projek: {
    eyebrow:      { id: '// 04 — KARYA PILIHAN',    en: '// 04 — SELECTED WORKS'    },
    title:        { id: 'Karya &',                  en: 'Featured &'                },
    titleAccent:  { id: 'Proyek',                   en: 'Projects'                  },
    lead: {
      id: 'Implementasi nyata dari rekayasa perangkat lunak, antarmuka visual presisi tinggi, dan arsitektur web modern yang telah dideploy ke produksi.',
      en: 'Tangible implementations of software engineering, high-precision visual interfaces, and modern web architectures deployed to production.'
    },
    viewProject:  { id: 'Eksplorasi Proyek ↗',      en: 'Explore Project ↗'         },
    liveBadge:    { id: 'LIVE DEMO',                en: 'LIVE DEMO'                 },
    items: [
      {
        id: '01',
        name: { id: 'Website Boanana', en: 'Boanana Platform' },
        category: { id: 'E-Commerce & Brand Showcase', en: 'E-Commerce & Brand Showcase' },
        desc: {
          id: 'Platform komersial interaktif untuk produk kripik pisang UMKM Boanana. Dibangun menggunakan arsitektur React dan Vite berkinerja tinggi, dilengkapi visualisasi produk responsif, micro-interactions mulus, dan hierarki visual terarah.',
          en: 'An interactive commercial platform for the Boanana banana chips brand. Built using high-performance React and Vite, featuring responsive product showcases, fluid micro-interactions, and a structured visual hierarchy.'
        },
        tags: ['React', 'Vite', 'Node.js', 'Figma', 'Responsive UI'],
        link: 'https://lastfound.github.io/boanana/',
        urlDisplay: 'lastfound.github.io/boanana',
      },
      {
        id: '02',
        name: { id: 'Exlusif Automotive', en: 'Exlusif Automotive' },
        category: { id: 'Automotive Showroom & Analytics', en: 'Automotive Showroom & Analytics' },
        desc: {
          id: 'Platform portal showroom otomotif modern dengan antarmuka elegan, visualisasi spesifikasi kendaraan terstruktur, dashboard analitik berbasis Chart.js, serta alur penawaran interaktif yang teroptimasi untuk konversi.',
          en: 'A modern automotive showroom portal featuring an elegant interface, structured vehicle specification catalog, Chart.js analytics dashboard, and an interactive lead inquiry flow optimized for conversions.'
        },
        tags: ['Vue.js', 'Chart.js', 'Laravel', 'MySQL', 'Design System'],
        link: 'https://lastfound.github.io/ExlusifAutomotive/',
        urlDisplay: 'lastfound.github.io/ExlusifAutomotive',
      },
      {
        id: '03',
        name: { id: 'Real-Time Communication App', en: 'Real-Time Communication App' },
        category: { id: 'WebSocket & Distributed State', en: 'WebSocket & Distributed State' },
        desc: {
          id: 'Aplikasi perpesanan instan real-time berlatensi rendah dengan arsitektur WebSocket (Socket.io). Mendukung transmisi data instan, room komunikasi terisolasi, status kehadiran aktif, dan manajemen state terdistribusi.',
          en: 'A low-latency real-time instant messaging application powered by WebSocket (Socket.io). Supports instant bi-directional messaging, isolated conversation rooms, active presence status, and distributed state management.'
        },
        tags: ['Socket.io', 'Express', 'Node.js', 'WebSocket', 'Redis Architecture'],
        link: 'https://github.com/lastfound',
        urlDisplay: 'github.com/lastfound/realtime-chat',
      },
    ],
  },

  /* ─────────────────────────────────────────
     SERTIFIKAT
  ───────────────────────────────────────── */
  sertifikat: {
    eyebrow:   { id: 'Kredensial Resmi',  en: 'Official Credentials' },
    title:     { id: 'Sertifikat',        en: 'Certificates'         },
    titleAccent: { id: 'Saya',            en: 'Earned'               },
    verified:  { id: 'Terverifikasi',     en: 'Verified'             },
    viewCert:  { id: 'Buka Dokumen →',    en: 'Open Document →'      },
    previewHint: { id: 'Lihat Sertifikat', en: 'View Certificate'    },
    newBadge:  { id: 'BARU',              en: 'NEW'                  },
    closeModal: { id: 'Tutup',            en: 'Close'                },
    openFull:  { id: 'Buka Resolusi Penuh ↗', en: 'Open Full Size ↗' },
    items: [
      {
        id: 'cert-digiup',
        image: imgDigiUp,
        isNew: true,
        issuer: 'Telkom Indonesia & PT TPCC',
        name: {
          id: 'Sertifikasi Digital Marketing — Telkom DigiUp 2025',
          en: 'Digital Marketing Certification — Telkom DigiUp 2025',
        },
        date: {
          id: 'Diterbitkan: 22 Desember 2025 • No: D2500410',
          en: 'Issued: December 22, 2025 • ID: D2500410',
        },
        desc: {
          id: 'Program Sertifikasi Pelatihan Digital Marketing dalam program Telkom DigiUp 2025 dengan predikat Certified setelah menyelesaikan seluruh persyaratan pelatihan.',
          en: 'Digital Marketing Training Certification under the Telkom DigiUp 2025 program with Certified grade after fulfilling all curriculum requirements.',
        },
        verified: true,
        link: imgDigiUp,
      },
      {
        id: 'cert-elevAlte',
        image: imgElevAlte,
        issuer: 'Microsoft, KOMDIGI & elevAlte',
        name: {
          id: 'Preparation Course for Azure AI Fundamentals (AI-900)',
          en: 'Preparation Course for Azure AI Fundamentals (AI-900)',
        },
        date: {
          id: 'Diterbitkan: 25 Juli 2025 • No: 027c0c2e',
          en: 'Issued: July 25, 2025 • ID: 027c0c2e',
        },
        desc: {
          id: 'Kursus persiapan resmi untuk sertifikasi Azure AI Fundamentals (AI-900) diselenggarakan oleh Microsoft bersama Kementerian Komunikasi dan Digital (KOMDIGI) dan elevAlte.',
          en: 'Official preparation course for Azure AI Fundamentals (AI-900) certification organized by Microsoft with KOMDIGI and elevAlte.',
        },
        verified: true,
        link: imgElevAlte,
      },
      {
        id: 'cert-dilesin',
        image: imgDilesin,
        issuer: 'Dilesin Academy',
        name: {
          id: 'Kuasai Git Untuk Developer Pemula',
          en: 'Git Mastery for Beginner Developers',
        },
        date: {
          id: 'Diterbitkan: 27 Oktober 2025 • No: 0430/KAT/SUB/EDU/CER/10/2025',
          en: 'Issued: October 27, 2025 • ID: 0430/KAT/SUB/EDU/CER/10/2025',
        },
        desc: {
          id: 'Pelatihan intensif penguasaan Version Control System dengan Git dan GitHub untuk alur kerja kolaborasi pengembangan software modern.',
          en: 'Intensive training in Git and GitHub version control system for modern collaborative software development workflows.',
        },
        verified: true,
        link: imgDilesin,
      },
    ],
  },

  /* ─────────────────────────────────────────
     KONTAK
  ───────────────────────────────────────── */
  kontak: {
    eyebrow:   { id: 'Hubungi Saya',    en: 'Get in Touch'      },
    title:     { id: 'Mari',            en: "Let's"             },
    titleAccent: { id: 'Berkolaborasi', en: 'Collaborate'       },
    intro: {
      id: 'Tertarik bekerja sama atau memiliki pertanyaan seputar proyek? Saya selalu terbuka untuk diskusi profesional dan kolaborasi teknologi.',
      en: "Interested in working together or have questions regarding a project? I'm always open to professional discussions and tech collaboration.",
    },
    channels: [
      { label: { id: 'Email', en: 'Email' },
        value: 'rafi.ibra09@gmail.com',
        href: 'https://mail.google.com/mail/u/2/#inbox' },
      { label: { id: 'GitHub', en: 'GitHub' },
        value: 'github.com/lastfound',
        href: 'https://github.com/lastfound' },
      { label: { id: 'LinkedIn', en: 'LinkedIn' },
        value: 'linkedin.com/in/rafi-ibrahim-749492384',
        href: 'https://www.linkedin.com/in/rafi-ibrahim-749492384' },
    ],
    form: {
      name:        { id: 'Nama Lengkap',    en: 'Full Name'       },
      namePh:      { id: 'Nama lengkap Anda', en: 'Your full name' },
      email:       { id: 'Alamat Email',    en: 'Email Address'   },
      emailPh:     { id: 'email@domain.com', en: 'email@domain.com' },
      subject:     { id: 'Subjek',          en: 'Subject'         },
      subjectPh:   { id: 'Subjek pesan',    en: 'Message subject' },
      message:     { id: 'Pesan',           en: 'Message'         },
      messagePh:   { id: 'Tulis pesan Anda...', en: 'Write your message...' },
      submit:      { id: 'Kirim Pesan →',   en: 'Send Message →'  },
      errorMsg:    { id: 'Mohon isi nama dan email terlebih dahulu.', en: 'Please fill in both name and email.' },
      successMsg:  { id: 'Pesan terkirim! Terima kasih telah menghubungi.', en: 'Message sent! Thank you for reaching out.' },
    },
  },

  /* ─────────────────────────────────────────
     FOOTER
  ───────────────────────────────────────── */
  footer: {
    openTo: { id: 'Terbuka untuk Peluang Kerja', en: 'Open for Opportunities' },
  },

  /* ─────────────────────────────────────────
     AI WIDGET
  ───────────────────────────────────────── */
  ai: {
    buttonLabel: { id: 'Buka Asisten AI', en: 'Open AI Assistant' },
    subtitle:    { id: 'Asisten Portofolio', en: 'Portfolio Assistant' },
    closeLabel:  { id: 'Tutup', en: 'Close' },
    opening:     { id: 'Menyiapkan Asisten...', en: 'Preparing Assistant...' },
  },
};

export default translations;
