import React, { useState, useEffect, useRef } from 'react';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState('boot');
  const [lines, setLines]       = useState([]);
  const [glitch, setGlitch]     = useState(false);
  const [fadeOut, setFadeOut]   = useState(false);
  const ran = useRef(false); // guard StrictMode

  const BOOT_LINES = [
    '> INITIALIZING SYSTEM...',
    '> LOADING CORE MODULES............OK',
    '> ESTABLISHING CONNECTION.........OK',
    '> SCANNING ENVIRONMENT............OK',
    '> COMPILING ASSETS................OK',
    '> MOUNTING INTERFACE..............OK',
    '> SYSTEM READY',
  ];

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    // ── Phase 1: boot lines ──
    let idx = 0;
    const timers = [];

    const addNext = () => {
      if (idx < BOOT_LINES.length) {
        const line = BOOT_LINES[idx++];
        setLines(prev => [...prev, line]);
        timers.push(setTimeout(addNext, 110 + Math.random() * 70));
      } else {
        timers.push(setTimeout(startProgress, 250));
      }
    };

    timers.push(setTimeout(addNext, 150));

    // ── Phase 2: progress bar ──
    let current = 0;
    let interval = null;

    const startProgress = () => {
      setPhase('scan');
      interval = setInterval(() => {
        const step = current < 40  ? 2.5
                   : current < 70  ? 1.8
                   : current < 88  ? 1.2
                   : current < 96  ? 0.6 : 1.5;
        current = Math.min(current + step, 100);
        setProgress(Math.floor(current));

        if (Math.random() < 0.04) {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 80);
        }

        if (current >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('done'), 300);
        }
      }, 28);
    };

    return () => {
      timers.forEach(clearTimeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  // ── Phase 3: fade out ──
  useEffect(() => {
    if (phase !== 'done') return;
    const t = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 650);
    }, 350);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: '#02040c',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: fadeOut ? 'opacity 0.65s ease' : 'none',
      overflow: 'hidden',
    }}>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(0,255,231,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,231,0.025) 1px,transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Ambient */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(0,255,231,0.05) 0%,transparent 70%)',
      }} />

      {/* Scan sweep */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(0,255,231,0.5),transparent)',
        animation: 'ls-scan 2.5s linear infinite', pointerEvents: 'none',
      }} />

      {/* Corners */}
      {[{top:'8%',left:'4%',borderTop:'2px solid',borderLeft:'2px solid'},
        {top:'8%',right:'4%',borderTop:'2px solid',borderRight:'2px solid'},
        {bottom:'8%',left:'4%',borderBottom:'2px solid',borderLeft:'2px solid'},
        {bottom:'8%',right:'4%',borderBottom:'2px solid',borderRight:'2px solid'},
      ].map((s,i) => (
        <div key={i} style={{ position:'absolute', width:36, height:36, borderColor:'rgba(0,255,231,0.25)', pointerEvents:'none', ...s }} />
      ))}

      {/* Content */}
      <div style={{
        display:'flex', flexDirection:'column', alignItems:'center',
        gap:'2rem', width:'100%', maxWidth:500, padding:'0 1.5rem',
        filter: glitch ? 'blur(0.4px)' : 'none',
        transition: 'filter 0.05s',
      }}>
        {/* Logo */}
        <div style={{ textAlign:'center', position:'relative' }}>
          <div style={{
            fontFamily:"'Space Mono',monospace",
            fontSize:'clamp(1.8rem,7vw,3.2rem)', fontWeight:700,
            letterSpacing:'0.22em', color:'#00ffe7', lineHeight:1,
            textShadow:'0 0 28px rgba(0,255,231,0.5),0 0 60px rgba(0,255,231,0.15)',
          }}>
            DEV<span style={{color:'rgba(0,255,231,0.3)'}}>. folio</span>
            {glitch && <>
              <span style={{position:'absolute',top:0,left:0,right:0,color:'#6c3fff',clipPath:'inset(0 0 55% 0)',transform:'translate(-2px,-1px)',opacity:0.8}}>DEV.folio</span>
              <span style={{position:'absolute',top:0,left:0,right:0,color:'#ff2d6b',clipPath:'inset(55% 0 0 0)',transform:'translate(2px,1px)',opacity:0.7}}>DEV.folio</span>
            </>}
          </div>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:'0.55rem',color:'rgba(0,255,231,0.35)',letterSpacing:'0.4em',marginTop:'0.5rem'}}>
            PORTFOLIO SYSTEM v2.0
          </div>
        </div>

        {/* Terminal */}
        <div style={{
          width:'100%', background:'rgba(0,255,231,0.015)',
          border:'1px solid rgba(0,255,231,0.08)',
          padding:'1rem 1.2rem', minHeight:130,
        }}>
          {lines.map((line, i) => (
            <div key={i} style={{
              fontFamily:"'Space Mono',monospace", fontSize:'0.62rem',
              lineHeight:1.85, letterSpacing:'0.03em',
              color: line.includes('READY') ? '#00ffe7'
                   : line.includes('OK')    ? 'rgba(0,255,231,0.45)'
                   :                          'rgba(0,255,231,0.35)',
              textShadow: line.includes('READY') ? '0 0 8px rgba(0,255,231,0.5)' : 'none',
              animation: 'ls-fadein 0.12s ease forwards',
            }}>
              {line.includes('OK') ? <>
                <span style={{color:'rgba(0,255,231,0.3)'}}>{line.replace('OK','')}</span>
                <span style={{color:'#00ff88',textShadow:'0 0 6px #00ff88'}}>OK</span>
              </> : line}
            </div>
          ))}
          {phase === 'boot' && (
            <span style={{
              display:'inline-block', width:7, height:13,
              background:'#00ffe7', verticalAlign:'middle',
              animation:'ls-blink 0.7s step-end infinite',
              boxShadow:'0 0 5px #00ffe7',
            }} />
          )}
        </div>

        {/* Progress bar — muncul setelah boot */}
        {phase !== 'boot' && (
          <div style={{ width:'100%' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.45rem' }}>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:'0.55rem',color:'rgba(0,255,231,0.35)',letterSpacing:'0.1em'}}>LOADING ASSETS</span>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:'0.55rem',letterSpacing:'0.05em',
                color: progress===100 ? '#00ffe7' : 'rgba(0,255,231,0.55)',
                textShadow: progress===100 ? '0 0 8px rgba(0,255,231,0.5)' : 'none',
              }}>{progress}%</span>
            </div>
            <div style={{ width:'100%', height:2, background:'rgba(0,255,231,0.07)', position:'relative' }}>
              <div style={{
                height:'100%', width:`${progress}%`,
                background:'linear-gradient(90deg,#6c3fff,#00ffe7)',
                boxShadow:'0 0 8px rgba(0,255,231,0.5)',
                transition:'width 0.03s linear', position:'relative',
              }}>
                <div style={{
                  position:'absolute', right:-3, top:'50%', transform:'translateY(-50%)',
                  width:6, height:6, borderRadius:'50%', background:'#00ffe7',
                  boxShadow:'0 0 8px #00ffe7,0 0 16px rgba(0,255,231,0.6)',
                }} />
              </div>
              {[25,50,75].map(p => (
                <div key={p} style={{ position:'absolute', top:-2, left:`${p}%`, width:1, height:6, background:'rgba(0,255,231,0.15)' }} />
              ))}
            </div>
            <div style={{ marginTop:'0.5rem', fontFamily:"'Space Mono',monospace", fontSize:'0.5rem', color:'rgba(0,255,231,0.2)', letterSpacing:'0.07em' }}>
              {progress < 30 ? 'INITIALIZING CORE...'
               : progress < 55 ? 'LOADING VISUAL ASSETS...'
               : progress < 75 ? 'BUILDING COMPONENTS...'
               : progress < 92 ? 'COMPILING STYLESHEETS...'
               : progress < 100 ? 'FINALIZING...'
               : '[ SYSTEM ONLINE ]'}
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div style={{
        position:'absolute', bottom:'5%', left:0, right:0,
        display:'flex', justifyContent:'space-between', padding:'0 5%',
        fontFamily:"'Space Mono',monospace", fontSize:'0.48rem',
        color:'rgba(0,255,231,0.18)', letterSpacing:'0.07em', pointerEvents:'none',
      }}>
        <span>NODE: PORTFOLIO-MAIN</span>
        <span>STATUS: {phase === 'done' ? 'READY' : 'LOADING'}</span>
        <span>v2.0.{new Date().getFullYear()}</span>
      </div>

      <style>{`
        @keyframes ls-scan { 0%{top:-1px} 100%{top:100%} }
        @keyframes ls-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes ls-fadein { from{opacity:0;transform:translateX(-3px)} to{opacity:1;transform:translateX(0)} }
      `}</style>
    </div>
  );
}

export default LoadingScreen;