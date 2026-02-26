import React, { useState, useEffect, useRef } from 'react';

function Cursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    const animateTrail = () => {
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.14;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.14;
      if (trailRef.current) {
        trailRef.current.style.left = trailPos.current.x + 'px';
        trailRef.current.style.top = trailPos.current.y + 'px';
      }
      animFrameRef.current = requestAnimationFrame(animateTrail);
    };
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    const interactives = document.querySelectorAll('a, button, .project-card, .cert-card, .skill-tag, .contact-channel, input, textarea');
    interactives.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });
    document.addEventListener('mousemove', handleMouseMove);
    animFrameRef.current = requestAnimationFrame(animateTrail);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
      interactives.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`cursor ${hovered ? 'hovered' : ''}`} />
      <div ref={trailRef} className={`cursor-trail ${hovered ? 'hovered' : ''}`} />
    </>
  );
}

export default Cursor;
