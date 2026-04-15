import React, { useState, useRef, useEffect } from 'react';
import RippleButton from './RippleButton';

const CHANNELS = [
  { icon: '✉', label: 'Email',    value: 'your@email.com',              href: 'https://mail.google.com/mail/u/2/#inbox'            },
  { icon: '⚡', label: 'GitHub',   value: 'github.com/username',          href: 'https://github.com/username'                        },
  { icon: '⬡', label: 'LinkedIn', value: 'linkedin.com/in/rafi-ibrahim', href: 'https://www.linkedin.com/in/rafi-ibrahim-749492384' },
];

function Kontak() {
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
    if (!form.name.trim() || !form.email.trim()) { showToast('Please fill in your name and email.'); return; }
    showToast('Message sent successfully.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="kontak" className="section">
      <div className="section-header reveal" ref={headerRef}>
        <div className="section-eyebrow">Get in Touch</div>
        <h2 className="section-title">Let's <span className="gradient">Collaborate</span></h2>
      </div>

      <div className="contact-layout">
        {/* ── LEFT ── */}
        <div className="reveal" ref={leftRef}>
          <p className="contact-intro">
            Have an interesting project or want to work together? I'm always open to new ideas and opportunities.
          </p>
          <div className="contact-channels">
            {CHANNELS.map(ch => (
              <a key={ch.label} href={ch.href} className="contact-channel" target="_blank" rel="noopener noreferrer">
                <span className="contact-channel-icon">{ch.icon}</span>
                <div>
                  <span className="contact-channel-label">{ch.label}</span>
                  <span className="contact-channel-value">{ch.value}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT (Form) ── */}
        <form className="contact-form reveal" ref={rightRef} onSubmit={handleSubmit} noValidate>
          {[
            ['name',    'text',  'Full Name',     'Your name'       ],
            ['email',   'email', 'Email Address', 'email@you.com'   ],
            ['subject', 'text',  'Subject',       'What is this about?' ],
          ].map(([name, type, label, placeholder]) => (
            <div className="form-group" key={name}>
              <label className="form-label" htmlFor={name}>{label}</label>
              <input
                id={name} name={name} type={type}
                className="form-input"
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="form-group">
            <label className="form-label" htmlFor="message">Message</label>
            <textarea
              id="message" name="message"
              className="form-textarea"
              placeholder="Tell me more..."
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <RippleButton type="submit" className="form-submit">
            Send Message →
          </RippleButton>
        </form>
      </div>

      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>
    </section>
  );
}

export default Kontak;