import React from 'react';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <span>© {year} Muhammad Developer. All rights reserved.</span>
      <span>Dibangun dengan ❤️ menggunakan React.js</span>
      <span className="footer-accent">Tersedia untuk proyek baru ✦</span>
    </footer>
  );
}

export default Footer;
