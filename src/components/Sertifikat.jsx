import React, { useEffect, useRef } from 'react';

const CERTIFICATES = [
  {
    id: 'cert-01', icon: '🏆',
    issuer: 'Dicoding Indonesia',
    name: 'Belajar Dasar Pemrograman Web',
    date: 'Diterbitkan: Januari 2024 • Berlaku Selamanya',
    desc: 'Menguasai dasar-dasar pengembangan web mencakup HTML5 semantik, CSS3 modern, dan JavaScript ES6+.',
    verified: true,
  },
  {
    id: 'cert-02', icon: '🎓',
    issuer: 'Coursera — Meta',
    name: 'Front-End Developer Professional',
    date: 'Diterbitkan: Maret 2024 • Berlaku Selamanya',
    desc: 'Program profesional komprehensif mencakup React.js, UX/UI Design, dan praktik pengembangan web modern.',
    verified: true,
  },
];

function Sertifikat() {
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
          setTimeout(() => card.classList.add('visible'), i * 200);
        });
        obs2.disconnect();
      }
    }, { threshold: 0.1 });
    if (gridRef.current) obs2.observe(gridRef.current);

    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  return (
    <section id="sertifikat" className="section">
      <div className="section-header reveal" ref={headerRef}>
        <div className="section-eyebrow">Kredensial Resmi</div>
        <h2 className="section-title">Sertifikat <span className="accent">Saya</span></h2>
      </div>

      <div className="cert-grid stagger-parent" ref={gridRef}>
        {CERTIFICATES.map((cert) => (
          <div className="cert-card stagger-child" key={cert.id}>
            <div className="cert-header">
              <div className="cert-icon">{cert.icon}</div>
              <div>
                <div className="cert-issuer">{cert.issuer}</div>
                <h3 className="cert-name">{cert.name}</h3>
              </div>
            </div>
            <div className="cert-body">
              <div className="cert-date">📅 {cert.date}</div>
              <p className="cert-desc">{cert.desc}</p>
              {cert.verified && <span className="cert-badge">✓ Terverifikasi</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Sertifikat;
