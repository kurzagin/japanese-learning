import type { Locale } from "../i18n";

export interface TosContent {
  windowSubtitle: string;
  notepadTitle: string;
  notepadTag: string;
  bannerTitle: string;
  bannerEffective: string;
  bannerLead: {
    welcome: string;
    brand: string;
    availableAt: string;
    termsAgreement: string;
  };
  section1Title: string;
  section1Desc: string;
  section2Title: string;
  section2Desc: {
    part1: string;
    freeHighlight: string;
  };
  section3Title: string;
  section3Items: {
    guestTitle: string;
    guestDesc: string;
    registeredTitle: string;
    registeredDesc: string;
    migrationTitle: string;
    migrationDesc: string;
  };
  section4Title: string;
  section4Lead: string;
  section4List: string[];
  section5Title: string;
  section5Badge: string;
  section5Desc1: {
    part1: string;
    licenseHighlight: string;
    part2: string;
    repoLinkText: string;
    part3: string;
  };
  section5Desc2: string;
  section6Title: string;
  section6Desc: string;
  section7Title: string;
  section7Disclaimer: string;
  section8Title: string;
  section8Desc: string;
  footerPrivacyLink: string;
  footerHomeBtn: string;
}

export const tosTranslations: Record<Locale, TosContent> = {
  en: {
    windowSubtitle: "Terms of Service",
    notepadTitle: "TERMS_OF_SERVICE.TXT — NOTEPAD",
    notepadTag: "USER AGREEMENT // LEGAL",
    bannerTitle: "SaKana Terms of Service & User Agreement",
    bannerEffective: "EFFECTIVE: OCTOBER 2026",
    bannerLead: {
      welcome: "Welcome to ",
      brand: "SaKana (魚)",
      availableAt: ", available at sakanajp.site. ",
      termsAgreement:
        "By accessing or using our website, services, and APIs, you agree to comply with and be bound by the following Terms of Service.",
    },
    section1Title: "◆ 1. ACCEPTANCE & ELIGIBILITY",
    section1Desc:
      "These Terms govern your access to SaKana's educational platform, flashcard speed drills, spaced repetition system (SRS), vocabulary directory, and developer APIs. If you do not agree to these terms, please discontinue using the service.",
    section2Title: "◆ 2. OPEN EDUCATIONAL MISSION",
    section2Desc: {
      part1:
        "SaKana is designed to help anime fans, manga enthusiasts, and beginner learners master Japanese Hiragana, Katakana, and JLPT N5 vocabulary through instant recognition. Core flashcards, audio pronunciation, stroke guides, lookalike charts, and printable PDF worksheets are provided ",
      freeHighlight: "100% free of charge.",
    },
    section3Title: "◆ 3. USER ACCOUNTS & GUEST DATA POLICIES",
    section3Items: {
      guestTitle: "A. Guest Mode (Unauthenticated):",
      guestDesc:
        " You may use SaKana without creating an account. In this mode, study progress and SRS flashcards are saved solely within your browser's localStorage. SaKana has no access to your local storage and cannot recover progress lost due to browser cache clearance, private browsing mode, or device switching.",
      registeredTitle: "B. Registered Accounts:",
      registeredDesc:
        " Creating an account enables PostgreSQL cloud synchronization across multiple devices. You agree to provide a valid email address and to maintain the confidentiality of your login credentials. You are responsible for all activities that occur under your account.",
      migrationTitle: "C. Progress Migration:",
      migrationDesc:
        " When a guest registers or logs in, local localStorage study records are automatically merged to their cloud account via our migration API.",
    },
    section4Title: "◆ 4. ACCEPTABLE USE & CONDUCT",
    section4Lead:
      "Users agree to use SaKana solely for lawful educational and personal study purposes. You agree not to:",
    section4List: [
      "Attempt to disrupt, overwhelm (DDoS), or compromise the security of our servers or databases.",
      "Scrape or mass-harvest platform assets at rates that degrade service performance for other learners.",
      "Attempt to bypass authentication, session validation, or rate limits on public API endpoints.",
      "Use automated bots to manipulate global visitor or community counters.",
    ],
    section5Title: "◆ 5. OPEN SOURCE LICENSE & INTELLECTUAL PROPERTY",
    section5Badge: "Apache License 2.0 — GitHub Repository",
    section5Desc1: {
      part1: "The software source code for SaKana is open source under the permissive ",
      licenseHighlight: "Apache License 2.0",
      part2: " and hosted publicly on GitHub at ",
      repoLinkText: "github.com/kurzagin/japanese-learning",
      part3: ". You are welcome to inspect, contribute, or build upon the educational code.",
    },
    section5Desc2:
      "The Japanese writing systems (Hiragana, Katakana, Kanji) and vocabulary definitions represent shared cultural and linguistic heritage. Anime references and pop-culture terms are referenced for transformative educational analysis under fair use principles.",
    section6Title: "◆ 6. THIRD-PARTY SERVICES & EXTERNAL WEBRINGS",
    section6Desc:
      "SaKana incorporates third-party infrastructure including Supabase (PostgreSQL & Auth), Cloudflare (R2 Object Storage & CDN), and Google AdSense. Our website may also display badges from retro webrings and partner community directories. We do not endorse and are not liable for the content, privacy policies, or practices of external third-party websites.",
    section7Title: "◆ 7. DISCLAIMER OF WARRANTIES & LIABILITY",
    section7Disclaimer:
      'SAKANA IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR ACCURATE AT ALL TIMES. IN NO EVENT SHALL THE SAKANA PROJECT MAINTAINERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THE PLATFORM.',
    section8Title: "◆ 8. MODIFICATIONS TO TERMS",
    section8Desc:
      'We reserve the right to modify these Terms of Service at any time. Significant updates will be reflected with a revised "Effective Date" at the top of this document. Continued use of SaKana after modifications constitutes acceptance of the revised Terms.',
    footerPrivacyLink: "→ View Privacy Policy & Data Transparency",
    footerHomeBtn: "Return to Homepage",
  },
  id: {
    windowSubtitle: "Syarat & Ketentuan",
    notepadTitle: "TERMS_OF_SERVICE.TXT — NOTEPAD",
    notepadTag: "PERJANJIAN PENGGUNA // HUKUM",
    bannerTitle: "Syarat & Ketentuan Layanan SaKana",
    bannerEffective: "BERLAKU: OKTOBER 2026",
    bannerLead: {
      welcome: "Selamat datang di ",
      brand: "SaKana (魚)",
      availableAt: ", yang dapat diakses di sakanajp.site. ",
      termsAgreement:
        "Dengan mengakses atau menggunakan situs web, layanan, dan API kami, Anda setuju untuk mematuhi dan terikat oleh Syarat & Ketentuan berikut.",
    },
    section1Title: "◆ 1. PENERIMAAN & KELAYAKAN",
    section1Desc:
      "Ketentuan ini mengatur akses Anda ke platform pembelajaran SaKana, latihan kecepatan flashcard, sistem pengulangan berjarak (SRS), direktori kosakata, dan API pengembang. Jika Anda tidak menyetujui ketentuan ini, mohon untuk tidak melanjutkan penggunaan layanan.",
    section2Title: "◆ 2. MISI PENDIDIKAN TERBUKA",
    section2Desc: {
      part1:
        "SaKana dirancang untuk membantu penggemar anime, pembaca manga, dan pembelajar pemula menguasai Hiragana, Katakana, dan kosakata JLPT N5 bahasa Jepang melalui pengenalan cepat instan. Seluruh kartu latihan inti, pengucapan audio, panduan goresan, bagan karakter mirip, dan lembar kerja PDF disediakan ",
      freeHighlight: "100% gratis tanpa biaya.",
    },
    section3Title: "◆ 3. KEBIJAKAN AKUN PENGGUNA & DATA MODE TAMU",
    section3Items: {
      guestTitle: "A. Mode Tamu (Tanpa Akun):",
      guestDesc:
        " Anda dapat menggunakan SaKana tanpa membuat akun. Dalam mode ini, riwayat belajar dan kartu SRS disimpan hanya di localStorage peramban Anda. SaKana tidak memiliki akses ke penyimpanan lokal Anda dan tidak dapat memulihkan progres yang hilang akibat pembersihan cache peramban, penjelajahan mode privat, atau pergantian perangkat.",
      registeredTitle: "B. Akun Terdaftar:",
      registeredDesc:
        " Membuat akun memungkinkan sinkronisasi cloud PostgreSQL antar-perangkat. Anda setuju untuk memberikan alamat email yang sah dan menjaga kerahasiaan kredensial login Anda. Anda bertanggung jawab penuh atas seluruh aktivitas yang terjadi di bawah akun Anda.",
      migrationTitle: "C. Migrasi Progres Otomatis:",
      migrationDesc:
        " Ketika pengguna tamu mendaftar atau masuk, data catatan belajar lokal di localStorage secara otomatis digabungkan ke akun cloud mereka melalui API migrasi kami.",
    },
    section4Title: "◆ 4. KEBIJAKAN PENGGUNAAN WAJAR & ETIKA",
    section4Lead:
      "Pengguna setuju untuk menggunakan SaKana semata-mata untuk tujuan pendidikan dan studi pribadi yang sah. Anda setuju untuk tidak:",
    section4List: [
      "Mencoba mengganggu, membebani secara berlebihan (DDoS), atau membahayakan keamanan server maupun basis data kami.",
      "Melakukan scraping atau pengambilan aset platform secara massal pada tingkat yang menurunkan performa layanan bagi pembelajar lain.",
      "Mencoba melewati otentikasi, validasi sesi, atau batas laju (rate limit) pada endpoint API publik kami.",
      "Menggunakan bot otomatis untuk memanipulasi penghitung pengunjung global atau statistik komunitas.",
    ],
    section5Title: "◆ 5. LISENSI SUMBER TERBUKA & HAK KEKAYAAN INTELEKTUAL",
    section5Badge: "Apache License 2.0 — Repositori GitHub",
    section5Desc1: {
      part1: "Kode sumber perangkat lunak untuk SaKana bersifat open source di bawah lisensi permisif ",
      licenseHighlight: "Apache License 2.0",
      part2: " dan di-hosting secara publik di GitHub pada ",
      repoLinkText: "github.com/kurzagin/japanese-learning",
      part3: ". Anda dipersilakan untuk meninjau, berkontribusi, atau mengembangkan lebih lanjut kode edukasi ini.",
    },
    section5Desc2:
      "Sistem aksara bahasa Jepang (Hiragana, Katakana, Kanji) dan definisi kosakata adalah warisan budaya dan linguistik bersama. Referensi anime dan istilah budaya populer dirujuk semata-mata untuk analisis pendidikan transformatif berdasarkan prinsip penggunaan wajar (fair use).",
    section6Title: "◆ 6. LAYANAN PIHAK KETIGA & WEBRING EKSTERNAL",
    section6Desc:
      "SaKana mengintegrasikan infrastruktur pihak ketiga termasuk Supabase (PostgreSQL & Auth), Cloudflare (R2 Object Storage & CDN), dan Google AdSense. Situs web kami juga dapat menampilkan lencana dari retro webring dan direktori komunitas mitra. Kami tidak mendukung dan tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik situs web pihak ketiga eksternal tersebut.",
    section7Title: "◆ 7. PENAFIAN JAMINAN & BATASAN TANGGUNG JAWAB",
    section7Disclaimer:
      'SAKANA DISEDIAKAN ATAS DASAR "SEBAGAIMANA ADANYA" (AS IS) DAN "SEBAGAIMANA TERSEDIA" TANPA JAMINAN APA PUN, BAIK TERSURAT MAUPUN TERSIRAT. KAMI TIDAK MENJAMIN BAHWA LAYANAN AKAN SELALU TANPA GANGGUAN, BEBAS DARI KESALAHAN, ATAU AKURAT SETIAP SAAT. DALAM KONDISI APA PUN PENGELOLA PROYEK SAKANA TIDAK BERTANGGUNG JAWAB ATAS KERUGIAN TIDAK LANGSUNG, INSIDENTAL, ATAU KONSEKUENSIAL YANG TIMBUL DARI PENGGUNAAN ATAU KETIDAKMAMPUAN MENGGUNAKAN PLATFORM INI.',
    section8Title: "◆ 8. PERUBAHAN SYARAT & KETENTUAN",
    section8Desc:
      'Kami berhak mengubah Syarat & Ketentuan Layanan ini sewaktu-waktu. Pembaruan signifikan akan ditandai dengan "Tanggal Berlaku" yang diperbarui di bagian atas dokumen ini. Penggunaan berkelanjutan atas SaKana setelah modifikasi merupakan bentuk persetujuan Anda terhadap Ketentuan yang diperbarui.',
    footerPrivacyLink: "→ Lihat Kebijakan Privasi & Transparansi Data",
    footerHomeBtn: "Kembali ke Beranda",
  },
  ja: {
    windowSubtitle: "利用規約",
    notepadTitle: "TERMS_OF_SERVICE.TXT — メモ帳",
    notepadTag: "ユーザー利用許諾契約 // 規約",
    bannerTitle: "SaKana 利用規約とユーザー合意書",
    bannerEffective: "発効日: 2026年10月",
    bannerLead: {
      welcome: "ようこそ ",
      brand: "SaKana (魚)",
      availableAt: "（sakanajp.site）へ。 ",
      termsAgreement:
        "当ウェブサイト、各種学習サービス、およびAPIにアクセスまたはご利用いただくことにより、本利用規約に同意し拘束されるものとみなされます。",
    },
    section1Title: "◆ 1. 利用規約への同意と利用資格",
    section1Desc:
      "本規約は、SaKanaが提供する教育プラットフォーム、フラッシュカード速読ドリル、間隔反復学習システム（SRS）、単語辞書、および開発者向け公開APIへのすべてのアクセスに適用されます。本規約に同意いただけない場合は、直ちにサービスの利用を停止してください。",
    section2Title: "◆ 2. オープンな教育的使命",
    section2Desc: {
      part1:
        "SaKanaは、アニメやマンガのファン、および初心者学習者が日本語の平仮名・片仮名、JLPT N5必須単語を瞬間認識によって直感的にマスターできるよう支援することを目的として設計されています。基本の反復カード、ネイティブ発音音声、書き順ガイド、類似文字比較、印刷用PDF練習帳はすべて",
      freeHighlight: "完全無料（100% Free）で提供されます。",
    },
    section3Title: "◆ 3. ユーザーアカウントおよびゲストデータ方針",
    section3Items: {
      guestTitle: "A. ゲストモード（未認証利用）:",
      guestDesc:
        " SaKanaはアカウントを作成することなくご利用いただけます。この場合、学習進捗やSRS単語カードデータはお使いのブラウザのlocalStorage内にのみ保存されます。SaKanaがお客様のローカルデータにアクセスすることはできず、ブラウザキャッシュの削除、プライベートブラウズ、または端末変更によって失われた進捗を復元することはできません。",
      registeredTitle: "B. 登録アカウント:",
      registeredDesc:
        " アカウントを作成することで、複数デバイス間でのPostgreSQLクラウド同期が可能になります。ユーザーは有効なメールアドレスを提供し、ログイン情報の機密性を維持することに同意するものとします。アカウント下で発生するすべての行動についてはユーザー自身が責任を負います。",
      migrationTitle: "C. 学習進捗の自動移行:",
      migrationDesc:
        " ゲストとして利用していたユーザーが新規登録またはログインした場合、localStorageに保存されていたローカル学習記録はデータ移行APIを通じて自動的にクラウドアカウントへ統合されます。",
    },
    section4Title: "◆ 4. 適正な利用規範と禁止行為",
    section4Lead:
      "ユーザーは適法な学習および個人学習目的に限ってSaKanaを利用することに同意します。以下の行為は固く禁止されています:",
    section4List: [
      "サーバーやデータベースの妨害、過剰な負荷（DDoS攻撃）、またはセキュリティ侵害を試みる行為。",
      "他の学習者の利用体験を損なうような頻度でのプラットフォームアセットの不正スクレイピングや一括取得。",
      "公開APIエンドポイントにおける認証、セッション検証、またはレート制限を不正に迂回しようとする行為。",
      "自動化ボットを用いて訪問者カウンターやコミュニティ統計を不正に操作する行為。",
    ],
    section5Title: "◆ 5. オープンソースライセンスと知的財産権",
    section5Badge: "Apache License 2.0 — GitHubリポジトリ",
    section5Desc1: {
      part1: "SaKanaのソフトウェアソースコードは、寛容なオープンソースライセンスである ",
      licenseHighlight: "Apache License 2.0",
      part2: " のもとで公開されており、GitHub上の ",
      repoLinkText: "github.com/kurzagin/japanese-learning",
      part3: " で誰でも閲覧・貢献・派生開発が可能です。",
    },
    section5Desc2:
      "日本語の文字体系（平仮名・片仮名・漢字）および単語定義は人類共通の言語的・文化的遺産です。作品名やポップカルチャーの参照は、フェアユースの原則に基づく教育的分析および学習動機づけのために引用されています。",
    section6Title: "◆ 6. サードパーティ外部サービスとウェブリング",
    section6Desc:
      "SaKanaは、Supabase（PostgreSQLおよび認証）、Cloudflare（R2ストレージおよびCDN）、Google AdSenseなどの外部インフラを採用しています。また、レトロウェブリングや提携コミュニティへのリンク・バナーを表示する場合があります。SaKanaは外部サードパーティウェブサイトの内容、プライバシーポリシー、または慣行について一切の保証および責任を負いません。",
    section7Title: "◆ 7. 保証の否認および責任の制限",
    section7Disclaimer:
      "SAKANAは「現状有姿（AS IS）」かつ「提供可能な範囲」において提供され、明示・黙示を問わずいかなる保証も伴いません。サービスが常に中断なく稼働すること、誤りがないこと、または常に正確であることを保証するものではありません。法律が認める最大限の範囲において、プロジェクト運営者はプラットフォームの利用または利用不能から生じるいかなる損害についても責任を負わないものとします。",
    section8Title: "◆ 8. 規約の変更・改定",
    section8Desc:
      "当社は本利用規約をいつでも変更・改定できる権利を有します。重大な変更が行われた場合は、本文書冒頭の「発効日」を更新します。改定後もSaKanaの利用を継続した場合、変更後の規約に同意したものとみなされます。",
    footerPrivacyLink: "→ プライバシーポリシーとデータ透明性を確認する",
    footerHomeBtn: "ホームページへ戻る",
  },
};
