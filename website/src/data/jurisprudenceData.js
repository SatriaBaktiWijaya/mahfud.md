export const jurisprudenceArticles = [
  {
    stack: 'Java & OOP',
    tag: 'Spring Boot / Java 21',
    description: 'Norma ketatanegaraan untuk arsitektur berorientasi objek yang kuat, kokoh, dan teruji.',
    articles: [
      {
        number: 'Pasal 1',
        title: 'Asas Anti-God Object',
        rule: 'Setiap class dilarang memegang kewenangan absolut (Single Responsibility). Pisahkan Controller, Service, Repository, dan DTO secara tegas. Maksimal 300 baris per entitas.',
      },
      {
        number: 'Pasal 2',
        title: 'Tindak Pidana NullPointerException',
        rule: 'Melempar NullPointerException di lingkungan produksi adalah kelalaian birokrasi tingkat berat. Wajib membentengi dengan Optional<T>, Objects.requireNonNull(), atau anotasi @NonNull.',
      },
      {
        number: 'Pasal 3',
        title: 'Sabotase Performa Concurrency',
        rule: 'Penggunaan koleksi non-thread-safe pada lingkungan multi-thread adalah sabotase stabilitas server. Wajib gunakan ConcurrentHashMap dan mekanisme sinkronisasi berizin.',
      },
    ],
  },
  {
    stack: 'Laravel & PHP',
    tag: 'Laravel 11 / Eloquent',
    description: 'Undang-undang tata kelola framework elegan agar terhindar dari persekongkolan kueri serampangan.',
    articles: [
      {
        number: 'Pasal 4',
        title: 'Celah Penyelundupan Mass-Assignment',
        rule: 'Dilarang keras memakai $guarded = [] pada Model Eloquent tanpa pertahanan lapis ganda. Wajib definisikan $fillable atau Form Request Validation spesifik.',
      },
      {
        number: 'Pasal 5',
        title: 'Skandal Kueri N+1',
        rule: 'Melakukan query database di dalam perulangan tanpa eager loading (with()) adalah pemborosan kas komputasi server. Wajib audit dengan Model::preventLazyLoading().',
      },
      {
        number: 'Pasal 6',
        title: 'Fat Controller Maladministration',
        rule: 'Controller hanyalah juru bicara protokol HTTP. Dilarang menaruh logika bisnis 500 baris di controller method. Alirkan ke Action Class, Service Layer, atau Job.',
      },
    ],
  },
  {
    stack: 'React & Frontend',
    tag: 'React 18 / Next.js / Vite',
    description: 'Dekrit perlindungan pengalaman pengguna dan integritas memori di panggung antarmuka publik.',
    articles: [
      {
        number: 'Pasal 7',
        title: 'Dekrit Larangan Re-render Liar',
        rule: 'Dilarang mendeklarasikan objek atau fungsi kompleks di dalam render body tanpa memo jika memicu anak komponen bergetar (re-render loop). Gunakan useMemo/useCallback selektif.',
      },
      {
        number: 'Pasal 8',
        title: 'Penyalahgunaan Wewenang useEffect',
        rule: 'useEffect bukan tempat sampah serbaguna. Jangan gunakan efek samping untuk menghitung derived state. Setiap event listener wajib menyertakan cleanup function.',
      },
      {
        number: 'Pasal 9',
        title: 'Asas Imutabilitas Konstitusi State',
        rule: 'Dilarang memutasi state secara langsung (state.push()). Segala perubahan wajib melalui jalur resmi updater function demi konsistensi riwayat negara komponen.',
      },
    ],
  },
  {
    stack: 'Tailwind CSS',
    tag: 'Tailwind CSS v3/v4',
    description: 'Etika keindahan dan ketertiban tata ruang desain visual antarmuka.',
    articles: [
      {
        number: 'Pasal 10',
        title: 'Pelanggaran Class Mengular',
        rule: 'Menuliskan rentetan class Tailwind melebihi 25 utilitas berulang kali pada elemen bertingkat adalah polusi visual birokrasi. Ekstrak menjadi komponen atomik reusable.',
      },
      {
        number: 'Pasal 11',
        title: 'Harmonisasi Tata Warna',
        rule: 'Dilarang menggunakan warna arbitrer acak (bg-[#f39121]) jika sistem desain sudah memiliki palet baku di tailwind.config. Jaga konsistensi estetika negara.',
      },
    ],
  },
];
