import React, { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

function Navbar() {
  const { lang, toggle } = useLang();
  const t = translations.navbar;

  const [scrolled, setScrolled]    = useState(false);
  const [activeSection, setActive] = useState('tentang');
  const [menuOpen, setMenuOpen]    = useState(false);

  const navLinks = [
    { id: 'tentang',     label: t.links.tentang[lang],     num: '01' },
    { id: 'projek',      label: t.links.projek[lang],      num: '02' },
    { id: 'sertifikat',  label: t.links.sertifikat[lang],  num: '03' },
    { id: 'kontak',      label: t.links.kontak[lang],      num: '04' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      let current = 'tentang';
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
          href="#tentang"
          className="navbar-logo"
          onClick={(e) => { e.preventDefault(); scrollTo('tentang'); }}
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
          {/* Language Toggle — Pill */}
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
          background: '#f9f8f6',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
          overflow: 'auto',
          padding: '1rem',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: 'absolute', top: '0.8rem', right: '0.8rem',
            background: 'none', border: 'none',
            color: '#1a1a1a', fontSize: '1rem',
            cursor: 'pointer', padding: '0.3rem', zIndex: 999,
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
          }}
        >✕</button>

        <ul style={{
          listStyle: 'none', padding: 0, margin: 0,
          display: 'flex', flexDirection: 'column',
          gap: 'clamp(1.5rem, 4vw, 2.5rem)', textAlign: 'center',
          marginTop: '2rem',
          width: '100%',
        }}>
          {navLinks.map((link, i) => (
            <li key={link.id} style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.3s ease ${i * 0.06 + 0.05}s, transform 0.3s ease ${i * 0.06 + 0.05}s`,
            }}>
              <a
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 'clamp(1.4rem, 5vw, 2rem)',
                  fontWeight: 400,
                  color: activeSection === link.id ? '#6b5b4e' : '#1a1a1a',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  display: 'block',
                  padding: '0.5rem 0',
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
          style={{ marginTop: '2rem' }}
          aria-label="Toggle language"
        >
          <span className={`lang-pill-option ${lang === 'id' ? 'lang-pill-active' : ''}`}>ID</span>
          <span className={`lang-pill-option ${lang === 'en' ? 'lang-pill-active' : ''}`}>EN</span>
        </button>

        <div style={{
          position: 'absolute', bottom: 'clamp(1.5rem, 5vw, 2.5rem)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          fontSize: 'clamp(0.55rem, 2vw, 0.62rem)',
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: '#9e9b94', fontWeight: 400,
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.3s ease 0.35s',
        }}>
          <div className="status-dot" />
          {lang === 'id' ? 'Tersedia untuk kolaborasi' : 'Available for collaboration'}
        </div>
      </div>
    </>
  );
}

export default Navbar;