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
  };
  study: {
    windowTitle: string;
    studyBadge: string;
    flipPrompt: string;
    againBtn: string;
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
    heroTitle: string;
    heroSubtitle: string;
    writingDisclaimerBadge: string;
    writingDisclaimerText: string;
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
      rule2Desc: "Use untimed flashcard repetitions (Anki style) to get comfortable with the characters before taking any speed challenge.",
      rule3Title: "Kana Words First (No Kanji Yet)",
      rule3Desc: "Once you master Hiragana & Katakana, jump directly into real anime words and loanwords before touching complex Kanji.",
    },
    about: {
      windowTitle: "About SaKana",
      badge: "PLATFORM ARCHITECTURE & ROADMAP",
      heroTitle: "BEYOND BASIC FLASHCARDS",
      heroSubtitle: "Stages gradually evolve from simple cards into rich, immersive interactive Japanese media experiences.",
      writingDisclaimerBadge: "IMPORTANT NOTICE",
      writingDisclaimerText: "we will not yet provide writing",
      interactiveTitle: "Interactive Stages Evolution",
      interactiveDesc: "While initial stages begin with flashcard memory training, higher sectors are engineered to immerse you in authentic modern Japanese culture and multimedia interactions:",
      features: {
        voicevoxTitle: "VOICEVOX Neural Audio (Robo Type T)",
        voicevoxDesc: "Crisp robotic pronunciation drills powered by VOICEVOX engine Robo Type T voice for razor-sharp pitch and auditory distinction.",
        animeTitle: "Iconic Anime Scene Breakdowns",
        animeDesc: "Sentence fragments, subtitles, and iconic catchphrases pulled straight from favorite anime scenes for context-grounded recognition.",
        vtuberXTitle: "VTuber Real X (Twitter) Posts",
        vtuberXDesc: "Real-world social media feeds, emojis, casual slang, abbreviations, and informal Japanese as tweeted by popular VTubers.",
        vtuberVoiceTitle: "VTuber Voice Call Simulator",
        vtuberVoiceDesc: "Recorded voice call experience designed to train your active listening and reaction reflexes in simulated one-on-one calls.",
        vtuberAsmrTitle: "VTuber ASMR + Timestamped Transcripts",
        vtuberAsmrDesc: "Binaural whispering sessions with synchronized timestamped Japanese transcripts to hone fine-grained auditory comprehension.",
        eduPostTitle: "Japanese Educational & Informational X Posts",
        eduPostDesc: "Authentic informational posts, news snippets, trivia, and native Japanese tips shared by educators across Japanese X.",
      },
      roadmapTitle: "Pedagogical Philosophy",
      roadmapDesc: "Real-life fluency is 90% instant comprehension and 10% production. By eliminating tedious handwriting drills and flooding your brain with captivating native media, SaKana builds genuine instant recognition.",
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
    },
    study: {
      windowTitle: "Study Mode",
      studyBadge: "UNTIMED STUDY MODE (ANKI METHOD)",
      flipPrompt: "[ Click or Tap to Flip Card ]",
      againBtn: "Again",
      gotItBtn: "Good",
      progress: "CARD",
      mnemonic: "Visual Hint / Mnemonic:",
      sampleWord: "Real Japanese Word:",
      romajiLabel: "Pronunciation (Romaji):",
      completeTitle: "STAGE STUDY COMPLETED!",
      completeDesc: "You have reviewed all characters in this sector. Ready to test your reflexes with the timer?",
      readyChallengeBtn: "TAKE TIMED CHALLENGE ⚡",
      repeatStudyBtn: "REVIEW AGAIN",
      backDashboard: "<< Return to Dashboard",
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
      rule2Desc: "Gunakan mode kartu pengulangan (metode Anki) santai tanpa timer sebelum menguji kecepatan refleksmu.",
      rule3Title: "Langsung ke Kosakata (Tanpa Kanji Dulu)",
      rule3Desc: "Setelah paham Hiragana & Katakana, langsung coba membaca kosakata anime dan kata serapan sehari-hari sebelum belajar Kanji.",
    },
    about: {
      windowTitle: "Tentang SaKana",
      badge: "ARSITEKTUR & PENGEMBANGAN",
      heroTitle: "LEBIH INTERAKTIF DARI SEKADAR KARTU",
      heroSubtitle: "Stage belajar bertahap berevolusi dari sekadar flashcard menjadi media interaktif kaya pengalaman bahasa Jepang.",
      writingDisclaimerBadge: "PEMBERITAHUAN PENTING",
      writingDisclaimerText: "we will not yet provide writing",
      interactiveTitle: "Evolusi Stage Interaktif",
      interactiveDesc: "Meskipun stage awal dimulai dengan latihan kartu hafalan, level-level selanjutnya dirancang makin imersif dengan media nyata pop-culture Jepang:",
      features: {
        voicevoxTitle: "Audio Neural VOICEVOX (Robo Type T)",
        voicevoxDesc: "Latihan pelafalan dengan engine VOICEVOX bersuara Robo Type T yang presisi untuk membedakan nada dan intonasi vokal.",
        animeTitle: "Potongan Adegan Anime Populer",
        animeDesc: "Kutipan kalimat, teks subtitle asli, dan dialog khas anime untuk melatih pemahaman dalam konteks cerita nyata.",
        vtuberXTitle: "Postingan Asli X (Twitter) dari VTuber",
        vtuberXDesc: "Gaya bahasa gaul, singkatan, emoji, dan percakapan kasual santai dari cuitan para VTuber favorit di X.",
        vtuberVoiceTitle: "Simulasi Panggilan Suara VTuber",
        vtuberVoiceDesc: "Pengalaman rekaman audio interaktif layaknya voice call untuk melatih refleks mendengar dan merespons secara real-time.",
        vtuberAsmrTitle: "VTuber ASMR + Timestamp Interaktif",
        vtuberAsmrDesc: "Sesi audio bisikan binaural dilengkapi teks transkrip bertanda waktu (timestamp) untuk mengasah ketajaman pendengaran.",
        eduPostTitle: "Postingan Edukatif & Berita Nyata di X Jepang",
        eduPostDesc: "Tangkapan informasi, tips bahasa, dan wawasan budaya asli yang dibagikan oleh penutur asli di linimasa X Jepang.",
      },
      roadmapTitle: "Filosofi Pembelajaran",
      roadmapDesc: "Kefasihan dunia nyata adalah 90% pemahaman cepat dan 10% produksi. Dengan tidak membebani latihan menulis tangan yang membosankan dan langsung membanjiri indra dengan konten asli, SaKana membentuk refleks baca sejati.",
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
    },
    study: {
      windowTitle: "Mode Belajar",
      studyBadge: "MODE BELAJAR SANTAI (METODE ANKI)",
      flipPrompt: "[ Klik untuk Membuka Kartu ]",
      againBtn: "Ulangi",
      gotItBtn: "Paham",
      progress: "KARTU",
      mnemonic: "Petunjuk Bentuk / Mnemonic:",
      sampleWord: "Contoh Kata Asli Jepang:",
      romajiLabel: "Pelafalan (Romaji):",
      completeTitle: "MATERI STAGE INI SELESAI!",
      completeDesc: "Kamu sudah mengulang semua karakter di bagian ini. Sudah siap menguji refleks dengan tantangan waktu?",
      readyChallengeBtn: "IKUTI TANTANGAN WAKTU ⚡",
      repeatStudyBtn: "ULANGI BELAJAR",
      backDashboard: "<< Kembali ke Dashboard",
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
      rule2Desc: "タイマー無しの単語カード（Anki方式）でしっかり馴染んでから、タイムアタックに挑戦します。",
      rule3Title: "漢字は後回し！生きた単語から",
      rule3Desc: "ひらがな・カタカナを覚えたら、すぐにアニメやゲームで使われる実戦単語を読み進めます。",
    },
    about: {
      windowTitle: "SaKanaについて",
      badge: "システム設計方針・ロードマップ",
      heroTitle: "単なる単語カードを超える体験へ",
      heroSubtitle: "ステージが進むにつれ、単なる暗記カードからよりインタラクティブな実戦メディア体験へと段階的に進化します。",
      writingDisclaimerBadge: "重要なお知らせ",
      writingDisclaimerText: "we will not yet provide writing",
      interactiveTitle: "段階的なインタラクティブ・ステージ進化",
      interactiveDesc: "最初の海域はカードによる基本反射訓練から始まりますが、上位ステージでは現代の生きた日本語コンテンツとマルチメディア体験が待ち構えています：",
      features: {
        voicevoxTitle: "VOICEVOX 音声合成（ロボット Type T）",
        voicevoxDesc: "VOICEVOXエンジンの「ロボ Type T」による正確で機械的な発音ドリル。音の高低やリズムを明瞭に聞き取ります。",
        animeTitle: "名作アニメの劇中シーン解析",
        animeDesc: "名作アニメのセリフ、字幕、決め台詞などを実際の文脈とともに瞬時に認識する実戦訓練。",
        vtuberXTitle: "VTuber実ポスト（旧Twitter）",
        vtuberXDesc: "人気VTuberのリアルなX投稿から、日常のくだけた口語表現、略語、顔文字、スラングを習得。",
        vtuberVoiceTitle: "VTuber通話体験（ボイスコール録音）",
        vtuberVoiceDesc: "まるで1対1で通話しているかのような音声体験。リアルタイムでのリスニングと反応力を育成。",
        vtuberAsmrTitle: "VTuber ASMR ＋ タイムスタンプ付き原稿",
        vtuberAsmrDesc: "バイノーラル囁き声と秒単位で同期したタイムスタンプ付きスクリプトで、繊細な聴解力を研ぎ澄まします。",
        eduPostTitle: "日本語教育・役立つ実在Xポスト",
        eduPostDesc: "ネイティブ発信者による実践的な日本語の豆知識、文化、解説ポストを教材として直読。",
      },
      roadmapTitle: "学習の設計思想",
      roadmapDesc: "真の読解力は「見て0秒で頭に入ること」です。負担になりやすい手書き練習を省き、大好きなコンテンツの生の日本語に触れ続けることで、本物の読解反射神経を育てます。",
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
    },
    study: {
      windowTitle: "反復学習カード",
      studyBadge: "時間制限なし学習モード (Anki方式)",
      flipPrompt: "【 タップまたはクリックでカードを裏返す 】",
      againBtn: "もう一度",
      gotItBtn: "覚えた",
      progress: "札",
      mnemonic: "字形の由来 / ヒント:",
      sampleWord: "実戦日本語単語・用例:",
      romajiLabel: "発音表記 (ローマ字):",
      completeTitle: "この海域の修練が完了しました！",
      completeDesc: "すべての文字の反復を完了しました。タイムアタックで反射速度を試す準備はできましたか？",
      readyChallengeBtn: "タイムアタック試練へ挑戦 ⚡",
      repeatStudyBtn: "もう一度復習する",
      backDashboard: "<< 道場メニューへ戻る",
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
