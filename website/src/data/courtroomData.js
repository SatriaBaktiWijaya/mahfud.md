export const PRESET_CASES = [
  {
    id: 'case-laravel',
    tabTitle: 'Laravel: Korupsi Kueri N+1',
    functionName: 'audit_bpk_sistem',
    caseNumber: '014/AUDIT-BPK/LARAVEL/2026',
    defendantFile: 'OrderController.php',
    violationType: 'PELANGGARAN KONSTITUSI BERAT',
    spLevel: 'SURAT PERINGATAN (SP-1)',
    spSummary: 'Penyelundupan atribut liar (Mass-Assignment) & Pemborosan kas komputasi server (Skandal Kueri N+1).',
    badCode: `class OrderController extends Controller
{
    public function store(Request $request)
    {
        // ⚠️ Celah 1: Penyelundupan atribut tanpa validasi
        $order = Order::create($request->all());

        // ⚠️ Tindak Pidana: Skandal Kueri N+1 Database
        foreach ($request->items as $item) {
            $product = Product::find($item['product_id']);
            $product->stock = $product->stock - $item['qty'];
            $product->save();
        }

        return response()->json($order);
    }
}`,
    verdictFile: 'OrderService.php',
    verdictTitle: 'PUTUSAN REFORMASI BIROKRASI BPK',
    verdictSummary: 'Eksekusi didelegasikan ke Kementerian Teknis (OrderService) berpayung hukum DB::transaction.',
    cleanCode: `namespace App\\Services;

use App\\Http\\Requests\\StoreOrderRequest;
use Illuminate\\Support\\Facades\\DB;

class OrderService
{
    public function createOrder(array $validatedData): Order
    {
        // ✅ Payung Hukum: Asas Transaksi Finansial ACID
        return DB::transaction(function () use ($validatedData) {
            $order = Order::create($validatedData);

            // ✅ Reformasi Kueri: Eager Bulk Update bebas N+1
            $this->inventory->deductBulk($validatedData['items']);

            return $order;
        });
    }
}`
  },
  {
    id: 'case-react',
    tabTitle: 'React: Pejabat Fiktif (Undefined)',
    functionName: 'hak_interpelasi_error',
    caseNumber: '088/OTT-INTERPELASI/REACT/2026',
    defendantFile: 'UserList.jsx',
    violationType: 'TINDAK PIDANA CRASH BROWSER',
    spLevel: 'OPERASI TANGKAP TANGAN (OTT)',
    spSummary: 'Pemanggilan metode .map() terhadap entitas fiktif (undefined) sebelum data resmi server mendarat.',
    badCode: `// ⚠️ BAP Bukti Forensik:
// Uncaught TypeError: Cannot read properties of undefined (reading 'map')
// at UserList (UserList.jsx:12:18)

export default function UserList({ users }) {
  // ⚠️ Modul tertuduh melanggar verifikasi administratif
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
    verdictFile: 'UserList.jsx (Direformasi)',
    verdictTitle: 'AMAR PUTUSAN SELA DEWAN KODE',
    verdictSummary: 'Tersangka ditangkap tangan. Diterbitkan pasal verifikasi awal (Guard Clause) dan Fallback State resmi.',
    cleanCode: `export default function UserList({ users = [] }) {
  // ✅ Verifikasi Legalitas: Pejabat fiktif dicekal di gerbang
  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="empty-state">
        <p>Belum ada berkas data aparatur yang terdaftar secara sah.</p>
      </div>
    );
  }

  return (
    <ul className="user-roster">
      {users.map((user) => (
        <li key={user.id} className="user-item">
          <span className="font-semibold">{user.name}</span>
          <span className="badge">{user.role}</span>
        </li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 'case-git',
    tabTitle: 'Git: Deadlock Paripurna (Conflict)',
    functionName: 'sidang_paripurna_git',
    caseNumber: '007/PARIPURNA-MUFAKAT/GIT/2026',
    defendantFile: 'authPermissions.js',
    violationType: 'SENGKETA KEWENANGAN ANTAR-FAKSI',
    spLevel: 'DEADLOCK SIDANG DEWAN',
    spSummary: 'Faksi HEAD dan Faksi feature/rbac berselisih paham mengenai struktur izin akses peran pengguna.',
    badCode: `<<<<<<< HEAD
const userRole = auth.user.role === 'admin' 
  ? 'KABINET_INTI' 
  : 'STAFF';
=======
const userRole = auth.user?.roles?.includes('superadmin') 
  ? 'KETUA_LEMBAGA' 
  : 'ANGGOTA';
>>>>>>> feature/rbac-revision`,
    verdictFile: 'authPermissions.js (Hasil Mufakat)',
    verdictTitle: 'RISALAH MUFAKAT KETOK PALU',
    verdictSummary: 'Kedua faksi diharmonisasikan ke dalam sistem perundangan peran bertingkat (RBAC) yang elegan.',
    cleanCode: `// ⚖️ PUTUSAN PARIPURNA: Harmonisasi Struktur Peran
const roles = auth?.user?.roles || [auth?.user?.role].filter(Boolean);

export const userRole = roles.includes('superadmin')
  ? 'KETUA_LEMBAGA'
  : roles.includes('admin')
    ? 'KABINET_INTI'
    : 'STAFF';`
  },
  {
    id: 'case-java',
    tabTitle: 'Java: NullPointerException',
    functionName: 'audit_bpk_sistem',
    caseNumber: '023/AUDIT-BPK/JAVA-SPRING/2026',
    defendantFile: 'PaymentProcessor.java',
    violationType: 'KELALAIAN ADMINISTRATIF FATAL',
    spLevel: 'SURAT PERINGATAN (SP-2)',
    spSummary: 'Membuka celah NullPointerException pada sistem transaksi finansial tanpa proteksi Optional atau anotasi null-safety.',
    badCode: `public class PaymentProcessor {
    public Receipt process(Customer customer, Order order) {
        // ⚠️ Sabotase: customer.getWallet() dapat mengembalikan null!
        BigDecimal balance = customer.getWallet().getBalance();
        if (balance.compareTo(order.getTotal()) >= 0) {
            return executePayment(customer, order);
        }
        return null;
    }
}`,
    verdictFile: 'PaymentProcessor.java (Reformasi)',
    verdictTitle: 'VONIS MAHKAMAH KODE JAVA',
    verdictSummary: 'Menerapkan asas Optional<T> dan Objects.requireNonNull guna menjamin kepastian eksekusi.',
    cleanCode: `public class PaymentProcessor {
    public Optional<Receipt> process(
        @NonNull Customer customer, 
        @NonNull Order order
    ) {
        // ✅ Penegakan Hukum: Null safety terjamin konstitusi
        return Optional.ofNullable(customer.getWallet())
            .filter(w -> w.getBalance().compareTo(order.getTotal()) >= 0)
            .map(w -> executePayment(customer, order));
    }
}`
  },
  {
    id: 'case-db',
    tabTitle: 'Database: Amandemen Migrasi',
    functionName: 'amandemen_database',
    caseNumber: '099/AMANDEMEN-UUD/DATABASE/2026',
    defendantFile: '2026_09_29_create_tuntutan_rakyat.php',
    violationType: 'TUNTUTAN PERUBAHAN TATA KELOLA DATA',
    spLevel: 'LEGISLASI RESMI',
    spSummary: 'Penyusunan migrasi skema basis data dengan indeks performa dan integritas referensial foreign key.',
    badCode: `// Skema Lama Usang:
// Tabel 'users' belum memiliki kolom 'audit_status',
// indeks pencarian email, dan pencatatan audit log forensik.`,
    verdictFile: '2026_09_29_000000_amend_users_table.php',
    verdictTitle: 'LEMBARAN NEGARA AMANDEMEN BASIS DATA',
    verdictSummary: 'Amandemen disahkan lengkap dengan hak veto pembatalan (down method rollback).',
    cleanCode: `return new class extends Migration {
    public function up(): void {
        Schema::table('users', function (Blueprint $table) {
            $table->string('audit_status', 30)->default('BERSIH')->index();
            $table->timestamp('last_audited_at')->nullable();
            $table->foreignId('auditor_id')->nullable()->constrained('users')->nullOnDelete();
        });
    }

    public function down(): void {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['auditor_id']);
            $table->dropColumn(['audit_status', 'last_audited_at', 'auditor_id']);
        });
    }
};`
  }
];

export const CORE_POWERS = [
  {
    id: 'audit_bpk_sistem',
    name: 'audit_bpk_sistem',
    badge: 'BADAN PEMERIKSA KODE',
    icon: 'Scale',
    color: '#d4af37',
    tagline: 'Uji Kelayakan, Kepatutan, & Audit Performa',
    desc: 'Melakukan razia menyeluruh terhadap source code. Mendeteksi inefisiensi render di React, celah keamanan di Laravel, serta class Tailwind yang mubazir dan melanggar asas reusability.'
  },
  {
    id: 'hak_interpelasi_error',
    name: 'hak_interpelasi_error',
    badge: 'HAK INTERPELASI & OTT',
    icon: 'Terminal',
    color: '#ef4444',
    tagline: 'Bedah Stack Trace & Operasi Tangkap Tangan Bug',
    desc: 'Menggunakan hak dewan untuk memanggil paksa modul atau fungsi penyebab error. Membedah Berita Acara Pemeriksaan (BAP) log terminal, menangkap dalang bug, dan menerbitkan kode patch pemulihan.'
  },
  {
    id: 'sidang_paripurna_git',
    name: 'sidang_paripurna_git',
    badge: 'MAHKAMAH ARBITRASE GIT',
    icon: 'GitMerge',
    color: '#3b82f6',
    tagline: 'Musyawarah Mufakat Deadlock Merge Conflict',
    desc: 'Mengurai kebuntuan sidang antar-faksi kode (marker <<<<<<< HEAD). Menilai argumen kedua kubu secara berkeadilan dan mengetok palu penggabungan logika bersih tanpa merusak aplikasi.'
  },
  {
    id: 'amandemen_database',
    name: 'amandemen_database',
    badge: 'KOMISI AMANDEMEN DATA',
    icon: 'Database',
    color: '#10b981',
    tagline: 'Pengesahan Skema & Migrasi Database Berkeadilan',
    desc: 'Merancang dan mengesahkan skrip migrasi database (Laravel / SQL) dengan integritas referensial ketat, indeks cepat, dan mekanisme hak veto pembatalan (rollback down method).'
  },
  {
    id: 'naskah_akademik_arsitektur',
    name: 'naskah_akademik_arsitektur',
    badge: 'BADAN PERENCANAAN TATA RUANG',
    icon: 'Layers',
    color: '#8b5cf6',
    tagline: 'Pemisahan Trias Politica Modul & Clean Architecture',
    desc: 'Merancang fondasi hierarki folder proyek baru. Membagi kekuasaan (Presentasi, Bisnis, Data) agar tidak terjadi pemusatan kekuasaan korup (God Component / Fat Controller).'
  }
];

export const LEXICON_TERMS = [
  { term: 'Bug / Software Defect', legal: 'Tindak Pidana Kode', category: 'Cacat Sistem', desc: 'Pelanggaran langsung terhadap asas kepatutan logika perangkat lunak.' },
  { term: 'Memory Leak', legal: 'Korupsi Memori / Penggelapan Sumber Daya', category: 'Cacat Sistem', desc: 'Penimbunan alokasi memori negara sistem yang tidak dikembalikan ke rakyat.' },
  { term: 'Refactoring', legal: 'Reformasi Birokrasi / Reshuffle Kabinet', category: 'Perbaikan', desc: 'Pembersihan struktur kode tanpa mengubah fungsi pelayanan publik.' },
  { term: 'Error Logs / Stack Trace', legal: 'Berkas Perkara Forensik (BAP)', category: 'Penyelidikan', desc: 'Dokumen bukti otentik terjadinya kelalaian atau kegagalan sistem.' },
  { term: 'Code Review', legal: 'Audit BPK / Uji Kelayakan dan Kepatutan', category: 'Pengawasan', desc: 'Pemeriksaan kepatuhan kode terhadap undang-undang framework.' },
  { term: 'Merge Conflict', legal: 'Deadlock Paripurna / Konflik Kepentingan', category: 'Sengketa', desc: 'Perselisihan klaim logika antar-dua kubu faksi branch di Git.' },
  { term: 'Hotfix / Patch', legal: 'Operasi Tangkap Tangan (OTT)', category: 'Penindakan', desc: 'Tindakan kilat menangkap bug langsung di tempat kejadian perkara (production).' },
  { term: 'NullPointerException', legal: 'Kelalaian Pejabat Fiktif', category: 'Cacat Sistem', desc: 'Pemanggilan hak kewenangan pada entitas yang belum memiliki SK sah (null).' },
  { term: 'SQL Injection', legal: 'Penyelundupan Pasal Gelap Database', category: 'Kejahatan', desc: 'Aksi subversif menyelipkan klausa manipulatif ke dalam basis data negara.' },
  { term: 'Pull Request (PR)', legal: 'Rancangan Undang-Undang (RUU)', category: 'Legislasi', desc: 'Pengajuan usulan perubahan kode sebelum disahkan menjadi hukum tetap (commit).' },
  { term: 'Dead Code / Unused Imports', legal: 'Pejabat Inkompeten Makan Gaji Buta', category: 'Pemborosan', desc: 'Baris kode usang yang membebani kas ukuran bundle tanpa kontribusi nyata.' },
  { term: 'Environment (.env)', legal: 'Dokumen Intelijen Rahasia Negara', category: 'Keamanan', desc: 'Berkas kunci rahasia yang haram bocor ke publik atau repositori publik.' }
];

export const STACK_JURISPRUDENCE = [
  {
    id: 'laravel',
    name: 'Laravel (PHP)',
    icon: 'Server',
    articles: [
      { num: 'Pasal 4', title: 'Celah Penyelundupan Mass-Assignment', rule: 'Dilarang keras memakai $guarded = [] tanpa perlindungan FormRequest berlapis.' },
      { num: 'Pasal 5', title: 'Skandal Kueri N+1 Eloquent', rule: 'Wajib menerapkan eager loading with([relasi]) pada setiap perulangan data.' },
      { num: 'Pasal 6', title: 'Maladministrasi Fat Controller', rule: 'Logika bisnis di atas 50 baris wajib didelegasikan ke Service Layer atau Action Class.' }
    ]
  },
  {
    id: 'react',
    name: 'React & Inertia.js',
    icon: 'Atom',
    articles: [
      { num: 'Pasal 7', title: 'Dekrit Larangan Re-render Liar', rule: 'Dilarang membuat deklarasi objek/fungsi liar di render body yang memicu getaran anak komponen.' },
      { num: 'Pasal 8', title: 'Penyalahgunaan Wewenang useEffect', rule: 'useEffect bukan tempat sampah. Gunakan derived state dan sertakan cleanup listener.' },
      { num: 'Pasal 10', title: 'Protokol Ekstradisi Props Inertia', rule: 'Kirim DTO atau Resource terpilih saja, dilarang mengirim seluruh model database ke klien.' }
    ]
  },
  {
    id: 'java',
    name: 'Java (Spring Boot)',
    icon: 'Coffee',
    articles: [
      { num: 'Pasal 1', title: 'Asas Anti-God Object', rule: 'Setiap class wajib mematuhi Single Responsibility Principle, dilarang memonopoli kekuasaan.' },
      { num: 'Pasal 2', title: 'Tindak Pidana NullPointerException', rule: 'NPE di lingkungan produksi dianggap sabotase. Wajib gunakan Optional<T> atau @NonNull.' },
      { num: 'Pasal 3', title: 'Korupsi Memori Concurrency', rule: 'Wajib gunakan thread-safe collections dan reactive pipeline non-blocking.' }
    ]
  },
  {
    id: 'frontend',
    name: 'Vite & Tailwind CSS',
    icon: 'Palette',
    articles: [
      { num: 'Pasal 12', title: 'Efisiensi Anggaran Bundling Vite', rule: 'Terapkan code-splitting dan dynamic import pada modul administratif yang jarang dibuka.' },
      { num: 'Pasal 14', title: 'Pelanggaran Class Mengular Tailwind', rule: 'Class Tailwind melebihi 20 utilitas berulang wajib diekstrak menjadi komponen reusable.' },
      { num: 'Pasal 15', title: 'Harmonisasi Tata Warna Desain', rule: 'Dilarang memakai warna arbitrary liar jika sistem desain sudah memiliki tema baku.' }
    ]
  }
];

export const INSTALL_METHODS = [
  {
    id: 'skills-cli',
    agent: 'npx skills (Skills.sh)',
    desc: 'Metode tercepat! Mengunduh langsung dari GitHub registry tanpa registrasi npm.',
    command: 'npx skills add SatriaBaktiWijaya/mahfud.md',
    globalCommand: 'npx skills add SatriaBaktiWijaya/mahfud.md -g'
  },
  {
    id: 'antigravity',
    agent: 'Google Antigravity IDE',
    desc: 'Pasang ke dalam direktori skills lokal proyek atau konfigurasi global mesin.',
    command: 'git clone https://github.com/SatriaBaktiWijaya/mahfud.md.git .agents/skills/mahfud-code-auditor',
    globalCommand: 'git clone https://github.com/SatriaBaktiWijaya/mahfud.md.git "$env:USERPROFILE\\.gemini\\config\\skills\\mahfud-code-auditor"'
  },
  {
    id: 'cursor-claude',
    agent: 'Cursor & Claude Code',
    desc: 'Salin instruksi konstitusi langsung ke .cursorrules atau .claude/skills/',
    command: '# Di Cursor IDE: Salin isi SKILL.md ke .cursorrules\n# Di Claude Code: Masukkan SKILL.md ke .claude/skills/mahfud-code-auditor/',
    globalCommand: null
  },
  {
    id: 'npm-cli',
    agent: 'NPM / NPX Installer',
    desc: 'Pasang menggunakan paket Node.js eksekutif installer mandiri.',
    command: 'npx mahfud-code-auditor',
    globalCommand: 'npx mahfud-code-auditor -g'
  }
];
