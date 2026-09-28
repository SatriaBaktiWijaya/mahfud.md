#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

console.log(`
⚖️  ==============================================================
   MAHFUD.MD: AI Code Auditor & Constitutional Guardian Installer
   ==============================================================
   "Tidak ada kompromi bagi tindak pidana kode dan korupsi memori."
`);

const args = process.argv.slice(2);
const isGlobal = args.includes('-g') || args.includes('--global');

const sourceDir = path.resolve(__dirname, '../skills/mahfud-code-auditor');

if (!fs.existsSync(sourceDir)) {
  console.error('❌ Berkas perkara sumber tidak ditemukan!');
  process.exit(1);
}

// Tentukan target direktori pemasangan
let targetDir;
if (isGlobal) {
  targetDir = path.join(os.homedir(), '.gemini', 'config', 'skills', 'mahfud-code-auditor');
} else {
  targetDir = path.resolve(process.cwd(), '.agents', 'skills', 'mahfud-code-auditor');
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  console.log(`📜 Menyiapkan amar putusan pemasangan ke:`);
  console.log(`   📍 ${targetDir}\n`);

  fs.mkdirSync(path.dirname(targetDir), { recursive: true });
  copyRecursiveSync(sourceDir, targetDir);

  console.log(`⚖️  TOK! TOK! TOK! Putusan berkekuatan hukum tetap!`);
  console.log(`✅ Skill mahfud.md berhasil diundangkan ke ${isGlobal ? 'konfigurasi global mesin' : 'workspace proyek'}.`);
  console.log(`\nSekarang Anda dapat memerintahkan AI agent Anda untuk:`);
  console.log(`  1. audit_bpk_sistem        -> Audit & review kode anti-inefisiensi`);
  console.log(`  2. hak_interpelasi_error   -> Bedah stack trace & Operasi Tangkap Tangan bug`);
  console.log(`  3. sidang_paripurna_git    -> Mufakat ketok palu resolusi git merge conflict`);
  console.log(`  4. amandemen_database      -> Pengesahan skema dan migrasi database`);
  console.log(`  5. naskah_akademik_arsitektur -> Perancangan arsitektur direktori bersih\n`);
} catch (err) {
  console.error('❌ Terjadi pelanggaran administratif saat pemasangan:', err.message);
  process.exit(1);
}
