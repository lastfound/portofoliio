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
  bio: 'Saya membangun pengalaman digital yang indah dan fungsional. Berfokus pada antarmuka modern yang menggabungkan estetika futuristik dengan performa tinggi dan pengalaman pengguna yang intuitif.',
  stats: [
    { num: '3+',   label: 'Proyek Selesai' },
    { num: '2+',   label: 'Sertifikat'     },
    { num: '100%', label: 'Dedikasi'       },
  ],
  skills: [
    'HTML5','CSS3','JavaScript','React','Next.js','Solid.js',
    'Node.js','Git','MySQL','MongoDB','Figma','Adobe Illustrator',
  ],
  initials:  'RI',
  avatarSub: 'Web Developer',
  photo:     profilImg,
};

function Tentang() {
  const sectionRef = useRef(null);
  const avatarRef  = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);
  const [imgError, setImgError] = useState(false);
  const [avatarVisible, setAvatarVisible] = useState(false);

  const isTouch = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(hover: none) and (pointer: coarse)').matches
      : false
  ).current;

  // 3D tilt — desktop only
  const handleAvatarMouseMove = useCallback((e) => {
    if (isTouch) return;
    const el = avatarRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    el.style.transform = `perspective(800px) rotateX(${dy * -14}deg) rotateY(${dx * 14}deg) scale3d(1.03,1.03,1.03)`;
    const glare = el.querySelector('.avatar-glare');
    if (glare) { glare.style.opacity = '0.18'; glare.style.transform = `translate(${dx*20}px,${dy*20}px)`; }
  }, [isTouch]);

  const handleAvatarMouseLeave = useCallback(() => {
    const el = avatarRef.current;
    if (!el) return;
    el.style.transform = '';
    const glare = el.querySelector('.avatar-glare');
    if (glare) glare.style.opacity = '0';
  }, []);

  // Animasi masuk — avatar SELALU muncul setelah timeout singkat
  useEffect(() => {
    // Kiri: pakai IntersectionObserver
    const obsLeft = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) leftRef.current?.classList.add('visible'); },
      { threshold: 0, rootMargin: '0px 0px -10px 0px' }
    );
    if (leftRef.current) obsLeft.observe(leftRef.current);

    // Avatar (kanan): gunakan timeout sebagai fallback agar PASTI muncul
    // tidak bergantung pada IntersectionObserver yang bisa gagal di mobile
    const timer = setTimeout(() => setAvatarVisible(true), 350);

    return () => {
      obsLeft.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const scrollToProjek = () =>
    document.getElementById('projek')?.scrollIntoView({ behavior: 'smooth' });

  const hasPhoto = !!PROFILE.photo && !imgError;

  return (
    <section id="tentang" className="section tentang" ref={sectionRef}>

      {/* ══ KIRI ══ */}
      <div className="hero-left reveal" ref={leftRef}>
        <div className="hero-label">{PROFILE.label}</div>

        <h1 className="hero-name" data-text="Rafi Ibrahim">
          {PROFILE.firstName}<br />
          <span className="gradient">{PROFILE.lastName}</span>
        </h1>

        <p className="hero-role">
          {'// '}
          <TypingText texts={PROFILE.roles} speed={75} deleteSpeed={35} pause={2000} />
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

      {/* ══ KANAN — avatar dengan animasi mandiri (tidak pakai .reveal) ══ */}
      <div
        className="hero-visual"
        style={{
          opacity:    avatarVisible ? 1 : 0,
          transform:  avatarVisible ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          display:    'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="avatar-wrapper">

          {/* Orbit rings — desktop only */}
          {!isTouch && (
            <>
              <div className="avatar-orbit orbit-1" />
              <div className="avatar-orbit orbit-2" />
              <div className="avatar-orbit orbit-3" />
            </>
          )}

          <div
            ref={avatarRef}
            className="avatar-frame corner-frame"
            onMouseMove={handleAvatarMouseMove}
            onMouseLeave={handleAvatarMouseLeave}
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.12s ease-out' }}
          >
            <div className="avatar-scan" />
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

            {!isTouch && (
              <div className="avatar-glare" style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 50% 30%, rgba(0,255,231,0.18) 0%, transparent 60%)',
                opacity: 0, pointerEvents: 'none',
                transition: 'opacity 0.2s ease, transform 0.12s ease',
                zIndex: 10,
              }} />
            )}

            <span className="corner tl" />
            <span className="corner tr" />
            <span className="corner bl" />
            <span className="corner br" />
          </div>

          {/* Floating badges — desktop only */}
          {!isTouch && (
            <>
              <div className="floating-badge top">
                ⚡ <span className="hl">React + Node.js</span>
              </div>
              <div className="floating-badge bottom">
                Status: <span className="hl">Open to Work</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Tentang;