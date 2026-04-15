import React, { useEffect, useRef, useState, useCallback } from 'react';
import profilImg from '../assets/profil.jpeg';
import TypingText from './TypingText';
import RippleButton from './RippleButton';
import AvatarHologram from './AvatarHologram';

const PROFILE = {
  label:     'Portfolio — 2025',
  firstName: 'Rafi',
  lastName:  'Ibrahim',
  roles: ['Full Stack Developer', 'UI / UX Designer', 'React Developer', 'Front-End Engineer'],
  bio: 'I build beautiful, functional digital experiences — combining modern interfaces with high performance and intuitive UX.',
  stats: [
    { num: '3+',   label: 'Projects' },
    { num: '2+',   label: 'Certs'    },
    { num: '100%', label: 'Dedicated' },
  ],
  skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Git', 'MySQL', 'MongoDB', 'Figma'],
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

  const handleMouseMove = useCallback((e) => {
    if (isTouch) return;
    const el = avatarRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    el.style.transform = `perspective(1000px) rotateX(${dy * -6}deg) rotateY(${dx * 6}deg) scale3d(1.01,1.01,1.01)`;
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (avatarRef.current) avatarRef.current.style.transform = '';
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) leftRef.current?.classList.add('visible'); },
      { threshold: 0, rootMargin: '0px 0px -10px 0px' }
    );
    if (leftRef.current) obs.observe(leftRef.current);
    const t = setTimeout(() => setAvatarVisible(true), 200);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);

  const hasPhoto = !!PROFILE.photo && !imgError;

  return (
    <section id="tentang" className="section tentang">

      {/* ══ LEFT ══ */}
      <div className="hero-left reveal" ref={leftRef}>
        <div className="hero-label">{PROFILE.label}</div>

        <h1 className="hero-name" data-text="Rafi Ibrahim">
          {PROFILE.firstName}<br />
          <span className="gradient">{PROFILE.lastName}</span>
        </h1>

        <p className="hero-role">
          {'// '}
          <TypingText texts={PROFILE.roles} speed={75} deleteSpeed={35} pause={2200} />
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
          onClick={() => document.getElementById('projek')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn"
        >
          View Work →
        </RippleButton>
      </div>

      {/* ══ RIGHT — Avatar ══ */}
      <div
        className="hero-visual"
        style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          opacity: avatarVisible ? 1 : 0,
          transform: avatarVisible ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="avatar-wrapper">
          <div
            ref={avatarRef}
            className="avatar-frame"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out', overflow: 'hidden' }}
          >
            <AvatarHologram hasPhoto={hasPhoto} initials={PROFILE.initials}>
              <img
                src={PROFILE.photo}
                alt={`${PROFILE.firstName} ${PROFILE.lastName}`}
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '150%',
                  objectFit: 'cover', objectPosition: 'center top',
                  filter: 'grayscale(15%) contrast(1.02)',
                }}
                onError={() => setImgError(true)}
              />
            </AvatarHologram>

            <div className="avatar-sub">{PROFILE.avatarSub}</div>
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