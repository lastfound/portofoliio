import React, { useEffect, useRef } from 'react';
import imgBoanana from '../assets/boanana.png';
import imgDashboard from '../assets/dashboard.png';
import imgTictactoe from '../assets/tictactoe.png';

const PROJECTS = [
  {
    id: '001', emoji: '🛍️',
    image: imgBoanana,
    name: 'Website Boanana',
    desc: 'Platform produk kripik pisang milik umkm bernama Boanana yang dibuat menggunakan react vite dengan tampilan yang menarik dan lucu.',
    tags: ['React', 'Node.js', 'Vite', 'Figma'],
    link: 'https://lastfound.github.io/boanana/',
  },
  {
    id: '002', emoji: '📊',
    image: imgDashboard,
    name: 'Dashboard Analitik',
    desc: 'Dashboard interaktif untuk visualisasi data bisnis secara real-time, dilengkapi grafik dinamis dan laporan otomatis.',
    tags: ['Vue.js', 'Chart.js', 'Laravel', 'MySQL'],
    link: '#',
  },
  {
    id: '003', emoji: '💬',
    image: imgTictactoe,
    name: 'Aplikasi Chat Real-Time',
    desc: 'Aplikasi pesan instan berbasis WebSocket dengan fitur room chat, notifikasi push, dan pengiriman file multimedia.',
    tags: ['Socket.io', 'Express', 'PostgreSQL', 'Redis'],
    link: '#',
  },
];

function Projek() {
  const headerRef = useRef(null);
  const gridRef   = useRef(null);

  useEffect(() => {
    const obs1 = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { headerRef.current?.classList.add('visible'); obs1.disconnect(); }
    }, { threshold: 0.1 });
    if (headerRef.current) obs1.observe(headerRef.current);

    const obs2 = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const cards = gridRef.current?.querySelectorAll('.stagger-child');
        cards?.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 150);
        });
        obs2.disconnect();
      }
    }, { threshold: 0.1 });
    if (gridRef.current) obs2.observe(gridRef.current);

    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  return (
    <section id="projek" className="section">
      <div className="section-header reveal" ref={headerRef}>
        <div className="section-eyebrow">Karya Terbaik</div>
        <h2 className="section-title">Proyek <span className="accent">Web</span> Saya</h2>
      </div>

      <div className="projects-grid stagger-parent" ref={gridRef}>
        {PROJECTS.map((project) => (
          <div className="project-card stagger-child" key={project.id}>

            {/* ── Preview Gambar / Thumbnail ── */}
            <div className="project-thumb" style={{ position: 'relative', overflow: 'hidden' }}>
              {project.image ? (
                <img
                  src={project.image}
                  alt={`Preview ${project.name}`}
                  className="project-thumb-img"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center center',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              {/* Emoji fallback — ditampilkan jika tidak ada gambar atau gambar error */}
              <span
                className="project-thumb-emoji"
                style={{
                  display: project.image ? 'none' : 'flex',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                }}
              >
                {project.emoji}
              </span>
            </div>

            {/* ── Konten ── */}
            <div className="project-body">
              <div className="project-num">{project.id} / PROJECT</div>
              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tags">
                {project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
              </div>
              <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                Lihat Proyek →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projek;