import React, { useState, useEffect } from 'react';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress]   = useState(0);
  const [phase, setPhase]         = useState('boot');   // boot | scan | load | done
  const [lines, setLines]         = useState([]);
  const [glitch, setGlitch]       = useState(false);
  const [fadeOut, setFadeOut]     = useState(false);

  const bootLines = [
    '> INITIALIZING SYSTEM...',
    '> LOADING CORE MODULES............OK',
    '> ESTABLISHING CONNECTION.........OK',
    '> SCANNING ENVIRONMENT............OK',
    '> COMPILING ASSETS................OK',
    '> MOUNTING INTERFACE..............OK',
    '> SYSTEM READY',
  ];

  // ── Phase 1: boot text lines muncul satu per satu ──
  useEffect(() => {
    if (phase !== 'boot') return;
    let i = 0;
    const addLine = () => {
      if (i < bootLines.length) {
        setLines(prev => [...prev, bootLines[i]]);
        i++;
        setTimeout(addLine, i === 1 ? 180 : 120 + Math.random() * 80);
      } else {
        setTimeout(() => setPhase('scan'), 300);
      }
    };
    setTimeout(addLine, 200);
  }, [phase]);

  // ── Phase 2: progress bar naik ──
  useEffect(() => {
    if (phase !== 'scan') return;
    let current = 0;
    const interval = setInterval(() => {
      // Naik dengan kecepatan bervariasi — terasa natural
      const step = current < 40  ? 2.5 :
                   current < 70  ? 1.8 :
                   current < 88  ? 1.2 :
                   current < 96  ? 0.6 : 1.5;
      current = Math.min(current + step, 100);
      setProgress(Math.floor(current));

      // Glitch sesekali
      if (Math.random() < 0.04) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 80);
      }

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setPhase('done'), 300);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [phase]);

  // ── Phase 3: fade out ──
  useEffect(() => {
    if (phase !== 'done') return;
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 700);
    }, 400);
  }, [phase, onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: '#02040c',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: fadeOut ? 'opacity 0.7s cubic-bezier(0.16,1,0.3,1)' : 'none',
      overflow: 'hidden',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,255,231,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,231,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 60% 40% at 50% 50%,
            rgba(0,255,231,0.06) 0%, transparent 70%)
        `,
      }} />

      {/* Scan line sweep */}
      <div style={{
        position: 'absolute', left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(0,255,231,0.6), transparent)',
        animation: 'loading-scan 2.5s linear infinite',
        boxShadow: '0 0 12px rgba(0,255,231,0.4)',
      }} />

      {/* Corner brackets */}
      {[
        { top: '10%', left: '5%',  borderTop: '2px solid', borderLeft: '2px solid' },
        { top: '10%', right: '5%', borderTop: '2px solid', borderRight: '2px solid' },
        { bottom: '10%', left: '5%',  borderBottom: '2px solid', borderLeft: '2px solid' },
        { bottom: '10%', right: '5%', borderBottom: '2px solid', borderRight: '2px solid' },
      ].map((s, i) => (
        <div key={i} style={{
          position: 'absolute', width: 40, height: 40,
          borderColor: 'rgba(0,255,231,0.3)',
          ...s,
        }} />
      ))}

      {/* Main content */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '2.5rem', width: '100%', maxWidth: '520px', padding: '0 2rem',
        filter: glitch ? 'blur(0.5px)' : 'none',
        transform: glitch ? `translate(${(Math.random()-0.5)*4}px, 0)` : 'none',
        transition: 'filter 0.05s, transform 0.05s',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '0.25em',
            color: '#00ffe7',
            textShadow: '0 0 30px rgba(0,255,231,0.5), 0 0 60px rgba(0,255,231,0.2)',
            lineHeight: 1,
            position: 'relative',
          }}>
            DEV<span style={{ color: 'rgba(0,255,231,0.35)' }}>.folio</span>

            {/* Glitch layers */}
            {glitch && (
              <>
                <span style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  color: '#6c3fff', clipPath: 'inset(0 0 55% 0)',
                  transform: 'translate(-2px, -1px)', opacity: 0.8,
                }}>DEV.folio</span>
                <span style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  color: '#ff2d6b', clipPath: 'inset(55% 0 0 0)',
                  transform: 'translate(2px, 1px)', opacity: 0.7,
                }}>DEV.folio</span>
              </>
            )}
          </div>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            color: 'rgba(0,255,231,0.4)',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginTop: '0.6rem',
          }}>
            PORTFOLIO SYSTEM v2.0
          </div>
        </div>

        {/* Boot log terminal */}
        <div style={{
          width: '100%',
          background: 'rgba(0,255,231,0.02)',
          border: '1px solid rgba(0,255,231,0.1)',
          padding: '1rem 1.2rem',
          minHeight: '140px',
        }}>
          {lines.map((line, i) => (
            <div key={i} style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.65rem',
              color: line.includes('OK') ? 'rgba(0,255,231,0.7)'
                   : line.includes('READY') ? '#00ffe7'
                   : 'rgba(0,255,231,0.4)',
              letterSpacing: '0.04em',
              lineHeight: '1.9',
              animation: 'fade-in-line 0.15s ease forwards',
            }}>
              {line.includes('OK') ? (
                <>
                  <span style={{ color: 'rgba(0,255,231,0.35)' }}>
                    {line.replace('OK', '')}
                  </span>
                  <span style={{ color: '#00ff88' }}>OK</span>
                </>
              ) : line.includes('READY') ? (
                <span style={{
                  color: '#00ffe7',
                  textShadow: '0 0 8px rgba(0,255,231,0.6)',
                }}>
                  {line}
                </span>
              ) : (
                line
              )}
            </div>
          ))}

          {/* Blinking cursor */}
          {phase !== 'done' && (
            <span style={{
              display: 'inline-block',
              width: '8px', height: '14px',
              background: '#00ffe7',
              animation: 'blink-block 0.7s step-end infinite',
              verticalAlign: 'middle',
              marginTop: '2px',
              boxShadow: '0 0 6px #00ffe7',
            }} />
          )}
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.58rem',
              color: 'rgba(0,255,231,0.4)',
              letterSpacing: '0.1em',
            }}>
              LOADING ASSETS
            </span>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.58rem',
              color: progress === 100 ? '#00ffe7' : 'rgba(0,255,231,0.6)',
              textShadow: progress === 100 ? '0 0 8px rgba(0,255,231,0.5)' : 'none',
              letterSpacing: '0.05em',
            }}>
              {progress}%
            </span>
          </div>

          {/* Track */}
          <div style={{
            width: '100%', height: '2px',
            background: 'rgba(0,255,231,0.08)',
            position: 'relative',
            overflow: 'visible',
          }}>
            {/* Fill */}
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: `linear-gradient(90deg, #6c3fff, #00ffe7)`,
              boxShadow: '0 0 10px rgba(0,255,231,0.6), 0 0 20px rgba(0,255,231,0.3)',
              transition: 'width 0.03s linear',
              position: 'relative',
            }}>
              {/* Leading dot */}
              <div style={{
                position: 'absolute', right: -3, top: '50%',
                transform: 'translateY(-50%)',
                width: 6, height: 6,
                background: '#00ffe7',
                borderRadius: '50%',
                boxShadow: '0 0 8px #00ffe7, 0 0 16px rgba(0,255,231,0.6)',
              }} />
            </div>

            {/* Segment markers */}
            {[25, 50, 75].map(p => (
              <div key={p} style={{
                position: 'absolute', top: -3, left: `${p}%`,
                width: 1, height: 8,
                background: 'rgba(0,255,231,0.2)',
              }} />
            ))}
          </div>

          {/* Sub text */}
          <div style={{
            marginTop: '0.6rem',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.54rem',
            color: 'rgba(0,255,231,0.25)',
            letterSpacing: '0.08em',
          }}>
            {progress < 30  ? 'INITIALIZING CORE MODULES...' :
             progress < 55  ? 'LOADING VISUAL ASSETS...' :
             progress < 75  ? 'BUILDING COMPONENTS...' :
             progress < 92  ? 'COMPILING STYLESHEETS...' :
             progress < 100 ? 'FINALIZING...' :
                              '[ SYSTEM ONLINE ]'}
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      <div style={{
        position: 'absolute', bottom: '5%', left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between',
        padding: '0 5%',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.52rem',
        color: 'rgba(0,255,231,0.2)',
        letterSpacing: '0.08em',
      }}>
        <span>NODE: PORTFOLIO-MAIN</span>
        <span>STATUS: {phase === 'done' ? 'READY' : 'LOADING'}</span>
        <span>v2.0.{new Date().getFullYear()}</span>
      </div>

      <style>{`
        @keyframes loading-scan {
          0%   { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes blink-block {
          0%,100% { opacity: 1; }
          50%     { opacity: 0; }
        }
        @keyframes fade-in-line {
          from { opacity: 0; transform: translateX(-4px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;
