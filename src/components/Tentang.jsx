import React, { useEffect, useRef, useState } from 'react';
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
  const sectionRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Pakai IntersectionObserver agar animasi bisa muncul lagi saat scroll balik
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const items = entry.target.querySelectorAll('.reveal');
          if (entry.isIntersecting) {
            items.forEach((el, i) => {
              setTimeout(() => el?.classList.add('visible'), i * 150 + 100);
            });
          } else {
            // Reset saat keluar viewport → animasi ulang saat scroll balik
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
        <h1 className="hero-name">
          {PROFILE.firstName}<br />
          <span className="gradient">{PROFILE.lastName}</span>
        </h1>

        {/* Typing effect */}
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

        {/* Ripple button */}
        <RippleButton onClick={scrollToProjek} className="btn">
          Lihat Proyek →
        </RippleButton>
      </div>

      {/* ── KANAN (Avatar) ── */}
      <div className="hero-visual reveal">
        <div className="avatar-wrapper">
          <div className="avatar-frame corner-frame">
            <div className="avatar-scan" />
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