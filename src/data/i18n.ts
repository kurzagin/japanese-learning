export type Locale = "en" | "id" | "ja";

export interface TranslationSchema {
  meta: {
    title: string;
    sub: string;
  };
  nav: {
    windowTitle: string;
    file: string;
    edit: string;
    view: string;
    help: string;
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
}

export const translations: Record<Locale, TranslationSchema> = {
  en: {
    meta: {
      title: "SaKana - Japanese Kana Reflex Practice",
      sub: "Japanese speed drill for anime & manga fans",
    },
    nav: {
      windowTitle: "SaKana_v1.0 - [KANA REFLEX TRAINING]",
      file: "File(F)",
      edit: "Edit(E)",
      view: "View(V)",
      help: "Help(H)",
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
    login: {
      windowTitle: "LOGIN.EXE - [AUTHENTICATION]",
      appTitle: "SAKANA REFLEX NETWORK",
      instruction: "Enter your email address to save your study records and stage progress.",
      emailLabel: "E-MAIL ADDRESS:",
      submit: "AUTHENTICATE",
      submitting: "TRANSMITTING...",
      guestTitle: "FAST ACCESS WITHOUT ACCOUNT",
      guestBtn: "CONTINUE AS GUEST",
      returnLink: "<< Back to Home",
    },
    dashboard: {
      windowTitle: "SaKana_Dojo.exe - [STUDY DASHBOARD]",
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
      windowTitle: "STUDY_MODE.EXE - [REPETITION DRILL]",
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
  },

  id: {
    meta: {
      title: "SaKana - Latihan Refleks Membaca Kana Jepang",
      sub: "Latihan cepat membaca kana untuk pecinta anime & manga",
    },
    nav: {
      windowTitle: "SaKana_v1.0 - [LATIHAN REFLEKS KANA]",
      file: "Berkas(B)",
      edit: "Ubah(U)",
      view: "Tampilan(T)",
      help: "Bantuan(H)",
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
    login: {
      windowTitle: "LOGIN.EXE - [AUTENTIKASI]",
      appTitle: "SAKANA REFLEX NETWORK",
      instruction: "Masukkan email kamu untuk menyimpan rekor waktu dan progress stage.",
      emailLabel: "ALAMAT EMAIL:",
      submit: "MASUK DENGAN EMAIL",
      submitting: "MEMPROSES...",
      guestTitle: "COBA CEPAT TANPA AKUN",
      guestBtn: "MASUK SEBAGAI TAMU",
      returnLink: "<< Kembali ke Beranda",
    },
    dashboard: {
      windowTitle: "SaKana_Dojo.exe - [DASHBOARD LATIHAN]",
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
      windowTitle: "STUDY_MODE.EXE - [PENGULANGAN KANA]",
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
  },

  ja: {
    meta: {
      title: "SaKana - かな反射神経トレーニング",
      sub: "アニメ・マンガファンのための速読ドリル",
    },
    nav: {
      windowTitle: "SaKana_v1.0 - 【かな反射神経トレーニング】",
      file: "ファイル(F)",
      edit: "編集(E)",
      view: "表示(V)",
      help: "ヘルプ(H)",
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
    login: {
      windowTitle: "LOGIN.EXE - 【ユーザー認証】",
      appTitle: "SAKANA REFLEX NETWORK",
      instruction: "メールアドレスを入力してログインしてください。記録が保存されます。",
      emailLabel: "メールアドレス:",
      submit: "認証する",
      submitting: "通信中...",
      guestTitle: "アカウントなしで即時体験",
      guestBtn: "ゲストとして入室",
      returnLink: "<< トップページに戻る",
    },
    dashboard: {
      windowTitle: "SaKana_Dojo.exe - 【道場メインメニュー】",
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
      windowTitle: "STUDY_MODE.EXE - 【反復学習カード】",
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
  },
};
