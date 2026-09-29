import React, { useState } from 'react';
import { Scroll, Award, Shield, CheckCircle } from 'lucide-react';
import { jurisprudenceArticles } from '../data/jurisprudenceData';
import SpotlightCard from './reactbits/SpotlightCard';

export default function JurisprudenceSection() {
  const [activeStackIdx, setActiveStackIdx] = useState(0);

  const currentStack = jurisprudenceArticles[activeStackIdx];

  return (
    <section id="yurisprudensi" className="py-20 border-t border-slate-800/80 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Scroll className="w-3.5 h-3.5" />
            <span>Kitab Undang-Undang Pokok (KUHP) Kode</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Yurisprudensi & Asas Kepatutan <span className="text-gradient-amber">Stack</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Norma hukum positif yang ditegakkan secara mutlak saat Mahfud.md memeriksa arsitektur framework favorit Anda.
          </p>
        </div>

        {/* Stack Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {jurisprudenceArticles.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStackIdx(idx)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                activeStackIdx === idx
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] font-semibold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span>{item.stack}</span>
            </button>
          ))}
        </div>

        {/* Active Stack Description */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-amber-400 border border-slate-700 mb-2">
            {currentStack.tag}
          </span>
          <p className="text-sm text-slate-300 italic">
            &ldquo;{currentStack.description}&rdquo;
          </p>
        </div>

        {/* Articles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentStack.articles.map((art, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor="rgba(245, 158, 11, 0.1)"
              borderColor="rgba(245, 158, 11, 0.35)"
              className="flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold mb-3">
                  <Award className="w-3.5 h-3.5" />
                  <span>{art.number}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2.5">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {art.rule}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Kekuatan Hukum Mengikat Tetap</span>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}
