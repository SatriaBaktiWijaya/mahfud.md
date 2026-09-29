import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gavel, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, FileCode2, Copy, Check } from 'lucide-react';
import { courtroomCases } from '../data/courtroomData';
import { playGavelStrike, playCopyChime } from '../utils/audio';
import SpotlightCard from './reactbits/SpotlightCard';

export default function CourtroomSimulator() {
  const [selectedCaseId, setSelectedCaseId] = useState('laravel');
  const [activeTab, setActiveTab] = useState('comparison'); // 'comparison', 'verdict'
  const [gavelStruck, setGavelStruck] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const currentCase = courtroomCases.find((c) => c.id === selectedCaseId) || courtroomCases[0];

  const handleStrikeGavel = () => {
    playGavelStrike();
    setGavelStruck(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#ef4444', '#10b981', '#ffffff'],
    });

    setTimeout(() => setGavelStruck(false), 3000);
  };

  const handleCopyReformedCode = () => {
    navigator.clipboard.writeText(currentCase.reformedCode);
    setCopiedCode(true);
    playCopyChime();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="simulator" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Gavel className="w-3.5 h-3.5" />
            <span>Simulasi Ruang Sidang Pleno</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Uji Kelayakan & Vonis Putusan <span className="text-gradient-amber">Mahfud.md</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Pilih berkas perkara di bawah untuk menyaksikan bagaimana Mahfud.md mengaudit kode kotor, membongkar tindak pidana, dan menetapkan putusan reformasi birokrasi kode.
          </p>
        </div>

        {/* Case Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {courtroomCases.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCaseId(c.id);
                setGavelStruck(false);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                selectedCaseId === c.id
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${c.stackBadgeColor}`}>
                {c.stack.split('/')[0].trim()}
              </span>
              <span>{c.title}</span>
            </button>
          ))}
        </div>

        {/* Courtroom Banner Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 mb-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Gavel className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400">
                REGISTRASI PERKARA: <span className="text-amber-400 font-semibold">{currentCase.caseNumber}</span>
              </div>
              <div className="text-sm font-bold text-white">
                {currentCase.title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${currentCase.spColor}`}>
              {currentCase.spLevel}
            </span>

            <button
              onClick={handleStrikeGavel}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 select-none shadow-md ${
                gavelStruck
                  ? 'bg-emerald-500 text-slate-950 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 hover:scale-102 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
              }`}
            >
              <Gavel className={`w-4 h-4 ${gavelStruck ? 'rotate-[-30deg]' : ''} transition-transform`} />
              <span>{gavelStruck ? 'VONIS DISAHKAN! (TOK! 🔨)' : 'Ketuk Palu Sidang'}</span>
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left: Berkas Perkara (Kode Kotor / Pelanggaran) */}
          <SpotlightCard
            spotlightColor="rgba(239, 68, 68, 0.1)"
            borderColor="rgba(239, 68, 68, 0.3)"
            className="flex flex-col h-full !p-0 overflow-hidden border-red-500/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-red-950/20">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>BERKAS PERKARA (KODE PELANGGARAN)</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                Terdakwa Kode
              </span>
            </div>

            {/* Code Block */}
            <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-slate-300 bg-slate-950/80">
              <pre className="whitespace-pre">
                <code>{currentCase.dirtyCode}</code>
              </pre>
            </div>

            {/* Violations List */}
            <div className="p-5 mt-auto border-t border-slate-800/80 bg-slate-900/40">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                Daftar Pelanggaran Konstitusi:
              </div>
              <ul className="space-y-1.5 text-xs text-red-300">
                {currentCase.dirtyViolations.map((v, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <span className="font-mono text-red-400 font-medium">[{v.line}]:</span>
                    <span>{v.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>

          {/* Right: Risalah Sidang & Putusan Reformasi (Mahfud.md) */}
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.12)"
            borderColor="rgba(245, 158, 11, 0.4)"
            className="flex flex-col h-full !p-0 overflow-hidden border-amber-500/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-amber-950/20">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>RISALAH SIDANG & AMAR PUTUSAN</span>
              </div>
              
              <button
                onClick={handleCopyReformedCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors"
                title="Salin Kode Reformasi"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Putusan</span>
                  </>
                )}
              </button>
            </div>

            {/* Analysis Note from Judge */}
            <div className="px-5 py-3 border-b border-slate-800/60 bg-amber-500/5 text-xs text-amber-200/90 leading-relaxed italic">
              <strong>Catatan Majelis:</strong> &ldquo;{currentCase.verdictAnalysis}&rdquo;
            </div>

            {/* Code Block */}
            <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-emerald-200 bg-slate-950/80">
              <pre className="whitespace-pre">
                <code>{currentCase.reformedCode}</code>
              </pre>
            </div>

            {/* Perks List */}
            <div className="p-5 mt-auto border-t border-slate-800/80 bg-slate-900/40">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                Capaian Asas Kepatutan Kode:
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-300">
                {currentCase.reformedPerks.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>

        </div>

      </div>
    </section>
  );
}
