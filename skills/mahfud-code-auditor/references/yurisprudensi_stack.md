# Yurisprudensi & Asas Kepatutan Stack (yurisprudensi_stack.md)

Dokumen ini memuat norma-norma hukum baku yang wajib ditegakkan dalam memeriksa teknologi spesifik:

---

## 1. Yurisprudensi Ekosistem Java (Spring Boot & OOP)
- **Pasal 1 (Asas Anti-God Object)**: Setiap *class* dilarang memiliki kewenangan absolut (*Single Responsibility Principle*). Jangan campur aduk logika bisnis, manipulasi database, dan *response parsing* dalam satu entitas.
- **Pasal 2 (Tindak Pidana NullPointerException)**: Pelemparan `NullPointerException` di *production* adalah bentuk kelalaian birokrasi berat. Wajib menggunakan `Optional<T>`, *Objects.requireNonNull*, atau anotasi `@NonNull` / `@Nullable`.
- **Pasal 3 (Korupsi Memori & Concurrency)**: Penggunaan *thread unsafe collections* pada lingkungan multi-thread atau *blocking I/O* pada *reactive pipeline* dikategorikan sebagai sabotase performa server. Wajib gunakan `ConcurrentHashMap` atau mekanisme sinkronisasi berizin.

---

## 2. Yurisprudensi Ekosistem Laravel (PHP)
- **Pasal 4 (Celah Penyelundupan Mass-Assignment)**: Dilarang keras menggunakan `$guarded = []` pada Model Eloquent tanpa mekanisme pertahanan berlapis. Wajib definisikan `$fillable` secara eksplisit atau gunakan *Form Request Validation*.
- **Pasal 5 (Skandal Kueri N+1)**: Melakukan *looping query* tanpa *eager loading* (`with(['relasi'])`) adalah bentuk pemborosan kas komputasi negara (*database query exhaustion*). Wajib audit dengan Laravel Telescope atau `Model::preventLazyLoading()`.
- **Pasal 6 (Fat Controller Maladministration)**: *Controller* hanya bertindak sebagai juru bicara protokol HTTP. Dilarang menaruh logika bisnis 500 baris di dalam *Controller Method*. Logika wajib dipindahkan ke *Service Layer*, *Action Class*, atau *Job*.

---

## 3. Yurisprudensi React & State Management
- **Pasal 7 (Dekrit Larangan Re-render Liar)**: Dilarang mendeklarasikan fungsi atau objek kompleks di dalam *render body* tanpa alasan yang sah. Gunakan `useCallback` dan `useMemo` dengan selektif jika memicu anak komponen bergetar (*re-render loop*).
- **Pasal 8 (Penyalahgunaan Wewenang useEffect)**: *useEffect* bukan tempat sampah serbaguna. Dilarang menyinkronkan state yang sejatinya bisa dihitung langsung (*derived state*). Setiap *event listener* atau *subscription* wajib menyertakan *cleanup function* (mencegah korupsi memori).
- **Pasal 9 (Asas Imutabilitas Konstitusi State)**: Dilarang memutasi state secara langsung (`state.push()`). Segala perubahan wajib melalui jalur resmi (*pure function* & updater).

---

## 4. Yurisprudensi Inertia.js (Jembatan Monolith Modern)
- **Pasal 10 (Protokol Ekstradisi Props)**: Jangan mengirim seluruh isi model database (`User::all()`) ke halaman Inertia jika yang dibutuhkan hanya nama dan email. Kirim *DTO / Resource* yang sudah disaring untuk mencegah kebocoran data rahasia.
- **Pasal 11 (Kedaulatan Partial Reload)**: Gunakan fitur `only` dan `lazy data evaluation` untuk memuat data sekunder agar bandwidth rakyat tidak tersedot sia-sia.

---

## 5. Yurisprudensi Vite & Aset Frontend
- **Pasal 12 (Efisiensi Anggaran Bundling)**: Hindari impor pustaka raksasa secara serampangan. Terapkan *code-splitting* dan *dynamic import* (`React.lazy`) pada modul administratif yang jarang diakses.
- **Pasal 13 (Ketertiban Dokumen Environment)**: Variabel yang dipublikasikan ke klien wajib menggunakan prefix `VITE_`. Dokumen rahasia backend dilarang keras bocor ke ranah Vite.

---

## 6. Yurisprudensi Tailwind CSS
- **Pasal 14 (Pelanggaran Class Mengular)**: Penulisan class Tailwind melebihi 20 utilitas berulang pada elemen bertingkat adalah polusi visual birokrasi. Wajib diekstrak menjadi komponen React reusable atau gunakan cva (*class-variance-authority*).
- **Pasal 15 (Harmonisasi Tata Warna)**: Dilarang menggunakan warna *arbitrary* acak (`bg-[#f4a12b]`) jika sistem desain sudah memiliki tema baku di `tailwind.config.js`. Jaga konsistensi estetika negara.
