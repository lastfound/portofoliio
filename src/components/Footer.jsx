import React from 'react';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <span>© {year} Rafi Ibrahim. All rights reserved.</span>
      <span className="footer-accent">Siap untuk proyek baru </span>
    </footer>
  );
}

export default Footer;
