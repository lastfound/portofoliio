import React, { useState, useEffect } from 'react';
import { useLang } from '../../context/LanguageContext';
import translations from '../../i18n/translations';

function Navbar() {
  const { lang, toggle } = useLang();
  const t = translations.navbar;

  const [scrolled, setScrolled]    = useState(false);
  const [activeSection, setActive] = useState('intro');
  const [menuOpen, setMenuOpen]    = useState(false);

  const navLinks = [
    { id: 'intro',       label: t.links.intro[lang],       num: '01' },
    { id: 'tentang',     label: t.links.tentang[lang],     num: '02' },
    { id: 'projek',      label: t.links.projek[lang],      num: '03' },
    { id: 'sertifikat',  label: t.links.sertifikat[lang],  num: '04' },
    { id: 'kontak',      label: t.links.kontak[lang],      num: '05' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = 'intro';
      navLinks.forEach(({ id }) => {
        const sec = document.getElementById(id);
        if (sec && window.scrollY >= sec.offsetTop - 200) current = id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a
          href="#intro"
          className="navbar-logo"
          onClick={(e) => { e.preventDefault(); scrollTo('intro'); }}
        >
          Rafi<span> Ibrahim</span>
        </a>

        <ul className="navbar-links">
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={activeSection === link.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          {/* Language Toggle — Minimal Box */}
          <button
            onClick={toggle}
            className="lang-pill"
            aria-label="Toggle language"
          >
            <span className={`lang-pill-option ${lang === 'id' ? 'lang-pill-active' : ''}`}>ID</span>
            <span className={`lang-pill-option ${lang === 'en' ? 'lang-pill-active' : ''}`}>EN</span>
          </button>

          <div className="navbar-status">
            <div className="status-dot" />
            {t.available[lang]}
          </div>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 997,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#000000',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
          overflow: 'auto',
          padding: '1.5rem',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: 'absolute', top: '1.2rem', right: '1.2rem',
            background: 'none', border: 'none',
            color: '#ffffff', fontSize: '1.2rem',
            cursor: 'pointer', padding: '0.5rem', zIndex: 999,
          }}
        >✕</button>

        <ul style={{
          listStyle: 'none', padding: 0, margin: 0,
          display: 'flex', flexDirection: 'column',
          gap: '2rem', textAlign: 'center',
          width: '100%',
        }}>
          {navLinks.map((link, i) => (
            <li key={link.id} style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.3s ease ${i * 0.05 + 0.05}s, transform 0.3s ease ${i * 0.05 + 0.05}s`,
            }}>
              <a
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
                  fontWeight: 400,
                  color: activeSection === link.id ? '#ffffff' : '#777785',
                  textDecoration: 'none',
                  display: 'block',
                  padding: '0.4rem 0',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language toggle inside mobile menu */}
        <button
          onClick={toggle}
          className="lang-pill"
          style={{ marginTop: '2.5rem' }}
          aria-label="Toggle language"
        >
          <span className={`lang-pill-option ${lang === 'id' ? 'lang-pill-active' : ''}`}>ID</span>
          <span className={`lang-pill-option ${lang === 'en' ? 'lang-pill-active' : ''}`}>EN</span>
        </button>

        <div style={{
          position: 'absolute', bottom: '2rem',
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          fontSize: '0.65rem',
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#555562', fontWeight: 400,
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.3s ease 0.3s',
        }}>
          <div className="status-dot" />
          {lang === 'id' ? 'Tersedia untuk kolaborasi' : 'Available for collaboration'}
        </div>
      </div>
    </>
  );
}

export default Navbar;
