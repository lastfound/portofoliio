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
      id: ['AI Architecture Enthusiast', 'Full Stack Developer', 'React Developer', 'Software Engineer'],
      en: ['AI Architecture Enthusiast', 'Full Stack Developer', 'React Developer', 'Software Engineer'],
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

    // Bab 1: Minat & Visi Karir AI Architecture
    chapter1: {
      tag: '// 01. ASPIRASI & ARSITEKTUR AI',
      role: { id: 'AI Engineer — Architecture AI', en: 'AI Engineer — AI Architecture' },
      title: {
        id: 'Merancang Sistem Cerdas dari Fondasi Arsitektur',
        en: 'Architecting Intelligent Systems from the Ground Up'
      },
      lead: {
        id: 'Bagi saya, esensi teknologi cerdas tidak hanya terletak pada menjalankan model AI yang sudah jadi, melainkan pada bagaimana sistem tersebut diarsiteki: scalable, efisien, dan terintegrasi secara andal.',
        en: 'To me, the true essence of intelligent technology does not lie solely in running off-the-shelf models, but in how the entire system is architected: scalable, efficient, and reliably integrated.'
      },
      paragraphs: [
        {
          id: 'Fokus dan minat terbesar saya berpusat pada bidang Artificial Intelligence, khususnya sebagai AI Engineer dengan spesialisasi Architecture AI. Saya mendedikasikan waktu untuk mendalami bagaimana merancang arsitektur sistem cerdas, membangun alur orkestrasi pipeline Large Language Model (LLM), mendesain integrasi model ke dalam aplikasi produksi berskala nyata, serta mengoptimalkan infrastruktur inferensi agar responsif dan berkinerja tinggi.',
          en: 'My foremost passion centers on Artificial Intelligence, specifically as an AI Engineer specializing in AI Architecture. I dedicate myself to learning how to design intelligent system architectures, build Large Language Model (LLM) orchestration pipelines, engineer production-grade model integrations, and optimize inference infrastructures for high responsiveness and performance.'
        },
        {
          id: 'Alih-alih sekadar memperlakukan AI sebagai kotak hitam (black box), saya tertarik pada tantangan skalabilitas komputasi, kebersihan aliran data kontekstual (RAG), hingga sistem agen cerdas yang otonom (agentic workflows). Ambisi saya adalah menjadi perancang sistem yang menjembatani inovasi kecerdasan buatan dengan keandalan rekayasa perangkat lunak modern.',
          en: 'Rather than treating AI merely as a black box, I am captivated by computational scalability challenges, clean contextual data flows (RAG), and autonomous agentic workflows. My aspiration is to be the system architect who bridges state-of-the-art AI advancements with robust modern software engineering.'
        }
      ],
      quote: {
        id: '“Arsitektur AI bukan sekadar menjalankan algoritma, melainkan membangun ekosistem cerdas yang terukur, aman, dan siap menjawab persoalan nyata.”',
        en: '“AI Architecture is not just running an algorithm; it is crafting an intelligent ecosystem that is scalable, secure, and ready to solve real-world problems.”'
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
          status: { id: 'Sedang Berjalan (Kelas 11)', en: 'In Progress (Grade 11)' },
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
     PROJEK
  ───────────────────────────────────────── */
  projek: {
    eyebrow:   { id: 'Karya Pilihan',  en: 'Featured Work'  },
    title:     { id: 'Proyek Web',     en: 'Web Projects'   },
    titleAccent: { id: 'Web',          en: 'Web'            },
    viewProject: { id: 'Lihat Proyek →', en: 'View Project →' },
    items: [
      {
        id: '001',
        name: { id: 'Website Boanana', en: 'Boanana Website' },
        desc: {
          id: 'Platform produk kripik pisang milik UMKM bernama Boanana yang dibangun menggunakan React dan Vite dengan tampilan yang interaktif dan responsif.',
          en: 'A banana chip product platform for an UMKM brand called Boanana, built with React and Vite featuring an interactive and responsive interface.',
        },
        tags: ['React', 'Node.js', 'Vite', 'Figma'],
        link: 'https://lastfound.github.io/boanana/',
      },
      {
        id: '002',
        name: { id: 'Exlusif Automotive',  en: 'Exlusif Automotive'  },
        desc: {
          id: 'Website showroom otomotif dengan antarmuka modern, katalog kendaraan terstruktur, dan alur pemesanan interaktif.',
          en: 'An automotive showroom website featuring a modern interface, structured vehicle catalog, and interactive inquiry flow.',
        },
        tags: ['Vue.js', 'Chart.js', 'Laravel', 'MySQL'],
        link: 'https://lastfound.github.io/ExlusifAutomotive/',
      },
      {
        id: '003',
        name: { id: 'Aplikasi Chat Real-Time', en: 'Real-Time Chat App' },
        desc: {
          id: 'Aplikasi perpesanan instan berbasis WebSocket dengan room chat, notifikasi real-time, dan transmisi data yang cepat.',
          en: 'A real-time instant messaging application powered by WebSocket with chat rooms, live notifications, and fast data transmission.',
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
