import React, { useEffect, useRef, useState } from 'react';

/**
 * AvatarHologram
 * Saat masuk viewport:
 * 1. Piksel-piksel kecil berhamburan dari tengah → membentuk outline kotak
 * 2. Garis scan vertikal menyapu dari atas ke bawah
 * 3. Foto muncul bertahap lewat clip-path mengikuti garis scan
 * 4. Setelah selesai: idle scan loop pelan + corner glow
 */
function AvatarHologram({ children, photo, initials, avatarSub, hasPhoto }) {
  const wrapRef    = useRef(null);
  const canvasRef  = useRef(null);
  const frameRef   = useRef(null);
  const [phase, setPhase] = useState('idle'); // idle | assemble | scan | done

  // ── Trigger saat masuk viewport ──
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === 'idle') {
          setPhase('assemble');
        }
      },
      { threshold: 0.3 }
    );
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, [phase]);

  // ── Phase: assemble — partikel menyusun diri ──
  useEffect(() => {
    if (phase !== 'assemble') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.offsetWidth  || 240;
    const H = canvas.offsetHeight || 300;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Buat partikel yang akan membentuk outline frame
    const particles = [];
    const cols = Math.floor(W / 6);
    const rows = Math.floor(H / 6);

    // Border piksel (top, bottom, left, right)
    const addBorder = (x, y) => {
      particles.push({
        tx: x, ty: y,              // target
        x:  W/2 + (Math.random()-0.5)*W*0.8, // posisi awal acak
        y:  H/2 + (Math.random()-0.5)*H*0.8,
        vx: 0, vy: 0,
        size: 1.5 + Math.random() * 1.2,
        alpha: 0,
        color: Math.random() < 0.7 ? '0,255,231' : '108,63,255',
        delay: Math.random() * 0.4,
      });
    };

    // Top & bottom edge
    for (let c = 0; c <= cols; c++) {
      addBorder(c * (W/cols), 0);
      addBorder(c * (W/cols), H);
    }
    // Left & right edge
    for (let r = 1; r < rows; r++) {
      addBorder(0, r * (H/rows));
      addBorder(W, r * (H/rows));
    }
    // Grid lines interior (sparse)
    for (let c = 3; c < cols; c += 4) {
      for (let r = 3; r < rows; r += 4) {
        if (Math.random() < 0.25) addBorder(c*(W/cols), r*(H/rows));
      }
    }

    let startTime = null;
    const DURATION = 1200; // ms
    let animId;
    let done = false;

    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      ctx.clearRect(0, 0, W, H);

      let allSettled = true;
      particles.forEach(p => {
        const pProgress = Math.max(0, progress - p.delay) / (1 - p.delay + 0.001);
        const ease = 1 - Math.pow(1 - Math.min(pProgress, 1), 3);

        p.x  += (p.tx - p.x) * 0.12;
        p.y  += (p.ty - p.y) * 0.12;
        p.alpha = Math.min(p.alpha + 0.06, ease);

        const dist = Math.hypot(p.x - p.tx, p.y - p.ty);
        if (dist > 0.5 || p.alpha < 0.95) allSettled = false;

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha * 0.2})`;
        ctx.fill();
        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });

      // Horizontal scan shimmer saat assembling
      if (progress > 0.2 && progress < 0.9) {
        const scanY = progress * H * 1.1;
        const grad = ctx.createLinearGradient(0, scanY-20, 0, scanY+4);
        grad.addColorStop(0, 'rgba(0,255,231,0)');
        grad.addColorStop(0.7, 'rgba(0,255,231,0.06)');
        grad.addColorStop(1, 'rgba(0,255,231,0.18)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, scanY-20, W, 24);
      }

      if (!done) animId = requestAnimationFrame(animate);

      if (allSettled || progress >= 1) {
        done = true;
        // Transisi ke fase scan
        setTimeout(() => setPhase('scan'), 200);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => { done = true; cancelAnimationFrame(animId); };
  }, [phase]);

  // ── Phase: scan — garis menyapu, foto muncul ──
  const [scanY, setScanY] = useState(0);     // 0–100 (persen)
  const [photoReveal, setPhotoReveal] = useState(0); // 0–100

  useEffect(() => {
    if (phase !== 'scan') return;

    const SCAN_DURATION = 1600;
    let start = null;
    let animId;

    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / SCAN_DURATION, 1);
      const eased = p < 0.5 ? 2*p*p : -1+(4-2*p)*p; // ease in-out

      setScanY(eased * 100);
      setPhotoReveal(eased * 100);

      if (p < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setPhase('done');
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ── Phase: done — idle scan loop ──
  const [idleScan, setIdleScan] = useState(-10);
  useEffect(() => {
    if (phase !== 'done') return;
    let startY = -10;
    let animId;
    let lastTs = null;

    const loop = (ts) => {
      if (!lastTs) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;
      startY += dt * 0.04; // px/ms → laju idle
      if (startY > 110) startY = -10;
      setIdleScan(startY);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  const isScanning = phase === 'scan';
  const isDone     = phase === 'done';

  return (
    <div
      ref={wrapRef}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* Canvas partikel (assemble phase) */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 8,
          opacity: phase === 'assemble' ? 1
                 : phase === 'scan'     ? Math.max(0, 1 - scanY/50)
                 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Foto — di-clip mengikuti scan */}
      {hasPhoto && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3,
          clipPath: isScanning || isDone
            ? `inset(0 0 ${isDone ? 0 : 100 - photoReveal}% 0)`
            : 'inset(100% 0 0 0)',
          transition: isDone ? 'none' : undefined,
        }}>
          {children}
        </div>
      )}

      {/* Inisial (jika tidak ada foto) */}
      {!hasPhoto && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3,
          opacity: isDone ? 1 : isScanning ? photoReveal / 100 : 0,
          transition: 'opacity 0.3s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '5rem', fontWeight: 800,
          background: 'linear-gradient(135deg, #00ffe7, #6c3fff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {initials}
        </div>
      )}

      {/* Garis scan saat fase scan */}
      {isScanning && (
        <div style={{
          position: 'absolute', left: 0, right: 0, zIndex: 10,
          top: `${scanY}%`,
          height: '3px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,231,0.4) 15%, #00ffe7 50%, rgba(0,255,231,0.4) 85%, transparent 100%)',
          boxShadow: '0 0 8px rgba(0,255,231,0.9), 0 0 20px rgba(0,255,231,0.5), 0 0 40px rgba(0,255,231,0.2)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Kilatan overlay ikut scan */}
      {isScanning && (
        <div style={{
          position: 'absolute', left: 0, right: 0, zIndex: 9,
          top: `${Math.max(0, scanY - 12)}%`,
          height: '14%',
          background: 'linear-gradient(to bottom, transparent, rgba(0,255,231,0.07) 40%, rgba(0,255,231,0.13) 50%, rgba(0,255,231,0.07) 60%, transparent)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Idle scan setelah done */}
      {isDone && (
        <div style={{
          position: 'absolute', left: 0, right: 0, zIndex: 10,
          top: `${idleScan}%`,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0,255,231,0.25) 20%, rgba(0,255,231,0.6) 50%, rgba(0,255,231,0.25) 80%, transparent)',
          boxShadow: '0 0 6px rgba(0,255,231,0.4)',
          pointerEvents: 'none',
        }} />
      )}

      {/* HUD grid overlay */}
      {(isScanning || isDone) && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(0,255,231,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,231,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: isDone ? 0.6 : scanY / 100,
        }} />
      )}

      {/* "IDENTITY VERIFIED" setelah done */}
      {isDone && (
        <div style={{
          position: 'absolute', bottom: 46, left: 0, right: 0, zIndex: 12,
          display: 'flex', justifyContent: 'center',
          fontFamily: "'Space Mono', monospace", fontSize: '0.44rem',
          color: '#00ffe7', letterSpacing: '0.28em', textTransform: 'uppercase',
          textShadow: '0 0 8px rgba(0,255,231,0.6)',
          animation: 'holo-status-in 0.5s ease forwards',
          opacity: 0,
        }}>
          IDENTITY VERIFIED
        </div>
      )}

      <style>{`
        @keyframes holo-status-in {
          from { opacity: 0; letter-spacing: 0.5em; }
          to   { opacity: 0.75; letter-spacing: 0.28em; }
        }
      `}</style>
    </div>
  );
}

export default AvatarHologram;
