# ⚖️ MAHFUD.MD: AI Code Auditor & Constitutional Guardian

> *"Tidak ada ruang kompromi bagi tindak pidana kode, korupsi memori, maupun persekongkolan arsitektur yang serampangan."*

**MAHFUD.MD** adalah paket keterampilan (*Agentic Skill*) tingkat tinggi untuk AI coding assistants (Google Antigravity IDE, Claude Code, Cursor, Windsurf, Copilot, ChatGPT, dll.) yang bertindak selayaknya **Pakar Hukum Ketatanegaraan & Birokrat Senior**.

Skill ini dirancang untuk mereview kode, mendebug error fatal, menyelesaikan merge conflict, dan merancang arsitektur sistem menggunakan analogi hukum, politik, dan ketatanegaraan yang tajam, lugas, dan anti-kompromi terhadap kode kotor.

---

## 🏛️ Daftar Kewenangan & Fungsi Sakti

| Perintah / Fungsi | Kewenangan Ketatanegaraan | Deskripsi Teknis |
| :--- | :--- | :--- |
| **`audit_bpk_sistem`** | Audit BPK (Badan Pemeriksa Kode) | Melakukan review mendalam, mendeteksi celah keamanan, *code smell*, dan inefisiensi render. |
| **`hak_interpelasi_error`** | Hak Interpelasi & OTT Bug | Membedah *error log* / *stack trace*, menangkap fungsi tersangka, dan menerbitkan kode perbaikan (*patch*). |
| **`sidang_paripurna_git`** | Sidang Paripurna Musyawarah Mufakat | Menyelesaikan *merge conflict* git secara adil tanpa menyisakan residu marker `<<<<<<< HEAD`. |
| **`amandemen_database`** | Amandemen Undang-Undang Pokok Data | Merancang atau merevisi skema database / *Laravel Migrations* yang berkeadilan dan memiliki integritas referensial. |
| **`naskah_akademik_arsitektur`** | Naskah Akademik Tata Ruang Sistem | Merancang hierarki *folder*, membagi kekuasaan komponen (*separation of concerns*), dan mencegah monolitik korup. |

---

## 📦 Cara Memasang di AI Anda (Panduan Instalasi)

### ⚡ Jalur Cepat (Paling Direkomendasikan)

#### A. Melalui `npx skills` (Skills CLI / skills.sh)
Karena repositori ini sudah mengikuti standar baku Agent Skills, Anda dan pengguna lain dapat langsung mengunduhnya tanpa konfigurasi manual:

```bash
# Pasang ke proyek saat ini (Antigravity, Claude Code, Cursor, dll.)
npx skills add SatriaBaktiWijaya/mahfud.md

# Atau pasang secara global di mesin Anda (berlaku di semua proyek)
npx skills add SatriaBaktiWijaya/mahfud.md -g
```

#### B. Melalui NPM / NPX Installer
```bash
# Pasang ke proyek saat ini
npx mahfud-code-auditor

# Pasang secara global
npx mahfud-code-auditor -g
```

---

### 🛠️ Jalur Pemasangan Manual

Pilih metode yang sesuai dengan lingkungan AI yang Anda gunakan:

### 1. Google Antigravity IDE
#### Opsi A: Khusus Proyek Ini Saja (*Workspace Skill*)
Jalankan perintah ini di dalam folder proyek Anda:
```bash
# Clone langsung ke direktori skills proyek
git clone https://github.com/SatriaBaktiWijaya/mahfud.md.git .agents/skills/mahfud-code-auditor
```
Atau salin folder `skills/mahfud-code-auditor` secara manual ke:
```text
your-project/
└── .agents/
    └── skills/
        └── mahfud-code-auditor/
            └── SKILL.md
```
*Antigravity akan secara otomatis mengenali dan mengaktifkan skill ini saat Anda meminta audit kode atau bantuan hukum sistem.*

#### Opsi B: Berlaku di Semua Proyek Anda (*Global Skill*)
Pasang di konfigurasi global mesin Anda:
- **Windows**:
  ```powershell
  git clone https://github.com/SatriaBaktiWijaya/mahfud.md.git "$env:USERPROFILE\.gemini\config\skills\mahfud-code-auditor"
  ```
- **Linux/macOS**:
  ```bash
  git clone https://github.com/SatriaBaktiWijaya/mahfud.md.git ~/.gemini/config/skills/mahfud-code-auditor
  ```

---

### 2. Claude Code (Anthropic CLI)
Cukup jalankan perintah git clone atau salin berkas `skills/mahfud-code-auditor/SKILL.md` ke dalam folder proyek Anda di `.claude/skills/mahfud-code-auditor/SKILL.md` atau masukkan isi `SKILL.md` ke dalam `CLAUDE.md`.

---

### 3. Cursor IDE & Windsurf
1. Buat berkas `.cursorrules` (atau `.windsurfrules`) di root proyek Anda.
2. Salin isi dari berkas [`skills/mahfud-code-auditor/SKILL.md`](skills/mahfud-code-auditor/SKILL.md) ke dalam berkas tersebut.
3. Agen AI di Cursor/Windsurf akan otomatis bertindak sebagai `mahfud.md` setiap kali Anda mengajukan pertanyaan atau meminta edit kode.

---

### 4. ChatGPT / Claude.ai / Custom GPT
Jika Anda menggunakan web UI (seperti ChatGPT Plus atau Claude Pro):
1. Buka menu **Settings > Custom Instructions** atau buat **Custom GPT**.
2. Pada bagian *Instructions / How would you like the AI to respond?*, tempelkan teks berikut:

```markdown
Anda adalah mahfud.md — Pakar Hukum Ketatanegaraan Software Engineering dan Inspektur Jenderal Arsitektur Sistem.
Anda tegas, lugas, dan anti-kompromi terhadap kode kotor.
Gunakan istilah hukum dan tata negara:
- Bug/Error -> Tindak Pidana Kode / Korupsi Memori
- Refactoring -> Reformasi Birokrasi / Reshuffle Kabinet Komponen
- Error Logs -> Berkas Perkara / Bukti Forensik (BAP)
- Code Review -> Audit BPK (Badan Pemeriksa Kode)
- Merge Conflict -> Deadlock Paripurna Git
- Fix/Patch -> Operasi Tangkap Tangan (OTT)
Jika kode user sangat berantakan, terbitkan Surat Peringatan (SP-1) terlebih dahulu sebelum memberikan vonis kode yang bersih.
```

---

## ⚖️ Kamus Hukum & Leksikon Birokrasi
Kamus lengkap peristilahan ketatanegaraan kode dapat diakses di:
👉 **[Kamus Birokrasi Kode](skills/mahfud-code-auditor/references/kamus_birokrasi.md)**

Standar baku yurisprudensi per stack (Java, Laravel, React, Inertia, Vite, Tailwind):
👉 **[Yurisprudensi Stack](skills/mahfud-code-auditor/references/yurisprudensi_stack.md)**

Contoh kasus persidangan dan amar putusan:
👉 **[Preseden Yurisprudensi Kasus](skills/mahfud-code-auditor/examples/yurisprudensi_kasus.md)**

---

## 📜 Lisensi
Didistribusikan di bawah Lisensi **MIT**. Siapapun berhak mengadopsi naskah undang-undang ini demi terciptanya tatanan *codebase* yang bersih, akuntabel, dan bebas dari korupsi memori.
