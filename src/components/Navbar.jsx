import React, { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [activeSection, setActive]  = useState('tentang');
  const [menuOpen, setMenuOpen]     = useState(false);

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

  // Tutup menu saat klik di luar
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest('.navbar')) setMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Kunci scroll saat menu terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      {/* Logo */}
      <a href="#tentang" className="navbar-logo"
        onClick={(e) => { e.preventDefault(); scrollTo('tentang'); }}>
        DEV<span>.folio</span>
      </a>

      {/* Links — desktop */}
      <ul className="navbar-links">
        {navLinks.map(link => (
          <li key={link.id}>
            <a href={`#${link.id}`}
              className={activeSection === link.id ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}>
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

      {/* Hamburger button — mobile */}
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="mobile-links">
          {navLinks.map((link, i) => (
            <li key={link.id} style={{ animationDelay: `${i * 0.08}s` }}>
              <a href={`#${link.id}`}
                className={activeSection === link.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}>
                <span className="mobile-link-num">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-footer">
          <div className="status-dot" />
          Tersedia untuk kolaborasi
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
