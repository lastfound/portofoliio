import React from 'react';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

function Footer() {
  const { lang } = useLang();
  const t = translations.footer;
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <span>© {year} Rafi Ibrahim</span>
      <span className="footer-accent">{t.openTo[lang]}</span>
    </footer>
  );
}

export default Footer;