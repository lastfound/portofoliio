import React, { useEffect, useRef } from 'react';

// Koleksi Rumus & Notasi Matematika Inti dalam Arsitektur & Pengembangan AI
const AI_FORMULAS = [
  'Attention(Q,K,V) = softmax(QKᵀ / √dₖ) V',
  'θₜ₊₁ = θₜ - η ∇_θ L(θ)',
  'L_CE = -∑ yᵢ · log(ŷᵢ)',
  'Softmax(zᵢ) = eᶻⁱ / ∑ eᶻʲ',
  'GELU(x) = x · Φ(x)',
  'σ(x) = 1 / (1 + e⁻ˣ)',
  'MHA(Q,K,V) = Concat(head₁...headₕ) Wᴼ',
  'D_KL(P || Q) = ∑ P(x) log(P(x) / Q(x))',
  'RMSNorm(x) = x / √(mean(x²) + ε) ⊙ γ',
  'P(θ|D) = P(D|θ) P(θ) / P(D)',
  '∂L/∂w = (∂L/∂y) · (∂y/∂w)',
  'y = W · x + b',
  'cos(u, v) = (u · v) / (||u|| ||v||)',
  'mₜ = β₁mₜ₋₁ + (1 - β₁)gₜ',
  'vₜ = β₂vₜ₋₁ + (1 - β₂)gₜ²',
  'PPL = exp(-1/N ∑ log P(wᵢ))',
  'Cᵢⱼ = ∑ Aᵢₖ Bₖⱼ',
  'P(yᵢ) = exp(zᵢ / T) / ∑ exp(zⱼ / T)',
  'W = W₀ + (α/r) · B · A',
  'R_Θ,m^d · x_m',
  'L_reg = L₀ + (λ/2) ||W||₂²',
  'H(X) = -∑ P(x) log₂ P(x)',
];

function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
    };

    window.addEventListener('resize', handleResize);

    // Parallax scroll tracking
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let formulas = [];
    let dustParticles = [];
    let time = 0;

    const initElements = () => {
      const isMobile = width < 768;
      const formulaCount = isMobile ? 14 : 24;
      const dustCount = isMobile ? 25 : 40;

      // Inisialisasi Rumus Matematika AI dengan gerakan melayang bebas tak beraturan
      formulas = Array.from({ length: formulaCount }, (_, i) => {
        const text = AI_FORMULAS[i % AI_FORMULAS.length];
        // Kecepatan 2D acak ke segala arah
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.45 + 0.15;

        return {
          text,
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          // Parameter melayang tak beraturan (oscillation & turbulence)
          freqX: Math.random() * 0.012 + 0.006,
          freqY: Math.random() * 0.012 + 0.006,
          ampX: Math.random() * 0.9 + 0.3,
          ampY: Math.random() * 0.9 + 0.3,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          // Rotasi melayang lembut (tilt wobble)
          rotAngle: (Math.random() - 0.5) * 0.12,
          rotSpeed: (Math.random() - 0.5) * 0.003,
          // Tipografi jelas & terbaca
          fontSize: isMobile ? Math.floor(Math.random() * 3 + 12) : Math.floor(Math.random() * 4 + 14),
          // Opasitas jelas (0.28 s/d 0.50)
          baseAlpha: Math.random() * 0.18 + 0.28,
          pulseSpeed: Math.random() * 0.012 + 0.006,
          phase: Math.random() * Math.PI * 2,
          parallaxFactor: Math.random() * 0.18 + 0.04,
        };
      });

      // Partikel stardust & constellation
      dustParticles = Array.from({ length: dustCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.4 + 0.5,
        alpha: Math.random() * 0.18 + 0.06,
      }));
    };

    initElements();

    // Loop Animasi
    const render = () => {
      // Pause jika tab sedang tidak aktif untuk hemat CPU
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.012;

      // ── 1. Partikel & Garis Konstelasi Halus (Diverifikasi Cepat dengan Kuadrat Jarak) ──
      const maxDistSq = 95 * 95;
      for (let i = 0; i < dustParticles.length; i++) {
        const p1 = dustParticles[i];
        for (let j = i + 1; j < dustParticles.length; j++) {
          const p2 = dustParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 * (1 - dist / 95)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      dustParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });

      // ── 2. Render Rumus Matematika AI (Crisp High-Performance Monospace) ──
      const margin = 280;

      formulas.forEach((item) => {
        // Gerakan melayang tak beraturan: drifting acak + gelombang turbulensi
        item.x += item.vx + Math.sin(time * 0.7 + item.phaseX) * item.ampX;
        item.y += item.vy + Math.cos(time * 0.6 + item.phaseY) * item.ampY;
        item.rotAngle += item.rotSpeed;

        // Wrap around batas layar dengan margin lega
        if (item.x < -margin) item.x = width + margin - 20;
        if (item.x > width + margin) item.x = -margin + 20;
        if (item.y < -margin) item.y = height + margin - 20;
        if (item.y > height + margin) item.y = -margin + 20;

        // Opasitas dinamis (jelas dan tegas)
        const currentAlpha = Math.min(
          0.55,
          Math.max(0.22, item.baseAlpha + Math.sin(time * 1.2 + item.phase) * 0.08)
        );

        // Posisi Y responsif terhadap scroll parallax
        const drawY = item.y - (scrollY * item.parallaxFactor) % (height + margin * 2);
        const normalizedY = drawY < -margin ? drawY + height + margin * 2 : drawY;

        ctx.save();
        ctx.translate(item.x, normalizedY);
        ctx.rotate(item.rotAngle);

        ctx.font = `500 ${item.fontSize}px "JetBrains Mono", monospace`;

        // Warna putih jelas & kontras tinggi tanpa efek blur berat pada thread utama
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fillText(item.text, 0, 0);

        // Aksen titik data tech kecil di sebelah formula
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.85})`;
        ctx.fillRect(-12, -item.fontSize * 0.42, 2.5, 2.5);

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    // Tunda sejenak render pertama agar browser menyelesaikan First Paint & LCP tanpa rebutan CPU
    const initialTimer = setTimeout(() => {
      animId = requestAnimationFrame(render);
    }, 60);

    return () => {
      clearTimeout(initialTimer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 1,
        width: '100%',
        height: '100%',
      }}
    />
  );
}

export default Particles;
