import React, { useEffect, useRef, useState } from 'react';

const PROFILE = {
  label:     'Portfolio v2.0',
  firstName: 'Rafi',       // ← Ganti nama depan
  lastName:  'Ibrahim',      // ← Ganti nama belakang
  role:      '// Full Stack Web Developer & UI Designer',
  bio:       'Saya membangun pengalaman digital yang indah dan fungsional. Berfokus pada antarmuka modern yang menggabungkan estetika futuristik dengan performa tinggi dan pengalaman pengguna yang intuitif.',
  stats: [
    { num: '3+',   label: 'Proyek Selesai' },
    { num: '2+',   label: 'Sertifikat'     },
    { num: '100%', label: 'Dedikasi'       },
  ],
  skills:    ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Figma', 'Git'],
  initials:  'RI',            
  avatarSub: 'Web Developer',
  photo: '/src/assets/profil.jpeg', 
};

function Tentang() {
  const sectionRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (sectionRef.current) {
      const items = sectionRef.current.querySelectorAll('.reveal');
      items.forEach((el, i) => {
        setTimeout(() => el?.classList.add('visible'), i * 150 + 100);
      });
    }
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
        <p className="hero-role">{PROFILE.role}</p>
        <p className="hero-bio">{PROFILE.bio}</p>
        <div className="hero-stats">
          {PROFILE.stats.map(s => (
            <div key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="hero-skills">
          {PROFILE.skills.map(sk => (
            <span key={sk} className="skill-tag">{sk}</span>
          ))}
        </div>
        <button className="btn" onClick={scrollToProjek}>Lihat Proyek →</button>
      </div>

      {/* avatar */}
      <div className="hero-visual reveal">
        <div className="avatar-wrapper">
          <div className="avatar-frame corner-frame">

            {/* aniasmi scan  */}
            <div className="avatar-scan" />

            {/* foto */}
            {hasPhoto && (
              <img
                src={PROFILE.photo}
                alt={`${PROFILE.firstName} ${PROFILE.lastName}`}
                className="avatar-photo"
                onError={() => setImgError(true)}
              />
            )}

            {/* Inisial — overlay transparan di atas foto, atau penuh jika tidak ada foto */}
            <div className={`avatar-initials-overlay ${hasPhoto ? 'has-photo' : ''}`}>
              {PROFILE.initials}
            </div>

            {/* Sub label di bawah */}
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
