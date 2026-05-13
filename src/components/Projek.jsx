import React, { useEffect, useRef } from 'react';
import imgBoanana   from '../assets/boanana.png';
import imgDashboard from '../assets/dashboard.png';
import imgTictactoe from '../assets/tictactoe.png';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

const IMAGES = [imgBoanana, imgDashboard, imgTictactoe];

function Projek() {
  const { lang } = useLang();
  const t = translations.projek;

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
        <div className="section-eyebrow">{t.eyebrow[lang]}</div>
        <h2 className="section-title">
          {lang === 'id'
            ? <>Proyek <span className="accent">Web</span> Saya</>
            : <>My <span className="accent">Web</span> Projects</>
          }
        </h2>
      </div>

      <div className="projects-grid stagger-parent" ref={gridRef}>
        {t.items.map((project, idx) => (
          <div className="project-card stagger-child" key={project.id}>

            {/* ── Preview Gambar / Thumbnail ── */}
            <div
              className="project-thumb"
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <div className="project-thumb-depth" />

              {IMAGES[idx] ? (
                <img
                  src={IMAGES[idx]}
                  alt={`Preview ${project.name[lang]}`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
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
                  display: IMAGES[idx] ? 'none' : 'flex',
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
              <h3 className="project-name">{project.name[lang]}</h3>
              <p className="project-desc">{project.desc[lang]}</p>
              <div className="project-tags">
                {project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
              </div>
              <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                {t.viewProject[lang]}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projek;