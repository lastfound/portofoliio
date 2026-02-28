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
  const [imgError, setImgError] = useState(false);
  const [avatarVisible, setAvatarVisible] = useState(false);
  const [scanPhase, setScanPhase] = useState('idle'); // idle | scanning | done

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

  useEffect(() => {
    // Animasi kiri (teks)
    const obsLeft = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) leftRef.current?.classList.add('visible'); },
      { threshold: 0, rootMargin: '0px 0px -10px 0px' }
    );
    if (leftRef.current) obsLeft.observe(leftRef.current);

    // Avatar muncul setelah 300ms
    const t1 = setTimeout(() => setAvatarVisible(true), 300);

    // Scan trigger: mulai scan 200ms setelah avatar visible
    const t2 = setTimeout(() => {
      setScanPhase('scanning');
      // Setelah durasi animasi scan (1.6s), pindah ke fase done
      setTimeout(() => setScanPhase('done'), 1650);
    }, 500);

    return () => {
      obsLeft.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
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
            className={`avatar-frame corner-frame ${scanPhase === 'scanning' ? 'scanning' : ''} ${scanPhase === 'done' ? 'scan-done' : ''}`}
            onMouseMove={handleAvatarMouseMove}
            onMouseLeave={handleAvatarMouseLeave}
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.12s ease-out' }}
          >
            {/* Garis scan utama */}
            <div className="avatar-scan" />

            {/* Overlay cahaya yang ikut bergerak */}
            <div className="avatar-scan-overlay" />

            {/* Grid yang terbuka mengikuti scan */}
            <div className="avatar-scan-grid" />

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

            {/* Status teks yang muncul setelah scan selesai */}
            <div className="avatar-scan-status">IDENTITY VERIFIED</div>

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

          {/* Floating badges — semua device */}
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