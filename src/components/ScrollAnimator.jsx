import { useEffect } from 'react';

// ─────────────────────────────────────────────
// ScrollAnimator — komponen ini tidak render
// apapun, hanya mengurus semua animasi scroll
// di seluruh halaman secara terpusat.
// ─────────────────────────────────────────────

function ScrollAnimator() {
  useEffect(() => {
    // ── 1. Reveal elemen saat masuk viewport ──
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Berhenti observe setelah animasi jalan
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    // ── 2. Stagger children (animasi berurutan) ──
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.stagger-child');
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 100);
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // ── 3. Counter animasi angka (stats) ──
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    // ── 4. Parallax ringan pada section ──
    const handleParallax = () => {
      const parallaxEls = document.querySelectorAll('.parallax-slow');
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${centerY * 0.06}px)`;
      });
    };

    // ── 5. Progress bar scroll ──
    const handleProgress = () => {
      const bar = document.getElementById('scroll-progress');
      if (!bar) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${(scrolled / total) * 100}%`;
    };

    // ── 6. Section highlight di navbar ──
    const handleSectionHighlight = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          sec.classList.add('in-view');
        } else {
          sec.classList.remove('in-view');
        }
      });
    };

    // Fungsi counter angka
    function animateCounter(el) {
      const raw = el.getAttribute('data-count') || el.textContent;
      const suffix = raw.replace(/[0-9.]/g, ''); // ambil suffix: +, %, dll
      const target = parseFloat(raw);
      if (isNaN(target)) return;

      const duration = 1500;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(current + increment, target);
        el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    }

    // Register semua elemen
    const registerAll = () => {
      document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
      document.querySelectorAll('.stagger-parent').forEach((el) => staggerObserver.observe(el));
      document.querySelectorAll('.count-up').forEach((el) => {
        el.setAttribute('data-count', el.textContent);
        counterObserver.observe(el);
      });
    };

    registerAll();

    window.addEventListener('scroll', handleParallax, { passive: true });
    window.addEventListener('scroll', handleProgress, { passive: true });
    window.addEventListener('scroll', handleSectionHighlight, { passive: true });

    // Panggil sekali saat mount
    handleProgress();
    handleSectionHighlight();

    return () => {
      revealObserver.disconnect();
      staggerObserver.disconnect();
      counterObserver.disconnect();
      window.removeEventListener('scroll', handleParallax);
      window.removeEventListener('scroll', handleProgress);
      window.removeEventListener('scroll', handleSectionHighlight);
    };
  }, []);

  return null; // Tidak render apapun
}

export default ScrollAnimator;
