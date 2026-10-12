export type Locale = "en" | "id" | "ja";

export interface TranslationSchema {
  meta: {
    title: string;
    sub: string;
  };
  nav: {
    brand: string;
    home: string;
    dashboard: string;
    study: string;
    about: string;
    windowTitle: string;
    login: string;
    enter: string;
    top: string;
    logout: string;
    back: string;
  };
  home: {
    welcomeBadge: string;
    tagline: string;
    subTagline: string;
    counterLabel: string;
    ctaEnter: string;
    ctaLogin: string;
    ruleTitle: string;
    ruleTag: string;
    rule1Title: string;
    rule1Desc: string;
    rule2Title: string;
    rule2Desc: string;
    rule3Title: string;
    rule3Desc: string;
  };
  login: {
    windowTitle: string;
    appTitle: string;
    instruction: string;
    emailLabel: string;
    submit: string;
    submitting: string;
    guestTitle: string;
    guestBtn: string;
    returnLink: string;
    inviteNoticeTitle: string;
    inviteNoticeText: string;
    inviteNoticeLinkText: string;
  };
  dashboard: {
    windowTitle: string;
    operator: string;
    streak: string;
    statsTitle: string;
    standard: string;
    cleared: string;
    speed: string;
    mastery: string;
    statusActive: string;
    statusInit: string;
    sec1Title: string;
    sec1Sub: string;
    sec2Title: string;
    sec2Sub: string;
    sec3Title: string;
    sec3Sub: string;
    statusDone: string;
    statusReady: string;
    statusLocked: string;
    studyBtn: string;
    sprintBtn: string;
    quickLaunch: string;
    timeLimit: string;
    sec: string;
    srsDueTitle: string;
    srsDueDesc: string;
    startSrsReview: string;
    allCaughtUp: string;
    srsMastered: string;
  };
  study: {
    windowTitle: string;
    studyBadge: string;
    flipPrompt: string;
    againBtn: string;
    hardBtn: string;
    goodBtn: string;
    easyBtn: string;
    gotItBtn: string;
    progress: string;
    mnemonic: string;
    sampleWord: string;
    romajiLabel: string;
    completeTitle: string;
    completeDesc: string;
    readyChallengeBtn: string;
    repeatStudyBtn: string;
    backDashboard: string;
    srsScheduledNote: string;
  };
  test: {
    windowTitle: string;
    testBadge: string;
    timeRemaining: string;
    questionProgress: string;
    targetSpeed: string;
    choosePrompt: string;
    passTitle: string;
    failTitle: string;
    failWrongTitle: string;
    passDesc: string;
    failDesc: string;
    failWrongDesc: string;
    yourTime: string;
    accuracy: string;
    tryAgainBtn: string;
    nextStageBtn: string;
    backToDashboard: string;
    studyFirstBtn: string;
  };
  about: {
    windowTitle: string;
    badge: string;
    sloganNote: string;
    whatIsTitle: string;
    whatIsLead: string;
    whatIsPoints: {
      saKanaWordplay: string;
      speedFocus: string;
      mediaHeart: string;
    };
    heroTitle: string;
    heroSubtitle: string;
    writingDisclaimerBadge: string;
    writingDisclaimerText: string;
    writingDisclaimerSub: string;
    interactiveTitle: string;
    interactiveDesc: string;
    features: {
      voicevoxTitle: string;
      voicevoxDesc: string;
      animeTitle: string;
      animeDesc: string;
      vtuberXTitle: string;
      vtuberXDesc: string;
      vtuberVoiceTitle: string;
      vtuberVoiceDesc: string;
      vtuberAsmrTitle: string;
      vtuberAsmrDesc: string;
      eduPostTitle: string;
      eduPostDesc: string;
    };
    currentFeaturesTitle: string;
    currentFeaturesDesc: string;
    futureFeaturesTitle: string;
    futureFeaturesDesc: string;
    currentList: {
      srsTitle: string;
      srsDesc: string;
      sprintTitle: string;
      sprintDesc: string;
      bidirectionalTitle: string;
      bidirectionalDesc: string;
      stagesTitle: string;
      stagesDesc: string;
      bilingualTitle: string;
      bilingualDesc: string;
    };
    roadmapTitle: string;
    roadmapDesc: string;
    backBtn: string;
  };
}

