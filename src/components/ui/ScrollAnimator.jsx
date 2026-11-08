import { useEffect } from 'react';

function ScrollAnimator() {
  useEffect(() => {

    // ── 1. Reveal ──
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    // ── 2. Stagger children ──
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const children = entry.target.querySelectorAll('.stagger-child');
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 120);
            });
          } else {
            children.forEach((child) => child.classList.remove('visible'));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // ── 3. Counter angka ──
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
          } else {
            const original = entry.target.getAttribute('data-count');
            if (original) entry.target.textContent = original;
          }
        });
      },
      { threshold: 0.5 }
    );

    // ── 4. Progress bar ──
    const handleProgress = () => {
      const bar   = document.getElementById('scroll-progress');
      if (!bar) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${(window.scrollY / total) * 100}%`;
    };

    function animateCounter(el) {
      const raw = el.getAttribute('data-count') || el.textContent;
      if (!el.getAttribute('data-count')) el.setAttribute('data-count', raw);
      const suffix    = raw.replace(/[0-9.]/g, '');
      const target    = parseFloat(raw);
      if (isNaN(target)) return;
      const duration  = 1400;
      const steps     = 55;
      const increment = target / steps;
      let current = 0, step = 0;
      if (el._counterTimer) clearInterval(el._counterTimer);
      el._counterTimer = setInterval(() => {
        step++;
        current = Math.min(current + increment, target);
        el.textContent = (Number.isInteger(target)
          ? Math.round(current)
          : current.toFixed(1)) + suffix;
        if (step >= steps) clearInterval(el._counterTimer);
      }, duration / steps);
    }

    // ── Register ──
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
    document.querySelectorAll('.stagger-parent').forEach((el) => staggerObserver.observe(el));
    document.querySelectorAll('.count-up').forEach((el) => {
      if (!el.getAttribute('data-count')) el.setAttribute('data-count', el.textContent);
      counterObserver.observe(el);
    });

    window.addEventListener('scroll', handleProgress, { passive: true });
    handleProgress();

    return () => {
      revealObserver.disconnect();
      staggerObserver.disconnect();
      counterObserver.disconnect();
      window.removeEventListener('scroll', handleProgress);
    };
  }, []);

  return null;
}

export default ScrollAnimator;