import React from 'react';
import { CORE_POWERS } from '../data/courtroomData';
import { Scale, Terminal, GitMerge, Database, Layers } from 'lucide-react';

const iconMap = {
  Scale: Scale,
  Terminal: Terminal,
  GitMerge: GitMerge,
  Database: Database,
  Layers: Layers
};

export default function CoreCapabilities() {
  return (
    <section id="kewenangan" style={{ padding: '96px 0 64px' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">LEMBAGA PENEGAKAN HUKUM</span>
          <h2 className="section-title">5 Kewenangan Sakti mahfud.md</h2>
          <p className="section-desc">
            Dilengkapi instrumen yurisprudensi lengkap untuk mengadili sengketa logika,
            merapikan birokrasi codebase, dan membasmi tindak pidana kode secara terukur.
          </p>
        </div>

        <div className="powers-bento-grid">
          {CORE_POWERS.map((power, idx) => {
            const IconComponent = iconMap[power.icon] || Scale;
            const isFeatured = idx === 0 || idx === 1;

            return (
              <div
                key={power.id}
                className={`power-card ${isFeatured ? 'power-card-featured' : ''}`}
              >
                <div
                  className="power-icon-wrapper"
                  style={{ color: power.color, borderColor: `${power.color}44` }}
                >
                  <IconComponent size={26} />
                </div>

                <div
                  className="power-badge-tag"
                  style={{ color: power.color }}
                >
                  {power.badge}
                </div>

                <h3 className="power-card-title">{power.name}</h3>

                <div className="power-card-tagline">
                  {power.tagline}
                </div>

                <p className="power-card-desc">
                  {power.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
