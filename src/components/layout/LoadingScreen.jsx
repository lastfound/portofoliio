import React, { useState, useEffect, useRef } from 'react';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut]   = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    // Animasi progress bar cepat tanpa membebani thread utama
    const t1 = setTimeout(() => setProgress(45), 50);
    const t2 = setTimeout(() => setProgress(85), 180);
    const t3 = setTimeout(() => setProgress(100), 320);

    const t4 = setTimeout(() => {
      setFadeOut(true);
      const t5 = setTimeout(() => onCompleteRef.current?.(), 400);
      return () => clearTimeout(t5);
    }, 450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div
      aria-hidden={fadeOut}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: '#000000',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      {/* Name */}
      <div style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: 'clamp(2rem, 6vw, 3rem)',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        color: '#ffffff',
        marginBottom: '2.5rem',
        lineHeight: 1,
      }}>
        Rafi Ibrahim
      </div>

      {/* Progress container */}
      <div style={{ width: 'min(300px, 70vw)' }}>
        <div style={{
          width: '100%', height: '1px',
          background: 'rgba(255, 255, 255, 0.1)',
          position: 'relative', marginBottom: '1rem',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: '#ffffff',
            transition: 'width 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
          }} />
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.62rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#666670',
          fontWeight: 400,
        }}>
          <span>
            {progress < 50 ? 'Initializing'
             : progress < 100 ? 'Building UI'
             : 'Welcome'}
          </span>
          <span style={{ color: '#ffffff', fontFamily: 'monospace' }}>{progress}%</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
