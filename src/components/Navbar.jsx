import React, { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('tentang');
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
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#tentang" className="navbar-logo" onClick={(e) => { e.preventDefault(); scrollTo('tentang'); }}>
        DEV<span>.folio</span>
      </a>
      <ul className="navbar-links">
        {navLinks.map(link => (
          <li key={link.id}>
            <a href={`#${link.id}`} className={activeSection === link.id ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="navbar-status">
        <div className="status-dot" />
        Tersedia untuk kolaborasi
      </div>
    </nav>
  );
}

export default Navbar;
