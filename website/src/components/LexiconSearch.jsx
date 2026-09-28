import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { LEXICON_TERMS } from '../data/courtroomData';

export default function LexiconSearch() {
  const [query, setQuery] = useState('');

  const filteredTerms = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return LEXICON_TERMS;
    return LEXICON_TERMS.filter(
      (item) =>
        item.term.toLowerCase().includes(q) ||
        item.legal.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section id="leksikon" className="lexicon-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">KITAB LEKSIKON TATA NEGARA KODE</span>
          <h2 className="section-title">Kamus Birokrasi & Padanan Hukum</h2>
          <p className="section-desc">
            Kamus resmi standardisasi istilah teknis software engineering ke dalam
            bahasa hukum dan ketatanegaraan yang digunakan oleh mahfud.md.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="lexicon-search-bar">
          <Search size={18} className="search-icon-pos" />
          <input
            type="text"
            className="lexicon-search-input"
            placeholder="Cari istilah teknis (misal: 'bug', 'memory', 'pr', 'refactor')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Results Grid */}
        <div className="lexicon-grid">
          {filteredTerms.map((item, idx) => (
            <div key={idx} className="lexicon-card">
              <div className="lexicon-top-row">
                <span className="tech-term">{item.term}</span>
                <span className="term-category-badge">{item.category}</span>
              </div>

              <h4 className="legal-term-heading">➔ {item.legal}</h4>

              <p className="lexicon-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
