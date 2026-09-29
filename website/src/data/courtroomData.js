export const courtroomCases = [
  {
    id: 'laravel',
    title: 'Skandal Mass-Assignment & N+1 Kueri',
    stack: 'Laravel / PHP',
    stackBadgeColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    caseNumber: '014/AUDIT-BPK/LARAVEL/2026',
    spLevel: 'SP-1 (Surat Peringatan Pertama)',
    spColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    dirtyCode: `class OrderController extends Controller
{
    // PELANGGARAN: Tidak ada validasi & pemborosan kueri
    public function store(Request $request)
    {
        // ❌ Pasal 4: Penyelundupan atribut masal tanpa filter
        $order = Order::create($request->all());

        foreach ($request->items as $item) {
            // ❌ Pasal 5: Skandal kueri N+1 di dalam loop
            $product = Product::find($item['product_id']);
            $product->stock -= $item['qty'];
            $product->save();
        }

        return response()->json($order);
    }
}`,
    dirtyViolations: [
      { line: 'Baris 7', label: 'Penyelundupan Data Masal ($request->all())' },
      { line: 'Baris 11', label: 'Skandal Kueri N+1 (Product::find() dalam Loop)' },
      { line: 'Global', label: 'Ketiadaan Payung Hukum DB::transaction (Non-ACID)' },
    ],
    verdictTitle: 'AMAR PUTUSAN REFORMASI BIROKRASI LARAVEL',
    verdictAnalysis:
      'Setelah Majelis memeriksa berkas perkara, ditemukan indikasi kuat tindak pidana kode berupa penyelundupan atribut tak berizin (`$request->all()`) yang membahayakan integritas data, serta pemborosan kas komputasi server akibat kueri N+1 tanpa transaksi ACID.',
    reformedCode: `namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function __construct(
        protected OrderService $orderService
    ) {}

    public function store(StoreOrderRequest $request): JsonResponse
    {
        // ✅ Eksekusi akuntabel didelegasikan ke Kementerian Teknis (OrderService)
        // ✅ Dilindungi payung hukum DB::transaction dan validasi ketat
        $order = $this->orderService->createOrder($request->validated());

        return response()->json([
            'status' => 'DISAHKAN',
            'message' => 'Ketok palu pemesanan sukses dilaksanakan dengan akuntabel.',
            'data' => $order
        ], 201);
    }
}`,
    reformedPerks: [
      'Validasi terpusat via StoreOrderRequest (Cegah Mass-Assignment)',
      'Eksekusi atomik berpayung DB::transaction di OrderService',
      'Pemisahan wewenang: Controller murni bertindak sebagai juru bicara HTTP',
    ],
  },
  {
    id: 'react',
    title: 'Kelalaian Administratif Fatal (Undefined Property)',
    stack: 'React / Frontend',
    stackBadgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    caseNumber: '029/HAK-INTERPELASI/REACT/2026',
    spLevel: 'SP-2 (Surat Peringatan Kedua)',
    spColor: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    dirtyCode: `export default function UserList({ users }) {
    // ❌ Pasal 8 & 9: Langsung mapping tanpa verifikasi data
    // Runtime Error: Cannot read properties of undefined (reading 'map')
    return (
        <div className="user-container">
            <h3>Daftar Pejabat Aktif</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
}`,
    dirtyViolations: [
      { line: 'Baris 7', label: 'Pemanggilan Pejabat Fiktif (users.map tanpa fallback)' },
      { line: 'Baris 1', label: 'Ketiadaan Default Props / Nilai Pengaman' },
      { line: 'Global', label: 'Potensi White-Screen of Death pada Klien' },
    ],
    verdictTitle: 'VONIS OPERASI TANGKAP TANGAN (OTT) PEJABAT FIKTIF',
    verdictAnalysis:
      'Tersangka utama terbukti memanggil fungsi `.map()` pada variabel yang belum berstatus hukum tetap (masih `undefined` sebelum data mendarat dari server). Ini kelalaian prosedural fatal yang membuat antarmuka rakyat blank!',
    reformedCode: `export default function UserList({ users = [] }) {
    // ✅ Verifikasi legalitas data sebelum digelar ke panggung publik
    if (!Array.isArray(users) || users.length === 0) {
        return (
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 italic text-sm">
                Belum ada berkas data aparatur sipil yang terdaftar.
            </div>
        );
    }

    return (
        <ul className="divide-y divide-slate-800/80 rounded-xl border border-slate-800 bg-slate-900/60 p-2">
            {users.map((user) => (
                <li key={user.id} className="py-2.5 px-3 flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-200">{user.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {user.role}
                    </span>
                </li>
            ))}
        </ul>
    );
}`,
    reformedPerks: [
      'Default parameter users = [] mencegah runtime crash',
      'Empty state ramah pengguna sebagai jaminan transparansi',
      'Aksesibilitas dan styling terstruktur sesuai asas kepatutan',
    ],
  },
  {
    id: 'java',
    title: 'Pelanggaran Anti-God Object & NullPointerException',
    stack: 'Java / Spring Boot',
    stackBadgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    caseNumber: '042/AUDIT-BPK/JAVA/2026',
    spLevel: 'SP-1 (Surat Peringatan Pertama)',
    spColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    dirtyCode: `// ❌ Pasal 1: God Class memonopoli seluruh kewenangan
@RestController
public class CustomerSuperService {
    // Menggabungkan Controller, Database Query, dan Notifikasi Email
    @PostMapping("/checkout")
    public String checkout(@RequestBody Customer customer) {
        // ❌ Pasal 2: Membiarkan potensi NullPointerException berkeliaran
        String city = customer.getAddress().getCity().toUpperCase();
        
        // Manual SQL string concatenation (Celah Makro Penyelundupan)
        String sql = "UPDATE accounts SET balance = balance - 100 WHERE id = " + customer.getId();
        // ... 500 baris logika campur aduk ...
        return "SUCCESS";
    }
}`,
    dirtyViolations: [
      { line: 'Baris 8', label: 'Tindak Pidana NullPointerException (Chained dereferencing)' },
      { line: 'Baris 11', label: 'Penyelundupan Pasal Gelap (SQL Concatenation)' },
      { line: 'Baris 2', label: 'Monopoli Kekuasaan (God Class campur aduk)' },
    ],
    verdictTitle: 'AMAR PUTUSAN DEKONSENTRASI KEWENANGAN SISTEM JAVA',
    verdictAnalysis:
      'Majelis melarang keras satu kelas bertindak sebagai Penguasa Tunggal (God Object). Pemanggilan objek berantai tanpa `Optional` adalah bentuk sabotase stabilitas server yang memicu crash mendadak.',
    reformedCode: `@RestController
@RequestMapping("/api/v1/checkout")
public class CheckoutController {
    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = Objects.requireNonNull(checkoutService, "CheckoutService tidak boleh fiktif!");
    }

    @PostMapping
    public ResponseEntity<CheckoutResponse> processCheckout(@Valid @RequestBody CheckoutRequest request) {
        // ✅ Didelegasikan ke Service Layer dengan validasi DTO ketat
        CheckoutResult result = checkoutService.executeCheckout(request);
        return ResponseEntity.ok(CheckoutResponse.from(result));
    }
}`,
    reformedPerks: [
      'Pemisahan wewenang: DTO validasi, Controller, dan Service Layer',
      'Asas Anti-NPE: Penggunaan Objects.requireNonNull & Optional',
      'Penyelundupan SQL diblokir total lewat Spring Data Repository berparameter',
    ],
  },
  {
    id: 'git',
    title: 'Deadlock Paripurna Antar-Faksi (Merge Conflict)',
    stack: 'Git / Version Control',
    stackBadgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    caseNumber: '007/SIDANG-PARIPURNA/GIT/2026',
    spLevel: 'SIDANG REKONSILIASI KETOK PALU',
    spColor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    dirtyCode: `<<<<<<< HEAD
// Aspirasi Faksi Utama: Peran sederhana biner
const userRole = auth.user.role === 'admin' ? 'KABINET_INTI' : 'STAFF';
=======
// Aspirasi Faksi Oposisi: Menuntut hierarki multi-role modern
const userRole = auth.user?.roles?.includes('superadmin') ? 'KETUA_LEMBAGA' : 'ANGGOTA';
>>>>>>> feature/rbac-revision`,
    dirtyViolations: [
      { line: 'Baris 1 & 5', label: 'Marker Sengketa Git (<<<<<<< HEAD & >>>>>>>)' },
      { line: 'Baris 2 vs 4', label: 'Pertentangan Tipe Data: Single role vs Multi-role array' },
      { line: 'Global', label: 'Deadlock Penggabungan Kode Antar-Cabang' },
    ],
    verdictTitle: 'RISALAH KONSENSUS MUSYAWARAH MUFAKAT PARIPURNA',
    verdictAnalysis:
      'Berdasarkan penelaahan konstitusi terhadap aspirasi kedua faksi, Majelis Hakim memutuskan melakukan rekonsiliasi yang menghormati fleksibilitas peran ganda tanpa menafikan pengguna dengan peran tunggal.',
    reformedCode: `// ✅ PUTUSAN KETOK PALU: Harmonisasi Struktur Peran & RBAC Berkeadilan
const roles = Array.isArray(auth?.user?.roles) 
    ? auth.user.roles 
    : [auth?.user?.role].filter(Boolean);

const userRole = roles.includes('superadmin')
    ? 'KETUA_LEMBAGA'
    : roles.includes('admin')
        ? 'KABINET_INTI'
        : 'STAFF';`,
    reformedPerks: [
      'Pembersihan tuntas seluruh residu marker sengketa git',
      'Toleransi format: Mendukung backward-compatibility dan skema baru',
      'Keputusan adil tanpa menumbalkan integritas keamanan akses',
    ],
  },
];
