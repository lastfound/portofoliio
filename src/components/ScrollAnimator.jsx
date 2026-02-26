import { useEffect } from 'react';

function ScrollAnimator() {
  useEffect(() => {

    // ── 1. Reveal — muncul saat masuk, hilang saat keluar ──
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            // Hapus class saat keluar viewport → animasi ulang saat scroll balik
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
            // Masuk viewport → animasi muncul berurutan
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 100);
            });
          } else {
            // Keluar viewport → reset semua child
            children.forEach((child) => child.classList.remove('visible'));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // ── 3. Counter animasi angka ──
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
          } else {
            // Reset angka saat keluar → hitung ulang saat masuk lagi
            const original = entry.target.getAttribute('data-count');
            if (original) entry.target.textContent = original;
          }
        });
      },
      { threshold: 0.5 }
    );

    // ── 4. Progress bar scroll ──
    const handleProgress = () => {
      const bar = document.getElementById('scroll-progress');
      if (!bar) return;
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${(scrolled / total) * 100}%`;
    };

    // ── 5. Parallax ringan ──
    const handleParallax = () => {
      document.querySelectorAll('.parallax-slow').forEach((el) => {
        const rect    = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${centerY * 0.06}px)`;
      });
    };

    // Fungsi counter angka
    function animateCounter(el) {
      const raw    = el.getAttribute('data-count') || el.textContent;
      // Simpan nilai asli untuk reset nanti
      if (!el.getAttribute('data-count')) el.setAttribute('data-count', raw);
      const suffix = raw.replace(/[0-9.]/g, '');
      const target = parseFloat(raw);
      if (isNaN(target)) return;

      const duration  = 1400;
      const steps     = 55;
      const increment = target / steps;
      let current = 0;
      let step    = 0;

      // Hentikan counter sebelumnya jika ada
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

    // Register semua elemen
    const registerAll = () => {
      document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
      document.querySelectorAll('.stagger-parent').forEach((el) => staggerObserver.observe(el));
      document.querySelectorAll('.count-up').forEach((el) => {
        // Simpan nilai asli sebelum diobserve
        if (!el.getAttribute('data-count')) {
          el.setAttribute('data-count', el.textContent);
        }
        counterObserver.observe(el);
      });
    };

    registerAll();

    window.addEventListener('scroll', handleProgress,  { passive: true });
    window.addEventListener('scroll', handleParallax,  { passive: true });

    handleProgress();

    return () => {
      revealObserver.disconnect();
      staggerObserver.disconnect();
      counterObserver.disconnect();
      window.removeEventListener('scroll', handleProgress);
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return null;
}

export default ScrollAnimator;