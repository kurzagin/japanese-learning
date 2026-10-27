import type { Locale } from "../i18n";

export interface PrivacyContent {
  windowSubtitle: string;
  notepadTitle: string;
  notepadTag: string;
  bannerTitle: string;
  bannerEffective: string;
  bannerLead: {
    beforeBrand: string;
    brandName: string;
    afterBrand: string;
  };
  section1Title: string;
  guestTitle: string;
  guestZeroDataTitle: string;
  guestZeroDataDesc: string;
  guestStorageTitle: string;
  guestStorageKeys: {
    progress: string;
    srs: string;
    locale: string;
    audio: string;
  };
  guestServerStorageTitle: string;
  guestServerStorageDesc: string;
  guestNoticeTitle: string;
  guestNoticeDesc: string;
  guestBadge: string;
  authTitle: string;
  authCredsTitle: string;
  authCredsItems: {
    email: string;
    password: string;
    optional: string;
  };
  authCloudTitle: string;
  authCloudKeys: {
    users: string;
    progress: string;
    reviews: string;
  };
  authCookiesTitle: string;
  authCookiesDesc: string;
  authSyncTitle: string;
  authSyncDesc: string;
  authBadge: string;
  section2Title: string;
  section2Desc: string;
  section3Title: string;
  services: {
    supabaseTitle: string;
    supabaseBadge: string;
    supabaseDesc: string;
    cloudflareTitle: string;
    cloudflareBadge: string;
    cloudflareDesc: string;
    adsenseTitle: string;
    adsenseBadge: string;
    adsenseDesc: string;
    webSpeechTitle: string;
    webSpeechBadge: string;
    webSpeechDesc: string;
  };
  section4Title: string;
  tableHeaders: {
    name: string;
    type: string;
    purpose: string;
    who: string;
  };
  tableRows: {
    cookieSession: {
      type: string;
      purpose: string;
      who: string;
    };
    localProgress: {
      type: string;
      purpose: string;
      who: string;
    };
    localSrs: {
      type: string;
      purpose: string;
      who: string;
    };
    localLocale: {
      type: string;
      purpose: string;
      who: string;
    };
  };
  section5Title: string;
  section5Desc: string;
  footerTosLink: string;
  footerHomeBtn: string;
}

