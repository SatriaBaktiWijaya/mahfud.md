import React from 'react';
import { Scale, Heart, Github, Download, FileText, ArrowUp } from 'lucide-react';
import { playCopyChime } from '../utils/audio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = () => {
    playCopyChime();
    const link = document.createElement('a');
    link.href = './mahfud.md';
    link.download = 'mahfud.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-16 text-slate-400 text-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Scale className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                MAHFUD<span className="text-amber-400">.MD</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Kitab Undang-Undang Rekayasa Perangkat Lunak & Agentic Skill Tata Kelola Kode tingkat tinggi untuk AI coding assistants. Mengawal keadilan arsitektur dan memberantas kode kotor secara konstitusional.
            </p>

            <blockquote className="border-l-2 border-amber-500/60 pl-3.5 text-xs italic text-amber-300/90 font-serif">
              &ldquo;Tidak ada ruang kompromi bagi tindak pidana kode, korupsi memori, maupun persekongkolan arsitektur yang serampangan. Hukum kepatutan rekayasa harus tegak lurus!&rdquo;
            </blockquote>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">
                  Beranda Hero
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-amber-400 transition-colors">
                  Simulator Ruang Sidang
                </a>
              </li>
              <li>
                <a href="#download" className="hover:text-amber-400 transition-colors">
                  Pusat Unduh mahfud.md
                </a>
              </li>
              <li>
                <a href="#leksikon" className="hover:text-amber-400 transition-colors">
                  Kamus Besar Birokrasi Kode
                </a>
              </li>
              <li>
                <a href="#yurisprudensi" className="hover:text-amber-400 transition-colors">
                  Yurisprudensi Stack
                </a>
              </li>
            </ul>
          </div>

          {/* Distribution & Artifacts */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Distribusi & Berkas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh File mahfud.md</span>
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/SatriaBaktiWijaya/mahfud.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="https://skills.sh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Daftar di Agent Skills Ecosystem
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© 2026</span>
            <span className="text-slate-400 font-medium">Satria Bakti Wijaya</span>
            <span>• Dilisensikan di bawah MIT License.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Dibuat dengan integritas konstitusi kode
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-300 hover:border-slate-700 transition-colors"
              title="Kembali ke Atas"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
