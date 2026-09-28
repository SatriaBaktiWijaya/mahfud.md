import React, { useState } from 'react';
import { Scale, Copy, Check, Gavel } from 'lucide-react';
import { playGavelStrike } from '../utils/audio';

export default function Hero({ onTriggerToast, onOpenAuditModal }) {
  const [copied, setCopied] = useState(false);
  const [isStriking, setIsStriking] = useState(false);

  const command = 'npx skills add SatriaBaktiWijaya/mahfud.md';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    playGavelStrike();
    onTriggerToast('⚖️ Perintah npx skills berhasil disalin ke clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleGavelClick = () => {
    setIsStriking(true);
    playGavelStrike();
    onTriggerToast('🔨 TOK! Palu sidang diketok! Konstitusi sistem ditegakkan!');
    setTimeout(() => setIsStriking(false), 400);
  };

  return (
    <section className="hero-section">
      <div className="container">
        {/* Badge Pill */}
        <div className="hero-badge-pill">
          <Scale size={14} />
          <span>MAHKAMAH KODE KONSTITUSI · RESMI DIUNDANGKAN</span>
        </div>

        {/* Headline */}
        <h1 className="hero-headline">
          Tegakkan Konstitusi Kode.<br />
          <span className="text-gold-gradient italic-serif">Babat Tuntas Korupsi Memori.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          <strong>mahfud.md</strong> adalah agen AI auditor kode ketatanegaraan tingkat tinggi berintelektual birokrat senior.
          Mengusut inefisiensi render, menggelar Operasi Tangkap Tangan (OTT) bug, dan merapikan birokrasi
          arsitektur sistem secara adil, tegas, dan berkepastian hukum.
        </p>

        {/* CTA Group */}
        <div className="hero-cta-group">
          {/* One-Click Command Box Pill */}
          <div
            className="command-pill-box"
            onClick={handleCopy}
            title="Klik untuk menyalin perintah instalasi"
          >
            <span className="command-dollar">$</span>
            <span className="command-text">{command}</span>
            <div className="copy-icon-btn">
              {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
            </div>
          </div>

          {/* Interactive Gavel Strike Button */}
          <button
            onClick={handleGavelClick}
            className={`btn-gavel-strike ${isStriking ? 'striking' : ''}`}
            title="Ketok Palu Sidang Mahkamah Konstitusi"
          >
            <Gavel size={17} className="gavel-icon-bounce" />
            <span>Ketok Palu Sidang</span>
          </button>
        </div>

        {/* Compatibility Strip */}
        <div className="compat-strip">
          <span className="compat-item"><span className="compat-check">✓</span> Google Antigravity</span>
          <span>·</span>
          <span className="compat-item"><span className="compat-check">✓</span> Claude Code</span>
          <span>·</span>
          <span className="compat-item"><span className="compat-check">✓</span> Cursor</span>
          <span>·</span>
          <span className="compat-item"><span className="compat-check">✓</span> Windsurf</span>
          <span>·</span>
          <span className="compat-item"><span className="compat-check">✓</span> ChatGPT / Custom GPT</span>
        </div>
      </div>
    </section>
  );
}
