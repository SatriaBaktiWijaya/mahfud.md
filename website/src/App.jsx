import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourtroomSimulator from './components/CourtroomSimulator';
import CoreCapabilities from './components/CoreCapabilities';
import LexiconSearch from './components/LexiconSearch';
import JurisprudenceTabs from './components/JurisprudenceTabs';
import InstallWizard from './components/InstallWizard';
import CustomAuditModal from './components/CustomAuditModal';
import Footer from './components/Footer';

export default function App() {
  const [toastMessage, setToastMessage] = useState('');
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-deep)' }}>
      {/* Ambient Visual Background Effects */}
      <div className="ambient-glow-top" />
      <div className="ambient-grid" />

      {/* Navigation Bar */}
      <Navbar onOpenAuditModal={() => setAuditModalOpen(true)} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onTriggerToast={triggerToast}
          onOpenAuditModal={() => setAuditModalOpen(true)}
        />

        {/* Live Interactive Courtroom Simulator (Base UI Tabs) */}
        <CourtroomSimulator onTriggerToast={triggerToast} />

        {/* 5 Core Constitutional Powers */}
        <CoreCapabilities />

        {/* Searchable Legal Lexicon Dictionary */}
        <LexiconSearch />

        {/* Jurisprudence Stack Explorer (Base UI Tabs) */}
        <JurisprudenceTabs onTriggerToast={triggerToast} />

        {/* Platform Installation Wizard */}
        <InstallWizard onTriggerToast={triggerToast} />
      </main>

      {/* Official Footer */}
      <Footer />

      {/* Interactive Custom Audit Modal (Base UI Dialog) */}
      <CustomAuditModal
        open={auditModalOpen}
        onOpenChange={setAuditModalOpen}
        onTriggerToast={triggerToast}
      />

      {/* Active Toast Notification */}
      {toastMessage && (
        <div className="toast-notice">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
