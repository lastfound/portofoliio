import React, { useState, useRef } from 'react';

// ─────────────────────────────────────────────
// RippleButton — tombol dengan efek ripple
// Props:
//   onClick  : fungsi klik
//   className: kelas CSS tambahan
//   children : isi tombol
// ─────────────────────────────────────────────
function RippleButton({ onClick, className = 'btn', children, type = 'button' }) {
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);

  const handleClick = (e) => {
    const btn  = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;
    const id   = Date.now();

    setRipples(prev => [...prev, { x, y, id }]);

    // Hapus ripple setelah animasi selesai
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 700);

    if (onClick) onClick(e);
  };

  return (
    <button
      ref={btnRef}
      type={type}
      className={`ripple-btn ${className}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple-effect"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </button>
  );
}

export default RippleButton;