export const privacyTranslations: Record<Locale, PrivacyContent> = {
  en: {
    windowSubtitle: "Privacy Policy",
    notepadTitle: "PRIVACY_POLICY.TXT — NOTEPAD",
    notepadTag: "CONFIDENTIAL // TRANSPARENT",
    bannerTitle: "SaKana Privacy Policy & Data Transparency",
    bannerEffective: "EFFECTIVE: OCTOBER 2026",
    bannerLead: {
      beforeBrand: "At ",
      brandName: "SaKana (魚)",
      afterBrand:
        ", we believe educational tools should respect your freedom and privacy. This document outlines exactly what information is collected, how it is stored, and how our real guest and authenticated systems operate.",
    },
    section1Title: "1. REAL DATA IMPLEMENTATION: GUEST VS. LOGGED-IN ACCOUNTS",
    guestTitle: "GUEST MODE (NO REGISTRATION)",
    guestZeroDataTitle: "Zero Personal Data Collected:",
    guestZeroDataDesc:
      " You do not need to submit your email, name, phone number, or password. You are assigned a local placeholder (guest@sakanajp.site).",
    guestStorageTitle: "Client-Side Storage (Browser localStorage):",
    guestStorageKeys: {
      progress:
        ": Stage completions, star ratings (1–3), accuracy percentage, and best speed duration in milliseconds.",
      srs:
        ": SM-2 spaced repetition flashcards (review intervals, ease factor, repetition count, lapses, next review timestamp).",
      locale: ": Interface language preference (English, Indonesian, or Japanese).",
      audio: ": Toggle for sound-based listening quizzes.",
    },
    guestServerStorageTitle: "Server Storage:",
    guestServerStorageDesc:
      " Zero study sessions or flashcard records are sent to our cloud database. Only an anonymous visitor counter (/api/visitors) is incremented on page load without storing IP addresses or browser fingerprints.",
    guestNoticeTitle: "⚠️ Notice: ",
    guestNoticeDesc:
      "Because guest data is stored exclusively in your browser's localStorage, clearing your browser cache or switching devices will reset your study history.",
    guestBadge: "✓ 100% Private to your device",
    authTitle: "AUTHENTICATED ACCOUNT",
    authCredsTitle: "Account Credentials:",
    authCredsItems: {
      email: "Email address (used for login and verification).",
      password:
        "Password (cryptographically salted and hashed by Supabase Auth using bcrypt/argon2; SaKana never sees or stores plaintext passwords).",
      optional: "Optional Display Name and Preferences.",
    },
    authCloudTitle: "Cloud Database Storage (PostgreSQL hosted via Supabase):",
    authCloudKeys: {
      users: ": Auth UID, email, display name, avatar, and system role.",
      progress:
        ": Stage ID, completion boolean, best duration (ms), star ratings, accuracy percentage, and attempt counts.",
      reviews:
        ": SM-2 spaced repetition state, repetition intervals (days), ease factor, lapses, and next scheduled review dates.",
    },
    authCookiesTitle: "Session Cookies:",
    authCookiesDesc:
      " Secure JSON Web Tokens (JWT) stored in HTTP cookies managed by @supabase/ssr to keep you signed in across tabs and devices.",
    authSyncTitle: "✓ Cross-Device Sync: ",
    authSyncDesc:
      "Your progress and SRS flashcards are safely backed up in the cloud, allowing seamless practice between phone and desktop.",
    authBadge: "✓ Encrypted Cloud Synchronization",
    section2Title: "2. AUTOMATIC GUEST-TO-ACCOUNT PROGRESS MIGRATION",
    section2Desc:
      "When you study as a guest and subsequently sign up or log in, SaKana runs an automatic client-side migration utility (syncGuestDataToAccount via /api/sync/migrate-guest). This process extracts your local stages and SRS memory cards from localStorage and merges them into your newly authenticated PostgreSQL account. Higher stars, higher accuracy, and lower speed run times are preserved, ensuring zero progress is lost when upgrading from guest to user.",
    section3Title: "3. THIRD-PARTY SERVICES USED BY SAKANA",
    services: {
      supabaseTitle: "Supabase (PostgreSQL & Auth)",
      supabaseBadge: "SOC 2 / GDPR",
      supabaseDesc:
        "Provides managed PostgreSQL database hosting and authentication infrastructure. Manages password hashing, email confirmations, session JWTs, and row-level security.",
      cloudflareTitle: "Cloudflare R2 & Edge CDN",
      cloudflareBadge: "EDGE NETWORK",
      cloudflareDesc:
        "Used to host and distribute audio recordings and media assets via cdn.sakanajp.site. Cloudflare caches content globally and monitors DDoS network traffic.",
      adsenseTitle: "Google AdSense (ca-pub-6604416528217447)",
      adsenseBadge: "ADVERTISING",
      adsenseDesc:
        "Serves unobtrusive ads in retro frames to fund server, database, and domain expenses, keeping SaKana 100% free. Google may use advertising cookies in accordance with Google's privacy policies.",
      webSpeechTitle: "Web Speech API (SpeechSynthesis)",
      webSpeechBadge: "100% CLIENT-SIDE",
      webSpeechDesc:
        "Interactive pronunciation audio for Japanese characters is synthesized directly by your web browser's native engine (ja-JP). No audio requests or microphone recordings are sent across the network.",
    },
    section4Title: "4. COOKIES & LOCAL BROWSER STORAGE SUMMARY",
    tableHeaders: {
      name: "Item Name",
      type: "Type",
      purpose: "Purpose",
      who: "Who Uses It",
    },
    tableRows: {
      cookieSession: {
        type: "HTTP Cookie",
        purpose: "Maintains authenticated user session",
        who: "Logged-in Users",
      },
      localProgress: {
        type: "localStorage",
        purpose: "Stage scores, speed records, star ratings",
        who: "Guests & Logged-in (Cache)",
      },
      localSrs: {
        type: "localStorage",
        purpose: "SM-2 Spaced repetition interval states",
        who: "Guests & Logged-in (Cache)",
      },
      localLocale: {
        type: "localStorage",
        purpose: "Language preference (en, id, ja)",
        who: "All Users",
      },
    },
    section5Title: "5. YOUR RIGHTS & ACCOUNT DELETION",
    section5Desc:
      "You retain complete control over your educational data. You may request permanent deletion of your account, email address, stage completion metrics, and SRS review cards from our PostgreSQL database at any time by contacting our team or raising an issue on our GitHub repository. Guests may delete their data at any time simply by clearing their browser's site data for sakanajp.site.",
    footerTosLink: "→ View Terms of Service (TOS)",
    footerHomeBtn: "Return to Homepage",
  },
  id: {
    windowSubtitle: "Kebijakan Privasi",
    notepadTitle: "PRIVACY_POLICY.TXT — NOTEPAD",
    notepadTag: "RAHASIA // TRANSPARAN",
    bannerTitle: "Kebijakan Privasi & Transparansi Data SaKana",
    bannerEffective: "BERLAKU: OKTOBER 2026",
    bannerLead: {
      beforeBrand: "Di ",
      brandName: "SaKana (魚)",
      afterBrand:
        ", kami meyakini sarana edukasi harus menghormati kebebasan serta privasi Anda. Dokumen ini merinci secara transparan data apa yang dikumpulkan, bagaimana data disimpan, serta cara kerja sistem tamu dan akun terdaftar kami.",
    },
    section1Title: "1. IMPLEMENTASI DATA NYATA: MODE TAMU VS. AKUN TERDAFTAR",
    guestTitle: "MODE TAMU (TANPA REGISTRASI)",
    guestZeroDataTitle: "Nol Data Pribadi Terkumpul:",
    guestZeroDataDesc:
      " Anda tidak perlu mengisi email, nama, nomor telepon, maupun kata sandi. Anda dialokasikan placeholder lokal (guest@sakanajp.site).",
    guestStorageTitle: "Penyimpanan Sisi Klien (localStorage Peramban):",
    guestStorageKeys: {
      progress:
        ": Penyelesaian bab, perolehan bintang (1–3), persentase akurasi, dan rekor kecepatan terbaik dalam milidetik.",
      srs:
        ": Kartu pengulangan berjarak algoritma SM-2 (interval review, faktor kemudahan, jumlah repetisi, kekeliruan, jadwal waktu review berikutnya).",
      locale: ": Preferensi bahasa antarmuka (Inggris, Indonesia, atau Jepang).",
      audio: ": Pengaturan kuis listening berbasis suara.",
    },
    guestServerStorageTitle: "Penyimpanan Sisi Server:",
    guestServerStorageDesc:
      " Nol sesi belajar atau catatan kartu kirim ke basis data cloud kami. Hanya pencatat pengunjung anonim (/api/visitors) yang dinaikkan saat halaman dibuka tanpa menyimpan alamat IP maupun fingerprint peramban.",
    guestNoticeTitle: "⚠️ Perhatian: ",
    guestNoticeDesc:
      "Karena data tamu disimpan secara eksklusif di localStorage peramban Anda, menghapus cache browser atau berpindah perangkat akan mereset riwayat belajar Anda.",
    guestBadge: "✓ 100% Privat di perangkat Anda",
    authTitle: "AKUN TERDAFTAR",
    authCredsTitle: "Kredensial Akun:",
    authCredsItems: {
      email: "Alamat email (digunakan untuk login dan verifikasi).",
      password:
        "Kata sandi (dienkripsi salt & hash oleh Supabase Auth menggunakan bcrypt/argon2; SaKana tidak pernah melihat atau menyimpan kata sandi teks biasa).",
      optional: "Nama Tampilan dan Pengaturan Preferensi opsional.",
    },
    authCloudTitle: "Penyimpanan Basis Data Cloud (PostgreSQL via Supabase):",
    authCloudKeys: {
      users: ": Auth UID, email, nama tampilan, avatar, dan role sistem.",
      progress:
        ": Stage ID, status selesai, durasi terbaik (ms), rating bintang, persentase akurasi, dan jumlah percobaan.",
      reviews:
        ": Status SRS algoritma SM-2, interval hari pengulangan, faktor kemudahan, lapse, dan jadwal review berikutnya.",
    },
    authCookiesTitle: "Cookie Sesi:",
    authCookiesDesc:
      " JSON Web Token (JWT) terenkripsi aman yang disimpan di HTTP cookie kelolaan @supabase/ssr agar Anda tetap masuk di semua tab dan perangkat.",
    authSyncTitle: "✓ Sinkronisasi Lintas Perangkat: ",
    authSyncDesc:
      "Progres bab dan kartu SRS Anda tersimpan aman di cloud, memungkinkan latihan mulus antara HP dan komputer.",
    authBadge: "✓ Sinkronisasi Cloud Terenkripsi",
    section2Title: "2. MIGRASI DATA OTOMATIS: DARI TAMU KE AKUN TERDAFTAR",
    section2Desc:
      "Saat Anda belajar sebagai tamu lalu mendaftar atau login, SaKana secara otomatis menjalankan modul migrasi klien (syncGuestDataToAccount melalui /api/sync/migrate-guest). Proses ini membaca data stage dan memori SRS dari localStorage lalu menggabungkannya ke akun cloud PostgreSQL Anda yang baru. Rekor bintang tertinggi, akurasi terbaik, dan waktu tercepat dipelihara, memastikan tidak ada progres yang hilang saat beralih dari tamu ke akun resmi.",
    section3Title: "3. LAYANAN PIHAK KETIGA YANG DIGUNAKAN SAKANA",
    services: {
      supabaseTitle: "Supabase (PostgreSQL & Auth)",
      supabaseBadge: "SOC 2 / GDPR",
      supabaseDesc:
        "Menyediakan infrastruktur database PostgreSQL terkelola dan sistem otentikasi. Mengelola enkripsi kata sandi, konfirmasi email, sesi JWT, dan keamanan row-level security.",
      cloudflareTitle: "Cloudflare R2 & Edge CDN",
      cloudflareBadge: "JARINGAN EDGE",
      cloudflareDesc:
        "Digunakan untuk menyimpan dan menyalurkan rekaman audio serta aset media melalui cdn.sakanajp.site. Cloudflare meng-cache konten secara global serta memitigasi serangan DDoS.",
      adsenseTitle: "Google AdSense (ca-pub-6604416528217447)",
      adsenseBadge: "PERIKLANAN",
      adsenseDesc:
        "Menampilkan iklan ringkas dalam bingkai retro untuk mendanai operasional server, database, dan domain, menjaga SaKana tetap 100% gratis. Google dapat menggunakan cookie iklan sesuai dengan kebijakan privasi Google.",
      webSpeechTitle: "Web Speech API (SpeechSynthesis)",
      webSpeechBadge: "100% SISI KLIEN",
      webSpeechDesc:
        "Audio pengucapan karakter Jepang disintesis langsung oleh mesin bawaan peramban Anda (ja-JP). Tidak ada aliran suara atau rekaman mikrofon yang dikirim melalui jaringan internet.",
    },
    section4Title: "4. RINGKASAN COOKIE & PENYIMPANAN LOKAL PERAMBAN",
    tableHeaders: {
      name: "Nama Item",
      type: "Tipe",
      purpose: "Tujuan",
      who: "Pengguna",
    },
    tableRows: {
      cookieSession: {
        type: "HTTP Cookie",
        purpose: "Mempertahankan sesi masuk pengguna terdaftar",
        who: "Pengguna Terdaftar",
      },
      localProgress: {
        type: "localStorage",
        purpose: "Skor bab, rekor kecepatan, perolehan bintang",
        who: "Tamu & Terdaftar (Cache)",
      },
      localSrs: {
        type: "localStorage",
        purpose: "Status interval pengulangan berjarak algoritma SM-2",
        who: "Tamu & Terdaftar (Cache)",
      },
      localLocale: {
        type: "localStorage",
        purpose: "Preferensi bahasa (en, id, ja)",
        who: "Semua Pengguna",
      },
    },
    section5Title: "5. HAK PENGGUNA & PENGHAPUSAN AKUN",
    section5Desc:
      "Anda memiliki kendali penuh atas data pembelajaran Anda. Anda dapat meminta penghapusan permanen akun, alamat email, metrik progres belajar, dan kartu review SRS dari database PostgreSQL kami kapan saja dengan menghubungi tim kami atau mengajukan issue di repositori GitHub kami. Pengguna mode tamu dapat menghapus data mereka kapan saja cukup dengan membersihkan cache data situs untuk sakanajp.site di peramban.",
    footerTosLink: "→ Lihat Syarat & Ketentuan Penggunaan (TOS)",
    footerHomeBtn: "Kembali ke Beranda",
  },
  ja: {
    windowSubtitle: "プライバシーポリシー",
    notepadTitle: "PRIVACY_POLICY.TXT — メモ帳",
    notepadTag: "機密 // 完全透明性",
    bannerTitle: "SaKana プライバシーポリシーとデータ透明性",
    bannerEffective: "発効日: 2026年10月",
    bannerLead: {
      beforeBrand: "",
      brandName: "SaKana (魚)",
      afterBrand:
        " では、教育用ツールはユーザーの自由とプライバシーを最大限に尊重すべきであると考えています。本規程では、収集される情報、その保存場所、そしてゲスト利用および登録アカウントにおける実際のシステム動作について正確に説明します。",
    },
    section1Title: "1. 実際のデータ管理構造: ゲスト利用と登録アカウントの比較",
    guestTitle: "ゲストモード（登録不要）",
    guestZeroDataTitle: "個人情報の収集ゼロ:",
    guestZeroDataDesc:
      " メールアドレス、氏名、電話番号、パスワードの登録は一切不要です。ローカルの一時識別子（guest@sakanajp.site）が割り当てられます。",
    guestStorageTitle: "クライアント側ローカル保存（ブラウザ localStorage）:",
    guestStorageKeys: {
      progress:
        ": 各ステージのクリア状況、獲得スター評価（1〜3星）、正答率パーセンテージ、ミリ秒単位の最速クリアタイム記録。",
      srs:
        ": SM-2間隔反復アルゴリズムによる単語カード状態（復習間隔日数、難易度係数、復習回数、ミス回数、次回出題タイムスタンプ）。",
      locale: ": インターフェースの表示言語設定（英語、インドネシア語、日本語）。",
      audio: ": 音声聞き取りリスニングクイズの有効・無効切り替え設定。",
    },
    guestServerStorageTitle: "サーバー側への保存:",
    guestServerStorageDesc:
      " 学習記録や復習カードのデータはクラウドデータベースへ一切送信されません。ページ読み込み時にIPアドレスやブラウザフィンガープリントを保存しない完全匿名の訪問者カウンター（/api/visitors）のみがカウントされます。",
    guestNoticeTitle: "⚠️ 注意事項: ",
    guestNoticeDesc:
      "ゲストデータはお使いのブラウザのlocalStorage内にのみ保存されるため、ブラウザのキャッシュ消去や別端末への移動を行うと学習履歴はリセットされます。",
    guestBadge: "✓ 端末内のみに安全保存",
    authTitle: "登録・ログインアカウント",
    authCredsTitle: "アカウント認証情報:",
    authCredsItems: {
      email: "メールアドレス（ログインおよび確認用）。",
      password:
        "パスワード（Supabase Authによりbcrypt/argon2で暗号学的にソルト付与・ハッシュ化。SaKanaが平文パスワードを見ることも保存することもありません）。",
      optional: "任意の表示名およびユーザー設定。",
    },
    authCloudTitle: "クラウドデータベース保存（Supabase運用のPostgreSQL）:",
    authCloudKeys: {
      users: ": 認証UID、メールアドレス、表示名、アバター画像、システム権限ロール。",
      progress:
        ": ステージID、クリア成否、最速所要時間（ms）、スター数、正答率、挑戦回数。",
      reviews:
        ": SM-2間隔反復状態、復習インターバル日数、難易度係数、ラップス、次回予定日。",
    },
    authCookiesTitle: "セッションCookie:",
    authCookiesDesc:
      " タブ間および端末間でログイン状態を保持するため、@supabase/ssrによって管理される暗号化HTTPセッションCookie（JWT）。",
    authSyncTitle: "✓ 複数デバイス間でのクラウド同期: ",
    authSyncDesc:
      "進捗度およびSRS単語カードがクラウド上に安全にバックアップされ、スマートフォンとパソコンの間で途切れることなく復習を継続できます。",
    authBadge: "✓ 暗号化クラウド自動同期",
    section2Title: "2. ゲストから登録アカウントへの自動進捗データ移行",
    section2Desc:
      "ゲストとして学習を進めた後に新規登録またはログインした場合、SaKanaは自動クライアント側データ移行ユーティリティ（/api/sync/migrate-guest 経由の syncGuestDataToAccount）を実行します。この処理により、localStorage内のローカルステージ進捗およびSRS単語カードが新しく認証されたPostgreSQLアカウントに統合されます。より高い星の数、高い正答率、より短いクリアタイムが優先保持されるため、ゲストからの移行時に一切の学習成果が失われません。",
    section3Title: "3. SaKanaが利用しているサードパーティ外部サービス",
    services: {
      supabaseTitle: "Supabase (PostgreSQL & Auth)",
      supabaseBadge: "SOC 2 / GDPR",
      supabaseDesc:
        "マネージドPostgreSQLデータベースおよび認証基盤を提供。パスワードのハッシュ化、メール確認、セッションJWT、行レベルセキュリティ（RLS）を管理します。",
      cloudflareTitle: "Cloudflare R2 & Edge CDN",
      cloudflareBadge: "エッジネットワーク",
      cloudflareDesc:
        "cdn.sakanajp.site を介した音声ファイルおよびメディアアセットの配信・保存に利用。コンテンツを世界各地でキャッシュし、DDoS攻撃から保護します。",
      adsenseTitle: "Google AdSense (ca-pub-6604416528217447)",
      adsenseBadge: "広告配信",
      adsenseDesc:
        "サーバー、データベース、ドメイン維持費を賄い、SaKanaを100%永久無料で提供し続けるためにレトロフレーム内で控えめな広告を表示します。Googleはプライバシーポリシーに基づき広告Cookieを使用する場合があります。",
      webSpeechTitle: "Web Speech API (SpeechSynthesis)",
      webSpeechBadge: "100% クライアント側動作",
      webSpeechDesc:
        "日本語文字の発音音声は、お使いのWebブラウザ標準搭載の音声合成エンジン（ja-JP）によって端末内で直接生成されます。音声データやマイク入力が外部ネットワークへ送信されることは一切ありません。",
    },
    section4Title: "4. Cookieおよびローカルブラウザ保存一覧",
    tableHeaders: {
      name: "項目名",
      type: "種別",
      purpose: "利用目的",
      who: "対象ユーザー",
    },
    tableRows: {
      cookieSession: {
        type: "HTTP Cookie",
        purpose: "ログイン中ユーザーの認証セッションを保持",
        who: "ログイン済みユーザー",
      },
      localProgress: {
        type: "localStorage",
        purpose: "ステージスコア、クリアタイム記録、星評価",
        who: "ゲストおよびログイン済み（高速キャッシュ）",
      },
      localSrs: {
        type: "localStorage",
        purpose: "SM-2間隔反復学習の復習スケジュール情報",
        who: "ゲストおよびログイン済み（高速キャッシュ）",
      },
      localLocale: {
        type: "localStorage",
        purpose: "表示言語設定（英語、インドネシア語、日本語）",
        who: "全ユーザー",
      },
    },
    section5Title: "5. ユーザーの権利とアカウントデータの削除",
    section5Desc:
      "ユーザーは自身の学習データに対して完全な権利を保持します。お問い合わせいただくか、GitHubリポジトリでIssueを作成することにより、PostgreSQLデータベースに保存されているアカウント、メールアドレス、ステージ進捗指標、SRS復習カード情報の永久削除をいつでも請求できます。ゲスト利用の場合、ブラウザの sakanajp.site に関するサイトデータを消去するだけで、いつでも端末内データを完全に削除できます。",
    footerTosLink: "→ 利用規約とユーザー合意書（TOS）を確認する",
    footerHomeBtn: "ホームページへ戻る",
  },
};
