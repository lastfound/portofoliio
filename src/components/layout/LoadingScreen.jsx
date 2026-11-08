import React, { useState, useEffect, useRef } from 'react';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut]   = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const step = current < 40  ? 3.2
                 : current < 70  ? 2.2
                 : current < 90  ? 1.4
                 : current < 97  ? 0.8 : 2.0;
      current = Math.min(current + step, 100);
      setProgress(Math.floor(current));
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => onCompleteRef.current?.(), 600);
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: '#000000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: fadeOut ? 'opacity 0.6s ease' : 'none',
      pointerEvents: fadeOut ? 'none' : 'all',
    }}>

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
            transition: 'width 0.04s linear',
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
            {progress < 40 ? 'Initializing'
             : progress < 70 ? 'Loading assets'
             : progress < 90 ? 'Building UI'
             : progress < 100 ? 'Almost ready'
             : 'Welcome'}
          </span>
          <span style={{ color: '#ffffff', fontFamily: 'monospace' }}>{progress}%</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
