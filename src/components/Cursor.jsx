import React, { useState, useEffect, useRef } from 'react';

function Cursor() {
  const cursorRef    = useRef(null);
  const trailRef     = useRef(null);
  const [hovered, setHovered]   = useState(false);
  const [visible, setVisible]   = useState(false);
  const [isTouch, setIsTouch]   = useState(
    // cek langsung saat pertama render supaya tidak ada flash cursor di HP
    () => window.matchMedia('(hover: none) and (pointer: coarse)').matches
  );
  const mousePos     = useRef({ x: 0, y: 0 });
  const trailPos     = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    const checkTouch = () => setIsTouch(mq.matches);
    mq.addEventListener('change', checkTouch);
    return () => mq.removeEventListener('change', checkTouch);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top  = e.clientY + 'px';
      }
    };

    const animateTrail = () => {
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.14;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.14;
      if (trailRef.current) {
        trailRef.current.style.left = trailPos.current.x + 'px';
        trailRef.current.style.top  = trailPos.current.y + 'px';
      }
      animFrameRef.current = requestAnimationFrame(animateTrail);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    const interactives = document.querySelectorAll(
      'a, button, .project-card, .cert-card, .skill-tag, .contact-channel, input, textarea'
    );
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    document.addEventListener('mousemove', handleMouseMove);
    animFrameRef.current = requestAnimationFrame(animateTrail);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [isTouch]);

  // Hilang total di perangkat sentuh / HP
  if (isTouch) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`cursor ${hovered ? 'hovered' : ''}`}
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={trailRef}
        className={`cursor-trail ${hovered ? 'hovered' : ''}`}
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
}

export default Cursor;