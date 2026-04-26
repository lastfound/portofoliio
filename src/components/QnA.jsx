import React, { useState, useEffect, useRef, useCallback } from 'react';

const AI_BACKEND_URL = "https://backendapirafi.vercel.app/api/ai"; // Ganti dengan URL backend kamu jika berbeda

const LOCAL_FALLBACK = (question) => {
  const text = question.toLowerCase();
  if (text.includes('skill') || text.includes('teknologi') || text.includes('tech')) {
    return 'Saya menguasai HTML, CSS, JavaScript, React, dan animasi antarmuka. Saya juga senang mempelajari teknologi baru untuk mendukung pengalaman pengguna.';
  }
  if (text.includes('proyek') || text.includes('project') || text.includes('portfolio')) {
    return 'Portofolio ini menampilkan proyek interaktif, desain antarmuka modern, dan aplikasi yang dirancang untuk pengalaman pengguna yang mulus.';
  }
  if (text.includes('pengalaman') || text.includes('experience') || text.includes('kerja')) {
    return 'Saya memiliki pengalaman membangun website portofolio, aplikasi web responsif, dan desain UI/UX dengan fokus pada performa dan detail visual.';
  }
  if (text.includes('kontak') || text.includes('email') || text.includes('hubungi')) {
    return 'Silakan gunakan bagian kontak di bawah untuk mengirim pesan atau lihat tautan GitHub dan LinkedIn di bagian kontak.';
  }
  return 'Saya siap menjawab pertanyaan umum tentang portofolio ini. Coba tanyakan tentang skill, proyek, pengalaman, atau cara menghubungi.';
};

// Reliable scroll-to-bottom that works on mobile
function scrollToBottom(el) {
  if (!el) return;
  // Use requestAnimationFrame to ensure DOM has painted
  requestAnimationFrame(() => {
    el.scrollTop = el.scrollHeight;
  });
}

async function askBackend(question) {
  const response = await fetch(AI_BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error || `Gagal menghubungi backend AI (${response.status})`);
  }

  const data = await response.json();
  return data.answer?.trim() || '';
}

/* ── Typewriter text component ── */
function TypewriterText({ text, speed = 18, onDone, onTick }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    setDone(false);
    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      onTick?.(); // scroll on each character
      if (indexRef.current >= text.length) {
        clearInterval(interval);
        setDone(true);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && (
        <span style={{
          display: 'inline-block',
          width: '2px', height: '1em',
          background: 'currentColor',
          marginLeft: '1px',
          verticalAlign: 'text-bottom',
          borderRadius: '1px',
          animation: 'tw-blink 0.7s step-end infinite',
        }} />
      )}
    </span>
  );
}

function QnA({ assistantName = 'Fora', onClose }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: `Halo! Saya ${assistantName}, asisten AI portofolio. Tanyakan apa saja tentang skill, proyek, pengalaman, atau kontak.`,
      animate: false,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [closing, setClosing] = useState(false);
  const chatWindowRef = useRef(null);
  const inputAreaRef = useRef(null);
  const textareaRef = useRef(null);

  // Reliable scroll helper
  const doScroll = useCallback(() => {
    scrollToBottom(chatWindowRef.current);
  }, []);

  // Animated close handler
  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 1200);
  }, [onClose]);

  // Scroll whenever messages or loading state changes
  useEffect(() => {
    doScroll();
    const t = setTimeout(doScroll, 80);
    return () => clearTimeout(t);
  }, [messages, loading]);

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    // Jika user mengetik "tutup", tutup jendela AI dengan animasi
    if (trimmed.toLowerCase() === 'tutup') {
      setQuery('');
      handleClose();
      return;
    }

    const userMessage = { id: Date.now(), role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setError('');
    setLoading(true);

    try {
      const [answer] = await Promise.all([
        askBackend(trimmed),
        new Promise((res) => setTimeout(res, 1400)),
      ]);

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', content: answer, animate: true },
      ]);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memproses pertanyaan.');
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: 'bot',
          content: 'Maaf, jawaban AI tidak tersedia saat ini. Periksa kembali koneksi jaringan internet anda.',
          animate: true,
        },
      ]);
    } finally {
      setLoading(false);
      // Kembalikan fokus ke textarea agar user bisa langsung ketik lagi
      textareaRef.current?.focus();
    }
  };

  // Handle Enter key (Shift+Enter for newline)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div id="tanya-jawab" className="qa-panel">
      {/* ── Closing Animation Overlay ── */}
      {closing && (
        <div className="qa-closing-overlay">
          <div className="qa-closing-content">
            <div className="qa-closing-name">Fora</div>
            <div className="qa-closing-line" />
            <div className="qa-closing-label">See you soon</div>
          </div>
        </div>
      )}

      <div className="section-header ai-panel-header">
        <div>
          <div className="section-eyebrow">AI Tanya Jawab</div>
          <h2 className="section-title">Fora siap membantu</h2>
        </div>
        {onClose && (
          <button className="ai-panel-close" onClick={handleClose} aria-label="Tutup Fora">
            ✕
          </button>
        )}
      </div>

      <div className="qa-body">
        <p className="qa-intro">
          Tanyakan apa saja tentang portofolio ini, skill, pengalaman, atau proyek yang saya kerjakan. Ketik <strong>tutup</strong> lalu kirim untuk menutup jendela ini.
        </p>

        <div className="qa-chat-window" ref={chatWindowRef}>
          {messages.map((message) => (
            <div key={message.id} className={`chat-message ${message.role}`}>
              <div className="chat-bubble">
                {message.role === 'bot' && message.animate ? (
                  <TypewriterText
                    text={message.content}
                    speed={18}
                    onTick={doScroll}
                    onDone={doScroll}
                  />
                ) : (
                  <span>{message.content}</span>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-message bot">
              <div className="chat-bubble thinking-bubble">
                {/* Orbiting robot */}
                <div className="robot-orbit-wrapper">
                  <div className="robot-orbit-track">
                    <div className="robot-orbiter">🤖</div>
                  </div>
                  {/* Center core */}
                  <div className="robot-orbit-core">
                    <div className="robot-orbit-core-dot" />
                  </div>
                </div>
                {/* Text */}
                <div className="typing-indicator">
                  <span className="typing-indicator-label">Fora is thinking</span>
                  <div className="typing-indicator-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Anchor element to always scroll into view */}
          <div className="qa-scroll-anchor" />
        </div>
      </div>

      <div className="qa-input-area" ref={inputAreaRef}>
        <textarea
          ref={textareaRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tulis pertanyaanmu… (Enter untuk kirim)"
          rows={2}
        />
        <div className="qa-input-actions">
          <button
            type="button"
            className="btn qa-submit-button"
            disabled={loading}
            onClick={handleSend}
          >
            {loading ? 'Memproses...' : 'Kirim →'}
          </button>
        </div>
      </div>

      {error && <div className="qa-error">{error}</div>}
    </div>
  );
}

export default QnA;