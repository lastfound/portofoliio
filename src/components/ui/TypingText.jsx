import React, { useState, useEffect, useRef } from 'react';

function TypingText({ texts = [], speed = 80, deleteSpeed = 40, pause = 1800, className = '' }) {
  const [displayed, setDisplayed]   = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex]           = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const stateRef = useRef({ displayed: '', isDeleting: false, index: 0 });
  const timerRef = useRef(null);

  // kedip cursor
  useEffect(() => {
    const blink = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(blink);
  }, []);

  // logika mengetik — pakai ref agar tidak ada stale closure
  useEffect(() => {
    if (!texts.length) return;

    const tick = () => {
      const { displayed: cur, isDeleting: del, index: idx } = stateRef.current;
      const currentText = texts[idx % texts.length];

      if (!del) {
        //sedang mengetik
        const next = currentText.slice(0, cur.length + 1);
        stateRef.current.displayed = next;
        setDisplayed(next);

        if (next.length === currentText.length) {
          // selesai ngetik (jeda)
          stateRef.current.isDeleting = true;
          timerRef.current = setTimeout(tick, pause);
        } else {
          timerRef.current = setTimeout(tick, speed);
        }
      } else {
        // sedang menghapus
        const next = currentText.slice(0, cur.length - 1);
        stateRef.current.displayed = next;
        setDisplayed(next);

        if (next.length === 0) {
          // selesai ngapus pindah ke teks lain
          const nextIndex = (idx + 1) % texts.length;
          stateRef.current.isDeleting = false;
          stateRef.current.index      = nextIndex;
          setIndex(nextIndex);
          timerRef.current = setTimeout(tick, speed + 100);
        } else {
          timerRef.current = setTimeout(tick, deleteSpeed);
        }
      }
    };

    timerRef.current = setTimeout(tick, speed);

    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <span className={`typing-text ${className}`}>
      {displayed}
      <span
        className="typing-cursor"
        style={{ opacity: showCursor ? 1 : 0 }}
      >|</span>
    </span>
  );
}

export default TypingText;