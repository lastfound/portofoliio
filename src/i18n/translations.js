const translations = {
  /* ─────────────────────────────────────────
     NAVBAR
  ───────────────────────────────────────── */
  navbar: {
    links: {
      tentang:    { id: 'Tentang',     en: 'About'   },
      projek:     { id: 'Karya',       en: 'Work'    },
      sertifikat: { id: 'Sertifikat',  en: 'Certs'   },
      kontak:     { id: 'Kontak',      en: 'Contact' },
    },
    available: { id: 'Tersedia',   en: 'Available' },
  },

  /* ─────────────────────────────────────────
     HERO / TENTANG
  ───────────────────────────────────────── */
  tentang: {
    label:     { id: 'Portofolio — 2025',  en: 'Portfolio — 2025'  },
    roles: {
      id: ['Full Stack Developer', 'UI / UX Designer', 'React Developer', 'Front-End Engineer'],
      en: ['Full Stack Developer', 'UI / UX Designer', 'React Developer', 'Front-End Engineer'],
    },
    bio: {
      id: 'Saya membangun pengalaman digital yang indah dan fungsional — menggabungkan antarmuka modern dengan performa tinggi dan UX yang intuitif.',
      en: 'I build beautiful, functional digital experiences — combining modern interfaces with high performance and intuitive UX.',
    },
    stats: {
      id: [
        { num: '3+',   label: 'Proyek'    },
        { num: '2+',   label: 'Sertif.'   },
        { num: '100%', label: 'Dedikasi'  },
      ],
      en: [
        { num: '3+',   label: 'Projects'  },
        { num: '2+',   label: 'Certs'     },
        { num: '100%', label: 'Dedicated' },
      ],
    },
    viewWork:    { id: 'Lihat Karya →', en: 'View Work →' },
    avatarSub:   { id: 'Web Developer', en: 'Web Developer' },
    badgeStatus: { id: 'Buka untuk Kerja', en: 'Open to Work' },
  },

  /* ─────────────────────────────────────────
     PROJEK
  ───────────────────────────────────────── */
  projek: {
    eyebrow:   { id: 'Karya Terbaik',  en: 'Featured Work'  },
    title:     { id: 'Proyek Web',     en: 'Web Projects'   },
    titleAccent: { id: 'Web',          en: 'Web'            },
    viewProject: { id: 'Lihat Proyek →', en: 'View Project →' },
    items: [
      {
        id: '001', emoji: '🛍️',
        name: { id: 'Website Boanana', en: 'Boanana Website' },
        desc: {
          id: 'Platform produk kripik pisang milik UMKM bernama Boanana yang dibuat menggunakan React Vite dengan tampilan yang menarik dan lucu.',
          en: 'A banana chip product platform for an UMKM brand called Boanana, built with React Vite featuring a fun and attractive design.',
        },
        tags: ['React', 'Node.js', 'Vite', 'Figma'],
        link: 'https://lastfound.github.io/boanana/',
      },
      {
        id: '002', emoji: '🚗',
        name: { id: 'Exlusif Automotive',  en: 'Exlusif Automotive'  },
        desc: {
          id: 'Website showroom otomotif eksklusif dengan tampilan premium, katalog kendaraan interaktif, dan formulir pemesanan terintegrasi.',
          en: 'An exclusive automotive showroom website with a premium look, interactive vehicle catalog, and integrated booking form.',
        },
        tags: ['Vue.js', 'Chart.js', 'Laravel', 'MySQL'],
        link: 'https://lastfound.github.io/ExlusifAutomotive/',
      },
      {
        id: '003', emoji: '💬',
        name: { id: 'Aplikasi Chat Real-Time', en: 'Real-Time Chat App' },
        desc: {
          id: 'Aplikasi pesan instan berbasis WebSocket dengan fitur room chat, notifikasi push, dan pengiriman file multimedia.',
          en: 'An instant messaging app powered by WebSocket with room chat, push notifications, and multimedia file sharing.',
        },
        tags: ['Socket.io', 'Express', 'PostgreSQL', 'Redis'],
        link: '#',
      },
    ],
  },

  /* ─────────────────────────────────────────
     SERTIFIKAT
  ───────────────────────────────────────── */
  sertifikat: {
    eyebrow:   { id: 'Kredensial Resmi',  en: 'Official Credentials' },
    title:     { id: 'Sertifikat',        en: 'Certificates'         },
    titleAccent: { id: 'Saya',            en: 'I Earned'             },
    verified:  { id: '✓ Terverifikasi',   en: '✓ Verified'           },
    viewCert:  { id: 'Lihat Sertifikat →', en: 'View Certificate →'  },
    items: [
      {
        id: 'cert-01', icon: '🏆',
        issuer: 'Dicoding Indonesia',
        name: { id: 'Belajar Dasar Pemrograman Web', en: 'Web Programming Fundamentals' },
        date: {
          id: 'Diterbitkan: Januari 2024 • Berlaku Selamanya',
          en: 'Issued: January 2024 • No Expiration',
        },
        desc: {
          id: 'Menguasai dasar-dasar pengembangan web mencakup HTML5 semantik, CSS3 modern, dan JavaScript ES6+.',
          en: 'Mastered web development fundamentals including semantic HTML5, modern CSS3, and JavaScript ES6+.',
        },
        verified: true,
        link: '#',
      },
      {
        id: 'cert-02', icon: '🎓',
        issuer: 'Coursera — Meta',
        name: { id: 'Front-End Developer Professional', en: 'Front-End Developer Professional' },
        date: {
          id: 'Diterbitkan: Maret 2024 • Berlaku Selamanya',
          en: 'Issued: March 2024 • No Expiration',
        },
        desc: {
          id: 'Program profesional komprehensif mencakup React.js, UX/UI Design, dan praktik pengembangan web modern.',
          en: 'Comprehensive professional program covering React.js, UX/UI Design, and modern web development practices.',
        },
        verified: true,
        link: '#',
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
      id: 'Punya proyek menarik atau ingin bekerja sama? Saya selalu terbuka untuk ide-ide baru dan peluang yang menantang.',
      en: "Have an interesting project or want to work together? I'm always open to new ideas and opportunities.",
    },
    channels: [
      { icon: '✉', label: { id: 'Email', en: 'Email' },
        value: 'rafi.ibra09@gmail.com',
        href: 'https://mail.google.com/mail/u/2/#inbox' },
      { icon: '⚡', label: { id: 'GitHub', en: 'GitHub' },
        value: 'github.com/lastfound',
        href: 'https://github.com/lastfound' },
      { icon: '⬡', label: { id: 'LinkedIn', en: 'LinkedIn' },
        value: 'linkedin.com/in/rafi-ibrahim-749492384',
        href: 'https://www.linkedin.com/in/rafi-ibrahim-749492384' },
    ],
    form: {
      name:        { id: 'Nama Lengkap',    en: 'Full Name'       },
      namePh:      { id: 'Nama kamu',       en: 'Your name'       },
      email:       { id: 'Alamat Email',    en: 'Email Address'   },
      emailPh:     { id: 'emailkamu@gmail.com', en: 'youremail@gmail.com' },
      subject:     { id: 'Subjek',          en: 'Subject'         },
      subjectPh:   { id: 'Apa ini tentang?', en: 'What is this about?' },
      message:     { id: 'Pesan',           en: 'Message'         },
      messagePh:   { id: 'Ceritakan lebih...', en: 'Tell me more...' },
      submit:      { id: 'Kirim Pesan →',   en: 'Send Message →'  },
      submitting:  { id: 'Mengirim...',     en: 'Sending...'      },
      successMsg:  { id: 'Pesan berhasil dikirim.', en: 'Message sent successfully.' },
      errorMsg:    { id: 'Tolong isi nama dan email kamu.', en: 'Please fill in your name and email.' },
    },
  },

  /* ─────────────────────────────────────────
     FOOTER
  ───────────────────────────────────────── */
  footer: {
    openTo: { id: 'Terbuka untuk proyek baru', en: 'Open to new projects' },
  },

  /* ─────────────────────────────────────────
     AI WIDGET / QnA
  ───────────────────────────────────────── */
  ai: {
    buttonLabel:   { id: 'Buka Fora AI',        en: 'Open Fora AI'          },
    subtitle:      { id: 'Asisten AI Portofolio', en: 'Portfolio AI Assistant' },
    closeLabel:    { id: 'Tutup Fora',           en: 'Close Fora'            },
    opening:       { id: 'Membuka Fora...',      en: 'Opening Fora...'       },
    eyebrow:       { id: 'AI Tanya Jawab',       en: 'AI Assistant'          },
    panelTitle:    { id: 'Fora siap membantu',   en: 'Fora is here to help'  },
    intro: {
      id: 'Tanyakan apa saja tentang portofolio ini, skill, pengalaman, atau proyek yang saya kerjakan. Ketik tutup lalu kirim untuk menutup jendela ini.',
      en: 'Ask anything about this portfolio — skills, experience, or projects. Type close and send to dismiss this panel.',
    },
    placeholder:   { id: 'Tulis pertanyaanmu… (Enter untuk kirim)', en: 'Type your question… (Enter to send)' },
    send:          { id: 'Kirim →',              en: 'Send →'                },
    processing:    { id: 'Memproses...',         en: 'Processing...'         },
    thinking:      { id: 'Fora sedang berpikir', en: 'Fora is thinking'      },
    seeyou:        { id: 'Sampai jumpa',         en: 'See you soon'          },
    closeKeyword:  { id: 'tutup',                en: 'close'                 },
    greeting: {
      id: 'Halo! Saya Fora, asisten AI portofolio. Tanyakan apa saja tentang skill, proyek, pengalaman, atau kontak.',
      en: "Hi! I'm Fora, the portfolio AI assistant. Ask me anything about skills, projects, experience, or contact info.",
    },
    networkError: {
      id: 'Maaf, jawaban AI tidak tersedia saat ini. Periksa kembali koneksi internet kamu.',
      en: 'Sorry, AI response is unavailable right now. Please check your internet connection.',
    },
  },
};

export default translations;
