import React, { useState } from 'react';
import { INSTALL_METHODS } from '../data/courtroomData';
import { Copy, Check, Terminal } from 'lucide-react';
import { playGavelStrike } from '../utils/audio';

export default function InstallWizard({ onTriggerToast }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playGavelStrike();
    onTriggerToast(`📋 Salin perintah untuk ${label} berhasil!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="instalasi" className="install-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">TATA CARA ADOPSI</span>
          <h2 className="section-title">Pasang mahfud.md ke AI Anda</h2>
          <p className="section-desc">
            Pilih metode yang sesuai dengan lingkungan pengembangan atau agen AI
            yang Anda gunakan sehari-hari.
          </p>
        </div>

        <div className="install-grid">
          {INSTALL_METHODS.map((m) => (
            <div key={m.id} className="install-card">
              <div>
                <h3 className="install-agent-title">{m.agent}</h3>
                <p className="install-agent-desc">{m.desc}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="install-snippet-box">
                  <code className="install-code-text">{m.command}</code>
                  <button
                    onClick={() => handleCopy(m.id + '-cmd', m.command, m.agent)}
                    className="btn-mini-copy"
                    title="Salin perintah"
                  >
                    {copiedId === m.id + '-cmd' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                  </button>
                </div>

                {m.globalCommand && (
                  <div className="install-snippet-box" style={{ background: '#0d131f' }}>
                    <code className="install-code-text" style={{ color: '#d4af37' }}>
                      {m.globalCommand}
                    </code>
                    <button
                      onClick={() => handleCopy(m.id + '-global', m.globalCommand, m.agent + ' (Global)')}
                      className="btn-mini-copy"
                      title="Salin perintah global"
                    >
                      {copiedId === m.id + '-global' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
