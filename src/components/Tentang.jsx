import React, { useEffect, useRef, useState, useCallback } from 'react';
import profilImg from '../assets/profil.jpeg';
import TypingText from './TypingText';
import RippleButton from './RippleButton';

const PROFILE = {
  label:     'Portfolio',
  firstName: 'Rafi',
  lastName:  'Ibrahim',
  roles: [
    'Full Stack Web Developer',
    'UI / UX Designer',
    'React Developer',
    'Front-End Engineer',
  ],
  bio:       'Saya membangun pengalaman digital yang indah dan fungsional. Berfokus pada antarmuka modern yang menggabungkan estetika futuristik dengan performa tinggi dan pengalaman pengguna yang intuitif.',
  stats: [
    { num: '3+',   label: 'Proyek Selesai' },
    { num: '2+',   label: 'Sertifikat'     },
    { num: '100%', label: 'Dedikasi'       },
  ],
  skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Solid.js', 'Node.js', 'Git', 'MySQL', 'MongoDB', 'HeidiSQL', 'phpMyAdmin', 'Figma', 'Adobe Illustrator', 'Adobe Photoshop'],
  initials:  'RI',
  avatarSub: 'Web Developer',
  photo: profilImg,
};

function Tentang() {
  const sectionRef  = useRef(null);
  const avatarRef   = useRef(null);
  const [imgError, setImgError] = useState(false);

  // ── 3D avatar mouse tracking ──
  const handleAvatarMouseMove = useCallback((e) => {
    const el   = avatarRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    const rx   = dy * -18;  // rotateX
    const ry   = dx *  18;  // rotateY

    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.04,1.04,1.04)`;
    
    // Geser sedikit cahaya internal
    const glare = el.querySelector('.avatar-glare');
    if (glare) {
      glare.style.opacity   = '0.25';
      glare.style.transform = `translate(${dx * 30}px, ${dy * 30}px)`;
    }
  }, []);

  const handleAvatarMouseLeave = useCallback(() => {
    const el = avatarRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const glare = el.querySelector('.avatar-glare');
    if (glare) glare.style.opacity = '0';
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const items = entry.target.querySelectorAll('.reveal');
          if (entry.isIntersecting) {
            items.forEach((el, i) => {
              setTimeout(() => el?.classList.add('visible'), i * 150 + 100);
            });
          } else {
            items.forEach((el) => el.classList.remove('visible'));
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToProjek = () => {
    document.getElementById('projek')?.scrollIntoView({ behavior: 'smooth' });
  };

  const hasPhoto = PROFILE.photo && !imgError;

  return (
    <section id="tentang" className="section tentang" ref={sectionRef}>
      {/* ── KIRI ── */}
      <div className="reveal">
        <div className="hero-label">{PROFILE.label}</div>
        <h1 className="hero-name" data-text="Rafi Ibrahim">
          {PROFILE.firstName}<br />
          <span className="gradient">{PROFILE.lastName}</span>
        </h1>

        <p className="hero-role">
          // <TypingText texts={PROFILE.roles} speed={75} deleteSpeed={35} pause={2000} />
        </p>

        <p className="hero-bio">{PROFILE.bio}</p>

        <div className="hero-stats">
          {PROFILE.stats.map(s => (
            <div key={s.label}>
              <div className="stat-num count-up">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="hero-skills">
          {PROFILE.skills.map(sk => (
            <span key={sk} className="skill-tag">{sk}</span>
          ))}
        </div>

        <RippleButton onClick={scrollToProjek} className="btn">
          Lihat Proyek →
        </RippleButton>
      </div>

      {/* ── KANAN (Avatar 3D) ── */}
      <div className="hero-visual reveal">
        <div className="avatar-wrapper">
          {/* 3D Orbit rings di belakang avatar */}
          <div className="avatar-orbit orbit-1" />
          <div className="avatar-orbit orbit-2" />
          <div className="avatar-orbit orbit-3" />

          {/* Avatar dengan 3D tilt on mouse */}
          <div
            ref={avatarRef}
            className="avatar-frame corner-frame avatar-3d"
            onMouseMove={handleAvatarMouseMove}
            onMouseLeave={handleAvatarMouseLeave}
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.12s ease-out',
              willChange: 'transform',
            }}
          >
            <div className="avatar-scan" />

            {/* Inner glow sphere */}
            <div className="avatar-inner-glow" />

            {hasPhoto && (
              <img
                src={PROFILE.photo}
                alt={`${PROFILE.firstName} ${PROFILE.lastName}`}
                className="avatar-photo"
                onError={() => setImgError(true)}
              />
            )}
            <div className={`avatar-initials-overlay ${hasPhoto ? 'has-photo' : ''}`}>
              {PROFILE.initials}
            </div>
            <div className="avatar-sub">{PROFILE.avatarSub}</div>

            {/* Glare overlay */}
            <div
              className="avatar-glare"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 30%, rgba(0,245,255,0.2) 0%, transparent 60%)',
                opacity: 0,
                pointerEvents: 'none',
                transition: 'opacity 0.2s ease, transform 0.12s ease',
                zIndex: 10,
              }}
            />

            <span className="corner tl" />
            <span className="corner tr" />
            <span className="corner bl" />
            <span className="corner br" />
          </div>

          <div className="floating-badge top">⚡ <span className="hl">React + Node.js</span></div>
          <div className="floating-badge bottom">Status: <span className="hl">Open to Work</span></div>
        </div>
      </div>
    </section>
  );
}

export default Tentang;