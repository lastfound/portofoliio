import React, { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled]    = useState(false);
  const [activeSection, setActive] = useState('tentang');
  const [menuOpen, setMenuOpen]    = useState(false);

  const navLinks = [
    { id: 'tentang',    label: 'Tentang'    },
    { id: 'projek',     label: 'Projek'     },
    { id: 'sertifikat', label: 'Sertifikat' },
    { id: 'kontak',     label: 'Kontak'     },
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
  }, []);

  // Kunci scroll body saat menu terbuka
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
      {/* ── Navbar Bar ── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        {/* Logo */}
        <a
          href="#tentang"
          className="navbar-logo"
          onClick={(e) => { e.preventDefault(); scrollTo('tentang'); }}
        >
          DEV<span>.folio</span>
        </a>

        {/* Links — desktop */}
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

        {/* Status — desktop */}
        <div className="navbar-status">
          <div className="status-dot" />
          Tersedia untuk kolaborasi
        </div>

        {/* Hamburger — mobile */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Mobile Menu Overlay — di luar <nav> agar tidak terpotong ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 997,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(5, 8, 16, 0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
        }}
        // Klik area kosong → tutup menu
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
      >
        {/* Tombol tutup (X) */}
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Tutup menu"
          style={{
            position: 'absolute',
            top: '1.4rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text)',
            fontSize: '1.6rem',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '0.3rem',
            zIndex: 999,
          }}
        >
          ✕
        </button>

        {/* Link navigasi */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {navLinks.map((link, i) => (
            <li
              key={link.id}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.3s ease ${i * 0.07 + 0.1}s, transform 0.3s ease ${i * 0.07 + 0.1}s`,
              }}
            >
              <a
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  fontSize: '1.6rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: activeSection === link.id ? 'var(--accent)' : 'var(--text)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--accent)',
                    opacity: 0.6,
                    letterSpacing: '0.15em',
                  }}
                >
                  0{i + 1}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Footer status */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.78rem',
            color: 'var(--text-dim)',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.3s ease 0.4s',
          }}
        >
          <div className="status-dot" />
          Tersedia untuk kolaborasi
        </div>
      </div>
    </>
  );
}

export default Navbar;