import React, { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────
// Import gambar sertifikat dari src/assets/
// Contoh:
//   import imgCert1 from '../assets/cert-dicoding.png';
//   import imgCert2 from '../assets/cert-coursera.png';
// Lalu isi field image: imgCert1, dst.
// Jika image: null → icon emoji tetap tampil sebagai fallback.
// ─────────────────────────────────────────────────────────────

// import imgCert1 from '../assets/cert-dicoding.png';
// import imgCert2 from '../assets/cert-coursera.png';

const CERTIFICATES = [
  {
    id: 'cert-01', icon: '🏆',
    image: null,              // ← ganti: imgCert1
    issuer: 'Dicoding Indonesia',
    name: 'Belajar Dasar Pemrograman Web',
    date: 'Diterbitkan: Januari 2024 • Berlaku Selamanya',
    desc: 'Menguasai dasar-dasar pengembangan web mencakup HTML5 semantik, CSS3 modern, dan JavaScript ES6+.',
    verified: true,
    link: '#',                // ← isi link verifikasi sertifikat
  },
  {
    id: 'cert-02', icon: '🎓',
    image: null,              // ← ganti: imgCert2
    issuer: 'Coursera — Meta',
    name: 'Front-End Developer Professional',
    date: 'Diterbitkan: Maret 2024 • Berlaku Selamanya',
    desc: 'Program profesional komprehensif mencakup React.js, UX/UI Design, dan praktik pengembangan web modern.',
    verified: true,
    link: '#',                // ← isi link verifikasi sertifikat
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

            {/* ── Thumbnail Gambar Sertifikat ── */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--border), rgba(123,94,167,0.2))',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {cert.image ? (
                <img
                  src={cert.image}
                  alt={`Sertifikat ${cert.name}`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    padding: '0.5rem',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              {/* Emoji fallback */}
              <span
                style={{
                  display: cert.image ? 'none' : 'flex',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3.5rem',
                }}
              >
                {cert.icon}
              </span>
            </div>

            {/* ── Info Sertifikat ── */}
            <div className="cert-header">
              <div>
                <div className="cert-issuer">{cert.issuer}</div>
                <h3 className="cert-name">{cert.name}</h3>
              </div>
            </div>
            <div className="cert-body">
              <div className="cert-date">📅 {cert.date}</div>
              <p className="cert-desc">{cert.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.8rem' }}>
                {cert.verified && <span className="cert-badge">✓ Terverifikasi</span>}
                {cert.link && cert.link !== '#' && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    style={{ fontSize: '0.68rem' }}
                  >
                    Lihat Sertifikat →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Sertifikat;