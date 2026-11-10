import React, { useState, useRef, useEffect } from 'react';
import RippleButton from '../ui/RippleButton';
import { useLang } from '../../context/LanguageContext';
import translations from '../../i18n/translations';

function MailIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function getChannelIcon(key) {
  switch (key) {
    case 'Email':
      return <MailIcon size={18} />;
    case 'GitHub':
      return <GithubIcon size={18} />;
    case 'LinkedIn':
      return <LinkedinIcon size={18} />;
    default:
      return <MailIcon size={18} />;
  }
}

function Kontak() {
  const { lang } = useLang();
  const t = translations.kontak;

  const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' });
  const [toast, setToast] = useState({ show: false, msg: '' });
  const headerRef = useRef(null);
  const leftRef   = useRef(null);
  const rightRef  = useRef(null);

  useEffect(() => {
    [headerRef, leftRef, rightRef].forEach((ref, i) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => ref.current?.classList.add('visible'), i * 100);
          observer.disconnect();
        }
      }, { threshold: 0.1 });
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    });
  }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      showToast(t.form.errorMsg[lang]);
      return;
    }
    showToast(t.form.successMsg[lang]);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const fields = [
    { name: 'name',    type: 'text',  label: t.form.name[lang],    ph: t.form.namePh[lang]    },
    { name: 'email',   type: 'email', label: t.form.email[lang],   ph: t.form.emailPh[lang]   },
    { name: 'subject', type: 'text',  label: t.form.subject[lang], ph: t.form.subjectPh[lang] },
  ];

  return (
    <section id="kontak" className="section">
      <div className="section-header reveal" ref={headerRef}>
        <div className="section-eyebrow">{t.eyebrow[lang]}</div>
        <h2 className="section-title">
          {t.title[lang]} <span className="gradient">{t.titleAccent[lang]}</span>
        </h2>
      </div>

      <div className="contact-layout">
        {/* ── Kiri ── */}
        <div className="reveal" ref={leftRef}>
          <p className="contact-intro">{t.intro[lang]}</p>
          <div className="contact-channels">
            {t.channels.map(ch => (
              <a key={ch.label.en} href={ch.href} className="contact-channel" target="_blank" rel="noopener noreferrer">
                <span className="contact-channel-icon">
                  {getChannelIcon(ch.label.en)}
                </span>
                <div>
                  <span className="contact-channel-label">{ch.label[lang]}</span>
                  <span className="contact-channel-value">{ch.value}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Kanan (Form) ── */}
        <form className="contact-form reveal" ref={rightRef} onSubmit={handleSubmit} noValidate>
          {fields.map(({ name, type, label, ph }) => (
            <div className="form-group" key={name}>
              <label className="form-label" htmlFor={name}>{label}</label>
              <input
                id={name} name={name} type={type}
                className="form-input"
                placeholder={ph}
                value={form[name]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="form-group">
            <label className="form-label" htmlFor="message">{t.form.message[lang]}</label>
            <textarea
              id="message" name="message"
              className="form-textarea"
              placeholder={t.form.messagePh[lang]}
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <RippleButton type="submit" className="form-submit">
            {t.form.submit[lang]}
          </RippleButton>
        </form>
      </div>

      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>
    </section>
  );
}

export default Kontak;
