import React, { useState } from 'react';
import { Tabs } from '@base-ui/react';
import { STACK_JURISPRUDENCE } from '../data/courtroomData';
import { Server, Atom, Coffee, Palette } from 'lucide-react';
import { playGavelStrike } from '../utils/audio';

const iconMap = {
  Server: Server,
  Atom: Atom,
  Coffee: Coffee,
  Palette: Palette
};

export default function JurisprudenceTabs({ onTriggerToast }) {
  const [selectedStack, setSelectedStack] = useState(STACK_JURISPRUDENCE[0].id);

  const handleTabChange = (val) => {
    setSelectedStack(val);
    playGavelStrike();
    const st = STACK_JURISPRUDENCE.find((s) => s.id === val);
    if (st) {
      onTriggerToast(`📜 Membuka pasal yurisprudensi: ${st.name}`);
    }
  };

  return (
    <section id="yurisprudensi" className="jurisprudence-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">YURISPRUDENSI TEKNOLOGI</span>
          <h2 className="section-title">Norma & Pasal-Pasal Hukum Stack</h2>
          <p className="section-desc">
            Aturan konstitusi baku yang ditegakkan tanpa kompromi pada ekosistem Java,
            Laravel, React, Inertia, Vite, dan Tailwind CSS.
          </p>
        </div>

        <Tabs.Root value={selectedStack} onValueChange={handleTabChange}>
          <Tabs.List className="stack-tabs-list">
            {STACK_JURISPRUDENCE.map((stack) => {
              const IconComp = iconMap[stack.icon] || Server;
              return (
                <Tabs.Tab
                  key={stack.id}
                  value={stack.id}
                  className="stack-tab-btn"
                >
                  <IconComp size={16} />
                  <span>{stack.name}</span>
                </Tabs.Tab>
              );
            })}
          </Tabs.List>

          {STACK_JURISPRUDENCE.map((stack) => (
            <Tabs.Panel key={stack.id} value={stack.id}>
              <div className="articles-grid">
                {stack.articles.map((art, idx) => (
                  <div key={idx} className="article-card">
                    <span className="article-number">{art.num}</span>
                    <h4 className="article-title">{art.title}</h4>
                    <p className="article-rule">{art.rule}</p>
                  </div>
                ))}
              </div>
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
