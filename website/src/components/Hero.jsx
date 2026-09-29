import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Copy, Check, Download, Play, Terminal, Sparkles, Scale, ShieldCheck } from 'lucide-react';
import SplitText from './reactbits/SplitText';
import ShinyButton from './reactbits/ShinyButton';
import { playCopyChime, playGavelStrike } from '../utils/audio';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [activeCommandIdx, setActiveCommandIdx] = useState(0);

  const commandOptions = [
    {
      label: 'Agent Skills (Universal)',
      cmd: 'npx skills add https://github.com/SatriaBaktiWijaya/mahfud.md --skill mahfud-code-auditor',
    },
    {
      label: 'NPX Direct Runner',
      cmd: 'npx mahfud-code-auditor',
    },
    {
      label: 'cURL mahfud.md',
      cmd: 'curl -o mahfud.md https://satriabaktiwijaya.github.io/mahfud.md/mahfud.md',
    },
  ];

  const currentCommand = commandOptions[activeCommandIdx].cmd;

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    playCopyChime();

    // Subtle celebratory confetti
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#f59e0b', '#fbbf24', '#d97706', '#ffffff'],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadFile = () => {
    playGavelStrike();
    const link = document.createElement('a');
    link.href = './mahfud.md';
    link.download = 'mahfud.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy, Title & Description */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium mb-6 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Kitab Undang-Undang Rekayasa Perangkat Lunak & Tata Kelola Kode</span>
            </div>

            {/* Main Headline with SplitText Animation */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              <SplitText
                text="Tegakkan Konstitusi Kode Tanpa Kompromi."
                delay={50}
                duration={0.6}
              />
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
              Paket <span className="text-amber-300 font-medium">Agentic Skill</span> untuk AI Coding Assistants (Cursor, Windsurf, Claude Code, Antigravity) yang bertindak selayaknya <strong className="text-white">Hakim Mahkamah Konstitusi & Birokrat Kode Senior</strong>. Memberantas tindak pidana kode, korupsi memori, dan sindikat kueri N+1!
            </p>

            {/* Command Copy Box (The Hero Command Center) */}
            <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/90 p-4 backdrop-blur-xl shadow-2xl relative mb-6">
              
              {/* Command Tabs */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                  {commandOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveCommandIdx(idx)}
                      className={`px-3 py-1 rounded-lg transition-all font-mono whitespace-nowrap ${
                        activeCommandIdx === idx
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  <span>bash / zsh / ps</span>
                </div>
              </div>

              {/* Command Line & Copy Action */}
              <div className="flex items-center justify-between gap-3 bg-slate-950/90 rounded-xl px-4 py-3 border border-slate-800/90 font-mono text-sm">
                <div className="flex items-center gap-2.5 overflow-x-auto select-all text-slate-200">
                  <span className="text-amber-500 select-none font-bold">$</span>
                  <span className="truncate">{currentCommand}</span>
                </div>

                <button
                  onClick={handleCopyCommand}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all duration-200 select-none shrink-0 ${
                    copied
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  }`}
                  title="Salin Perintah"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between mt-2.5 px-1 text-[11px] text-slate-400">
                <span>⚡ Jalankan di terminal proyek Anda untuk aktivasi instan</span>
                <span className="font-mono text-slate-500">Node &gt;= 18.0</span>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <ShinyButton
                onClick={handleDownloadFile}
                variant="primary"
                className="gap-2.5 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Unduh mahfud.md (All-in-One)</span>
              </ShinyButton>

              <a
                href="#simulator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 text-sm font-medium transition-colors backdrop-blur-sm"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                <span>Coba Simulator Sidang</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-slate-800/60 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Bebas Maladministrasi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                <span>Kompatibel: Cursor, Windsurf, Claude Code</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                <span>Lisensi Open Source MIT</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Portrait of Mr. Mahfud MD */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              
              {/* Outer Golden Halo Glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-amber-500/30 via-amber-400/20 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10" />

              {/* Portrait Frame Container */}
              <div className="relative w-72 sm:w-84 md:w-96 rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-900 shadow-2xl">
                
                {/* Official Stamp Overlay */}
                <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-slate-950/80 border border-amber-500/40 text-[11px] font-medium text-amber-300 backdrop-blur-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Sidang Aktif</span>
                </div>

                {/* Mr. Mahfud MD Portrait Image */}
                <img
                  src="./mahfud-portrait.jpg"
                  alt="Prof. Dr. Mahfud MD, S.H., S.Kom. — Hakim Mahkamah Kode Konstitusi"
                  className="w-full h-auto object-cover object-center transform group-hover:scale-102 transition-transform duration-700"
                  loading="eager"
                />

                {/* Bottom Dignified Caption Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-5 pt-10 text-left">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Ketua Majelis Hakim Kode</span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight">
                    Prof. Dr. Mahfud MD
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Inspektur Jenderal Arsitektur Sistem & Birokrat Kode Senior
                  </p>
                  <p className="text-amber-200/90 text-xs italic mt-2.5 pt-2.5 border-t border-slate-800/80">
                    &ldquo;Tidak ada ruang kompromi bagi tindak pidana kode maupun persekongkolan arsitektur yang serampangan!&rdquo;
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
