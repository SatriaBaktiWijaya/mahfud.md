import React, { useState } from 'react';
import { Dialog } from '@base-ui/react';
import { X, Gavel, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { playGavelStrike } from '../utils/audio';

export default function CustomAuditModal({ open, onOpenChange, onTriggerToast }) {
  const [userCode, setUserCode] = useState('');
  const [verdictResult, setVerdictResult] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const handleAudit = () => {
    if (!userCode.trim()) {
      onTriggerToast('⚠️ Lampirkan berkas kode atau log perkara terlebih dahulu!');
      return;
    }

    setIsAuditing(true);
    playGavelStrike();

    setTimeout(() => {
      setIsAuditing(false);
      playGavelStrike();
      const randomCaseNum = Math.floor(100 + Math.random() * 900);

      // Simple heuristic check for custom demonstration
      const hasTryCatch = userCode.includes('try') && userCode.includes('catch');
      const hasAny = userCode.includes(': any') || userCode.includes('any[]');
      const hasSql = userCode.toLowerCase().includes('select') || userCode.toLowerCase().includes('where');

      let breach = 'Indikasi awal pelanggaran konstitusi dan ketidakdisiplinan tata kelola tipe data.';
      let article = 'Pasal 2: Asas Kepatutan Rekayasa & Anti-Kelalaian Fatal';

      if (hasTryCatch) {
        breach = 'Penyelundupan try-catch kosong: Praktik pembungkaman perkara tanpa pencatatan forensik!';
        article = 'Pasal 8: Larangan Obstruction of Justice dalam Error Handling';
      } else if (hasAny) {
        breach = 'Penggunaan tipe "any" secara serampangan: Sabotase terhadap kepastian hukum tipe data!';
        article = 'Pasal 1: Ketertiban Kontrak & Integritas Tipe Data';
      } else if (hasSql) {
        breach = 'Potensi penyelundupan pasal gelap via SQL mentah tanpa sanitasi Parameterized Query!';
        article = 'Pasal 4: Kedaulatan Integritas Basis Data';
      }

      setVerdictResult({
        caseNumber: `${randomCaseNum}/SIDANG-KILAT/AUDIT-BPK/2026`,
        breach,
        article,
        reformedNote: 'Kode telah diaudit. Segera lakukan reshuffle komponen, hapus variabel mubazir, dan terapkan pembagian wewenang modular.'
      });

      onTriggerToast('🔨 TOK! Palu sidang diketok! Amar putusan perkara telah terbit!');
    }, 600);
  };

  const handleClose = () => {
    onOpenChange(false);
    setVerdictResult(null);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="dialog-backdrop" />
        <Dialog.Popup className="dialog-popup">
          <div className="modal-header">
            <Dialog.Title className="modal-title">
              ⚖️ Uji Sidang Perkara Kode Mandiri
            </Dialog.Title>
            <Dialog.Close onClick={handleClose} className="modal-close-btn">
              <X size={20} />
            </Dialog.Close>
          </div>

          <Dialog.Description style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>
            Tempelkan potongan kode atau log stack trace error Anda di bawah ini.
            Majelis Mahkamah Kode Konstitusi akan melakukan audit BPK dan menerbitkan amar putusan resmi.
          </Dialog.Description>

          <textarea
            className="modal-textarea"
            placeholder="// Tempelkan potongan kode JavaScript, PHP, Java, atau React di sini..."
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginBottom: '20px' }}>
            <button
              onClick={handleAudit}
              disabled={isAuditing}
              className="btn-gold-cta"
            >
              <Gavel size={16} />
              <span>{isAuditing ? 'Sedang Memeriksa BAP...' : 'Ketok Palu Sidangkan Kode'}</span>
            </button>
          </div>

          {verdictResult && (
            <div style={{ background: '#090d16', border: '1px solid #d4af3766', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#d4af37', fontWeight: 'bold' }}>
                  NOMOR PERKARA: {verdictResult.caseNumber}
                </span>
                <span style={{ fontSize: '11px', color: '#f87171', background: '#ef444415', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                  VONIS BPK RESMI
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#fca5a5', fontSize: '13.5px' }}>
                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Temuan Pelanggaran:</strong> {verdictResult.breach}
                  <div style={{ color: '#d4af37', fontSize: '12.5px', marginTop: '4px' }}>
                    Dasar Hukum: {verdictResult.article}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#86efac', fontSize: '13.5px', borderTop: '1px solid #1e293b', paddingTop: '10px' }}>
                <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Instruksi Eksekusi Reformasi:</strong> {verdictResult.reformedNote}
                </div>
              </div>
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
