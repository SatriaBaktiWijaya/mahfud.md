import { Scale, Terminal } from 'lucide-react';

function GithubIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Navbar({ onOpenAuditModal }) {
  return (
    <header className="navbar-wrapper">
      <div className="container">
        <nav className="navbar">
          <a href="#" className="nav-brand">
            <div className="nav-brand-logo">
              <Scale size={22} />
            </div>
            <span className="nav-brand-name">mahfud.md</span>
            <span className="nav-brand-badge">V1.0 RESMI</span>
          </a>

          <ul className="nav-links">
            <li><a href="#kewenangan" className="nav-link">5 Kewenangan</a></li>
            <li><a href="#ruang-sidang" className="nav-link">Ruang Sidang</a></li>
            <li><a href="#leksikon" className="nav-link">Kamus Hukum</a></li>
            <li><a href="#yurisprudensi" className="nav-link">Yurisprudensi Stack</a></li>
            <li><a href="#instalasi" className="nav-link">Panduan Pasang</a></li>
          </ul>

          <div className="nav-actions">
            <a
              href="https://github.com/SatriaBaktiWijaya/mahfud.md"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>

            <button
              onClick={onOpenAuditModal}
              className="btn-gold-cta"
            >
              <Terminal size={15} />
              <span>Uji Sidang Kode</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
