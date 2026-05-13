import React, { useState, useRef, useEffect } from 'react';
import RippleButton from './RippleButton';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

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
        {/* ── kiri ── */}
        <div className="reveal" ref={leftRef}>
          <p className="contact-intro">{t.intro[lang]}</p>
          <div className="contact-channels">
            {t.channels.map(ch => (
              <a key={ch.label.en} href={ch.href} className="contact-channel" target="_blank" rel="noopener noreferrer">
                <span className="contact-channel-icon">{ch.icon}</span>
                <div>
                  <span className="contact-channel-label">{ch.label[lang]}</span>
                  <span className="contact-channel-value">{ch.value}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT (Form) ── */}
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