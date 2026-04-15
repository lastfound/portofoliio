import React from 'react';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <span>© {year} Rafi Ibrahim</span>
      <span className="footer-accent">Open to new projects</span>
    </footer>
  );
}

export default Footer;