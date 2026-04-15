import React, { useState, useEffect, useRef } from 'react';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut]   = useState(false);
  const ran = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    let current = 0;
    const interval = setInterval(() => {
      const step = current < 40  ? 2.8
                 : current < 70  ? 1.8
                 : current < 90  ? 1.0
                 : current < 97  ? 0.5 : 1.5;
      current = Math.min(current + step, 100);
      setProgress(Math.floor(current));
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => onCompleteRef.current?.(), 650);
        }, 400);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: '#f9f8f6',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: fadeOut ? 'opacity 0.65s ease' : 'none',
      pointerEvents: fadeOut ? 'none' : 'all',
    }}>

      {/* Name */}
      <div style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        color: '#1a1a1a',
        marginBottom: '3rem',
        lineHeight: 1,
      }}>
        Rafi Ibrahim
      </div>

      {/* Progress container */}
      <div style={{ width: 'min(320px, 70vw)' }}>
        <div style={{
          width: '100%', height: '1px',
          background: '#e2e0db',
          position: 'relative', marginBottom: '1rem',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: '#1a1a1a',
            transition: 'width 0.04s linear',
          }} />
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.58rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#9e9b94',
          fontWeight: 400,
        }}>
          <span>
            {progress < 40 ? 'Initializing'
             : progress < 70 ? 'Loading assets'
             : progress < 90 ? 'Building UI'
             : progress < 100 ? 'Almost ready'
             : 'Welcome'}
          </span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;