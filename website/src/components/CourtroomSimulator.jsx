import React, { useState } from 'react';
import { Tabs } from '@base-ui/react';
import { PRESET_CASES } from '../data/courtroomData';
import { playGavelStrike } from '../utils/audio';
import { FileCode, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function CourtroomSimulator({ onTriggerToast }) {
  const [activeCaseId, setActiveCaseId] = useState(PRESET_CASES[0].id);

  const handleTabChange = (value) => {
    setActiveCaseId(value);
    playGavelStrike();
    const selectedCase = PRESET_CASES.find((c) => c.id === value);
    if (selectedCase) {
      onTriggerToast(`⚖️ Membuka berkas perkara: ${selectedCase.caseNumber}`);
    }
  };

  const activeCase = PRESET_CASES.find((c) => c.id === activeCaseId) || PRESET_CASES[0];

  return (
    <section id="ruang-sidang" className="courtroom-window-wrapper">
      <div className="container">
        <div className="courtroom-window">
          {/* Window Header Titlebar */}
          <div className="window-titlebar">
            <div className="window-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>

            <div className="window-title">
              ⚖️ MAHFUD.MD — BERITA ACARA PEMERIKSAAN (BAP): {activeCase.caseNumber}
            </div>

            <div className="window-court-badge">
              <span className="pulsing-indicator" />
              <span>SIDANG PLENO TERBUKA</span>
            </div>
          </div>

          {/* Base UI Tabs Root */}
          <Tabs.Root value={activeCaseId} onValueChange={handleTabChange}>
            {/* Base UI Tabs List */}
            <Tabs.List className="simulator-tabs-list">
              {PRESET_CASES.map((item) => (
                <Tabs.Tab
                  key={item.id}
                  value={item.id}
                  className="simulator-tab"
                >
                  <FileCode size={14} />
                  <span>{item.tabTitle}</span>
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {/* Base UI Tabs Panels */}
            {PRESET_CASES.map((item) => (
              <Tabs.Panel key={item.id} value={item.id}>
                <div className="courtroom-grid">
                  {/* Column 1: Berkas Perkara Pelanggar */}
                  <div className="court-col court-col-breach">
                    <div className="col-header">
                      <span className="col-filename col-filename-red">
                        <FileCode size={14} />
                        {item.defendantFile}
                      </span>
                      <span className="col-badge badge-red">
                        {item.violationType}
                      </span>
                    </div>

                    <pre className="code-pre-box code-red">
                      <code>{item.badCode}</code>
                    </pre>

                    <div className="verdict-banner banner-sp">
                      <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                      <div>
                        <strong>{item.spLevel}:</strong> {item.spSummary}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Amar Putusan BPK Reformasi */}
                  <div className="court-col court-col-verdict">
                    <div className="col-header">
                      <span className="col-filename col-filename-green">
                        <CheckCircle2 size={14} />
                        {item.verdictFile}
                      </span>
                      <span className="col-badge badge-green">
                        {item.verdictTitle}
                      </span>
                    </div>

                    <pre className="code-pre-box code-green">
                      <code>{item.cleanCode}</code>
                    </pre>

                    <div className="verdict-banner banner-verdict">
                      <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                      <div>
                        <strong>PUTUSAN EKSEKUSI:</strong> {item.verdictSummary} Tok!
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Panel>
            ))}
          </Tabs.Root>
        </div>
      </div>
    </section>
  );
}
