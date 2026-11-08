import React, { useEffect, useRef } from 'react';
import imgBoanana   from '../../assets/boanana.png';
import imgDashboard from '../../assets/dashboard.png';
import imgTictactoe from '../../assets/tictactoe.png';
import { useLang } from '../../context/LanguageContext';
import translations from '../../i18n/translations';

const IMAGES = [imgBoanana, imgDashboard, imgTictactoe];

function Projek() {
  const { lang } = useLang();
  const t = translations.projek;
  const sectionRef = useRef(null);

  useEffect(() => {
    const rootEl = sectionRef.current;
    if (!rootEl) return;

    const showcaseRows = rootEl.querySelectorAll('.showcase-row');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('showcase-in-view');
          } else {
            // Replay saat di-scroll balik
            entry.target.classList.remove('showcase-in-view');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-20px 0px -40px 0px',
      }
    );

    showcaseRows.forEach((row) => observer.observe(row));

    return () => observer.disconnect();
  }, [lang]);

  return (
    <section id="projek" className="section projek-section" ref={sectionRef}>
      {/* ── Section Header ── */}
      <div className="section-header reveal">
        <div className="section-eyebrow">{t.eyebrow[lang]}</div>
        <h2 className="section-title">
          {t.title[lang]} <span className="accent">{t.titleAccent[lang]}</span>
        </h2>
        <p className="projek-lead">{t.lead[lang]}</p>
      </div>

      <div className="showcase-stream">
        {t.items.map((project, idx) => {
          const isReversed = idx % 2 !== 0;

          return (
            <article
              key={project.id}
              className={`showcase-row ${isReversed ? 'row-reversed' : ''}`}
            >
              {/* ── 1. Visual Mockup Window Side ── */}
              <div className="showcase-visual-col">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="showcase-window"
                  aria-label={`Open ${project.name[lang]}`}
                >
                  {/* Browser Window Header Chrome */}
                  <div className="window-chrome">
                    <div className="window-dots">
                      <span className="w-dot dot-close" />
                      <span className="w-dot dot-min" />
                      <span className="w-dot dot-max" />
                    </div>
                    <div className="window-url-bar">
                      <span className="url-lock">🔒</span>
                      <span className="url-text">{project.urlDisplay}</span>
                    </div>
                    <div className="window-status-pill">
                      <span className="live-pulse" />
                      {t.liveBadge[lang]}
                    </div>
                  </div>

                  {/* Browser Viewport Area with Image */}
                  <div className="window-screen">
                    <div className="screen-depth-overlay" />
                    <img
                      src={IMAGES[idx]}
                      alt={`Preview ${project.name[lang]}`}
                      className="screen-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="screen-hover-badge">
                      <span>{t.viewProject[lang]}</span>
                    </div>
                  </div>
                </a>
              </div>

              {/* ── 2. Narrative Content Side ── */}
              <div className="showcase-content-col">
                <div className="showcase-meta-top">
                  <span className="showcase-idx">PROJECT // {project.id}</span>
                  <span className="showcase-divider">/</span>
                  <span className="showcase-cat">{project.category[lang]}</span>
                </div>

                <h3 className="showcase-title">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.name[lang]}
                  </a>
                </h3>

                <p className="showcase-desc">{project.desc[lang]}</p>

                <div className="showcase-tags">
                  {project.tags.map((tag) => (
                    <span className="showcase-chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="showcase-actions">
                  <a
                    href={project.link}
                    className="showcase-cta-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{t.viewProject[lang]}</span>
                    <span className="cta-arrow">↗</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Projek;
