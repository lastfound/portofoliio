import React, { useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

function Sertifikat() {
  const { lang } = useLang();
  const t = translations.sertifikat;

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
        <div className="section-eyebrow">{t.eyebrow[lang]}</div>
        <h2 className="section-title">
          {t.title[lang]} <span className="accent">{t.titleAccent[lang]}</span>
        </h2>
      </div>

      <div className="cert-grid stagger-parent" ref={gridRef}>
        {t.items.map((cert) => (
          <div className="cert-card stagger-child" key={cert.id}>

            {/* Thumbnail */}
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
                  alt={`Sertifikat ${cert.name[lang]}`}
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
              <div className="cert-shimmer" />
            </div>

            {/* Info */}
            <div className="cert-header">
              <div>
                <div className="cert-issuer">{cert.issuer}</div>
                <h3 className="cert-name">{cert.name[lang]}</h3>
              </div>
            </div>
            <div className="cert-body">
              <div className="cert-date">📅 {cert.date[lang]}</div>
              <p className="cert-desc">{cert.desc[lang]}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.8rem' }}>
                {cert.verified && <span className="cert-badge">{t.verified[lang]}</span>}
                {cert.link && cert.link !== '#' && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="project-link" style={{ fontSize: '0.68rem' }}>
                    {t.viewCert[lang]}
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