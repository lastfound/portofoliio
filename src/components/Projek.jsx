import React, { useEffect, useRef } from 'react';

const PROJECTS = [
  {
    id: '001', emoji: '🛍️',
    name: 'E-Commerce Platform',
    desc: 'Platform belanja online modern dengan sistem keranjang belanja, filter produk canggih, dan integrasi pembayaran yang seamless.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#',
  },
  {
    id: '002', emoji: '📊',
    name: 'Dashboard Analitik',
    desc: 'Dashboard interaktif untuk visualisasi data bisnis secara real-time, dilengkapi grafik dinamis dan laporan otomatis.',
    tags: ['Vue.js', 'Chart.js', 'Laravel', 'MySQL'],
    link: '#',
  },
  {
    id: '003', emoji: '💬',
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
    // Observe header
    const obs1 = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { headerRef.current?.classList.add('visible'); obs1.disconnect(); }
    }, { threshold: 0.1 });
    if (headerRef.current) obs1.observe(headerRef.current);

    // Observe grid — stagger tiap card
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
            <div className="project-thumb">{project.emoji}</div>
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
