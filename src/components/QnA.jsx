import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

const AI_BACKEND_URL = "https://backendapirafi.vercel.app/api/ai";

const LOCAL_FALLBACK = (question, lang) => {
  const text = question.toLowerCase();
  if (lang === 'id') {
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
  } else {
    if (text.includes('skill') || text.includes('technology') || text.includes('tech')) {
      return 'I have expertise in HTML, CSS, JavaScript, React, and UI animations. I also enjoy learning new technologies to support better user experiences.';
    }
    if (text.includes('project') || text.includes('portfolio') || text.includes('work')) {
      return 'This portfolio features interactive projects, modern UI designs, and applications crafted for a smooth user experience.';
    }
    if (text.includes('experience') || text.includes('background') || text.includes('work')) {
      return 'I have experience building portfolio websites, responsive web apps, and UI/UX designs with a focus on performance and visual detail.';
    }
    if (text.includes('contact') || text.includes('email') || text.includes('reach')) {
      return 'Please use the contact section below to send a message, or find my GitHub and LinkedIn links in the contact section.';
    }
    return "I'm ready to answer general questions about this portfolio. Try asking about skills, projects, experience, or how to get in touch.";
  }
};

function scrollToBottom(el) {
  if (!el) return;
  requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
}

async function askBackend(question) {
  const response = await fetch(AI_BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error || `Error (${response.status})`);
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
      onTick?.();
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
  const { lang } = useLang();
  const t = translations.ai;

  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', content: t.greeting[lang], animate: false },
  ]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [closing, setClosing]   = useState(false);
  const chatWindowRef  = useRef(null);
  const inputAreaRef   = useRef(null);
  const textareaRef    = useRef(null);

  // Update greeting when language changes
  useEffect(() => {
    setMessages([{ id: 1, role: 'bot', content: t.greeting[lang], animate: false }]);
  }, [lang]);

  const doScroll = useCallback(() => {
    scrollToBottom(chatWindowRef.current);
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => { onClose?.(); }, 1200);
  }, [onClose]);

  useEffect(() => {
    doScroll();
    const timer = setTimeout(doScroll, 80);
    return () => clearTimeout(timer);
  }, [messages, loading]);

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === t.closeKeyword[lang]) {
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
      setError(err.message || t.networkError[lang]);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, role: 'bot', content: t.networkError[lang], animate: true },
      ]);
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

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
            <div className="qa-closing-label">{t.seeyou[lang]}</div>
          </div>
        </div>
      )}

      <div className="section-header ai-panel-header">
        <div>
          <div className="section-eyebrow">{t.eyebrow[lang]}</div>
          <h2 className="section-title">{t.panelTitle[lang]}</h2>
        </div>
        {onClose && (
          <button className="ai-panel-close" onClick={handleClose} aria-label={t.closeLabel[lang]}>
            ✕
          </button>
        )}
      </div>

      <div className="qa-body">
        <p className="qa-intro">{t.intro[lang]}</p>

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
                <div className="robot-orbit-wrapper">
                  <div className="robot-orbit-track">
                    <div className="robot-orbiter">🤖</div>
                  </div>
                  <div className="robot-orbit-core">
                    <div className="robot-orbit-core-dot" />
                  </div>
                </div>
                <div className="typing-indicator">
                  <span className="typing-indicator-label">{t.thinking[lang]}</span>
                  <div className="typing-indicator-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="qa-scroll-anchor" />
        </div>
      </div>

      <div className="qa-input-area" ref={inputAreaRef}>
        <textarea
          ref={textareaRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.placeholder[lang]}
          rows={2}
        />
        <div className="qa-input-actions">
          <button
            type="button"
            className="btn qa-submit-button"
            disabled={loading}
            onClick={handleSend}
          >
            {loading ? t.processing[lang] : t.send[lang]}
          </button>
        </div>
      </div>

      {error && <div className="qa-error">{error}</div>}
    </div>
  );
}

export default QnA;