export const translations: Record<Locale, TranslationSchema> = {
  en: {
    meta: {
      title: "SaKana",
      sub: "Japanese learning drill for anime & manga fans",
    },
    nav: {
      brand: "SaKana",
      home: "HOME",
      dashboard: "DASHBOARD",
      study: "STUDY",
      about: "ABOUT",
      windowTitle: "SaKana",
      login: "LOGIN",
      enter: "ENTER",
      top: "RETURN TO TOP",
      logout: "LOGOUT",
      back: "BACK",
    },
    home: {
      welcomeBadge: "WELCOME TO SAKANA JAPANESE SPEED DRILL",
      tagline: "Speed Kana Reading Reflexes",
      subTagline: "Stop obsessing over stroke orders. Learn to read Kana and anime words in fractions of a second.",
      counterLabel: "VISITOR COUNT:",
      ctaEnter: "ENTER STUDY REEF",
      ctaLogin: "SIGN IN / SYNC",
      ruleTitle: "METHOD & RULES",
      ruleTag: "GUIDELINES",
      rule1Title: "Break the Calligraphy Trap",
      rule1Desc: "Writing perfect strokes by hand often causes burnout. Here, we prioritize instant visual recognition over handwriting.",
      rule2Title: "Learn First, Test Later",
      rule2Desc: "Use spaced repetition flashcards (SRS method) to get comfortable with the characters before taking any speed challenge.",
      rule3Title: "Kana Words First (No Kanji Yet)",
      rule3Desc: "Once you master Hiragana & Katakana, jump directly into real anime words and loanwords before touching complex Kanji.",
    },
    about: {
      windowTitle: "About SaKana",
      badge: "OUR HUMBLE JOURNEY & DIRECTION",
      sloganNote: "A tiny beginning for everyone wanting to enjoy Japanese media freely.",
      whatIsTitle: "What is SaKana (魚)?",
      whatIsLead: "SaKana is a light, distraction-free Japanese speed recognition drill built specifically for anime, manga, and pop-culture enthusiasts.",
      whatIsPoints: {
        saKanaWordplay: "A Playful Double Meaning: “魚 (sakana)” means fish — gliding effortlessly through waters without resistance. It is also a warm pun on “さ、仮名を始めよう” (Well then, let's begin Kana!).",
        speedFocus: "Reading Reflexes over Stroke Order: Rather than writing kanji strokes on paper for hours, SaKana trains your eyes and ears to recognize Hiragana and Katakana characters in fractions of a second.",
        mediaHeart: "Grounded in Real Japanese Media: We introduce words you actually hear and read in anime titles, voice streams, and games, rather than artificial dry textbook sentences.",
      },
      heroTitle: "Growing Step by Step, Beyond Just Flashcards",
      heroSubtitle: "We start small with simple cards, and step by step, we hope to build a more interactive space with real Japanese media.",
      writingDisclaimerBadge: "HONEST NOTE FOR LEARNERS",
      writingDisclaimerText: "we will not yet provide writing",
      writingDisclaimerSub: "We want to be completely upfront with you: SaKana currently focuses solely on quick visual recognition and listening familiarity. We don't teach stroke order or penmanship yet, because our small goal is simply helping you recognize and enjoy words naturally without getting overwhelmed.",
      interactiveTitle: "What We Are Gradually Building",
      interactiveDesc: "Flashcards are just our humble starting point. As you advance, we are gently weaving in interactive experiences inspired by daily modern Japanese pop culture:",
      features: {
        voicevoxTitle: "Gentle Audio Drills with VOICEVOX (Robo Type T)",
        voicevoxDesc: "Crisp and clear pronunciation practice powered by VOICEVOX Robo Type T voice, helping your ears distinguish tricky vowels and pitch without stress.",
        animeTitle: "Short Glimpses of Anime Scenes",
        animeDesc: "Reading memorable lines, subtitles, and phrases in the natural context of beloved anime moments.",
        vtuberXTitle: "Casual Japanese from VTuber X Posts",
        vtuberXDesc: "Getting accustomed to casual conversational Japanese, cheerful slang, and how native speakers actually tweet every day.",
        vtuberVoiceTitle: "Comfortable Voice Call Simulation",
        vtuberVoiceDesc: "A friendly recorded voice call experience to help ease listening anxiety and practice listening at your own pace.",
        vtuberAsmrTitle: "VTuber ASMR with Synchronized Timestamps",
        vtuberAsmrDesc: "Soft, gentle listening practice paired with synchronized timestamps so you never lose track of what is being spoken.",
        eduPostTitle: "Helpful Real Tips & Trivia from Japanese X",
        eduPostDesc: "Everyday tidbits, language nuances, and thoughtful cultural notes shared generously by native Japanese creators.",
      },
      currentFeaturesTitle: "Current Features (Available Now)",
      currentFeaturesDesc: "Everything you can currently practice and use in SaKana right now:",
      futureFeaturesTitle: "Future Features & In-Progress Vision",
      futureFeaturesDesc: "Interactive media experiences currently in development to take you beyond static flashcards:",
      currentList: {
        srsTitle: "Spaced Repetition (SRS Flashcards)",
        srsDesc: "SM-2 scientific retention scheduling cards with visual mnemonics, audio hints, and real Japanese sample vocabulary.",
        sprintTitle: "Rapid Reflex Speed Challenge",
        sprintDesc: "Under-15-second timed tests designed to rewire neural recognition speed for instantaneous Kana reading.",
        bidirectionalTitle: "Bidirectional Mixed Test (Kana ⇄ Romaji)",
        bidirectionalDesc: "Randomized test questions challenging both recognition (Kana ➔ Romaji) and active recall (Romaji ➔ Kana) with zero repetitive predictability.",
        stagesTitle: "Progressive Sectors & The Shallows to The Reef",
        stagesDesc: "Curated learning paths through 24+ stages across Hiragana, Katakana, and essential pop-culture anime loanwords.",
        bilingualTitle: "Trilingual Interface & Accessible Mnemonics",
        bilingualDesc: "Seamless switching between English, Indonesian, and Japanese, designed for distraction-free retro comfort.",
      },
      roadmapTitle: "Our Simple Philosophy",
      roadmapDesc: "Learning should never feel like a chore or an exam. By setting handwriting aside for now and gently immersing yourself in the sounds and media you truly care about, understanding comes naturally, one step at a time.",
      backBtn: "<< Back to Dashboard",
    },
    login: {
      windowTitle: "Authentication",
      appTitle: "SaKana Authentication",
      instruction: "Enter your email address to save your study records and stage progress.",
      emailLabel: "E-MAIL ADDRESS:",
      submit: "AUTHENTICATE",
      submitting: "TRANSMITTING...",
      guestTitle: "FAST ACCESS WITHOUT ACCOUNT",
      guestBtn: "CONTINUE AS GUEST",
      returnLink: "<< Back to Home",
      inviteNoticeTitle: "INVITE ONLY ACCESS",
      inviteNoticeText: "Account creation is currently invite-only. To request access, please contact the webmaster at kurzagin.com via comment, guestbook, or other contact channels provided on the site.",
      inviteNoticeLinkText: "kurzagin.com/guestbook",
    },
    dashboard: {
      windowTitle: "Study Dashboard",
      operator: "STUDENT:",
      streak: "1-DAY STREAK",
      statsTitle: "CURRENT PERFORMANCE",
      standard: "PASS GOAL: < 15s",
      cleared: "STAGES CLEARED",
      speed: "BEST SPEED",
      mastery: "MASTERY",
      statusActive: "ACTIVE",
      statusInit: "NEW",
      sec1Title: "HIRAGANA",
      sec1Sub: "THE SHALLOWS",
      sec2Title: "KATAKANA",
      sec2Sub: "THE RIVER",
      sec3Title: "KANA WORDS",
      sec3Sub: "THE REEF (ANIME & DAILY)",
      statusDone: "[DONE]",
      statusReady: "[READY]",
      statusLocked: "[LOCKED]",
      studyBtn: "LEARN",
      sprintBtn: "TEST",
      quickLaunch: "QUICK START",
      timeLimit: "Time limit:",
      sec: "sec",
      srsDueTitle: "SPACED REPETITION (SRS) REVIEWS",
      srsDueDesc: "characters scheduled for memory retention today",
      startSrsReview: "START DUE SRS REVIEW",
      allCaughtUp: "All caught up! No SRS reviews due right now.",
      srsMastered: "MASTERED IN SRS",
    },
    study: {
      windowTitle: "Study Mode",
      studyBadge: "SPACED REPETITION STUDY (SRS METHOD)",
      flipPrompt: "[ Click or Tap to Flip Card ]",
      againBtn: "Again",
      hardBtn: "Hard",
      goodBtn: "Good",
      easyBtn: "Easy",
      gotItBtn: "Good",
      progress: "CARD",
      mnemonic: "Visual Hint / Mnemonic:",
      sampleWord: "Real Japanese Word:",
      romajiLabel: "Pronunciation (Romaji):",
      completeTitle: "STAGE STUDY COMPLETED!",
      completeDesc: "You have reviewed all characters in this sector. Their SRS intervals have been scheduled.",
      readyChallengeBtn: "TAKE TIMED CHALLENGE ⚡",
      repeatStudyBtn: "REVIEW AGAIN",
      backDashboard: "<< Return to Dashboard",
      srsScheduledNote: "Memory intervals scheduled via SM-2 spaced repetition.",
    },
    test: {
      windowTitle: "Speed Test",
      testBadge: "TIMED REFLEX TEST",
      timeRemaining: "TIME REMAINING",
      questionProgress: "QUESTION",
      targetSpeed: "TARGET TIME",
      choosePrompt: "[ Press 1-4 or Click to Answer ]",
      passTitle: "STAGE CLEARED!",
      failTitle: "TIME EXPIRED!",
      failWrongTitle: "TEST FAILED!",
      passDesc: "Splendid recognition speed. The next sector is now unlocked.",
      failDesc: "You exceeded the time limit. Review the characters in study mode and try again.",
      failWrongDesc: "Too many incorrect answers. Aim for at least 80% accuracy.",
      yourTime: "YOUR TIME",
      accuracy: "ACCURACY",
      tryAgainBtn: "RETRY TEST ⚡",
      nextStageBtn: "NEXT SECTOR >>",
      backToDashboard: "<< Return to Dashboard",
      studyFirstBtn: "REVIEW CARDS",
    },
  },

  id: {
    meta: {
      title: "SaKana",
      sub: "Latihan membaca kana untuk pecinta anime & manga",
    },
    nav: {
      brand: "SaKana",
      home: "BERANDA",
      dashboard: "DASHBOARD",
      study: "BELAJAR",
      about: "TENTANG",
      windowTitle: "SaKana",
      login: "MASUK",
      enter: "MASUK KE DASHBOARD",
      top: "KEMBALI KE BERANDA",
      logout: "KELUAR",
      back: "KEMBALI",
    },
    home: {
      welcomeBadge: "SELAMAT DATANG DI SAKANA SPEED DRILL",
      tagline: "Latih Refleks Membaca Kana",
      subTagline: "Jangan terjebak keharusan menulis tulisan rapi. Latih mata membaca Hiragana, Katakana, dan kosakata anime dalam sekejap.",
      counterLabel: "PENGUNJUNG:",
      ctaEnter: "MULAI LATIHAN",
      ctaLogin: "MASUK / SINKRONISASI",
      ruleTitle: "METODE & PANDUAN",
      ruleTag: "PETUNJUK",
      rule1Title: "Lepaskan Jebakan Menulis Rapi",
      rule1Desc: "Menulis goresan berulang kali bikin cepat bosan. Di sini kita fokus pada pengenalan instan saat melihat karakter.",
      rule2Title: "Pahami Dulu, Uji Kemudian",
      rule2Desc: "Gunakan mode kartu pengulangan berkala (metode SRS) santai tanpa timer sebelum menguji kecepatan refleksmu.",
      rule3Title: "Langsung ke Kosakata (Tanpa Kanji Dulu)",
      rule3Desc: "Setelah paham Hiragana & Katakana, langsung coba membaca kosakata anime dan kata serapan sehari-hari sebelum belajar Kanji.",
    },
    about: {
      windowTitle: "Tentang SaKana",
      badge: "CATATAN SEDERHANA & ARAH PENGEMBANGAN",
      sloganNote: "Langkah kecil yang ramah bagi siapa saja yang ingin menikmati pop culture Jepang secara alami.",
      whatIsTitle: "Apa Sebenarnya SaKana (魚)?",
      whatIsLead: "SaKana adalah latihan refleks membaca bahasa Jepang yang ringan, bebas distraksi, dan dirancang khusus untuk penggemar anime, manga, serta kultur pop Jepang.",
      whatIsPoints: {
        saKanaWordplay: "Makna Ganda Penuh Filosofi: “魚 (sakana)” berarti ikan — berenang lincah tanpa hambatan. Nama ini juga plesetan hangat dari “さ、仮名を始めよう” (Ayo, mari kita mulai belajar Kana!).",
        speedFocus: "Latihan Refleks Cepat Tanpa Menulis: Dibandingkan berjam-jam menulis urutan goresan di atas kertas, SaKana melatih mata dan telingamu mengenali Hiragana dan Katakana dalam hitungan sepersekian detik.",
        mediaHeart: "Berakar pada Media Jepang Nyata: Kami menyajikan kata-kata yang benar-benar kamu temui di judul anime, streaming Vtuber, dan game — bukan kalimat kaku buku teks kuno.",
      },
      heroTitle: "Tumbuh Perlahan, Lebih Dari Sekadar Flashcard",
      heroSubtitle: "Kami mulai dengan kartu sederhana, dan perlahan ingin membangun ruang interaktif yang akrab dengan media Jepang nyata.",
      writingDisclaimerBadge: "CATATAN JUJUR UNTUK PEMBELAJAR",
      writingDisclaimerText: "we will not yet provide writing",
      writingDisclaimerSub: "Kami ingin jujur dan terbuka sejak awal: SaKana saat ini hanya berfokus pada pengenalan visual cepat dan keakraban mendengar. Kami belum menyediakan latihan menulis atau urutan goresan, agar kamu tidak terbebani dan bisa langsung menikmati membaca serta mendengar dengan santai.",
      interactiveTitle: "Apa yang Perlahan Kami Bangun",
      interactiveDesc: "Flashcard hanyalah langkah awal kami yang sederhana. Seiring berjalannya waktu, kami menyisipkan interaksi yang terinspirasi dari budaya pop Jepang sehari-hari:",
      features: {
        voicevoxTitle: "Latihan Suara Santai Bersama VOICEVOX (Robo Type T)",
        voicevoxDesc: "Pelafalan yang jernih dengan suara Robo Type T dari VOICEVOX, membantu telinga membedakan vokal dan intonasi tanpa tekanan.",
        animeTitle: "Penggalan Adegan Anime",
        animeDesc: "Belajar membaca kalimat dan dialog berkesan langsung dalam konteks cerita anime yang familiar.",
        vtuberXTitle: "Bahasa Kasual dari Cuitan X VTuber",
        vtuberXDesc: "Mengenal cara penutur asli bertutur sehari-hari, slang ramah, dan percakapan santai di linimasa X.",
        vtuberVoiceTitle: "Simulasi Panggilan Suara yang Hangat",
        vtuberVoiceDesc: "Pengalaman mendengarkan rekaman panggilan suara santai untuk melatih keberanian menyimak tanpa rasa cemas.",
        vtuberAsmrTitle: "VTuber ASMR Disertai Penanda Waktu (Timestamp)",
        vtuberAsmrDesc: "Mendengarkan bisikan lembut dengan teks transkrip bertanda waktu yang sinkron, sehingga mudah diikuti.",
        eduPostTitle: "Tips Bermanfaat & Serba-serbi dari X Jepang",
        eduPostDesc: "Catatan kecil penuh manfaat dan nuansa budaya nyata yang dibagikan oleh penutur asli Jepang di X.",
      },
      currentFeaturesTitle: "Fitur Saat Ini (Sudah Dapat Digunakan)",
      currentFeaturesDesc: "Semua modul dan sarana latihan yang sudah aktif dan bisa kamu gunakan di SaKana saat ini:",
      futureFeaturesTitle: "Rencana Fitur Masa Depan (Sedang Dikembangkan)",
      futureFeaturesDesc: "Eksplorasi interaktif media nyata yang sedang kami siapkan untuk melengkapi latihan flashcard:",
      currentList: {
        srsTitle: "Flashcard Interval Memori (SRS SM-2)",
        srsDesc: "Metode repetisi terjadwal secara ilmiah dilengkapi visual mnemonik, pelafalan audio, dan kosakata nyata bahasa Jepang.",
        sprintTitle: "Uji Refleks Cepat (Speed Challenge)",
        sprintDesc: "Tantangan berbatas waktu di bawah 15 detik untuk melatih refleks mata mengenali karakter secara instan tanpa mengeja.",
        bidirectionalTitle: "Ujian Campuran Dua Arah (Kana ⇄ Romaji)",
        bidirectionalDesc: "Pertanyaan tes diacak bebas antara pengenalan (Kana ➔ Romaji) dan ingatan aktif (Romaji ➔ Kana) agar hafalan tidak kaku.",
        stagesTitle: "Sektor Belajar Bertahap (The Shallows hingga The Reef)",
        stagesDesc: "Kurikulum terstruktur melalui 24+ stage mulai dari Hiragana dasar, Katakana, hingga kata serapan anime & budaya pop.",
        bilingualTitle: "Dukungan Tiga Bahasa (EN / ID / JA)",
        bilingualDesc: "Kemudahan beralih bahasa antar Inggris, Indonesia, dan Jepang dalam tampilan antarmuka retro klasik yang nyaman.",
      },
      roadmapTitle: "Filosofi Sederhana Kami",
      roadmapDesc: "Belajar semestinya tidak terasa seperti ujian yang menegangkan. Dengan mengesampingkan beban menulis terlebih dahulu dan menikmati media yang kamu sukai, kemampuan membaca akan terbentuk perlahan tapi pasti.",
      backBtn: "<< Kembali ke Dashboard",
    },
    login: {
      windowTitle: "Autentikasi",
      appTitle: "SaKana Autentikasi",
      instruction: "Masukkan email kamu untuk menyimpan rekor waktu dan progress stage.",
      emailLabel: "ALAMAT EMAIL:",
      submit: "MASUK DENGAN EMAIL",
      submitting: "MEMPROSES...",
      guestTitle: "COBA CEPAT TANPA AKUN",
      guestBtn: "MASUK SEBAGAI TAMU",
      returnLink: "<< Kembali ke Beranda",
      inviteNoticeTitle: "AKSES KHUSUS UNDANGAN",
      inviteNoticeText: "Pembuatan akun saat ini hanya melalui undangan. Untuk meminta akses, silakan hubungi webmaster di kurzagin.com melalui komentar, buku tamu, atau kontak lainnya yang tersedia di situs tersebut.",
      inviteNoticeLinkText: "kurzagin.com/guestbook",
    },
    dashboard: {
      windowTitle: "Dashboard Latihan",
      operator: "PENGGUNA:",
      streak: "STREAK 1 HARI",
      statsTitle: "STATISTIK BELAJAR",
      standard: "TARGET LULUS: < 15 DETIK",
      cleared: "STAGE SELESAI",
      speed: "KECEPATAN TERBAIK",
      mastery: "PENGUASAAN",
      statusActive: "AKTIF",
      statusInit: "BARU",
      sec1Title: "HIRAGANA DASAR",
      sec1Sub: "THE SHALLOWS",
      sec2Title: "KATAKANA",
      sec2Sub: "THE RIVER",
      sec3Title: "KATA KANA (ANIME & SEHARI-HARI)",
      sec3Sub: "THE REEF",
      statusDone: "[SELESAI]",
      statusReady: "[SIAP]",
      statusLocked: "[TERKUNCI]",
      studyBtn: "BELAJAR",
      sprintBtn: "UJI KECEPATAN",
      quickLaunch: "MULAI SEKARANG",
      timeLimit: "Batas waktu:",
      sec: "dtk",
      srsDueTitle: "REVIEW REPETISI BERKALA (SRS)",
      srsDueDesc: "karakter yang terjadwal untuk diulang hari ini agar tidak lupa",
      startSrsReview: "MULAI REVIEW SRS HARI INI",
      allCaughtUp: "Semua beres! Belum ada review SRS yang jatuh tempo saat ini.",
      srsMastered: "DIKUASAI DALAM SRS",
    },
    study: {
      windowTitle: "Mode Belajar",
      studyBadge: "MODE BELAJAR INTERVAL (METODE SRS)",
      flipPrompt: "[ Klik untuk Membuka Kartu ]",
      againBtn: "Ulangi",
      hardBtn: "Sulit",
      goodBtn: "Paham",
      easyBtn: "Mudah",
      gotItBtn: "Paham",
      progress: "KARTU",
      mnemonic: "Petunjuk Bentuk / Mnemonic:",
      sampleWord: "Contoh Kata Asli Jepang:",
      romajiLabel: "Pelafalan (Romaji):",
      completeTitle: "MATERI STAGE INI SELESAI!",
      completeDesc: "Kamu sudah mengulang semua karakter di bagian ini. Jadwal repetisi ingatan (SRS) telah disimpan.",
      readyChallengeBtn: "IKUTI TANTANGAN WAKTU ⚡",
      repeatStudyBtn: "ULANGI BELAJAR",
      backDashboard: "<< Kembali ke Dashboard",
      srsScheduledNote: "Interval memori dijadwalkan secara otomatis dengan algoritma SM-2.",
    },
    test: {
      windowTitle: "Uji Kecepatan",
      testBadge: "UJI REFLEKS CEPAT DENGAN TIMER",
      timeRemaining: "SISA WAKTU",
      questionProgress: "SOAL",
      targetSpeed: "TARGET WAKTU",
      choosePrompt: "[ Tekan 1-4 atau Klik Jawaban ]",
      passTitle: "STAGE BERHASIL DITEMPUH!",
      failTitle: "WAKTU HABIS!",
      failWrongTitle: "BELUM BERHASIL!",
      passDesc: "Kecepatan refleks membaca sangat bagus. Sektor selanjutnya telah terbuka.",
      failDesc: "Waktu terlewati. Ulangi materi di mode belajar dan coba uji kecepatan kembali.",
      failWrongDesc: "Jawaban salah melebihi batas. Butuh akurasi minimal 80% untuk lulus.",
      yourTime: "WAKTU KAMU",
      accuracy: "AKURASI",
      tryAgainBtn: "COBA LAGI ⚡",
      nextStageBtn: "SEKTOR SELANJUTNYA >>",
      backToDashboard: "<< Kembali ke Dashboard",
      studyFirstBtn: "PELAJARI KEMBALI",
    },
  },

  ja: {
    meta: {
      title: "SaKana",
      sub: "アニメ・マンガファンのための速読ドリル",
    },
    nav: {
      brand: "SaKana",
      home: "ホーム",
      dashboard: "道場",
      study: "修練",
      about: "概要",
      windowTitle: "SaKana",
      login: "ログイン",
      enter: "道場へ入る",
      top: "トップへ戻る",
      logout: "ログアウト",
      back: "戻る",
    },
    home: {
      welcomeBadge: "ようこそ！ SAKANAかな速読ドリルへ",
      tagline: "かな文字の反射神経を鍛える",
      subTagline: "筆順の完璧さに縛られるのは終わり。ひらがな・カタカナ・アニメ単語を瞬時に読む訓練。",
      counterLabel: "訪問者数:",
      ctaEnter: "道場に入る",
      ctaLogin: "ログイン / 同期",
      ruleTitle: "心得とルール",
      ruleTag: "GUIDELINES",
      rule1Title: "手書き完璧主義からの脱却",
      rule1Desc: "文字を綺麗に書く練習で挫折していませんか？ここでは「見て0.5秒で読める」認識力を鍛えます。",
      rule2Title: "まずは反復学習、テストは後から",
      rule2Desc: "間隔反復単語カード（SRS方式）でしっかり馴染んでから、タイムアタックに挑戦します。",
      rule3Title: "漢字は後回し！生きた単語から",
      rule3Desc: "ひらがな・カタカナを覚えたら、すぐにアニメやゲームで使われる実戦単語を読み進めます。",
    },
    about: {
      windowTitle: "SaKanaについて",
      badge: "小さな一歩とこれからの歩み",
      sloganNote: "大好きな日本のポップカルチャーを、気負わず自然に楽しみたいすべての人へ。",
      whatIsTitle: "そもそも「SaKana（魚）」とは？",
      whatIsLead: "SaKanaは、アニメやマンガ、ゲームが好きな人のために設計された、雑音のない「かな文字反射速読ドリル」です。",
      whatIsPoints: {
        saKanaWordplay: "名前に込めた言葉遊び：「魚（さかな）」のように抵抗なく水の中をスイスイ泳ぐ姿。そして「さ、仮名を始めよう。」という前向きな掛け声に由来しています。",
        speedFocus: "手書きよりも「瞬時の認識反射」：ノートに何時間も文字を書くのではなく、0.5秒以内に文字を瞬時に見て聴いて判別する「認識スピード」を鍛えます。",
        mediaHeart: "生の日本語カルチャーに直結：退屈な例文ではなく、アニメのタイトルやセリフ、日常で目にする言葉をそのまま使って楽しく学びます。",
      },
      heroTitle: "単語カードから、一歩ずつ広がる体験へ",
      heroSubtitle: "最初はシンプルなカードから始まりますが、少しずつ生の日本語メディアと触れ合える温かい空間を目指しています。",
      writingDisclaimerBadge: "学習者の皆さまへ大切なお知らせ",
      writingDisclaimerText: "we will not yet provide writing",
      writingDisclaimerSub: "最初にお伝えしておきたいこと：SaKanaは現在、「見て瞬時にわかること」と「耳で聴き取れること」に特化しています。書き順や手書き練習はあえて含めていません。挫折せず、まずは言葉をそのまま楽しんでほしいというささやかな願いからです。",
      interactiveTitle: "少しずつ形にしている試み",
      interactiveDesc: "カード学習はほんの出発点です。ステージが進むにつれて、現代の生きた日本語カルチャーを感じられるインタラクティブな体験をお届けしていきます：",
      features: {
        voicevoxTitle: "VOICEVOX（ロボ Type T）のやさしい音声練習",
        voicevoxDesc: "VOICEVOXの「ロボ Type T」による明瞭な発音。音の高低や母音の響きを無理なく自然に耳に馴染ませます。",
        animeTitle: "心に残るアニメの短いひとコマ",
        animeDesc: "大好きな作品の名台詞や字幕の断片を、実際の文脈とともにやさしく読み解く練習です。",
        vtuberXTitle: "VTuberの日常ポストに触れる",
        vtuberXDesc: "SNSならではのくだけた口語表現や親しみやすいスラングから、生のコミュニケーションを感じてみましょう。",
        vtuberVoiceTitle: "あたたかい通話体験のシミュレーション",
        vtuberVoiceDesc: "録音ボイスコールを通じて、緊張せず自分のペースで聴き取るリスニングの小さな練習です。",
        vtuberAsmrTitle: "タイムスタンプ付きのASMRリスニング",
        vtuberAsmrDesc: "バイノーラルの囁き声と、秒単位で連動したテキスト。どこを読んでいるか迷わず安心して聴けます。",
        eduPostTitle: "ネイティブが教えてくれる日本語の小さな豆知識",
        eduPostDesc: "X上で発信されている、言葉の微妙なニュアンスや文化のちょっとした知恵を教材としてお届けします。",
      },
      currentFeaturesTitle: "現在の実装機能（今すぐ遊べる機能）",
      currentFeaturesDesc: "現在SaKanaで実際に体験・ご利用いただける修行機能一覧：",
      futureFeaturesTitle: "今後の実装予定機能（開発中の構想）",
      futureFeaturesDesc: "単語カードの枠を越え、生きた日本語メディアに直接触れられる体験を準備中です：",
      currentList: {
        srsTitle: "間隔反復記憶（SRS単語カード）",
        srsDesc: "SM-2アルゴリズムに基づく復習スケジュール。視覚的記憶ヒント、音声再生、実戦日本語単語を搭載。",
        sprintTitle: "反射神経タイムアタック試練",
        sprintDesc: "15秒以内の制限時間内に素早く判別し、文字を瞬時に読む脳の反射回路を鍛えるスピードテスト。",
        bidirectionalTitle: "双方向ランダム出題（仮名 ⇄ ローマ字）",
        bidirectionalDesc: "「仮名 ➔ ローマ字」の読解認識と「ローマ字 ➔ 仮名」の能動想起がランダムに混ざり合い、予測に頼らない本質的な即答力を鍛えます。",
        stagesTitle: "段階的な海域ステージ構成（平仮名〜片仮名〜実戦単語）",
        stagesDesc: "平仮名基礎から片仮名、そしてアニメ・ポップカルチャーの外来語まで全24以上のステージを網羅。",
        bilingualTitle: "3言語対応インターフェース（日・英・インドネシア語）",
        bilingualDesc: "快適に切り替え可能なマルチ言語UIと、集中を妨げないレトロOS風デザイン。",
      },
      roadmapTitle: "SaKanaのささやかな想い",
      roadmapDesc: "学ぶことは、決して義務や苦行である必要はありません。手書きのプレッシャーをいったん手放して、好きなコンテンツの音と文字にふれるうちに、いつの間にか自然と読めるようになる――そんな歩みを応援します。",
      backBtn: "<< 道場メニューへ戻る",
    },
    login: {
      windowTitle: "ユーザー認証",
      appTitle: "SaKana 認証",
      instruction: "メールアドレスを入力してログインしてください。記録が保存されます。",
      emailLabel: "メールアドレス:",
      submit: "認証する",
      submitting: "通信中...",
      guestTitle: "アカウントなしで即時体験",
      guestBtn: "ゲストとして入室",
      returnLink: "<< トップページに戻る",
      inviteNoticeTitle: "完全招待制のお知らせ",
      inviteNoticeText: "現在、新規アカウント作成は招待制となっております。アカウントの作成をご希望の方は、kurzagin.com のコメント欄、ゲストブック、またはサイト内の各連絡先から管理者までお問い合わせください。",
      inviteNoticeLinkText: "kurzagin.com/guestbook",
    },
    dashboard: {
      windowTitle: "道場メインメニュー",
      operator: "門下生:",
      streak: "1日連続練習",
      statsTitle: "現在の修行成績",
      standard: "合格目標: 15秒未満",
      cleared: "クリア済み",
      speed: "最高反射速度",
      mastery: "修得度",
      statusActive: "修行中",
      statusInit: "新規",
      sec1Title: "平仮名基礎",
      sec1Sub: "THE SHALLOWS",
      sec2Title: "片仮名",
      sec2Sub: "THE RIVER",
      sec3Title: "かな実戦単語",
      sec3Sub: "THE REEF",
      statusDone: "【済】",
      statusReady: "【挑】",
      statusLocked: "【封】",
      studyBtn: "修練",
      sprintBtn: "試練",
      quickLaunch: "即座に出陣",
      timeLimit: "制限時間:",
      sec: "秒",
      srsDueTitle: "間隔反復 (SRS) 復習",
      srsDueDesc: "記憶定着のために本日復習すべき文字",
      startSrsReview: "本日のSRS復習を開始",
      allCaughtUp: "すべての復習が完了しています！今すぐ復習すべき文字はありません。",
      srsMastered: "SRS完全修得済み",
    },
    study: {
      windowTitle: "反復学習カード",
      studyBadge: "間隔反復学習モード (SRS方式)",
      flipPrompt: "【 タップまたはクリックでカードを裏返す 】",
      againBtn: "もう一度",
      hardBtn: "難しい",
      goodBtn: "覚えた",
      easyBtn: "簡単",
      gotItBtn: "覚えた",
      progress: "札",
      mnemonic: "字形の由来 / ヒント:",
      sampleWord: "実戦日本語単語・用例:",
      romajiLabel: "発音表記 (ローマ字):",
      completeTitle: "この海域の修練が完了しました！",
      completeDesc: "すべての文字の反復を完了しました。SM-2方式で次の復習時期が設定されました。",
      readyChallengeBtn: "タイムアタック試練へ挑戦 ⚡",
      repeatStudyBtn: "もう一度復習する",
      backDashboard: "<< 道場メニューへ戻る",
      srsScheduledNote: "SM-2アルゴリズムにより最適な記憶保持インターバルが更新されました。",
    },
    test: {
      windowTitle: "速度試練",
      testBadge: "制限時間付き反射速度試練",
      timeRemaining: "残り時間",
      questionProgress: "出題",
      targetSpeed: "目標基準時間",
      choosePrompt: "【 1〜4キー またはクリックで解答 】",
      passTitle: "海域突破！",
      failTitle: "時間切れ！",
      failWrongTitle: "試練不合格",
      passDesc: "素晴らしい反射速度です。次の海域への航路が開かれました。",
      failDesc: "制限時間を超過しました。修練モードで復習してから再度挑戦してください。",
      failWrongDesc: "誤答が多すぎます。正解率80%以上を目指してください。",
      yourTime: "所要時間",
      accuracy: "正解率",
      tryAgainBtn: "再挑戦 ⚡",
      nextStageBtn: "次の海域へ >>",
      backToDashboard: "<< 道場メニューへ戻る",
      studyFirstBtn: "復習する",
    },
  },
};
