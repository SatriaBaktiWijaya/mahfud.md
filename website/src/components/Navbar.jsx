import React from 'react';
import { Scale, Download, Github, ShieldAlert } from 'lucide-react';
import ShinyButton from './reactbits/ShinyButton';
import { playCopyChime } from '../utils/audio';

export default function Navbar() {
  const handleDownloadClick = () => {
    playCopyChime();
    const link = document.createElement('a');
    link.href = './mahfud.md';
    link.download = 'mahfud.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:bg-amber-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Scale className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors">
                MAHFUD<span className="text-amber-400">.MD</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                v1.0
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Hakim Mahkamah Kode Konstitusi
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#hero" className="hover:text-amber-400 transition-colors">
            Beranda
          </a>
          <a href="#simulator" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
            Simulator Sidang
          </a>
          <a href="#download" className="hover:text-amber-400 transition-colors">
            Unduh mahfud.md
          </a>
          <a href="#leksikon" className="hover:text-amber-400 transition-colors">
            Kamus Birokrasi
          </a>
          <a href="#yurisprudensi" className="hover:text-amber-400 transition-colors">
            Yurisprudensi
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/SatriaBaktiWijaya/mahfud.md"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 bg-slate-900/60 transition-colors"
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          <ShinyButton
            onClick={handleDownloadClick}
            variant="amberOutline"
            className="!py-2 !px-3.5 !text-xs !rounded-lg"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh mahfud.md</span>
          </ShinyButton>
        </div>
      </div>
    </header>
  );
}
