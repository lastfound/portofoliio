import React, { useRef, useCallback } from 'react';

/**
 * Tilt3D — wrapper yang memberikan efek tilt 3D pada children
 * Props:
 *   maxTilt    : derajat maksimal kemiringan (default: 15)
 *   glare      : tampilkan efek glare/shine (default: true)
 *   scale      : skala saat hover (default: 1.04)
 *   className  : kelas CSS tambahan
 *   style      : inline style tambahan
 */
function Tilt3D({
  children,
  maxTilt  = 15,
  glare    = true,
  scale    = 1.04,
  className = '',
  style     = {},
}) {
  const cardRef  = useRef(null);
  const glareRef = useRef(null);

  const handleMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -maxTilt;
    const rotateY = ((x - cx) / cx) *  maxTilt;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(${scale}, ${scale}, ${scale})
    `;

    if (glare && glareRef.current) {
      const angle  = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
      const dist   = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const maxD   = Math.sqrt(cx ** 2 + cy ** 2);
      const intensity = (dist / maxD) * 0.3;
      glareRef.current.style.opacity   = intensity;
      glareRef.current.style.transform = `rotate(${angle}deg) scale(2)`;
    }
  }, [maxTilt, scale, glare]);

  const handleLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = 0;
    }
  }, [glare]);

  return (
    <div
      ref={cardRef}
      className={`tilt3d-wrapper ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.08s ease-out',
        willChange: 'transform',
        ...style,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}

      {/* Glare overlay */}
      {glare && (
        <div
          ref={glareRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18) 0%, transparent 65%)',
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 0.15s ease',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}

export default Tilt3D;
