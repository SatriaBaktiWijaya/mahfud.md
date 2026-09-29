import React, { useState } from 'react';
import { Search, BookOpen, Copy, Check, Filter } from 'lucide-react';
import { lexiconTerms } from '../data/lexiconData';
import SpotlightCard from './reactbits/SpotlightCard';
import { playCopyChime } from '../utils/audio';

export default function LexiconSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [copiedTerm, setCopiedTerm] = useState(null);

  const categories = ['Semua', 'Tindak Pidana & Cacat', 'Perbaikan & Putusan', 'Struktur & Aset'];

  const filteredTerms = lexiconTerms.filter((term) => {
    const matchesCategory =
      selectedCategory === 'Semua' || term.category === selectedCategory;
    const matchesQuery =
      term.technical.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.legal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleCopyLegalTerm = (legalText, idx) => {
    navigator.clipboard.writeText(legalText);
    setCopiedTerm(idx);
    playCopyChime();
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  return (
    <section id="leksikon" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kamus Besar Birokrasi Kode</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Leksikon & Padanan <span className="text-gradient-amber">Ketatanegaraan</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Cari padanan istilah teknis ke dalam bahasa peradilan resmi Mahfud.md. Gunakan untuk memperjelas dakwaan pada audit kode dan risalah sidang PR Anda!
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari istilah: misal 'Memory Leak', 'SQL Injection', 'Refactoring'..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all shadow-inner"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lexicon Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term, idx) => (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(245, 158, 11, 0.08)"
                borderColor="rgba(245, 158, 11, 0.3)"
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {term.category}
                    </span>
                    <button
                      onClick={() => handleCopyLegalTerm(term.legal, idx)}
                      className="p-1 rounded text-slate-400 hover:text-amber-300 transition-colors"
                      title="Salin Istilah Hukum"
                    >
                      {copiedTerm === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {term.technical}
                  </div>

                  <div className="text-lg font-bold text-amber-300 mt-1 mb-2">
                    {term.legal}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {term.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] text-slate-400 italic">
                    {term.example}
                  </div>
                </div>
              </SpotlightCard>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-400 text-sm">
              Tidak ditemukan istilah hukum yang sesuai dengan kata kunci pencarian.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
