import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Download, Copy, Check, FileText, Terminal, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import ShinyButton from './reactbits/ShinyButton';
import SpotlightCard from './reactbits/SpotlightCard';
import { playCopyChime, playGavelStrike } from '../utils/audio';

export default function DownloadCenter() {
  const [activeGuideTab, setActiveGuideTab] = useState('cursor');
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const curlCommand = 'curl -o mahfud.md https://satriabaktiwijaya.github.io/mahfud.md/mahfud.md';

  const handleDownload = () => {
    playGavelStrike();
    const link = document.createElement('a');
    link.href = './mahfud.md';
    link.download = 'mahfud.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#f59e0b', '#fbbf24', '#ffffff'],
    });
  };

  const handleCopyRaw = async () => {
    try {
      const res = await fetch('./mahfud.md');
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopiedRaw(true);
      playCopyChime();
      setTimeout(() => setCopiedRaw(false), 2500);
    } catch (e) {
      console.error("Gagal menyalin file", e);
    }
  };

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    playCopyChime();
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const toolGuides = {
    cursor: {
      tool: 'Cursor IDE',
      path: '.cursorrules atau .cursor/rules/mahfud.md',
      instructions: [
        'Unduh file mahfud.md atau salin isinya.',
        'Simpan di root direktori proyek Anda sebagai .cursorrules',
        'Atau simpan di dalam folder .cursor/rules/mahfud.md untuk aturan per-direktori.',
        'Mulai chat atau composer di Cursor: Mahfud.md akan otomatis menjadi penegak hukum kode Anda!',
      ],
    },
    windsurf: {
      tool: 'Windsurf (Codeium)',
      path: '.windsurfrules',
      instructions: [
        'Unduh file mahfud.md ke dalam proyek Anda.',
        'Ubah nama file atau simpan di root proyek dengan nama .windsurfrules',
        'Windsurf Cascade akan membaca konstitusi ini pada setiap instruksi rekayasa kode.',
      ],
    },
    claude: {
      tool: 'Claude Code / Anthropic',
      path: 'CLAUDE.md atau @mahfud.md',
      instructions: [
        'Simpan file mahfud.md di root project Anda.',
        'Tambahkan rujukan @mahfud.md pada file CLAUDE.md proyek Anda.',
        'Atau jalankan sesi Claude Code dengan perintah: claude --context mahfud.md',
      ],
    },
    antigravity: {
      tool: 'Google Antigravity IDE',
      path: '.agents/rules/mahfud.md atau AGENTS.md',
      instructions: [
        'Buat direktori .agents/rules/ di root workspace proyek Anda.',
        'Letakkan file mahfud.md di dalam folder tersebut, atau satukan dengan AGENTS.md.',
        'Antigravity Agent akan otomatis menyerap aturan hukum ketatanegaraan kode ini.',
      ],
    },
    chatgpt: {
      tool: 'ChatGPT / GitHub Copilot',
      path: 'Custom Instructions / System Prompt',
      instructions: [
        'Klik tombol "Salin Isi Mentah" di atas untuk menyalin seluruh isi berkas mahfud.md.',
        'Buka pengaturan Custom Instructions / Project Instructions di ChatGPT atau Copilot.',
        'Tempel (paste) seluruh teks ke kolom instruksi, lalu simpan perubahan.',
      ],
    },
  };

  const currentGuide = toolGuides[activeGuideTab];

  return (
    <section id="download" className="py-20 border-t border-slate-800/80 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Download className="w-3.5 h-3.5" />
            <span>Pusat Distribusi Berkas Mandiri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Satu File Konstitusi: <span className="text-gradient-amber">mahfud.md</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Tidak perlu dependensi rumit. Cukup unduh satu file <strong>mahfud.md</strong> dan injeksikan ke dalam proyek Anda. Kompatibel dengan semua AI coding assistant modern!
          </p>
        </div>

        {/* Big Showcase Download Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.15)"
            borderColor="rgba(245, 158, 11, 0.45)"
            className="p-8 sm:p-10 border-amber-500/30 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              
              {/* File Info */}
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-2xl font-bold text-white font-mono">
                      mahfud.md
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      v1.0.0 Ready
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm mt-1.5 leading-relaxed max-w-lg">
                    Memuat seluruh Konstitusi Sistem, Kamus Lengkap Leksikon Birokrasi, Yurisprudensi Stack (Java/Laravel/React/Tailwind), dan Protokol Sidang Pleno dalam 1 berkas markdown mandiri.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400 font-mono">
                    <span>Ukuran: ~11 KB</span>
                    <span>•</span>
                    <span>Format: Markdown (.md)</span>
                    <span>•</span>
                    <span>Lisensi: MIT Universal</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
                <ShinyButton
                  onClick={handleDownload}
                  variant="primary"
                  className="!py-3 !px-6 text-sm font-bold shadow-xl justify-center"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh File mahfud.md</span>
                </ShinyButton>

                <button
                  onClick={handleCopyRaw}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors"
                >
                  {copiedRaw ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">Isi Berkas Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Isi Mentah</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Quick cURL Line */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-medium">
                Atau unduh langsung via terminal (cURL):
              </span>
              <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 font-mono text-slate-300 max-w-full overflow-x-auto">
                <span className="text-amber-500 font-bold">$</span>
                <span className="truncate">{curlCommand}</span>
                <button
                  onClick={handleCopyCurl}
                  className="ml-2 text-slate-400 hover:text-amber-300"
                  title="Salin cURL"
                >
                  {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Multi-Tool Integration Instructions */}
        <div className="max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Petunjuk Pemasangan ke Berbagai AI Coding Tools:</span>
            </h4>
            <p className="text-slate-400 text-sm mb-6">
              Pilih platform coding yang Anda gunakan untuk melihat lokasi injeksi file:
            </p>

            {/* Tool Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-6">
              {Object.keys(toolGuides).map((key) => {
                const guide = toolGuides[key];
                return (
                  <button
                    key={key}
                    onClick={() => setActiveGuideTab(key)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeGuideTab === key
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {guide.tool}
                  </button>
                );
              })}
            </div>

            {/* Selected Tool Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-xs">
                <span className="text-slate-400">Target Lokasi:</span>
                <span className="text-amber-400 font-bold">{currentGuide.path}</span>
              </div>

              <div className="space-y-2.5">
                {currentGuide.instructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
