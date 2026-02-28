import React, { useEffect, useRef, useState, useCallback } from 'react';
import profilImg from '../assets/profil.jpeg';
import TypingText from './TypingText';
import RippleButton from './RippleButton';
import AvatarHologram from './AvatarHologram';

const PROFILE = {
  label:     'Portfolio',
  firstName: 'Rafi',
  lastName:  'Ibrahim',
  roles: ['Full Stack Web Developer','UI / UX Designer','React Developer','Front-End Engineer'],
  bio: 'Saya membangun pengalaman digital yang indah dan fungsional. Berfokus pada antarmuka modern yang menggabungkan estetika futuristik dengan performa tinggi dan pengalaman pengguna yang intuitif.',
  stats: [
    { num: '3+',   label: 'Proyek Selesai' },
    { num: '2+',   label: 'Sertifikat'     },
    { num: '100%', label: 'Dedikasi'       },
  ],
  skills: ['HTML5','CSS3','JavaScript','React','Next.js','Solid.js','Node.js','Git','MySQL','MongoDB','Figma','Adobe Illustrator'],
  initials:  'RI',
  avatarSub: 'Web Developer',
  photo:     profilImg,
};

function Tentang() {
  const leftRef   = useRef(null);
  const avatarRef = useRef(null);
  const [imgError, setImgError]         = useState(false);
  const [avatarVisible, setAvatarVisible] = useState(false);

  const isTouch = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(hover: none) and (pointer: coarse)').matches
      : false
  ).current;

  // 3D tilt (desktop only)
  const handleMouseMove = useCallback((e) => {
    if (isTouch) return;
    const el = avatarRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    el.style.transform = `perspective(800px) rotateX(${dy * -12}deg) rotateY(${dx * 12}deg) scale3d(1.02,1.02,1.02)`;
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (avatarRef.current) avatarRef.current.style.transform = '';
  }, []);

  useEffect(() => {
    // Teks kiri
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) leftRef.current?.classList.add('visible'); },
      { threshold: 0, rootMargin: '0px 0px -10px 0px' }
    );
    if (leftRef.current) obs.observe(leftRef.current);

    // Avatar muncul setelah 200ms (pasti, tidak bergantung observer)
    const t = setTimeout(() => setAvatarVisible(true), 200);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);

  const hasPhoto = !!PROFILE.photo && !imgError;

  return (
    <section id="tentang" className="section tentang">

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
          {PROFILE.skills.map(sk => <span key={sk} className="skill-tag">{sk}</span>)}
        </div>

        <RippleButton
          onClick={() => document.getElementById('projek')?.scrollIntoView({ behavior:'smooth' })}
          className="btn"
        >
          Lihat Proyek →
        </RippleButton>
      </div>

      {/* ══ KANAN — Avatar Hologram ══ */}
      <div
        className="hero-visual"
        style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          opacity: avatarVisible ? 1 : 0,
          transform: avatarVisible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <div className="avatar-wrapper">

          {/* Orbit rings (desktop only) */}
          {!isTouch && (
            <>
              <div className="avatar-orbit orbit-1" />
              <div className="avatar-orbit orbit-2" />
              <div className="avatar-orbit orbit-3" />
            </>
          )}

          {/* Frame luar dengan 3D tilt */}
          <div
            ref={avatarRef}
            className="avatar-frame corner-frame"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle:'preserve-3d', transition:'transform 0.12s ease-out', overflow:'hidden' }}
          >
            {/* ── HOLOGRAM COMPONENT ── */}
            <AvatarHologram
              hasPhoto={hasPhoto}
              initials={PROFILE.initials}
            >
              {/* Foto diteruskan sebagai children */}
              <img
                src={PROFILE.photo}
                alt={`${PROFILE.firstName} ${PROFILE.lastName}`}
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '150%',
                  objectFit: 'cover', objectPosition: 'center top',
                  filter: 'saturate(0.85) contrast(1.05)',
                }}
                onError={() => setImgError(true)}
              />
            </AvatarHologram>

            {/* Avatar sub label */}
            <div className="avatar-sub">{PROFILE.avatarSub}</div>

            {/* Corner brackets */}
            <span className="corner tl" />
            <span className="corner tr" />
            <span className="corner bl" />
            <span className="corner br" />
          </div>

          {/* Floating badges */}
          <div className="floating-badge top">
            ⚡ <span className="hl">React + Node.js</span>
          </div>
          <div className="floating-badge bottom">
            Status: <span className="hl">Open to Work</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tentang;