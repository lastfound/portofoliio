import React, { useEffect, useRef, useState } from 'react';

/**
 * AvatarHologram — refined version
 * Simple elegant reveal: image fades in with a subtle upward wipe
 */
function AvatarHologram({ children, photo, initials, avatarSub, hasPhoto }) {
  const wrapRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), 200);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* Photo */}
      {hasPhoto && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3,
          clipPath: revealed ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
          transition: 'clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {children}
        </div>
      )}

      {/* Initials fallback */}
      {!hasPhoto && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: revealed ? 1 : 0,
          transition: 'opacity 0.8s ease',
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: '5rem',
          fontWeight: 400,
          color: '#6b5b4e',
        }}>
          {initials}
        </div>
      )}

      {/* Subtle overlay line sweep (one-time, decorative) */}
      {!revealed && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 4,
          background: '#f5f4f0',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
}

export default AvatarHologram;