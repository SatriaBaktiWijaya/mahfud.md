import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourtroomSimulator from './components/CourtroomSimulator';
import DownloadCenter from './components/DownloadCenter';
import LexiconSearch from './components/LexiconSearch';
import JurisprudenceSection from './components/JurisprudenceSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CourtroomSimulator />
        <DownloadCenter />
        <LexiconSearch />
        <JurisprudenceSection />
      </main>
      <Footer />
    </div>
  );
}
