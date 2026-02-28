import React, { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled]    = useState(false);
  const [activeSection, setActive] = useState('tentang');
  const [menuOpen, setMenuOpen]    = useState(false);

  const navLinks = [
    { id: 'tentang',    label: 'Tentang',    num: '01' },
    { id: 'projek',     label: 'Projek',     num: '02' },
    { id: 'sertifikat', label: 'Sertifikat', num: '03' },
    { id: 'kontak',     label: 'Kontak',     num: '04' },
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
          DEV<span>.folio</span>
        </a>

        <ul className="navbar-links">
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                data-num={link.num}
                className={activeSection === link.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-status">
          <div className="status-dot" />
          Tersedia untuk kolaborasi
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 997,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'rgba(2,4,12,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Tutup menu"
          style={{
            position: 'absolute', top: '1.4rem', right: '1.5rem',
            background: 'none', border: 'none',
            color: 'var(--text)', fontSize: '1.4rem',
            cursor: 'pointer', lineHeight: 1, padding: '0.3rem', zIndex: 999,
          }}
        >✕</button>

        {/* Decorative HUD lines */}
        <div style={{
          position: 'absolute', top: '50%', left: '2rem',
          width: '1px', height: '40%', transform: 'translateY(-50%)',
          background: 'linear-gradient(to bottom, transparent, rgba(0,255,231,0.15), transparent)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', right: '2rem',
          width: '1px', height: '40%', transform: 'translateY(-50%)',
          background: 'linear-gradient(to bottom, transparent, rgba(0,255,231,0.15), transparent)',
        }} />

        <ul style={{
          listStyle: 'none', padding: 0, margin: 0,
          display: 'flex', flexDirection: 'column', gap: '2.2rem', textAlign: 'center',
        }}>
          {navLinks.map((link, i) => (
            <li key={link.id} style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.3s ease ${i*0.07+0.1}s, transform 0.3s ease ${i*0.07+0.1}s`,
            }}>
              <a
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '1rem',
                  fontSize: '1.5rem',
                  fontFamily: 'var(--font-main)', fontWeight: 700,
                  letterSpacing: '0.03em',
                  color: activeSection === link.id ? 'var(--accent)' : 'var(--text)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  color: 'var(--accent)', opacity: 0.5, letterSpacing: '0.15em',
                }}>
                  {link.num}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{
          position: 'absolute', bottom: '2.5rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
          color: 'var(--text-dim)',
          opacity: menuOpen ? 1 : 0, transition: 'opacity 0.3s ease 0.4s',
        }}>
          <div className="status-dot" />
          Tersedia untuk kolaborasi
        </div>
      </div>
    </>
  );
}

export default Navbar;