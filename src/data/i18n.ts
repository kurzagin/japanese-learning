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
    kana: string;
    about: string;
    docs: string;
    windowTitle: string;
    login: string;
    enter: string;
    top: string;
    logout: string;
    back: string;
    mainNavigation: string;
  };
  home: {
    welcomeBadge: string;
    tagline: string;
    subTagline: string;
    counterLabel: string;
    startSessionBanner: string;
    ticker: string;
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
    passwordLabel: string;
    submit: string;
    submitting: string;
    guestTitle: string;
    guestBtn: string;
    returnLink: string;
    inviteNoticeTitle: string;
    inviteNoticeText: {
      beforeMainSite: string;
      mainSite: string;
      between: string;
      guestbook: string;
      afterGuestbook: string;
    };
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
    srsReviewCenter: string;
    srsAllCaughtUpDesc: string;
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
    bonusUnlockedTitle: string;
    bonusUnlockedDesc: string;
    playMinigameBtn: string;
    skipMinigameBtn: string;
  };
  minigame: {
    windowTitle: string;
    badge: string;
    title: string;
    subtitle: string;
    lives: string;
    combo: string;
    bestCombo: string;
    score: string;
    targetProgress: string;
    pressToAnswer: string;
    troubleWarning: string;
    victoryTitle: string;
    victoryDesc: string;
    defeatTitle: string;
    defeatDesc: string;
    accuracy: string;
    masteredBonus: string;
    playAgainBtn: string;
    nextStageBtn: string;
    backDashboard: string;
    optionalBannerTitle: string;
    optionalBannerDesc: string;
    startArcadeBtn: string;
    arcadeLockedBadge: string;
    arcadeLockedDesc: string;
  };
  lockedStage: {
    badge: string;
    title: string;
    desc: string;
    arcadeDesc: string;
    requiredStageLabel: string;
    goToRequiredBtn: string;
    backDashboardBtn: string;
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
      minigameTitle: string;
      minigameDesc: string;
      bilingualTitle: string;
      bilingualDesc: string;
    };
    roadmapTitle: string;
    roadmapDesc: string;
    backBtn: string;
  };
  common: {
    systemOnline: string;
    targetSpeed: string;
    remaining: string;
    best: string;
    reviewStudyDeck: string;
    jumpToSpeedSprint: string;
    stageComplete: string;
    stageNotFound: string;
    loadingDueSrs: string;
    dueNow: string;
    dueReinforcementNote: string;
    srsTrackingNote: (count: number) => string;
    srsEmptyNote: string;
    bossCheckpoint: string;
    bossBattleTest: string;
    arcadeSpeedChallenge: string;
    workstationCommands: string;
    hotkeys: string;
    telemetry: string;
    lapses: string;
    intervalDays: string;
    replayAudio: string;
    flipCard: string;
    correctCount: string;
    accuracyTarget: string;
    arcadeControls: string;
    coinOp: string;
    arcadeRules: string;
    comboBoost: string;
    requeuedCards: string;
    exitArcade: string;
    weakSpotTarget: string;
    initializingPool: string;
    arcadeSurvivalMode: string;
    adaptivePool: string;
    livesRemaining: string;
    audioNotSupported: string;
    listenPronunciation: string;
    beatTwoStagesFirst: string;
  };
  kanaHub: {
    subtitle: string;
    badge: string;
    title: string;
    description: string;
    hiraganaTab: string;
    katakanaTab: string;
    allTypes: string;
    gojuon: string;
    dakuon: string;
    handakuon: string;
    yoon: string;
    searchPlaceholder: string;
    showingCount: (shown: number, total: number) => string;
    scriptLabel: string;
    noResults: (query: string) => string;
    eduTitle: string;
    hiraganaEduTitle: string;
    hiraganaEduText: string;
    katakanaEduTitle: string;
    katakanaEduText: string;
    viewDetails: string;
  };
  kanaDetail: {
    returnToMatrix: string;
    badge: string;
    listen: string;
    scriptLabel: string;
    classLabel: string;
    rowLabel: string;
    strokes: (count: number) => string;
    mnemonicTitle: string;
    mnemonicTip: string;
    vocabTitle: string;
    vocabDefault: string;
    vocabMeaning: string;
    standardSyllabusBadge: string;
    confusedTitle: string;
    confusedSubtitle: (char: string) => string;
    compareBtn: string;
    ctaTitle: (char: string) => string;
    ctaSubtitle: string;
    startDrillBtn: string;
    browseAllBtn: string;
  };
  docs: {
    subtitle: string;
    breadcrumbApi: string;
    apiOverviewBadge: string;
    apiOverviewDesc: string;
    baseEndpoint: string;
    authLabel: string;
    authValue: string;
    audioDeliveryLabel: string;
    audioDeliveryValue: string;
    endpointHeader: string;
    queryParamsTitle: string;
    paramCol: string;
    typeCol: string;
    valuesCol: string;
    descCol: string;
    scriptDesc: string;
    typeDesc: string;
    minimalDesc: string;
    snippetsTitle: string;
    curlTitle: string;
    jsTitle: string;
    copied: string;
    copy: string;
    copyJson: string;
    testBenchBadge: string;
    interactiveTitle: string;
    scriptField: string;
    typeField: string;
    minimalField: string;
    allScriptsOption: string;
    allTypesOption: string;
    fullModeOption: string;
    minimalModeOption: string;
    executeBtn: string;
    executingBtn: string;
    outputLabel: string;
    outputPlaceholder: string;
    schemaTitle: string;
    returnDashboard: string;
    footerMeta: string;
    serverReady: string;
  };
  webring: {
    title: string;
    nodesCount: string;
    hoverPrompt: string;
    prev: string;
    random: string;
    next: string;
    join: string;
    guestbookTag: string;
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
      kana: "KANA CHART",
      about: "ABOUT",
      docs: "API DOCS",
      windowTitle: "SaKana",
      login: "LOGIN",
      enter: "ENTER",
      top: "RETURN TO TOP",
      logout: "LOGOUT",
      back: "BACK",
      mainNavigation: "Main Navigation",
    },
    home: {
      welcomeBadge: "WELCOME TO SAKANA JAPANESE SPEED DRILL",
      tagline: "Speed Kana Reading Reflexes",
      subTagline: "Stop obsessing over stroke orders. Learn to read Kana and anime words in fractions of a second.",
      counterLabel: "VISITOR COUNT:",
      startSessionBanner: "START YOUR JAPANESE SPEED SESSION",
      ticker: "SAKANA FLASH DRILL SYSTEM ACTIVE // SM-2 SPACED RETENTION ENABLED // PRESS SPACEBAR TO FLIP CARDS // TRUE FULL SCREEN WORKSTATION READY",
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
      writingDisclaimerBadge: "LEARNING PHILOSOPHY // RECOGNITION FIRST",
      writingDisclaimerText: "recognition first: read & listen before writing",
      writingDisclaimerSub: "SaKana's core goal is to build strong recognition first — helping your brain instantly identify Kana visually and connect it to sound. We intentionally prioritize rapid reading and listening familiarity before handwriting drills, so you can enjoy real Japanese media right away without feeling overwhelmed.",
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
        minigameTitle: "Adaptive 30-Kana Intermission Arcade (Bonus Stage)",
        minigameDesc: "An adaptive rapid-reaction arcade triggered every 2 Bosses (and optional from Dashboard). Pools all previously unlocked characters, heavily prioritizing past mistakes and resting mastered kana.",
        bilingualTitle: "Trilingual Interface & Accessible Mnemonics",
        bilingualDesc: "Seamless switching between English, Indonesian, and Japanese, designed for distraction-free focused learning.",
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
      passwordLabel: "PASSWORD:",
      submit: "AUTHENTICATE",
      submitting: "TRANSMITTING...",
      guestTitle: "FAST ACCESS WITHOUT ACCOUNT",
      guestBtn: "CONTINUE AS GUEST",
      returnLink: "<< Back to Home",
      inviteNoticeTitle: "INVITE ONLY ACCESS",
      inviteNoticeText: {
        beforeMainSite: "Account creation is currently invite-only. To request access, please contact the webmaster at ",
        mainSite: "kurzagin.com",
        between: " via comment, ",
        guestbook: "guestbook",
        afterGuestbook: ", or other contact channels provided on the site.",
      },
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
      readyChallengeBtn: "TAKE TIMED CHALLENGE",
      repeatStudyBtn: "REVIEW AGAIN",
      backDashboard: "<< Return to Dashboard",
      srsScheduledNote: "Memory intervals scheduled via SM-2 spaced repetition.",
      srsReviewCenter: "SRS Review Center",
      srsAllCaughtUpDesc: "All studied characters are currently in healthy memory retention intervals. Cards will appear here when due.",
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
      tryAgainBtn: "RETRY TEST",
      nextStageBtn: "NEXT SECTOR >>",
      backToDashboard: "<< Return to Dashboard",
      studyFirstBtn: "REVIEW CARDS",
      bonusUnlockedTitle: "BONUS ARCADE UNLOCKED!",
      bonusUnlockedDesc: "You conquered 2 Boss Checkpoints! A 30-letter cumulative loop is available to reinforce troubled kana before entering deeper waters.",
      playMinigameBtn: "PLAY 30-KANA BONUS CHALLENGE (RECOMMENDED)",
      skipMinigameBtn: "SKIP TO NEXT SECTOR >>",
    },
    minigame: {
      windowTitle: "Arcade Bonus",
      badge: "INTERMISSION: 30-LETTER CUMULATIVE REACTION LOOP",
      title: "KANA SURVIVAL ARCADE",
      subtitle: "30-letter rapid reaction loop. Troubled and weak kana appear more often; 100% mastered kana are rested.",
      lives: "SHIELD LIVES",
      combo: "COMBO",
      bestCombo: "MAX STREAK",
      score: "SCORE",
      targetProgress: "LETTERS CLEARED",
      pressToAnswer: "[ Press 1-4 or Click matching Romaji ]",
      troubleWarning: "WEAK SPOT ALERT! Re-looping missed character...",
      victoryTitle: "ARCADE LOOP CLEARED!",
      victoryDesc: "Outstanding reflex memory! All troubled letters survived the cumulative loop.",
      defeatTitle: "SHIELDS DEPLETED!",
      defeatDesc: "The rapid stream caught you off guard. Take a breath and retry the loop, or skip ahead.",
      accuracy: "ACCURACY",
      masteredBonus: "MASTERY BONUS",
      playAgainBtn: "REPLAY ARCADE (30 KANA)",
      nextStageBtn: "PROCEED TO NEXT STAGE >>",
      backDashboard: "<< Return to Dashboard",
      optionalBannerTitle: "INTERMISSION ARCADE (OPTIONAL PRACTICE)",
      optionalBannerDesc: "Test your reflex memory with an adaptive 30-letter loop pooling all previously cleared kana. Weak spots loop more often!",
      startArcadeBtn: "PLAY BONUS ARCADE (30 KANA)",
      arcadeLockedBadge: "LOCKED // CLEAR BOSS 1 & 2 FIRST",
      arcadeLockedDesc: "Arcade mode requires completing Boss Checkpoint 1 and Checkpoint 2 of either Hiragana or Katakana.",
    },
    lockedStage: {
      badge: "SECURITY PROTOCOL // ACCESS RESTRICTED",
      title: "STAGE CURRENTLY LOCKED",
      desc: "You have not cleared the required prerequisite stage yet. Complete earlier stages in sequence to unlock this sector.",
      arcadeDesc: "Arcade mode requires completing Boss Checkpoint 1 and Checkpoint 2 of either Hiragana or Katakana before entering the survival drill.",
      requiredStageLabel: "Prerequisite Stage:",
      goToRequiredBtn: "GO TO REQUIRED STAGE >>",
      backDashboardBtn: "<< RETURN TO DASHBOARD",
    },
    common: {
      systemOnline: "SYSTEM ONLINE",
      targetSpeed: "TARGET TIME",
      remaining: "REMAINING",
      best: "Best",
      reviewStudyDeck: "Review Study Deck",
      jumpToSpeedSprint: "Jump to Speed Sprint",
      stageComplete: "STAGE COMPLETE",
      stageNotFound: "STAGE NOT FOUND.",
      loadingDueSrs: "LOADING DUE SRS CARDS...",
      dueNow: "[DUE NOW]",
      dueReinforcementNote: "SM-2 memory intervals require retention reinforcement.",
      srsTrackingNote: (count: number) => `${count} characters tracked in SRS active retention.`,
      srsEmptyNote: "Start learning characters in the stages below to populate your retention schedule.",
      bossCheckpoint: "BOSS CHECKPOINT",
      bossBattleTest: "BOSS BATTLE REFLEX TEST",
      arcadeSpeedChallenge: "ARCADE SPEED CHALLENGE",
      workstationCommands: "◆ WORKSTATION COMMANDS",
      hotkeys: "HOTKEYS",
      telemetry: "Session Telemetry:",
      lapses: "Lapses (Again):",
      intervalDays: "SM-2 Interval:",
      replayAudio: "REPLAY AUDIO:",
      flipCard: "FLIP CARD:",
      correctCount: "Correct Count:",
      accuracyTarget: "Target Speed:",
      arcadeControls: "◆ ARCADE CABINET CONTROLS",
      coinOp: "COIN OP",
      arcadeRules: "Arcade Rules:",
      comboBoost: "Combo Multiplier:",
      requeuedCards: "Requeued Cards:",
      exitArcade: "Exit Arcade",
      weakSpotTarget: "TARGET: WEAK SPOT",
      initializingPool: "INITIALIZING ADAPTIVE 30-KANA ARCADE POOL...",
      arcadeSurvivalMode: "ARCADE SURVIVAL MODE",
      adaptivePool: "ADAPTIVE RETENTION POOL",
      livesRemaining: "SHIELD LIVES",
      audioNotSupported: "Text-to-speech audio is not supported in this browser.",
      listenPronunciation: "Listen to pronunciation",
      beatTwoStagesFirst: "BEAT 2 STAGES FIRST",
    },
    kanaHub: {
      subtitle: "KANA DIRECTORY",
      badge: "Complete Japanese Kana Reference Hub",
      title: "JAPANESE KANA MATRIX (五十音図)",
      description: "Browse through 200+ authentic Hiragana and Katakana characters. Click any card to view detailed stroke counts, clear pronunciation audio, example words, and mnemonics.",
      hiraganaTab: "HIRAGANA (ひらがな)",
      katakanaTab: "KATAKANA (カタカナ)",
      allTypes: "All Types",
      gojuon: "Gojūon (Basic 46)",
      dakuon: "Dakuon (Voiced)",
      handakuon: "Handakuon (P-row)",
      yoon: "Yōon (Combinations)",
      searchPlaceholder: "Search romaji, kana, hint...",
      showingCount: (shown: number, total: number) => `Showing ${shown} of ${total} characters`,
      scriptLabel: "Script:",
      noResults: (query: string) => `No characters found matching "${query}". Try searching with romaji like "ka" or "shi".`,
      eduTitle: "Understanding Japanese Kana (Hiragana & Katakana)",
      hiraganaEduTitle: "Hiragana (ひらがな)",
      hiraganaEduText: "Hiragana is the foundational Japanese phonetic script consisting of 46 primary Gojūon sounds, plus voiced (Dakuon) and combination (Yōon) characters. It is used for native Japanese words, grammar particles (は, が, を), and verb and adjective inflections (okurigana).",
      katakanaEduTitle: "Katakana (カタカナ)",
      katakanaEduText: "Katakana features sharper, more angular strokes and represents the exact same 46 sound units as Hiragana. It is primarily used for foreign loanwords (gairaigo), scientific terminology, onomatopoeia, and company or product branding in anime and tech.",
      viewDetails: "View details",
    },
    kanaDetail: {
      returnToMatrix: "RETURN TO KANA MATRIX",
      badge: "Official Standard Japanese Character Profile",
      listen: "LISTEN",
      scriptLabel: "Script",
      classLabel: "Class",
      rowLabel: "Row",
      strokes: (count: number) => `${count} Stroke${count > 1 ? "s" : ""}`,
      mnemonicTitle: "Visual Mnemonic & Memory Aid",
      mnemonicTip: "Tip: Associate the shape with this visual image in your mind to recall it in less than 0.5s during drills.",
      vocabTitle: "Vocabulary Example",
      vocabDefault: "Standard elemental sound used in hundreds of essential everyday Japanese words.",
      vocabMeaning: "Meaning:",
      standardSyllabusBadge: "Standard Ministry of Education phonetic syllabus",
      confusedTitle: "Frequently Confused Lookalikes",
      confusedSubtitle: (char: string) => `Learners often confuse ${char} with the following characters. Compare their nuances:`,
      compareBtn: "Compare →",
      ctaTitle: (char: string) => `READY TO DRILL '${char}' AT ARCADE SPEED?`,
      ctaSubtitle: "Reading Japanese isn't just about memorization — it's about fast visual reflexes. Test your speed in the SaKana Dojo.",
      startDrillBtn: "START PRACTICE DRILL",
      browseAllBtn: "BROWSE ALL CHARACTERS",
    },
    docs: {
      subtitle: "API DOCUMENTATION",
      breadcrumbApi: "SAKANA KANA PRIMITIVES API // v1.0",
      apiOverviewBadge: "Kana Primitives API Overview",
      apiOverviewDesc: "The SaKana Public REST API exposes structured Japanese Hiragana and Katakana phonetic datasets. Developers can query characters, romaji transliterations, phonetic classifications (gojūon, dakuon, handakuon, yōon), mnemonic hints, and native audio pronunciation files.",
      baseEndpoint: "Base Endpoint",
      authLabel: "Authentication",
      authValue: "None (Public GET)",
      audioDeliveryLabel: "Audio Delivery",
      audioDeliveryValue: "Pre-rendered Voicevox (.wav)",
      endpointHeader: "Retrieve Kana Primitives",
      queryParamsTitle: "Query Parameters",
      paramCol: "Param",
      typeCol: "Type",
      valuesCol: "Values",
      descCol: "Description",
      scriptDesc: "Filter by script family.",
      typeDesc: "Phonetic category filter.",
      minimalDesc: "When true, omits hints & audio for lightweight payloads.",
      snippetsTitle: "Integration Code Snippets",
      curlTitle: "cURL Request",
      jsTitle: "JavaScript / TypeScript Fetch",
      copied: "Copied",
      copy: "Copy",
      copyJson: "Copy JSON",
      testBenchBadge: "TEST BENCH",
      interactiveTitle: "Live Interactive API Explorer",
      scriptField: "Script",
      typeField: "Type",
      minimalField: "Minimal Mode",
      allScriptsOption: "(All Scripts)",
      allTypesOption: "(All Types)",
      fullModeOption: "false (Full)",
      minimalModeOption: "true (Minimal)",
      executeBtn: "Execute Request [GET]",
      executingBtn: "Executing API Query...",
      outputLabel: "Live Response Output:",
      outputPlaceholder: "// Click 'Execute Request' above to test the live API endpoint in real-time.",
      schemaTitle: "Standard Response Schema",
      returnDashboard: "Return to Dashboard",
      footerMeta: "SaKana Public REST API v1.0 • JSON output • Voicevox Audio",
      serverReady: "API SERVER READY",
    },
    webring: {
      title: "WEBRING // FEDERATED NETWORK",
      nodesCount: "[4 NODES]",
      hoverPrompt: "HOVER BADGE FOR DETAILS // CLICK TO NAVIGATE",
      prev: "« PREV",
      random: "RANDOM",
      next: "NEXT »",
      join: "+ JOIN RING",
      guestbookTag: "(GUESTBOOK)",
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
      kana: "TABEL KANA",
      about: "TENTANG",
      docs: "DOKUMEN API",
      windowTitle: "SaKana",
      login: "MASUK",
      enter: "MASUK KE DASHBOARD",
      top: "KEMBALI KE BERANDA",
      logout: "KELUAR",
      back: "KEMBALI",
      mainNavigation: "Navigasi Utama",
    },
    home: {
      welcomeBadge: "SELAMAT DATANG DI SAKANA SPEED DRILL",
      tagline: "Latih Refleks Membaca Kana",
      subTagline: "Jangan terjebak keharusan menulis tulisan rapi. Latih mata membaca Hiragana, Katakana, dan kosakata anime dalam sekejap.",
      counterLabel: "PENGUNJUNG:",
      startSessionBanner: "MULAI SESI LATIHAN REFLEKS JEPANG",
      ticker: "SISTEM SAKANA SPEED DRILL AKTIF // INTERVAL MEMORI SM-2 SIAP // TEKAN SPASI UNTUK BUKA KARTU // MODE WORKSTATION SIAP",
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
      writingDisclaimerBadge: "FILOSOFI BELAJAR // PRIORITAS PENGENALAN (RECOGNITION FIRST)",
      writingDisclaimerText: "pengenalan lebih dulu: kenali & dengarkan sebelum menulis",
      writingDisclaimerSub: "Tujuan utama SaKana adalah membangun pengenalan terlebih dahulu — melatih otakmu mengenali Kana secara visual dan menghubungkannya dengan bunyi secara spontan. Kami sengaja memprioritaskan refleks membaca cepat dan keakraban mendengar sebelum latihan menulis tangan, agar kamu bisa langsung menikmati konten Jepang tanpa merasa kewalahan.",
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
        minigameTitle: "Arkade Intermezzo 30-Kana Adaptif (Bonus Stage)",
        minigameDesc: "Mode refleks cepat kumulatif yang terbuka setiap 2 Bos (dan bisa dimainkan bebas dari Dashboard). Mengumpulkan seluruh huruf yang sudah dibuka, memprioritaskan huruf yang sering salah, dan mengistirahatkan huruf yang sudah 100% dikuasai.",
        bilingualTitle: "Dukungan Tiga Bahasa (EN / ID / JA)",
        bilingualDesc: "Kemudahan beralih bahasa antar Inggris, Indonesia, dan Jepang dalam tampilan antarmuka yang bersih dan fokus.",
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
      passwordLabel: "KATA SANDI:",
      submit: "MASUK DENGAN EMAIL",
      submitting: "MEMPROSES...",
      guestTitle: "COBA CEPAT TANPA AKUN",
      guestBtn: "MASUK SEBAGAI TAMU",
      returnLink: "<< Kembali ke Beranda",
      inviteNoticeTitle: "AKSES KHUSUS UNDANGAN",
      inviteNoticeText: {
        beforeMainSite: "Pembuatan akun saat ini hanya melalui undangan. Untuk meminta akses, silakan hubungi webmaster di ",
        mainSite: "kurzagin.com",
        between: " melalui komentar, ",
        guestbook: "buku tamu",
        afterGuestbook: ", atau kontak lainnya yang tersedia di situs tersebut.",
      },
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
      readyChallengeBtn: "IKUTI TANTANGAN WAKTU",
      repeatStudyBtn: "ULANGI BELAJAR",
      backDashboard: "<< Kembali ke Dashboard",
      srsScheduledNote: "Interval memori dijadwalkan secara otomatis dengan algoritma SM-2.",
      srsReviewCenter: "Pusat Review SRS",
      srsAllCaughtUpDesc: "Semua memori karakter berada dalam jadwal aman. Kartu baru akan muncul di sini saat tiba waktunya.",
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
      tryAgainBtn: "COBA LAGI",
      nextStageBtn: "SEKTOR SELANJUTNYA >>",
      backToDashboard: "<< Kembali ke Dashboard",
      studyFirstBtn: "PELAJARI KEMBALI",
      bonusUnlockedTitle: "MINI GAME BONUS TERBUKA!",
      bonusUnlockedDesc: "Kamu telah menaklukkan 2 Checkpoint Bos! Mode loop 30 huruf kini tersedia untuk melatih huruf yang sering salah sebelum lanjut ke sektor berikutnya.",
      playMinigameBtn: "MAIN TANTANGAN BONUS 30 KANA (DISARANKAN)",
      skipMinigameBtn: "LEWATI KE SEKTOR BERIKUTNYA >>",
    },
    minigame: {
      windowTitle: "Bonus Arkade",
      badge: "INTERMEZZO: LOOP REFLEKS KUMULATIF 30 HURUF",
      title: "KANA SURVIVAL ARCADE",
      subtitle: "Tantangan reaksi kilat 30 huruf. Huruf yang sering salah muncul lebih sering; huruf yang 100% dikuasai disimpan sementara.",
      lives: "NYAWA PERISAI",
      combo: "KOMBO",
      bestCombo: "KOMBO TERBAIK",
      score: "SKOR",
      targetProgress: "HURUF TERSISA",
      pressToAnswer: "[ Tekan 1-4 atau Klik Romaji yang Cocok ]",
      troubleWarning: "TITIK LEMAH! Memasukkan kembali huruf yang salah ke antrean...",
      victoryTitle: "LOOP ARKADE BERHASIL DITEMPUH!",
      victoryDesc: "Refleks luar biasa! Semua huruf lemah berhasil kamu kuasai dalam loop kumulatif ini.",
      defeatTitle: "PERISAI HABIS!",
      defeatDesc: "Aliran cepat huruf mengejutkanmu. Tarik napas sejenak dan coba lagi, atau langsung lewati ke stage berikutnya.",
      accuracy: "AKURASI",
      masteredBonus: "BONUS PENGUASAAN",
      playAgainBtn: "MAIN ULANG ARKADE (30 KANA)",
      nextStageBtn: "LANJUT KE SEKTOR BERIKUTNYA >>",
      backDashboard: "<< Kembali ke Dashboard",
      optionalBannerTitle: "MINI GAME ARKADE INTERMEZZO (OPSIONAL)",
      optionalBannerDesc: "Uji ingatan refleksmu dengan 30 huruf loop dari semua stage yang sudah kamu tamatkan. Huruf yang sering salah akan muncul lebih sering!",
      startArcadeBtn: "MAIN BONUS ARKADE (30 KANA)",
      arcadeLockedBadge: "TERKUNCI // SELESAIKAN BOS 1 & 2 DULU",
      arcadeLockedDesc: "Mode Arkade membutuhkan penyelesaian Boss Checkpoint 1 dan Checkpoint 2 baik dari Hiragana maupun Katakana.",
    },
    lockedStage: {
      badge: "PROTOKOL KEAMANAN // AKSES DIBATASI",
      title: "STAGE INI MASIH TERKUNCI",
      desc: "Kamu belum menyelesaikan stage prasyarat. Selesaikan stage sebelumnya secara berurutan untuk membuka sektor ini.",
      arcadeDesc: "Mode Arkade membutuhkan penyelesaian Boss Checkpoint 1 dan Checkpoint 2 baik dari Hiragana maupun Katakana sebelum bisa memulai latihan bertahan hidup.",
      requiredStageLabel: "Stage Prasyarat:",
      goToRequiredBtn: "KE STAGE PRASYARAT >>",
      backDashboardBtn: "<< KEMBALI KE DASHBOARD",
    },
    common: {
      systemOnline: "SISTEM AKTIF",
      targetSpeed: "TARGET WAKTU",
      remaining: "TERSISA",
      best: "Terbaik",
      reviewStudyDeck: "Ulangi Kartu Belajar",
      jumpToSpeedSprint: "Langsung ke Uji Kecepatan",
      stageComplete: "STAGE SELESAI",
      stageNotFound: "STAGE TIDAK DITEMUKAN.",
      loadingDueSrs: "MEMUAT KARTU SRS JATUH TEMPO...",
      dueNow: "[JATUH TEMPO]",
      dueReinforcementNote: "Interval memori SM-2 memerlukan penguatan ingatan hari ini.",
      srsTrackingNote: (count: number) => `${count} karakter sedang dipantau dalam retensi aktif SRS.`,
      srsEmptyNote: "Mulai belajar karakter di stage bawah untuk menjadwalkan retensi ingatanmu.",
      bossCheckpoint: "CHECKPOINT BOS",
      bossBattleTest: "UJI REFLEKS PERTARUNGAN BOS",
      arcadeSpeedChallenge: "TANTANGAN KECEPATAN ARKADE",
      workstationCommands: "◆ PINTASAN TOMBOL KERJA",
      hotkeys: "PINTASAN",
      telemetry: "Telemetri Sesi:",
      lapses: "Salah (Ulangi):",
      intervalDays: "Interval SM-2:",
      replayAudio: "PUTAR AUDIO:",
      flipCard: "BUKA KARTU:",
      correctCount: "Jawaban Benar:",
      accuracyTarget: "Target Kecepatan:",
      arcadeControls: "◆ KONTROL MESIN ARKADE",
      coinOp: "KOIN MASUK",
      arcadeRules: "Aturan Arkade:",
      comboBoost: "Pengali Kombo:",
      requeuedCards: "Kartu Diulang:",
      exitArcade: "Keluar Arkade",
      weakSpotTarget: "TARGET: TITIK LEMAH",
      initializingPool: "MEMPERSIAPKAN POOL 30-KANA ADAPTIF...",
      arcadeSurvivalMode: "MODE SURVIVAL ARKADE",
      adaptivePool: "POOL RETENSI ADAPTIF",
      livesRemaining: "NYAWA PERISAI",
      audioNotSupported: "Audio text-to-speech tidak didukung di browser ini.",
      listenPronunciation: "Dengarkan pelafalan",
      beatTwoStagesFirst: "SELESAIKAN 2 STAGE DULU",
    },
    kanaHub: {
      subtitle: "DIREKTORI KANA",
      badge: "Pusat Referensi Kana Jepang Lengkap",
      title: "MATRIKS KANA JEPANG (五十音図)",
      description: "Jelajahi lebih dari 200 karakter Hiragana dan Katakana otentik. Klik kartu mana saja untuk melihat jumlah goresan, audio pelafalan jernih, contoh kata, dan mnemonik.",
      hiraganaTab: "HIRAGANA (ひらがな)",
      katakanaTab: "KATAKANA (カタカナ)",
      allTypes: "Semua Jenis",
      gojuon: "Gojūon (46 Dasar)",
      dakuon: "Dakuon (Bersuara)",
      handakuon: "Handakuon (Deret P)",
      yoon: "Yōon (Kombinasi)",
      searchPlaceholder: "Cari romaji, kana, petunjuk...",
      showingCount: (shown: number, total: number) => `Menampilkan ${shown} dari ${total} karakter`,
      scriptLabel: "Aksara:",
      noResults: (query: string) => `Tidak ada karakter yang cocok dengan "${query}". Coba cari dengan romaji seperti "ka" atau "shi".`,
      eduTitle: "Memahami Kana Jepang (Hiragana & Katakana)",
      hiraganaEduTitle: "Hiragana (ひらがな)",
      hiraganaEduText: "Hiragana adalah aksara fonetik dasar bahasa Jepang yang terdiri dari 46 bunyi Gojūon utama, ditambah karakter bersuara (Dakuon) dan kombinasi (Yōon). Digunakan untuk kata asli bahasa Jepang, partikel tata bahasa (は, が, を), serta infleksi kata kerja dan kata sifat (okurigana).",
      katakanaEduTitle: "Katakana (カタカナ)",
      katakanaEduText: "Katakana memiliki goresan yang lebih tegas dan bersudut tajam, melambangkan 46 unit bunyi yang sama persis dengan Hiragana. Utamanya digunakan untuk kata serapan asing (gairaigo), istilah ilmiah, onomatope, serta nama merek/produk dalam anime dan teknologi.",
      viewDetails: "Lihat detail",
    },
    kanaDetail: {
      returnToMatrix: "KEMBALI KE MATRIKS KANA",
      badge: "Profil Karakter Standar Resmi Jepang",
      listen: "DENGARKAN",
      scriptLabel: "Aksara",
      classLabel: "Kategori",
      rowLabel: "Baris",
      strokes: (count: number) => `${count} Goresan`,
      mnemonicTitle: "Petunjuk Visual & Pengingat Bentuk",
      mnemonicTip: "Tips: Hubungkan bentuk huruf dengan imajinasi visual ini di kepalamu agar bisa mengingatnya dalam waktu kurang dari 0.5 detik saat latihan refleks.",
      vocabTitle: "Contoh Kosakata",
      vocabDefault: "Bunyi dasar standar yang digunakan dalam ratusan kosakata penting sehari-hari bahasa Jepang.",
      vocabMeaning: "Arti:",
      standardSyllabusBadge: "Silabus fonetik standar Kementerian Pendidikan Jepang",
      confusedTitle: "Karakter Serupa yang Sering Tertukar",
      confusedSubtitle: (char: string) => `Pembelajar sering keliru membedakan ${char} dengan karakter-karakter berikut. Perhatikan perbedaannya:`,
      compareBtn: "Bandingkan →",
      ctaTitle: (char: string) => `SIAP LATIHAN REFLEKS CEPAT '${char}' DI DOJO?`,
      ctaSubtitle: "Membaca bahasa Jepang bukan sekadar menghafal lambat — ini tentang refleks visual secepat kilat. Uji kecepatanmu sekarang di SaKana Dojo.",
      startDrillBtn: "MULAI SESI LATIHAN",
      browseAllBtn: "LIHAT SEMUA KARAKTER",
    },
    docs: {
      subtitle: "DOKUMENTASI API",
      breadcrumbApi: "API PRIMITIF KANA SAKANA // v1.0",
      apiOverviewBadge: "Ringkasan API Primitif Kana",
      apiOverviewDesc: "Public REST API SaKana menyediakan dataset fonetik terstruktur untuk Hiragana dan Katakana Jepang. Pengembang dapat mengambil karakter, alih aksara romaji, klasifikasi fonetik (gojūon, dakuon, handakuon, yōon), petunjuk mnemonik, dan berkas audio pelafalan asli.",
      baseEndpoint: "Endpoint Dasar",
      authLabel: "Autentikasi",
      authValue: "Tidak Perlu (Public GET)",
      audioDeliveryLabel: "Penyajian Audio",
      audioDeliveryValue: "Voicevox Siap Pakai (.wav)",
      endpointHeader: "Ambil Primitif Kana",
      queryParamsTitle: "Parameter Query",
      paramCol: "Parameter",
      typeCol: "Tipe",
      valuesCol: "Nilai",
      descCol: "Deskripsi",
      scriptDesc: "Filter berdasarkan keluarga aksara.",
      typeDesc: "Filter kategori fonetik.",
      minimalDesc: "Jika bernilai true, mengabaikan petunjuk & audio agar ukuran respon lebih ringan.",
      snippetsTitle: "Contoh Kode Integrasi",
      curlTitle: "Permintaan cURL",
      jsTitle: "JavaScript / TypeScript Fetch",
      copied: "Tersalin",
      copy: "Salin",
      copyJson: "Salin JSON",
      testBenchBadge: "MEJA UJI",
      interactiveTitle: "Penjelajah API Interaktif",
      scriptField: "Aksara",
      typeField: "Jenis",
      minimalField: "Mode Minimal",
      allScriptsOption: "(Semua Aksara)",
      allTypesOption: "(Semua Jenis)",
      fullModeOption: "false (Lengkap)",
      minimalModeOption: "true (Minimal)",
      executeBtn: "Jalankan Permintaan [GET]",
      executingBtn: "Menjalankan Kueri API...",
      outputLabel: "Hasil Respon Langsung:",
      outputPlaceholder: "// Klik 'Jalankan Permintaan' di atas untuk menguji endpoint API secara langsung.",
      schemaTitle: "Skema Respon Standar",
      returnDashboard: "Kembali ke Dashboard",
      footerMeta: "API Publik REST SaKana v1.0 • Output JSON • Audio Voicevox",
      serverReady: "SERVER API SIAP",
    },
    webring: {
      title: "WEBRING // JARINGAN FEDERASI",
      nodesCount: "[4 SIMPUL]",
      hoverPrompt: "ARAHKAN KURSOR KE BADGE UNTUK DETAIL // KLIK UNTUK MENGUNJUNGI",
      prev: "« SEBELUMNYA",
      random: "ACAK",
      next: "BERIKUTNYA »",
      join: "+ GABUNG RING",
      guestbookTag: "(BUKU TAMU)",
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
      kana: "五十音図",
      about: "概要",
      docs: "API仕様",
      windowTitle: "SaKana",
      login: "ログイン",
      enter: "道場へ入る",
      top: "トップへ戻る",
      logout: "ログアウト",
      back: "戻る",
      mainNavigation: "メインナビゲーション",
    },
    home: {
      welcomeBadge: "ようこそ！ SAKANAかな速読ドリルへ",
      tagline: "かな文字の反射神経を鍛える",
      subTagline: "筆順の完璧さに縛られるのは終わり。ひらがな・カタカナ・アニメ単語を瞬時に読む訓練。",
      counterLabel: "訪問者数:",
      startSessionBanner: "日本語速読セッションを開始",
      ticker: "SAKANA高速反射修練システム稼働中 // SM-2間隔反復記憶有効 // スペースキーでカード反転 // 全画面集中道場",
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
      writingDisclaimerBadge: "学習方針 // まずは認識力を最優先に",
      writingDisclaimerText: "まずは見て聴いてわかることから：手書きの前に瞬時認識",
      writingDisclaimerSub: "SaKanaの最大のゴールは、「まずは瞬時に文字を認識できること」です。文字を見て直感的に音が浮かぶ力を最優先で育てています。挫折しやすい手書き練習よりも先に、読む・聴くスピード反射を確立することで、日本の生きたメディアを今すぐ気負わず楽しめるよう設計しています。",
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
        minigameTitle: "適応型30文字幕間アーケード（ボーナス試練）",
        minigameDesc: "2ボス突破ごと（または道場から自由挑戦）に出現する高速反射ミニゲーム。過去に誤答した苦手札を優先抽出し、100%修得札を適度に休止させながら累積30文字ループで脳に定着させます。",
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
      passwordLabel: "パスワード:",
      submit: "認証する",
      submitting: "通信中...",
      guestTitle: "アカウントなしで即時体験",
      guestBtn: "ゲストとして入室",
      returnLink: "<< トップページに戻る",
      inviteNoticeTitle: "完全招待制のお知らせ",
      inviteNoticeText: {
        beforeMainSite: "現在、新規アカウント作成は招待制となっております。アカウントの作成をご希望の方は、",
        mainSite: "kurzagin.com",
        between: " のコメント欄、",
        guestbook: "ゲストブック",
        afterGuestbook: "、またはサイト内の各連絡先から管理者までお問い合わせください。",
      },
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
      readyChallengeBtn: "タイムアタック試練へ挑戦",
      repeatStudyBtn: "もう一度復習する",
      backDashboard: "<< 道場メニューへ戻る",
      srsScheduledNote: "SM-2アルゴリズムにより最適な記憶保持インターバルが更新されました。",
      srsReviewCenter: "SRS復習センター",
      srsAllCaughtUpDesc: "すべての文字の記憶保持インターバルは順調です。復習時期が来るとここに現れます。",
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
      tryAgainBtn: "再挑戦",
      nextStageBtn: "次の海域へ >>",
      backToDashboard: "<< 道場メニューへ戻る",
      studyFirstBtn: "復習する",
      bonusUnlockedTitle: "ボーナスミニゲーム解禁！",
      bonusUnlockedDesc: "ボス関門を2箇所突破しました！深海へ進む前に、全解放文字から苦手な仮名を重点出題する30文字ループ修練が利用可能です。",
      playMinigameBtn: "30文字ボーナス試練に挑戦 (推奨)",
      skipMinigameBtn: "次の海域へ進む >>",
    },
    minigame: {
      windowTitle: "幕間ミニゲーム",
      badge: "幕間：30文字累積反射ループゲーム",
      title: "仮名サバイバル・アーケード",
      subtitle: "30文字の連続反射ドリル。誤答・苦手な仮名が重点的にループ出題され、完全修得文字は一時休止します。",
      lives: "シールド残機",
      combo: "連続コンボ",
      bestCombo: "最大連鎖",
      score: "スコア",
      targetProgress: "残り文字数",
      pressToAnswer: "【 1〜4キー またはクリックで解答 】",
      troubleWarning: "苦手札警戒！ 誤答文字がキューへ再投入されます...",
      victoryTitle: "アーケードループ制覇！",
      victoryDesc: "見事な反射記憶です！累積30文字ループを完走し、弱点を克服しました。",
      defeatTitle: "シールド消失！",
      defeatDesc: "高速の波に呑まれました。一息ついて再挑戦するか、そのまま次の海域へ進むことも可能です。",
      accuracy: "正解率",
      masteredBonus: "完全修得ボーナス",
      playAgainBtn: "もう一度挑戦 (30文字)",
      nextStageBtn: "次の海域へ進む >>",
      backDashboard: "<< 道場メニューへ戻る",
      optionalBannerTitle: "幕間ボーナスアーケード (自由挑戦)",
      optionalBannerDesc: "これまで突破した全海域の仮名から苦手文字を優先抽出した30文字ループに挑戦できます。",
      startArcadeBtn: "ボーナスアーケードを開始 (30文字)",
      arcadeLockedBadge: "封鎖中 // ボス関門1＆2突破が必要",
      arcadeLockedDesc: "平仮名または片仮名のボス関門1とボス関門2を両方突破すると解禁されます。",
    },
    lockedStage: {
      badge: "防衛プロトコル // アクセス制限",
      title: "この試練は現在封鎖されています",
      desc: "前提となる先行ステージをまだ突破していません。順番にクリアしてこの海域を解放してください。",
      arcadeDesc: "アーケードモードに挑戦するには、平仮名または片仮名のボス関門1とボス関門2を突破する必要があります。",
      requiredStageLabel: "前提ステージ：",
      goToRequiredBtn: "前提ステージへ挑む >>",
      backDashboardBtn: "<< 道場メニューへ戻る",
    },
    common: {
      systemOnline: "稼働中",
      targetSpeed: "目標基準時間",
      remaining: "残り",
      best: "最高記録",
      reviewStudyDeck: "修練札を復習する",
      jumpToSpeedSprint: "速度試練へ出陣",
      stageComplete: "海域制覇",
      stageNotFound: "海域が見つかりません。",
      loadingDueSrs: "本日のSRS復習札を抽出中...",
      dueNow: "【要復習】",
      dueReinforcementNote: "SM-2記憶インターバルに基づき、本日復習が必要です。",
      srsTrackingNote: (count: number) => `現在${count}文字がSRS定着管理されています。`,
      srsEmptyNote: "下の海域で文字を修練すると、記憶定着スケジュールが自動作成されます。",
      bossCheckpoint: "ボス関門",
      bossBattleTest: "ボス関門反射試練",
      arcadeSpeedChallenge: "アーケード速度試練",
      workstationCommands: "◆ 道場操作コマンド",
      hotkeys: "短縮キー",
      telemetry: "修行計測データ:",
      lapses: "やり直し回数:",
      intervalDays: "SM-2間隔:",
      replayAudio: "音声再聴取:",
      flipCard: "札を裏返す:",
      correctCount: "正解数:",
      accuracyTarget: "目標反射速度:",
      arcadeControls: "◆ 筐体操作盤",
      coinOp: "連続修練",
      arcadeRules: "アーケード心得:",
      comboBoost: "連鎖倍率:",
      requeuedCards: "再出題札:",
      exitArcade: "道場へ帰還",
      weakSpotTarget: "重点標的：苦手札",
      initializingPool: "適応型30文字アーケード札を生成中...",
      arcadeSurvivalMode: "仮名サバイバル試練",
      adaptivePool: "適応型記憶保持プール",
      livesRemaining: "シールド残機",
      audioNotSupported: "お使いのブラウザは音声合成に対応していません。",
      listenPronunciation: "発音を聴く",
      beatTwoStagesFirst: "先に2ステージ突破が必要",
    },
    kanaHub: {
      subtitle: "五十音図一覧",
      badge: "かな文字・五十音図 総合リファレンス",
      title: "五十音図かな文字マトリクス",
      description: "平仮名・片仮名200字以上の詳細データを網羅。各札をクリックすると画数、クリアな音声発音、用例単語、字形の由来ヒントを確認できます。",
      hiraganaTab: "平仮名 (ひらがな)",
      katakanaTab: "片仮名 (カタカナ)",
      allTypes: "全種類",
      gojuon: "五十音 (基本46字)",
      dakuon: "濁音 (濁点)",
      handakuon: "半濁音 (半濁点)",
      yoon: "拗音 (促音・小文字結合)",
      searchPlaceholder: "ローマ字、かな、ヒントで検索...",
      showingCount: (shown: number, total: number) => `${total}文字中 ${shown}文字を表示`,
      scriptLabel: "書体:",
      noResults: (query: string) => `「${query}」に一致する文字は見つかりませんでした。「ka」「shi」などのローマ字でも検索できます。`,
      eduTitle: "日本語のかな文字（平仮名と片仮名）について",
      hiraganaEduTitle: "平仮名 (ひらがな)",
      hiraganaEduText: "平仮名は、46の基本音（五十音）と濁音・拗音から構成される日本語の基礎文字です。和語、助詞（は、が、を）、動詞や形容詞の送り仮名などに広く用いられます。",
      katakanaEduTitle: "片仮名 (カタカナ)",
      katakanaEduText: "片仮名は、直線的で角張った筆致が特徴で、平仮名とまったく同じ46音を表します。主に外来語、学術用語、擬音語・擬態語、アニメやゲーム、ブランド表記に用いられます。",
      viewDetails: "詳細を見る",
    },
    kanaDetail: {
      returnToMatrix: "五十音図一覧へ戻る",
      badge: "日本語標準かな文字カルテ",
      listen: "音声を聴く",
      scriptLabel: "書体",
      classLabel: "種別",
      rowLabel: "行",
      strokes: (count: number) => `${count}画`,
      mnemonicTitle: "字形の由来と記憶ヒント",
      mnemonicTip: "心得：頭の中で視覚的なイメージと文字の形を結びつけることで、試練中に0.5秒未満で即座に想起できるようになります。",
      vocabTitle: "実戦単語・用例",
      vocabDefault: "日常の基礎単語に数多く登場する標準的な仮名文字です。",
      vocabMeaning: "意味:",
      standardSyllabusBadge: "文部科学省 学習指導要領 準拠音響体系",
      confusedTitle: "見分けがつきにくい類似文字",
      confusedSubtitle: (char: string) => `「${char}」は以下の文字と混同しやすいため、微妙な線の違いを意識して見比べましょう：`,
      compareBtn: "見比べる →",
      ctaTitle: (char: string) => `「${char}」の反射認識を道場で鍛えますか？`,
      ctaSubtitle: "文字を覚えるだけでなく、見て瞬時に脳が反応する反射速度を身につけましょう。SaKana道場の速度試練に挑戦！",
      startDrillBtn: "修練を始める",
      browseAllBtn: "全文字一覧を見る",
    },
    docs: {
      subtitle: "API仕様書",
      breadcrumbApi: "SAKANA かな文字REST API // v1.0",
      apiOverviewBadge: "かな文字データAPI 概要",
      apiOverviewDesc: "SaKanaパブリックREST APIは、構造化された平仮名・片仮名の音声文字データセットを提供します。文字、ローマ字表記、音韻分類（五十音、濁音、半濁音、拗音）、字形ヒント、VOICEVOX音声ファイルを参照可能です。",
      baseEndpoint: "基底エンドポイント",
      authLabel: "認証",
      authValue: "不要 (公開GET)",
      audioDeliveryLabel: "音声配信",
      audioDeliveryValue: "VOICEVOX収録済 (.wav)",
      endpointHeader: "かな文字一覧の取得",
      queryParamsTitle: "クエリパラメータ",
      paramCol: "パラメータ",
      typeCol: "型",
      valuesCol: "指定値",
      descCol: "説明",
      scriptDesc: "書体（hiragana / katakana）で絞り込みます。",
      typeDesc: "音韻種別（gojuon / dakuon / handakuon / yoon）で絞り込みます。",
      minimalDesc: "trueにすると、軽量化のためヒントと音声を省略した最小形式で返却します。",
      snippetsTitle: "実装コード例",
      curlTitle: "cURLリクエスト",
      jsTitle: "JavaScript / TypeScript Fetch",
      copied: "コピー完了",
      copy: "コピー",
      copyJson: "JSONをコピー",
      testBenchBadge: "テスト環境",
      interactiveTitle: "API動作検証コンソール",
      scriptField: "書体",
      typeField: "種別",
      minimalField: "軽量モード",
      allScriptsOption: "(すべての書体)",
      allTypesOption: "(すべての種別)",
      fullModeOption: "false (全データ)",
      minimalModeOption: "true (最小データ)",
      executeBtn: "リクエスト実行 [GET]",
      executingBtn: "通信中...",
      outputLabel: "レスポンス出力:",
      outputPlaceholder: "上の「リクエスト実行」をクリックすると、リアルタイムでAPIレスポンスが表示されます。",
      schemaTitle: "標準レスポンススキーマ",
      returnDashboard: "道場メニューへ戻る",
      footerMeta: "SaKana パブリックREST API v1.0 • JSON出力 • VOICEVOX音声",
      serverReady: "APIサーバー正常稼働中",
    },
    webring: {
      title: "ウェブリング // 連合ネットワーク",
      nodesCount: "【4サイト】",
      hoverPrompt: "バナーにカーソルを合わせると詳細表示 // クリックで移動",
      prev: "« 前へ",
      random: "ランダム",
      next: "次へ »",
      join: "+ 参加希望",
      guestbookTag: "【ゲストブック】",
    },
  },
};
