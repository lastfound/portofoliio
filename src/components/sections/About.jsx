import React, { useEffect, useRef } from 'react';
import { useLang } from '../../context/LanguageContext';
import translations from '../../i18n/translations';

function About() {
  const { lang } = useLang();
  const t = translations.about;
  const sectionRef = useRef(null);

  useEffect(() => {
    const rootEl = sectionRef.current;
    if (!rootEl) return;

    const animatedElements = rootEl.querySelectorAll('.scroll-narrative-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('narrative-revealed');
          } else {
            // Saat di-scroll balik, hapus class agar animasinya muncul kembali!
            entry.target.classList.remove('narrative-revealed');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '-10px 0px -40px 0px',
      }
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [lang]);

  return (
    <section id="tentang" className="section narrative-section" ref={sectionRef}>
      {/* ── Section Header (Dari Kiri) ── */}
      <div className="section-header scroll-narrative-item from-left">
        <div className="section-eyebrow">{t.eyebrow[lang]}</div>
        <h2 className="section-title">
          {t.title[lang]} <span className="gradient">{t.titleAccent[lang]}</span>
        </h2>
      </div>

      <div className="narrative-container">
        
        {/* ══════════════════════════════════════════════════
            BAB 1: ASPIRASI & ARSITEKTUR AI
        ══════════════════════════════════════════════════ */}
        <article className="narrative-chapter">
          <div className="chapter-header-group">
            <div className="chapter-tag-badge scroll-narrative-item from-left">
              {t.chapter1.tag}
            </div>
            <h3 className="chapter-main-title scroll-narrative-item from-left">
              {t.chapter1.role[lang]}
            </h3>
            <h4 className="chapter-sub-headline scroll-narrative-item from-right">
              {t.chapter1.title[lang]}
            </h4>
          </div>

          <p className="narrative-lead scroll-narrative-item from-left">
            {t.chapter1.lead[lang]}
          </p>

          <div className="narrative-body">
            {t.chapter1.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={`narrative-text-p scroll-narrative-item ${idx % 2 === 0 ? 'from-left' : 'from-right'}`}
              >
                {p[lang]}
              </p>
            ))}
          </div>

          <div className="narrative-quote-box scroll-narrative-item from-right">
            <blockquote className="narrative-quote">
              {t.chapter1.quote[lang]}
            </blockquote>
          </div>
        </article>

        {/* ── Subtle Minimalist Divider (Expand Center) ── */}
        <div className="narrative-divider scroll-narrative-item expand-center">
          <span className="divider-line" />
          <span className="divider-symbol">◈ ◈ ◈</span>
          <span className="divider-line" />
        </div>

        {/* ══════════════════════════════════════════════════
            BAB 2: FORMASI DISIPLIN & JEJAK PENDIDIKAN
        ══════════════════════════════════════════════════ */}
        <article className="narrative-chapter">
          <div className="chapter-header-group">
            <div className="chapter-tag-badge scroll-narrative-item from-left">
              {t.chapter2.tag}
            </div>
            <h3 className="chapter-main-title scroll-narrative-item from-left">
              {t.chapter2.title[lang]}
            </h3>
          </div>

          <p className="narrative-lead scroll-narrative-item from-right">
            {t.chapter2.lead[lang]}
          </p>

          <div className="journey-narrative-flow">
            {t.chapter2.journey.map((item, index) => {
              // Alternating directional animation: Left, Right, Left
              const directionClass = index % 2 === 0 ? 'from-left' : 'from-right';

              return (
                <div
                  key={item.school}
                  className={`journey-story-block scroll-narrative-item ${directionClass}`}
                >
                  <div className="journey-header-line">
                    <span className="journey-index">0{3 - index}</span>
                    <div className="journey-title-wrap">
                      <h4 className="journey-school-name">{item.school}</h4>
                      <div className="journey-sub-meta">
                        <span className="journey-level-text">{item.level[lang]}</span>
                        <span className="journey-separator">/</span>
                        <span className="journey-period-text">{item.period}</span>
                        <span className="journey-separator">/</span>
                        <span className="journey-status-text">{item.status[lang]}</span>
                      </div>
                    </div>
                  </div>

                  <p className="journey-story-text">
                    {item.story[lang]}
                  </p>
                </div>
              );
            })}
          </div>
        </article>

      </div>
    </section>
  );
}

export default About;
