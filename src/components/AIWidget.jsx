import React, { useState, useEffect } from 'react';
import QnA from './QnA';

function AIWidget() {
  const [open, setOpen] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStarting(true);
    const timer = setTimeout(() => setStarting(false), 900);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <>
      <button className="ai-floating-button" onClick={() => setOpen(true)} aria-label="Buka Fora AI">
        <span className="ai-floating-icon">🤖</span>
      </button>

      {open && (
        <div className="ai-modal-backdrop" onClick={() => setOpen(false)}>
          <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-modal-panel">
              <div className="ai-modal-header">
                <div>
                  <div className="ai-name">Fora</div>
                  <div className="ai-subtitle">AI Assistant Portofolio</div>
                </div>
                <button className="ai-close" onClick={() => setOpen(false)} aria-label="Tutup Fora">
                  ✕
                </button>
              </div>

              {starting ? (
                <div className="ai-loading-screen">
                  <div className="ai-loading-title">Membuka Fora...</div>
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
