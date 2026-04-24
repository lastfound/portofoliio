import React, { useState, useEffect, useRef } from 'react';

const AI_BACKEND_URL = import.meta.env.VITE_AI_BACKEND_URL || '/api/ai';

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
function TypewriterText({ text, speed = 18, onDone }) {
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
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const userMessage = { id: Date.now(), role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setError('');
    setLoading(true);

    try {
      const [answer] = await Promise.all([
        askBackend(trimmed),
        new Promise((res) => setTimeout(res, 1400)), // minimum thinking time
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
          content: 'Maaf, jawaban AI tidak tersedia saat ini. Coba lagi nanti atau periksa konfigurasi OpenAI.',
          animate: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="tanya-jawab" className="qa-panel">
      <div className="section-header ai-panel-header">
        <div>
          <div className="section-eyebrow">AI Tanya Jawab</div>
          <h2 className="section-title">Fora siap membantu</h2>
        </div>
        {onClose && (
          <button className="ai-panel-close" onClick={onClose} aria-label="Tutup Fora">
            ✕
          </button>
        )}
      </div>

      <div className="qa-body">
        <p className="qa-intro">
          Tanyakan apa saja tentang portofolio ini, skill, pengalaman, atau proyek yang saya kerjakan.
        </p>

        <div className="qa-chat-window" ref={chatWindowRef}>
          {messages.map((message) => (
            <div key={message.id} className={`chat-message ${message.role}`}>
              <div className="chat-bubble">
                {message.role === 'bot' && message.animate ? (
                  <TypewriterText
                    text={message.content}
                    speed={18}
                    onDone={() => {
                      if (chatWindowRef.current)
                        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
                    }}
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
        </div>
      </div>

      <form className="qa-input-area" onSubmit={handleSend}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tulis pertanyaanmu di sini..."
          rows={2}
        />
        <div className="qa-input-actions">
          <button type="submit" className="btn qa-submit-button" disabled={loading}>
            {loading ? 'Memproses...' : 'Kirim Pertanyaan'}
          </button>
        </div>
      </form>

      {error && <div className="qa-error">{error}</div>}
    </div>
  );
}

export default QnA;