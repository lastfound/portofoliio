import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLang } from '../../context/LanguageContext';
import translations from '../../i18n/translations';

function Sertifikat() {
  const { lang } = useLang();
  const t = translations.sertifikat;

  const headerRef = useRef(null);
  const gridRef   = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);

  const closeModal = useCallback(() => {
    setSelectedCert(null);
  }, []);

  // Handle escape key & scroll lock
  useEffect(() => {
    if (!selectedCert) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert, closeModal]);

  useEffect(() => {
    const obs1 = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { headerRef.current?.classList.add('visible'); obs1.disconnect(); }
    }, { threshold: 0.1 });
    if (headerRef.current) obs1.observe(headerRef.current);

    const obs2 = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const cards = gridRef.current?.querySelectorAll('.stagger-child');
        cards?.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 120);
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
        {t.items.map((cert) => {
          const hasImage = Boolean(cert.image);

          return (
            <div className="cert-card stagger-child" key={cert.id}>

              {/* Thumbnail */}
              <div
                className={`cert-thumb ${hasImage ? 'clickable' : ''}`}
                onClick={() => { if (hasImage) setSelectedCert(cert); }}
                role={hasImage ? 'button' : undefined}
                tabIndex={hasImage ? 0 : undefined}
                onKeyDown={(e) => {
                  if (hasImage && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    setSelectedCert(cert);
                  }
                }}
                title={hasImage ? `${t.previewHint?.[lang] || 'Klik untuk melihat'} — ${cert.name[lang]}` : undefined}
              >
                {cert.isNew && (
                  <span className="cert-new-badge">
                    {t.newBadge?.[lang] || 'NEW'}
                  </span>
                )}

                {hasImage ? (
                  <>
                    <img
                      src={cert.image}
                      alt={`Sertifikat ${cert.name[lang]}`}
                      className="cert-thumb-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.cert-thumb-fallback');
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="cert-thumb-overlay">
                      <span>{t.previewHint?.[lang] || 'Lihat Dokumen'}</span>
                    </div>
                  </>
                ) : null}

                <span
                  className="cert-thumb-fallback"
                  style={{
                    display: hasImage ? 'none' : 'flex',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontFamily: 'monospace',
                    color: '#666675',
                  }}
                >
                  [DOC]
                </span>
              </div>

              {/* Header */}
              <div className="cert-header">
                <div className="cert-issuer">{cert.issuer}</div>
                <h3 className="cert-name">{cert.name[lang]}</h3>
              </div>

              {/* Body */}
              <div className="cert-body">
                <div className="cert-date">{cert.date[lang]}</div>
                <p className="cert-desc">{cert.desc[lang]}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.8rem' }}>
                  <span className="cert-badge">{t.verified[lang]}</span>
                  {hasImage && (
                    <button
                      type="button"
                      className="project-link"
                      onClick={() => setSelectedCert(cert)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      {t.viewCert[lang]}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div className="cert-modal-backdrop" onClick={closeModal}>
          <div
            className="cert-modal-container"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
          >
            <div className="cert-modal-header">
              <div>
                <h3 id="cert-modal-title" className="cert-modal-title">
                  {selectedCert.name[lang]}
                </h3>
                <div className="cert-modal-issuer">{selectedCert.issuer}</div>
              </div>
              <button
                type="button"
                className="cert-modal-close"
                onClick={closeModal}
                aria-label={t.closeModal[lang]}
              >
                ✕
              </button>
            </div>

            <div className="cert-modal-body">
              <img
                src={selectedCert.image}
                alt={selectedCert.name[lang]}
                className="cert-modal-image"
              />
            </div>

            <div className="cert-modal-footer">
              <span className="cert-modal-date">{selectedCert.date[lang]}</span>
              <a
                href={selectedCert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-modal-btn"
              >
                {t.openFull[lang]}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Sertifikat;
