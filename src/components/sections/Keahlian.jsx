import React, { useEffect, useRef } from 'react';
import { useLang } from '../../context/LanguageContext';
import translations from '../../i18n/translations';

function Keahlian() {
  const { lang } = useLang();
  const t = translations.keahlian;
  const sectionRef = useRef(null);

  useEffect(() => {
    const rootEl = sectionRef.current;
    if (!rootEl) return;

    const wipeItems = rootEl.querySelectorAll('.scroll-wipe-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('wipe-active');
          } else {
            // Saat di-scroll balik, reset agar animasi transformasi kiri-ke-kanan berulang kembali
            entry.target.classList.remove('wipe-active');
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '-20px 0px -40px 0px',
      }
    );

    wipeItems.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [lang]);

  return (
    <section id="keahlian" className="section keahlian-section" ref={sectionRef}>
      {/* ── Section Header ── */}
      <div className="section-header scroll-wipe-item">
        <div className="section-eyebrow">{t.eyebrow[lang]}</div>
        <h2 className="section-title">
          {t.title[lang]} <span className="accent">{t.titleAccent[lang]}</span>
        </h2>
        <p className="keahlian-lead">{t.lead[lang]}</p>
      </div>

      <div className="keahlian-container">
        {t.items.map((item, idx) => (
          <div
            className="skill-wipe-card scroll-wipe-item"
            key={item.num}
            style={{ transitionDelay: `${idx * 0.08}s` }}
          >
            {/* ── Baris Header Keahlian: Nomor & Judul Besar (Wipe Hitam -> Putih Kiri ke Kanan) ── */}
            <div className="skill-heading-wipe-wrap">
              {/* Layer 1 (Hitam / Dasar): Tampil sebelum di-scroll */}
              <div className="skill-heading-layer layer-black" aria-hidden="true">
                <div className="skill-top-meta">
                  <span className="skill-num">{item.num}</span>
                  <span className="skill-index-dot">◈</span>
                  <span className="skill-role">{item.role[lang]}</span>
                </div>
                <h3 className="skill-title">{item.title}</h3>
              </div>

              {/* Layer 2 (Putih Bersinar): Bertransformasi dari Kiri ke Kanan saat di-scroll */}
              <div className="skill-heading-layer layer-white">
                <div className="skill-top-meta">
                  <span className="skill-num">{item.num}</span>
                  <span className="skill-index-dot">◈</span>
                  <span className="skill-role">{item.role[lang]}</span>
                </div>
                <h3 className="skill-title">{item.title}</h3>
              </div>
            </div>

            {/* ── Deskripsi Keahlian (Wipe Hitam -> Putih/Perak Kiri ke Kanan) ── */}
            <div className="skill-desc-wipe-wrap">
              <div className="skill-desc-layer layer-black" aria-hidden="true">
                <p className="skill-desc">{item.desc[lang]}</p>
              </div>
              <div className="skill-desc-layer layer-white">
                <p className="skill-desc">{item.desc[lang]}</p>
              </div>
            </div>

            {/* ── Tech Stack / Kemampuan Spesifik ── */}
            <div className="skill-tags-wrap">
              {item.tags.map((tag) => (
                <span className="skill-chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            {/* ── Garis Laser Bawah (Melebar dari Kiri ke Kanan) ── */}
            <div className="skill-laser-border" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Keahlian;

