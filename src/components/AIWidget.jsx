import React, { useState, useEffect } from 'react';
import QnA from './QnA';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

function AIWidget() {
  const { lang } = useLang();
  const t = translations.ai;

  const [open, setOpen]       = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStarting(true);
    const timer = setTimeout(() => setStarting(false), 900);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <>
      <button className="ai-floating-button" onClick={() => setOpen(true)} aria-label={t.buttonLabel[lang]}>
        <span className="ai-floating-icon">AI</span>
      </button>

      {open && (
        <div className="ai-modal-backdrop" onClick={() => setOpen(false)}>
          <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-modal-panel">
              <div className="ai-modal-header">
                <div>
                  <div className="ai-name">Fora</div>
                  <div className="ai-subtitle">{t.subtitle[lang]}</div>
                </div>
                <button className="ai-close" onClick={() => setOpen(false)} aria-label={t.closeLabel[lang]}>
                  ✕
                </button>
              </div>

              {starting ? (
                <div className="ai-loading-screen">
                  <div className="ai-loading-title">{t.opening[lang]}</div>
                  <div className="ai-loading-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              ) : (
                <QnA assistantName="Fora" onClose={() => setOpen(false)} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIWidget;