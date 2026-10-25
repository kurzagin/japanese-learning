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
    words: string;
    about: string;
    docs: string;
    arcade: string;
    compare: string;
    converter: string;
    pdfCharts: string;
    menu: string;
    close: string;
    windowTitle: string;
    login: string;
    enter: string;
    top: string;
    logout: string;
    back: string;
    mainNavigation: string;
    selectLanguage: string;
    titleBarSub: string;
    online: string;
    profile: string;
    preferences: string;
  };
  home: {
    welcomeBadge: string;
    heroTitle: string;
    tagline: string;
    subTagline: string;
    counterLabel: string;
    liveTag: string;
    newsBadge: string;
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
    directoriesTitle: string;
    exploreTag: string;
    kanaTitle: string;
    kanaDesc: string;
    kanaFullLink: string;
    hiraganaBasicLink: string;
    katakanaBasicLink: string;
    vocabTitle: string;
    vocabDesc: string;
    vocabFullLink: string;
    jlptN5Link: string;
    animeVocabLink: string;
    sakanaWordLink: string;
    lookalikeTitle: string;
    lookalikeDesc: string;
    lookalikeFullLink: string;
    shiVsTsuLink: string;
    soVsNLink: string;
    saVsKiLink: string;
    toolLabel: string;
    toolBtn: string;
    faqTitle: string;
    faqTag: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
    faq3Q: string;
    faq3A: string;
    footerStatus: string;
    footerTagline: string;
    footerEncoding: string;
  };
  login: {
    windowTitle: string;
    appTitle: string;
    instruction: string;
    signInTab: string;
    signUpTab: string;
    emailLabel: string;
    displayNameLabel: string;
    passwordLabel: string;
    submit: string;
    signUpSubmit: string;
    submitting: string;
    authSuccessMsg: string;
    signUpCheckEmailTitle: string;
    signUpCheckEmailDesc: string;
    checkSpamNotice: string;
    emailConfirmedMsg: string;
    goToSignInBtn: string;
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
    statusWon: string;
    statusBoss: string;
    optionalDrillBadge: string;
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
    footerTagline: string;
    footerReady: string;
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
    newBadge: string;
    hotkeyHint: string;
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
    srsDueReviewsTitle: string;
    dailyRetentionQueue: string;
    srsAllCaughtUpDesc: string;
    footerSrsReviews: string;
    footerLapses: string;
  };
  test: {
    windowTitle: string;
    testBadge: string;
    timeRemaining: string;
    questionProgress: string;
    targetSpeed: string;
    choosePrompt: string;
    kanaToRomajiBadge: string;
    romajiToKanaBadge: string;
    audioToKanaBadge: string;
    audioToRomajiBadge: string;
    audioListeningPrompt: string;
    audioReplayBtn: string;
    audioPlayingStatus: string;
    audioReadyStatus: string;
    audioQuestionToggle: string;
    audioQuestionsOn: string;
    audioQuestionsOff: string;
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
    lockedCode: string;
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
    sloganSub: string;
    sloganNote: string;
    whatIsTitle: string;
    whatIsTag: string;
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
      voicevoxTrans: string;
      animeTitle: string;
      animeDesc: string;
      animeSpeaker: string;
      animeTrans: string;
      vtuberXTitle: string;
      vtuberXDesc: string;
      vtuberXTrans: string;
      vtuberVoiceTitle: string;
      vtuberVoiceDesc: string;
      vtuberVoiceSpeaker: string;
      vtuberVoiceTrans: string;
      vtuberAsmrTitle: string;
      vtuberAsmrDesc: string;
      vtuberAsmrSpeaker: string;
      vtuberAsmrTrans: string;
      eduPostTitle: string;
      eduPostDesc: string;
      eduPostSpeaker: string;
      eduPostRomaji: string;
      eduPostTrans: string;
    };
    currentFeaturesTitle: string;
    currentFeaturesDesc: string;
    futureFeaturesTitle: string;
    futureFeaturesDesc: string;
    roadmapBadge: string;
    currentList: {
      srsTitle: string;
      srsDesc: string;
      sprintTitle: string;
      sprintDesc: string;
      bidirectionalTitle: string;
      bidirectionalDesc: string;
      stagesTitle: string;
      stagesDesc: string;
      kanaDirectoryTitle: string;
      kanaDirectoryDesc: string;
      categoryHubsTitle: string;
      categoryHubsDesc: string;
      vocabularyDirectoryTitle: string;
      vocabularyDirectoryDesc: string;
      kanaCompareTitle: string;
      kanaCompareDesc: string;
      romajiConverterTitle: string;
      romajiConverterDesc: string;
      minigameTitle: string;
      minigameDesc: string;
      bilingualTitle: string;
      bilingualDesc: string;
    };
    roadmapTitle: string;
    roadmapDesc: string;
    backBtn: string;
    footerStatus: string;
    footerSub: string;
    footerRight: string;
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
    accuracyTargetVal: string;
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
    lookalikeBtn: string;
    hiraganaPdfBtn: string;
    katakanaPdfBtn: string;
    browseCategoriesLabel: string;
    hiraganaGojuonBadge: string;
    hiraganaDakuonBadge: string;
    hiraganaYoonBadge: string;
    katakanaGojuonBadge: string;
    katakanaExtendedBadge: string;
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
    faqTitle: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2ABefore: string;
    faq2ALink: string;
    faq2AAfter: string;
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
    originTitle: string;
    evolvedFromKanji: (kanji: string, reading: string) => string;
    originFooter: string;
    elementaryVocabTitle: string;
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
  kanaCategory: {
    breadcrumbHub: string;
    countBadge: (count: number) => string;
    aboutSetTitle: string;
    rosterTitle: string;
    rosterHint: string;
    returnBtn: string;
  };
  compareHub: {
    subtitle: string;
    badge: string;
    title: string;
    description: string;
    compareAction: string;
    eduTitle: string;
    edu1Title: string;
    edu1Desc: string;
    edu2Title: string;
    edu2Desc: string;
  };
  compareDetail: {
    subtitle: (c1: string, c2: string) => string;
    backToMatrix: string;
    badge: string;
    title: (c1: string, c2: string) => string;
    description: (script: string) => string;
    char1Label: string;
    char2Label: string;
    strokesLabel: string;
    standardStrokes: string;
    fullProfileLink: (char: string) => string;
    keyDifferencesTitle: string;
    memoryTrickLabel: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
  };
  converter: {
    subtitle: string;
    badge: string;
    title: string;
    description: string;
    inputLabel: string;
    clearBtn: string;
    placeholder: string;
    smartParticleLabel: string;
    grammarStandardBadge: string;
    quickSamplesLabel: string;
    presetGreetings: string;
    presetTopic: string;
    presetAnime: string;
    presetSmallTsu: string;
    hiraganaHeader: string;
    katakanaHeader: string;
    copied: string;
    copy: string;
    waitingInput: string;
    hiraganaFooter: string;
    katakanaFooter: string;
    eduTitle: string;
    eduLead: string;
    eduRule1: string;
    eduRule2: string;
    eduRule3: string;
    eduRule4: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
  };
  wordsHub: {
    subtitle: string;
    breadcrumbWords: string;
    badge: string;
    title: (count: number) => string;
    description: string;
    jlptN5Btn: (count?: number) => string;
    jlptN4Btn: (count?: number) => string;
    animePopBtn: (count?: number) => string;
    kanaMatrixBtn: string;
    lookalikesBtn: string;
    allTab: (count: number) => string;
    hiraganaTab: string;
    katakanaTab: string;
    searchPlaceholder: string;
    breakdownLink: string;
    eduTitle: string;
    edu1Title: string;
    edu1Desc: string;
    edu2Title: string;
    edu2Desc: string;
    edu3Title: string;
    edu3Desc: string;
  };
  wordDetail: {
    breadcrumbHub: string;
    badge: (script: string) => string;
    kanaLabel: string;
    popCultureBadge: string;
    meaningHeader: string;
    exampleSentenceHeader: string;
    breakdownHeader: string;
    breakdownDesc: string;
    strokeOrderLink: string;
    relatedWordsHeader: (script: string) => string;
    returnBtn: string;
    homophonesHeader: string;
    homophonesSub: string;
    pitchAccentLabel: string;
    exampleLabel: string;
  };
  jlptCategory: {
    wordsCountHeader: (title: string, count: number) => string;
    allWordsBtn: (count: number) => string;
    scriptFilterLabel: string;
    allFilter: string;
    searchPlaceholder: string;
    learnWordBtn: string;
    noResults: (query: string) => string;
  };
  pdfChart: {
    studyToolsBreadcrumb: string;
    pdfChartSuffix: string;
    switchChartLink: (label: string) => string;
    generatingPdf: string;
    downloadPdfBtn: string;
    printChartBtn: string;
    tipOrientation: string;
    tipVariants: string;
    tipFree: string;
    sheetBrand: string;
    sheetTitle: (script: string, jp: string) => string;
    sheetSub: string;
    sec1Title: string;
    sec1Sub: string;
    rowCol: string;
    sec2Title: string;
    sec2Sub: string;
    sec3Title: string;
    sec3Sub: string;
    rootCol: string;
    sheetFooterLeft: string;
    sheetFooterRight: string;
    howToUseTitle: (script: string) => string;
    howToUseDesc: (script: string) => string;
    box1Title: string;
    box1Desc: string;
    box2Title: string;
    box2Desc: string;
    box3Title: string;
    box3Desc: string;
    faqTitle: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
    faq3Q: string;
    faq3A: string;
    interactiveDrillLink: string;
    converterLink: string;
    lookalikesLink: string;
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
    federationHeader: string;
    hoverPrompt: string;
    prev: string;
    random: string;
    next: string;
    join: string;
    guestbookTag: string;
    nodes: {
      kurzaginDesc: string;
      eteyvatDesc: string;
      vxnusDesc: string;
      joinName: string;
      joinDesc: string;
    };
  };
}

export const translations: Record<Locale, TranslationSchema> = {
  en: {
    meta: {
      title: "SaKana",
      sub: "The fastest way to master Hiragana & Katakana for anime fans",
    },
    nav: {
      brand: "SaKana",
      home: "HOME",
      dashboard: "DASHBOARD",
      study: "STUDY",
      kana: "KANA CHART",
      words: "WORDS",
      about: "ABOUT",
      docs: "DOCS",
      arcade: "ARCADE",
      compare: "COMPARE",
      converter: "CONVERTER",
      pdfCharts: "PDF CHARTS",
      menu: "MENU",
      close: "CLOSE",
      windowTitle: "SaKana",
      login: "LOGIN",
      enter: "ENTER",
      top: "RETURN TO TOP",
      logout: "LOGOUT",
      back: "BACK",
      mainNavigation: "Main Navigation",
      selectLanguage: "Select language",
      titleBarSub: "魚 SAKANA // JAPANESE SPEED DRILL",
      online: "ONLINE",
      profile: "PROFILE",
      preferences: "SETTINGS",
    },
    home: {
      welcomeBadge: "KANA SPEED DRILL FOR ANIME FANS",
      heroTitle: "魚 SAKANA — Master Japanese Kana for Anime Fans",
      tagline: "Master Kana the Fun Way — Built for Anime Fans",
      subTagline: "Skip the boring textbook drills and handwriting homework. Master Hiragana and Katakana through fast-paced flashcards, native audio, and iconic Japanese pop-culture words.",
      counterLabel: "STUDENT COUNT:",
      liveTag: "[LIVE!]",
      newsBadge: "NEWS",
      startSessionBanner: "START YOUR KANA DRILL SESSION",
      ticker: "KANA DRILL ACTIVE // MASTER HIRAGANA & KATAKANA IN RECORD TIME // PRACTICE WITH ICONIC ANIME WORDS & LOANWORDS // SM-2 SPACED RETENTION ENABLED",
      ctaEnter: "START LEARNING KANA",
      ctaLogin: "SIGN IN / SAVE PROGRESS",
      ruleTitle: "METHOD & GUIDELINES",
      ruleTag: "LEARNING RULES",
      rule1Title: "Visual Recognition First",
      rule1Desc: "You don't need to spend weeks writing stroke orders on paper to learn Kana. We train your eyes for instant character recognition so you can start reading immediately.",
      rule2Title: "Native Audio With Every Card",
      rule2Desc: "Every character is paired with crisp native Japanese audio. You learn the exact pronunciation from day one, connecting letters directly to real sounds.",
      rule3Title: "Real Culture & Loanwords",
      rule3Desc: "Practice with words you actually care about—from iconic anime expressions to Katakana loanwords and names, avoiding dry textbook vocabulary.",
      directoriesTitle: "LEARNING MATRIX & DIRECTORIES",
      exploreTag: "EXPLORE",
      kanaTitle: "KANA ALPHABETS",
      kanaDesc: "Complete 46 Gojūon primitives, Dakuon & Yōon combination charts with audio.",
      kanaFullLink: "Full Kana Matrix Hub",
      hiraganaBasicLink: "Hiragana Basic (46)",
      katakanaBasicLink: "Katakana Basic (46)",
      vocabTitle: "ANIME & CORE VOCABULARY",
      vocabDesc: "161 words: iconic anime reactions, loanwords, and essential daily Japanese with audio.",
      vocabFullLink: "161-Word Directory",
      jlptN5Link: "JLPT N5 Vocabulary (104)",
      animeVocabLink: "Anime & Pop Culture (9)",
      sakanaWordLink: "さかな (Fish / SaKana)",
      lookalikeTitle: "LOOKALIKE GUIDES",
      lookalikeDesc: "Side-by-side visual difference guides for the most confusing Japanese characters.",
      lookalikeFullLink: "18 Lookalike Pairs",
      shiVsTsuLink: "シ vs ツ (Shi vs Tsu)",
      soVsNLink: "ソ vs ン (So vs N)",
      saVsKiLink: "さ vs き (Sa vs Ki)",
      toolLabel: "Free Japanese Romanization Tool:",
      toolBtn: "Romaji ⇄ Hiragana & Katakana Converter →",
      faqTitle: "FREQUENTLY ASKED QUESTIONS (FAQ)",
      faqTag: "Q&A",
      faq1Q: "How long does it take to learn Hiragana and Katakana?",
      faq1A: "With SaKana's recognition-first spaced repetition speed drills, most beginners memorize all 46 basic Hiragana and 46 Katakana characters in 3 to 7 days, spending just 10–15 minutes per day.",
      faq2Q: "Why is Katakana especially important for anime fans?",
      faq2A: "Katakana is used throughout Japanese pop culture: character names (ナルト, ルフィ), technique names, sci-fi terms, foreign loanwords (ヒーロー, アニメ), and dramatic manga onomatopoeia sound effects (ドドド, ゴゴゴ).",
      faq3Q: "What makes SaKana different from traditional textbook apps?",
      faq3A: "Traditional apps slow you down with rigid stroke-tracing tests. SaKana focuses on instant subconscious visual recognition, native pronunciation audio, lookalike comparison breakdowns (such as シ vs ツ), and practical vocabulary seen in actual anime dialogue.",
      footerStatus: "SAKANA READY",
      footerTagline: "SAKANA PROJECT // KANA SPEED DRILL FOR ANIME FANS",
      footerEncoding: "UTF-8 // MULTILINGUAL",
    },
    about: {
      windowTitle: "About SaKana",
      badge: "OUR HUMBLE JOURNEY & DIRECTION",
      sloganSub: "Let's begin Kana",
      sloganNote: "A tiny beginning for everyone wanting to enjoy Japanese media freely.",
      whatIsTitle: "What is SaKana (魚)?",
      whatIsTag: "ABOUT SAKANA",
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
        voicevoxTrans: "A, I, U, E, O. Audio parameter recognition in progress.",
        animeTitle: "Short Glimpses of Anime Scenes",
        animeDesc: "Reading memorable lines, subtitles, and phrases in the natural context of beloved anime moments.",
        animeSpeaker: "Classic Anime Dialogue",
        animeTrans: "If you give up now, the game is already over...?",
        vtuberXTitle: "Casual Japanese from VTuber X Posts",
        vtuberXDesc: "Getting accustomed to casual conversational Japanese, cheerful slang, and how native speakers actually tweet every day.",
        vtuberXTrans: "Morning everyone~! Doing a singing stream at 20:00 JST! Come hang out!",
        vtuberVoiceTitle: "Comfortable Voice Call Simulation",
        vtuberVoiceDesc: "A friendly recorded voice call experience to help ease listening anxiety and practice listening at your own pace.",
        vtuberVoiceSpeaker: "Incoming Voice Call • 00:14",
        vtuberVoiceTrans: "Hello? Can you hear me? ...Great! Got a minute to talk right now?",
        vtuberAsmrTitle: "VTuber ASMR with Synchronized Timestamps",
        vtuberAsmrDesc: "Soft, gentle listening practice paired with synchronized timestamps so you never lose track of what is being spoken.",
        vtuberAsmrSpeaker: "Binaural Whisper Feed",
        vtuberAsmrTrans: "[01:23] You worked so hard today... please rest well tonight.",
        eduPostTitle: "Helpful Real Tips & Trivia from Japanese X",
        eduPostDesc: "Everyday tidbits, language nuances, and thoughtful cultural notes shared generously by native Japanese creators.",
        eduPostSpeaker: "Japanese Tip of the Day • X Post",
        eduPostRomaji: "[Trivia] 'Kekkou desu' can mean both Yes or No depending on tone and context!",
        eduPostTrans: "Native nuance explained succinctly in real native Japanese tweets.",
      },
      currentFeaturesTitle: "Current Features (Available Now)",
      currentFeaturesDesc: "Everything you can currently practice and use in SaKana right now:",
      futureFeaturesTitle: "Future Features & In-Progress Vision",
      futureFeaturesDesc: "Interactive media experiences currently in development to take you beyond static flashcards:",
      roadmapBadge: "ROADMAP // IN PROGRESS",
      currentList: {
        srsTitle: "Spaced Repetition (SRS Flashcards)",
        srsDesc: "SM-2 scientific retention scheduling cards with visual mnemonics, audio hints, and real Japanese sample vocabulary.",
        sprintTitle: "Rapid Reflex Speed Challenge",
        sprintDesc: "Under-15-second timed tests designed to rewire neural recognition speed for instantaneous Kana reading, with smart timer pauses during listening drills.",
        bidirectionalTitle: "Multimodal Test (Kana ⇄ Romaji & Audio Drills)",
        bidirectionalDesc: "Randomized test questions challenging visual recognition (Kana ➔ Romaji), active recall (Romaji ➔ Kana), and optional auditory recognition (Audio ➔ Kana & Audio ➔ Romaji).",
        stagesTitle: "Progressive Sectors & The Shallows to The Reef",
        stagesDesc: "Curated learning paths through 24+ stages across Hiragana, Katakana, and essential pop-culture anime loanwords.",
        kanaDirectoryTitle: "Interactive Kana Matrix & 436+ Detail Profiles",
        kanaDirectoryDesc: "Complete phonetic directory covering Gojūon, Dakuon, Handakuon, and Yōon with stroke counts, mnemonics, audio pronunciation, and vocabulary examples.",
        categoryHubsTitle: "Dedicated Kana Category Hubs (Gojūon, Dakuon, Yōon, Extended)",
        categoryHubsDesc: "Focused phonetic hub portals with complete character rosters, linguistic explanations, and dedicated audio sets for each Japanese sound group.",
        vocabularyDirectoryTitle: "Core & Anime Vocabulary Dictionary (160+ Words)",
        vocabularyDirectoryDesc: "Individual standalone word pages featuring native audio pronunciation, constituent Kana character breakdowns, definitions, and pop-culture trivia.",
        kanaCompareTitle: "18 Lookalike Comparison Guides (シ vs ツ, さ vs き, ソ vs ン)",
        kanaCompareDesc: "Anatomical breakdowns, stroke trajectory indicators, and memory tricks to resolve commonly confused character pairs.",
        romajiConverterTitle: "Real-time Romaji ⇄ Kana Converter Tool",
        romajiConverterDesc: "Instant phonetic transliterator converting Latin input to both Hiragana and Katakana with automatic double consonant (sokuon) and contracted sound handling.",
        minigameTitle: "Adaptive 30-Kana Intermission Arcade (Bonus Stage)",
        minigameDesc: "An adaptive rapid-reaction arcade triggered every 2 Bosses (and optional from Dashboard). Pools all previously unlocked characters, heavily prioritizing past mistakes and resting mastered kana.",
        bilingualTitle: "Trilingual Interface & Accessible Mnemonics",
        bilingualDesc: "Seamless switching between English, Indonesian, and Japanese, designed for distraction-free focused learning.",
      },
      roadmapTitle: "Our Simple Philosophy",
      roadmapDesc: "Learning should never feel like a chore or an exam. By setting handwriting aside for now and gently immersing yourself in the sounds and media you truly care about, understanding comes naturally, one step at a time.",
      backBtn: "<< Back to Dashboard",
      footerStatus: "SAKANA ARCHITECTURE // READY",
      footerSub: "NATIVE JAPANESE AUDIO & SM-2 SRS",
      footerRight: "INTERACTIVE SYSTEM",
    },
    login: {
      windowTitle: "Authentication",
      appTitle: "SaKana Authentication",
      instruction: "Sign in or create an account to sync your study records and stage progress across devices.",
      signInTab: "SIGN IN",
      signUpTab: "CREATE ACCOUNT",
      emailLabel: "E-MAIL ADDRESS:",
      displayNameLabel: "DISPLAY NAME (OPTIONAL):",
      passwordLabel: "PASSWORD:",
      submit: "SIGN IN",
      signUpSubmit: "REGISTER ACCOUNT",
      submitting: "TRANSMITTING...",
      authSuccessMsg: "Authentication successful! Redirecting...",
      signUpCheckEmailTitle: "VERIFICATION LINK SENT!",
      signUpCheckEmailDesc: "We sent a confirmation link to your email address. Please click the link to activate your account.",
      checkSpamNotice: "Important: If you do not see the email within 1-2 minutes, please check your Spam / Junk folder.",
      emailConfirmedMsg: "Email verified successfully! You can now sign in.",
      goToSignInBtn: "→ PROCEED TO SIGN IN",
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
      sec1Sub: "BASIC PHONETICS",
      sec2Title: "KATAKANA",
      sec2Sub: "LOANWORDS & SPECIAL SOUNDS",
      sec3Title: "WORDS",
      sec3Sub: "CORE VOCABULARY",
      statusDone: "[DONE]",
      statusReady: "[READY]",
      statusLocked: "[LOCKED]",
      statusWon: "WON",
      statusBoss: "BOSS",
      optionalDrillBadge: "OPTIONAL DRILL",
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
      footerTagline: "MULTILINGUAL SRS MEMORY SPEED DRILL",
      footerReady: "UTF-8 // READY",
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
      newBadge: "[NEW]",
      hotkeyHint: "[ SPACE: FLIP // 1-4: RATE ]",
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
      srsDueReviewsTitle: "SRS Due Reviews",
      dailyRetentionQueue: "Daily Retention Queue",
      srsAllCaughtUpDesc: "All studied characters are currently in healthy memory retention intervals. Cards will appear here when due.",
      footerSrsReviews: "SRS REVIEWS:",
      footerLapses: "LAPSES:",
    },
    test: {
      windowTitle: "Speed Test",
      testBadge: "TIMED REFLEX TEST",
      timeRemaining: "TIME REMAINING",
      questionProgress: "QUESTION",
      targetSpeed: "TARGET TIME",
      choosePrompt: "[ Press 1-4 or Click to Answer ]",
      kanaToRomajiBadge: "Kana ➔ Romaji",
      romajiToKanaBadge: "Romaji ➔ Kana",
      audioToKanaBadge: "Audio ➔ Kana",
      audioToRomajiBadge: "Audio ➔ Romaji",
      audioListeningPrompt: "Listen carefully to the audio...",
      audioReplayBtn: "Replay Audio [R]",
      audioPlayingStatus: "PLAYING (TIMER PAUSED)",
      audioReadyStatus: "ANSWER NOW (TIMER RUNNING)",
      audioQuestionToggle: "AUDIO QUESTIONS",
      audioQuestionsOn: "AUDIO: ON",
      audioQuestionsOff: "AUDIO: OFF",
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
      lockedCode: "[403 LOCKED]",
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
      accuracyTargetVal: "< 1.5s / kana",
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
      lookalikeBtn: "LOOKALIKE COMPARISONS (シ vs ツ, さ vs き)",
      hiraganaPdfBtn: "HIRAGANA PDF CHART (HORIZONTAL)",
      katakanaPdfBtn: "KATAKANA PDF CHART (HORIZONTAL)",
      browseCategoriesLabel: "Browse Categories:",
      hiraganaGojuonBadge: "Hiragana Gojūon (46)",
      hiraganaDakuonBadge: "Hiragana Dakuon (20)",
      hiraganaYoonBadge: "Hiragana Yōon (33)",
      katakanaGojuonBadge: "Katakana Gojūon (46)",
      katakanaExtendedBadge: "Extended Katakana (10)",
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
      faqTitle: "Kana Learning Questions & Answers",
      faq1Q: "Should I learn Hiragana or Katakana first?",
      faq1A: "Start with Hiragana to understand core grammar, particles, and fundamental Japanese sounds. Follow immediately with Katakana so you can decipher manga sound effects, modern anime titles, and foreign loanwords without hesitation.",
      faq2Q: "How can I avoid mixing up lookalike characters?",
      faq2ABefore: "Characters like シ (shi) vs ツ (tsu) or さ (sa) vs き (ki) share similar shapes. Visit our ",
      faq2ALink: "Lookalike Comparison Hub",
      faq2AAfter: " for side-by-side stroke direction breakdowns and visual memory tricks.",
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
      originTitle: "Historical Kanji Root (万葉仮名)",
      evolvedFromKanji: (kanji: string, reading: string) => `Evolved from Kanji: ${kanji} (${reading})`,
      originFooter: "Ancient source character from Japanese calligraphy tradition.",
      elementaryVocabTitle: "Elementary Vocabulary Example",
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
    kanaCategory: {
      breadcrumbHub: "KANA HUB",
      countBadge: (count: number) => `COUNT: ${count} CHARACTERS`,
      aboutSetTitle: "About This Character Set",
      rosterTitle: "Character Roster",
      rosterHint: "Click any character to view stroke order and pronunciation",
      returnBtn: "RETURN TO KANA HUB",
    },
    compareHub: {
      subtitle: "KANA COMPARISONS",
      badge: "Lookalike Breakdown Hub",
      title: "JAPANESE KANA COMPARISONS & LOOKALIKES",
      description: "Easily confused by Katakana シ and ツ? Or Hiragana さ and き? Select a character pair below for an anatomical breakdown and memory tricks.",
      compareAction: "Compare",
      eduTitle: "The Secret to Telling Lookalike Japanese Kana Apart",
      edu1Title: "Stroke Direction & Alignment",
      edu1Desc: "In Katakana, characters like シ (shi) and ツ (tsu) differ by stroke direction: shi is written from bottom-to-top with strokes aligned along a vertical axis, whereas tsu is written top-to-bottom with strokes aligned horizontally along the ceiling.",
      edu2Title: "Loop & Tail Variations",
      edu2Desc: "In Hiragana pairs like れ (re), わ (wa), and ね (ne), the initial left stroke is identical, but the ending tail tells them apart: re flares outward, wa curves round like a hoop, and ne ties into a closed loop at the finish.",
    },
    compareDetail: {
      subtitle: (c1: string, c2: string) => `${c1} VS ${c2} // COMPARISON`,
      backToMatrix: "BACK TO KANA MATRIX",
      badge: "Visual Difference Guide",
      title: (c1: string, c2: string) => `${c1} vs ${c2} — HOW TO TELL THEM APART`,
      description: (script: string) => `These two ${script} lookalikes are the most commonly confused characters by Japanese learners. Here is how to distinguish them instantly.`,
      char1Label: "CHARACTER #1",
      char2Label: "CHARACTER #2",
      strokesLabel: "Strokes:",
      standardStrokes: "Standard",
      fullProfileLink: (char: string) => `Full ${char} Profile`,
      keyDifferencesTitle: "Key Anatomical Differences",
      memoryTrickLabel: "GOLDEN MEMORY TRICK:",
      ctaTitle: "DRILL BOTH CHARACTERS IN THE PRACTICE DOJO",
      ctaDesc: "Test your visual reflex. Lock them in with speed drills so you will never mix them up while reading manga or subtitles.",
      ctaBtn: "START DRILL SESSION",
    },
    converter: {
      subtitle: "ROMAJI ⇄ KANA CONVERTER",
      badge: "Free Japanese Utility Tool",
      title: "ROMAJI TO KANA CONVERTER (ローマ字変換)",
      description: "Type romaji or English phonetic letters to instantly convert into Japanese Hiragana and Katakana.",
      inputLabel: "INPUT ROMAJI (LATIN ALPHABET):",
      clearBtn: "Clear",
      placeholder: "Type romaji like 'arigatou', 'sensei', 'tsuki'...",
      smartParticleLabel: "Smart Particle Rule: Convert greeting/particle \"wa\" to \"は\" (e.g. こんにちは, わたし は)",
      grammarStandardBadge: "Grammar standard: ON",
      quickSamplesLabel: "Quick Samples:",
      presetGreetings: "Greetings (konnichiwa)",
      presetTopic: "Topic Particle (watashi wa)",
      presetAnime: "Anime Quote",
      presetSmallTsu: "Small Tsu Test",
      hiraganaHeader: "HIRAGANA (ひらがな)",
      katakanaHeader: "KATAKANA (カタカナ)",
      copied: "Copied!",
      copy: "Copy",
      waitingInput: "Waiting for romaji input...",
      hiraganaFooter: "Native Japanese phonetics & grammar",
      katakanaFooter: "Loanwords, foreign names & onomatopoeia",
      eduTitle: "How Romaji Transliteration Works",
      eduLead: "Rōmaji (ローマ字) is the representation of Japanese speech using the Latin script. This tool automatically maps Hepburn Romanization syllables to standard Kana representations, including:",
      eduRule1: "Double consonants (Sokuon): \"matte\" → まって / マッテ (using small っ / ッ)",
      eduRule2: "Contracted sounds (Yōon): \"kya\", \"shu\", \"cho\" → きゃ, しゅ, ちょ",
      eduRule3: "Topic Particle & Greetings: Although pronounced \"wa\", greetings like \"konnichiwa\" (こんにちは) and standalone topic particles (\"watashi wa\" → わたし は) are historically spelled with は (ha) in standard Japanese grammar.",
      eduRule4: "Singular nasal N: \"konnichiwa\" → こんにちは",
      ctaTitle: "WANT TO READ THESE WITHOUT CONVERTING?",
      ctaDesc: "Train your eyes to recognize Hiragana and Katakana directly in fractions of a second.",
      ctaBtn: "ENTER SAKANA SPEED DRILLS",
    },
    wordsHub: {
      subtitle: "VOCABULARY DIRECTORY",
      breadcrumbWords: "WORDS DIRECTORY",
      badge: "Japanese Core Vocabulary Dictionary",
      title: (count: number) => `JAPANESE CORE VOCABULARY DIRECTORY (${count} WORDS)`,
      description: "Browse elementary Hiragana and Katakana vocabulary words with full pronunciation audio, spelling breakdowns, multilingual definitions, and practice flashcards.",
      jlptN5Btn: (count: number = 105) => `JLPT N5 (${count})`,
      jlptN4Btn: (count: number = 47) => `JLPT N4 (${count})`,
      animePopBtn: (count: number = 9) => `Anime & Pop Culture (${count})`,
      kanaMatrixBtn: "KANA MATRIX",
      lookalikesBtn: "LOOKALIKES",
      allTab: (count: number) => `ALL (${count})`,
      hiraganaTab: "HIRAGANA",
      katakanaTab: "KATAKANA",
      searchPlaceholder: "Search word, romaji, or meaning...",
      breakdownLink: "Breakdown",
      eduTitle: "How to Study Japanese Vocabulary Effectively with SaKana",
      edu1Title: "1. Character Decomposition",
      edu1Desc: "Each vocabulary entry breaks down compound words into their constituent Kana primitives. Mastering individual syllables first makes long anime words instantly recognizable.",
      edu2Title: "2. Native Speech Audio",
      edu2Desc: "Listen to natural Japanese pronunciation audio for every word. Linking auditory memory with visual glyphs reinforces long-term vocabulary retention.",
      edu3Title: "3. Anime Context & Culture",
      edu3Desc: "Our curated dictionary features essential conversational Japanese, loanwords (Gairaigo), and iconic pop-culture vocabulary seen in anime dialogue.",
    },
    wordDetail: {
      breadcrumbHub: "KANA HUB",
      badge: (script: string) => `Japanese Vocabulary Word • ${script}`,
      kanaLabel: "Kana:",
      popCultureBadge: "POP CULTURE / ANIME",
      meaningHeader: "Meaning / Translation",
      exampleSentenceHeader: "Example Sentence with Furigana (文例)",
      breakdownHeader: "Character Breakdown (Spelling Guide)",
      breakdownDesc: "Click any character below to learn its stroke order, audio, and mnemonics:",
      strokeOrderLink: "Stroke Order",
      relatedWordsHeader: (script: string) => `Related ${script} Words`,
      returnBtn: "RETURN TO KANA HUB",
      homophonesHeader: "Kanji Variations & Homophone Disambiguation (同音異義語)",
      homophonesSub: "In Japanese, identical kana readings can represent completely different Kanji with distinct meanings and pitch accents:",
      pitchAccentLabel: "Pitch Accent",
      exampleLabel: "Example",
    },
    jlptCategory: {
      wordsCountHeader: (title: string, count: number) => `${title} (${count} Words)`,
      allWordsBtn: (count: number) => `All ${count} Words →`,
      scriptFilterLabel: "Script:",
      allFilter: "all",
      searchPlaceholder: "Search meaning or romaji...",
      learnWordBtn: "Learn Word",
      noResults: (query: string) => `No words found matching “${query}”.`,
    },
    pdfChart: {
      studyToolsBreadcrumb: "SaKana Japanese Study Tools",
      pdfChartSuffix: "PDF CHART",
      switchChartLink: (label: string) => `Switch to ${label} Chart`,
      generatingPdf: "Generating PDF...",
      downloadPdfBtn: "Download PDF (A4 Landscape)",
      printChartBtn: "Print Chart",
      tipOrientation: "Orientation: Landscape Horizontal",
      tipVariants: "All Variants Included: 46 Gojūon + 20 Dakuon + 5 Handakuon + 33 Yōon",
      tipFree: "100% Free Printable & Study Sheet",
      sheetBrand: "SaKana Japanese",
      sheetTitle: (script: string, jp: string) => `Complete ${script} Chart (全${jp}一覧表)`,
      sheetSub: "A4 Horizontal Layout • All Variants (Gojūon, Dakuon & Yōon)",
      sec1Title: "1. BASIC GOJŪON (五十音 - 46 CHARACTERS)",
      sec1Sub: "Horizontal Table (A - I - U - E - O)",
      rowCol: "Row",
      sec2Title: "2. DAKUON & HANDAKUON (濁音・半濁音 - 25 VOICED SOUNDS)",
      sec2Sub: "Tenten (ﾞ) & Maru (ﾟ)",
      sec3Title: "3. YŌON (拗音 - 33 COMBINATIONS)",
      sec3Sub: "Small ya/yu/yo",
      rootCol: "Root",
      sheetFooterLeft: "© SaKana (魚) Japanese Drill • Free for Personal, Educational & Classroom Use",
      sheetFooterRight: "Practice online at:",
      howToUseTitle: (script: string) => `How to Use This Printable ${script} Chart`,
      howToUseDesc: (script: string) => `Mastering ${script} is step one for Japanese learners. This printable horizontal reference sheet contains all 104+ phonetic variations organized in the standard A-I-U-E-O matrix for convenient desk reference, writing practice, and classroom use.`,
      box1Title: "Basic Gojūon (46 Sounds)",
      box1Desc: "The core foundation of spoken Japanese. Starts with the 5 vowels (A, I, U, E, O) followed by consonant combinations (K, S, T, N, H, M, Y, R, W) plus the singular consonant N (ん/ン).",
      box2Title: "Dakuon & Handakuon (25 Sounds)",
      box2Desc: "Voiced sounds formed by adding dakuten diacritic marks (ﾞ) turning K→G, S→Z, T→D, H→B; or handakuten circle (ﾟ) turning H→P.",
      box3Title: "Yōon Combinations (33 Sounds)",
      box3Desc: "Contracted sounds created by pairing an \"i-column\" kana (like ki, shi, chi) with a subscript small ya, yu, or yo (ゃ/ゅ/ょ or ャ/ュ/ョ).",
      faqTitle: "Frequently Asked Questions",
      faq1Q: "What is the best print settings for this chart?",
      faq1A: "Select Landscape (Horizontal) orientation and A4 or Letter paper size. Ensure \"Background graphics\" is enabled in your browser print dialogue for proper table colors.",
      faq2Q: "Is this PDF chart free to print for teachers and classrooms?",
      faq2A: "Yes, 100% free! You are welcome to print copies for yourself, students, study groups, and classroom handouts.",
      faq3Q: "Should I learn Hiragana or Katakana first?",
      faq3A: "Always start with Hiragana! It is used for native Japanese words, grammatical particles, and verb endings. Once comfortable, transition to Katakana for loanwords and foreign names.",
      interactiveDrillLink: "INTERACTIVE KANA AUDIO DRILL",
      converterLink: "ROMAJI ⇄ KANA CONVERTER",
      lookalikesLink: "LOOKALIKE KANA COMPARISONS",
    },
    docs: {
      subtitle: "API DOCUMENTATION",
      breadcrumbApi: "SAKANA KANA PRIMITIVES API // v1.0",
      apiOverviewBadge: "Kana Primitives API Overview",
      apiOverviewDesc: "The SaKana Public REST API exposes structured Japanese Hiragana and Katakana phonetic datasets. Developers can query characters, romaji transliterations, phonetic groupings (gojūon, dakuon, handakuon, yōon), mnemonic hints, and native audio pronunciation files.",
      baseEndpoint: "Base Endpoint",
      authLabel: "Authentication",
      authValue: "None (Public GET)",
      audioDeliveryLabel: "Audio Delivery",
      audioDeliveryValue: "Native Web Speech / Pronunciation Audio",
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
      footerMeta: "SaKana Public REST API v1.0 • JSON output • Native Audio",
      serverReady: "API SERVER READY",
    },
    webring: {
      title: "WEBRING // FEDERATED NETWORK",
      nodesCount: "[4 NODES]",
      federationHeader: "INDIE WEBRING FEDERATION",
      hoverPrompt: "HOVER BADGE FOR DETAILS // CLICK TO NAVIGATE",
      prev: "« PREV",
      random: "RANDOM",
      next: "NEXT »",
      join: "+ JOIN RING",
      guestbookTag: "(GUESTBOOK)",
      nodes: {
        kurzaginDesc: "System architect, solo developer & builder",
        eteyvatDesc: "Genshin Impact Knowledge Base",
        vxnusDesc: "Creative Technology Studio",
        joinName: "Join Webring",
        joinDesc: "Leave your site link in the guestbook to join",
      },
    },
  },

  id: {
    meta: {
      title: "SaKana",
      sub: "Cara tercepat menguasai Hiragana & Katakana untuk penggemar anime",
    },
    nav: {
      brand: "SaKana",
      home: "BERANDA",
      dashboard: "DASHBOARD",
      study: "BELAJAR",
      kana: "TABEL KANA",
      words: "KOSAKATA",
      about: "TENTANG",
      docs: "DOKUMEN",
      arcade: "ARKADE",
      compare: "PERBANDINGAN",
      converter: "KONVERTER",
      pdfCharts: "BAGAN PDF",
      menu: "MENU",
      close: "TUTUP",
      windowTitle: "SaKana",
      login: "MASUK",
      enter: "MASUK KE DASHBOARD",
      top: "KEMBALI KE BERANDA",
      logout: "KELUAR",
      back: "KEMBALI",
      mainNavigation: "Navigasi Utama",
      selectLanguage: "Pilih bahasa",
      titleBarSub: "魚 SAKANA // LATIHAN CEPAT BAHASA JEPANG",
      online: "AKTIF",
      profile: "PROFIL",
      preferences: "PENGATURAN",
    },
    home: {
      welcomeBadge: "LATIHAN KANA CEPAT UNTUK PENGGEMAR ANIME",
      heroTitle: "魚 SAKANA — Kuasai Kana Jepang untuk Penggemar Anime",
      tagline: "Kuasai Kana Lebih Seru — Khusus Penggemar Anime",
      subTagline: "Tinggalkan hafalan buku teks yang kaku dan tugas menulis rumit. Kuasai Hiragana dan Katakana lewat flashcard cepat, audio penutur asli, dan kata-kata kultur pop Jepang favoritmu.",
      counterLabel: "JUMLAH PELAJAR:",
      liveTag: "[AKTIF!]",
      newsBadge: "INFO",
      startSessionBanner: "MULAI SESI LATIHAN KANA",
      ticker: "LATIHAN KANA AKTIF // KUASAI HIRAGANA & KATAKANA DALAM WAKTU SINGKAT // LATIHAN DENGAN KATA ANIME & KATA SERAPAN // REPETISI BERKALA SM-2 SIAP",
      ctaEnter: "MULAI BELAJAR KANA",
      ctaLogin: "MASUK / SIMPAN PROGRESS",
      ruleTitle: "METODE & PANDUAN",
      ruleTag: "PETUNJUK BELAJAR",
      rule1Title: "Prioritaskan Pengenalan Visual",
      rule1Desc: "Kamu tidak perlu menghabiskan berminggu-minggu melatih goresan di kertas hanya untuk bisa membaca. Kami melatih refleks matamu mengenali karakter secara instan.",
      rule2Title: "Audio Penutur Asli di Setiap Kartu",
      rule2Desc: "Setiap karakter dilengkapi audio penutur asli yang jernih. Kamu mempelajari pelafalan yang tepat sejak awal, menghubungkan bentuk huruf langsung dengan suaranya.",
      rule3Title: "Kultur Nyata & Kata Serapan",
      rule3Desc: "Berlatih dengan kata-kata yang benar-benar kamu temui di dunia anime—mulai dari istilah populer hingga nama dalam Katakana, bukan kosakata buku teks kuno.",
      directoriesTitle: "MATRIKS BELAJAR & DIREKTORI",
      exploreTag: "JELAJAHI",
      kanaTitle: "ALFABET KANA",
      kanaDesc: "Lengkap 46 karakter Gojūon dasar, tabel Dakuon & kombinasi Yōon dengan audio.",
      kanaFullLink: "Pusat Matriks Kana Lengkap",
      hiraganaBasicLink: "Hiragana Dasar (46)",
      katakanaBasicLink: "Katakana Dasar (46)",
      vocabTitle: "KOSAKATA ANIME & INTI",
      vocabDesc: "161 kata: ekspresi ikonik anime, kata serapan, dan kosakata harian penting dengan audio.",
      vocabFullLink: "Direktori 161 Kata",
      jlptN5Link: "Kosakata JLPT N5 (104)",
      animeVocabLink: "Anime & Kultur Pop (9)",
      sakanaWordLink: "さかな (Ikan / SaKana)",
      lookalikeTitle: "PANDUAN HURUF MIRIP",
      lookalikeDesc: "Panduan perbandingan visual berdampingan untuk karakter Jepang yang paling sering tertukar.",
      lookalikeFullLink: "18 Pasang Huruf Mirip",
      shiVsTsuLink: "シ vs ツ (Shi vs Tsu)",
      soVsNLink: "ソ vs ン (So vs N)",
      saVsKiLink: "さ vs き (Sa vs Ki)",
      toolLabel: "Alat Romanisasi Bahasa Jepang Gratis:",
      toolBtn: "Konverter Romaji ⇄ Hiragana & Katakana →",
      faqTitle: "PERTANYAAN YANG SERING DIAJUKAN (FAQ)",
      faqTag: "T&J",
      faq1Q: "Berapa lama waktu yang dibutuhkan untuk menguasai Hiragana dan Katakana?",
      faq1A: "Dengan latihan kecepatan repetisi berkala SaKana yang mengutamakan pengenalan visual, sebagian besar pemula menghafal seluruh 46 Hiragana dasar dan 46 Katakana dalam 3 hingga 7 hari, cukup 10–15 menit per hari.",
      faq2Q: "Mengapa Katakana sangat penting bagi penggemar anime?",
      faq2A: "Katakana digunakan di seluruh budaya pop Jepang: nama karakter (ナルト, ルフィ), nama jurus, istilah sci-fi, kata serapan asing (ヒーロー, アニメ), serta efek suara onomatope manga (ドドド, ゴゴゴ).",
      faq3Q: "Apa yang membedakan SaKana dari aplikasi buku teks tradisional?",
      faq3A: "Aplikasi tradisional memperlambatmu dengan tes menulis urutan goresan yang kaku. SaKana berfokus pada pengenalan visual bawah sadar secara instan, audio pelafalan native yang akurat, panduan perbandingan huruf mirip (seperti シ vs ツ), dan kosakata praktis dari dialog anime nyata.",
      footerStatus: "SAKANA SIAP",
      footerTagline: "PROYEK SAKANA // LATIHAN CEPAT KANA UNTUK PENGGEMAR ANIME",
      footerEncoding: "UTF-8 // MULTIBAHASA",
    },
    about: {
      windowTitle: "Tentang SaKana",
      badge: "CATATAN SEDERHANA & ARAH PENGEMBANGAN",
      sloganSub: "Ayo mulai belajar Kana",
      sloganNote: "Langkah kecil yang ramah bagi siapa saja yang ingin menikmati pop culture Jepang secara alami.",
      whatIsTitle: "Apa Sebenarnya SaKana (魚)?",
      whatIsTag: "TENTANG SAKANA",
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
        voicevoxTrans: "A, I, U, E, O. Pengenalan parameter audio sedang berlangsung.",
        animeTitle: "Penggalan Adegan Anime",
        animeDesc: "Belajar membaca kalimat dan dialog berkesan langsung dalam konteks cerita anime yang familiar.",
        animeSpeaker: "Dialog Anime Klasik",
        animeTrans: "Kalau kamu menyerah sekarang, pertandingannya sudah berakhir...?",
        vtuberXTitle: "Bahasa Kasual dari Cuitan X VTuber",
        vtuberXDesc: "Mengenal cara penutur asli bertutur sehari-hari, slang ramah, dan percakapan santai di linimasa X.",
        vtuberXTrans: "Pagi semuanya~! Nanti jam 20:00 JST ada stream nyanyi! Mampir yuk!",
        vtuberVoiceTitle: "Simulasi Panggilan Suara yang Hangat",
        vtuberVoiceDesc: "Pengalaman mendengarkan rekaman panggilan suara santai untuk melatih keberanian menyimak tanpa rasa cemas.",
        vtuberVoiceSpeaker: "Panggilan Suara Masuk • 00:14",
        vtuberVoiceTrans: "Halo? Kedengaran suaraku? ...Syukurlah! Ada waktu sebentar buat ngobrol sekarang?",
        vtuberAsmrTitle: "VTuber ASMR Disertai Penanda Waktu (Timestamp)",
        vtuberAsmrDesc: "Mendengarkan bisikan lembut dengan teks transkrip bertanda waktu yang sinkron, sehingga mudah diikuti.",
        vtuberAsmrSpeaker: "Saluran Bisikan Binaural",
        vtuberAsmrTrans: "[01:23] Kamu sudah bekerja keras hari ini... istirahatlah yang nyenyak malam ini.",
        eduPostTitle: "Tips Bermanfaat & Serba-serbi dari X Jepang",
        eduPostDesc: "Catatan kecil penuh manfaat dan nuansa budaya nyata yang dibagikan oleh penutur asli Jepang di X.",
        eduPostSpeaker: "Tips Bahasa Jepang Hari Ini • Postingan X",
        eduPostRomaji: "[Trivia] 'Kekkou desu' bisa berarti Ya atau Tidak tergantung nada dan konteksnya!",
        eduPostTrans: "Nuansa penutur asli dijelaskan secara ringkas lewat cuitan asli bahasa Jepang.",
      },
      currentFeaturesTitle: "Fitur Saat Ini (Sudah Dapat Digunakan)",
      currentFeaturesDesc: "Semua modul dan sarana latihan yang sudah aktif dan bisa kamu gunakan di SaKana saat ini:",
      futureFeaturesTitle: "Rencana Fitur Masa Depan (Sedang Dikembangkan)",
      futureFeaturesDesc: "Eksplorasi interaktif media nyata yang sedang kami siapkan untuk melengkapi latihan flashcard:",
      roadmapBadge: "PETA JALAN // SEDANG DIKEMBANGKAN",
      currentList: {
        srsTitle: "Flashcard Interval Memori (SRS SM-2)",
        srsDesc: "Metode repetisi terjadwal secara ilmiah dilengkapi visual mnemonik, pelafalan audio, dan kosakata nyata bahasa Jepang.",
        sprintTitle: "Uji Refleks Cepat (Speed Challenge)",
        sprintDesc: "Tantangan berbatas waktu di bawah 15 detik untuk melatih refleks membaca instan, dilengkapi jeda otomatis timer saat soal audio diputar.",
        bidirectionalTitle: "Ujian Multimodal (Kana ⇄ Romaji & Soal Audio)",
        bidirectionalDesc: "Pertanyaan tes acak menguji pengenalan visual (Kana ➔ Romaji), ingatan aktif (Romaji ➔ Kana), serta soal pendengaran opsional (Audio ➔ Kana & Audio ➔ Romaji).",
        stagesTitle: "Sektor Belajar Bertahap (The Shallows hingga The Reef)",
        stagesDesc: "Kurikulum terstruktur melalui 24+ stage mulai dari Hiragana dasar, Katakana, hingga kata serapan anime & budaya pop.",
        kanaDirectoryTitle: "Matriks Lengkap Kana & 436+ Profil Karakter",
        kanaDirectoryDesc: "Direktori fonetik menyeluruh (Gojūon, Dakuon, Handakuon, Yōon) dilengkapi jumlah goresan, mnemonik visual, pelafalan audio, dan contoh kosakata dasar.",
        categoryHubsTitle: "Portal Kategori Khusus (Gojūon, Dakuon, Yōon, Extended)",
        categoryHubsDesc: "Halaman khusus per kelompok bunyi dengan roster karakter lengkap, penjelasan fonetik, audio, dan sistem klasifikasi alfabet.",
        vocabularyDirectoryTitle: "Kamus Kosakata Inti & Populer Anime (160+ Kata)",
        vocabularyDirectoryDesc: "Halaman profil tiap kata Jepang dengan pelafalan audio asli, dekonstruksi karakter pembentuknya, arti kata, dan trivia budaya pop.",
        kanaCompareTitle: "18 Panduan Perbandingan Huruf Mirip (シ vs ツ, さ vs き, ソ vs ン)",
        kanaCompareDesc: "Analisis arah goresan, sudut kelengkungan, dan trik memori visual untuk membedakan huruf Jepang yang sering tertukar.",
        romajiConverterTitle: "Alat Konversi Real-Time Romaji ⇄ Kana",
        romajiConverterDesc: "Transliterasi instan teks alfabet Latin ke huruf Hiragana dan Katakana dengan penanganan otomatis konsonan ganda (sokuon) dan bunyi kombinasi.",
        minigameTitle: "Arkade Intermezzo 30-Kana Adaptif (Bonus Stage)",
        minigameDesc: "Mode refleks cepat kumulatif yang terbuka setiap 2 Bos (dan bisa dimainkan bebas dari Dashboard). Mengumpulkan seluruh huruf yang sudah dibuka, memprioritaskan huruf yang sering salah, dan mengistirahatkan huruf yang sudah 100% dikuasai.",
        bilingualTitle: "Dukungan Tiga Bahasa (EN / ID / JA)",
        bilingualDesc: "Kemudahan beralih bahasa antar Inggris, Indonesia, dan Jepang dalam tampilan antarmuka yang bersih dan fokus.",
      },
      roadmapTitle: "Filosofi Sederhana Kami",
      roadmapDesc: "Belajar semestinya tidak terasa seperti ujian yang menegangkan. Dengan mengesampingkan beban menulis terlebih dahulu dan menikmati media yang kamu sukai, kemampuan membaca akan terbentuk perlahan tapi pasti.",
      backBtn: "<< Kembali ke Dashboard",
      footerStatus: "ARSITEKTUR SAKANA // SIAP",
      footerSub: "AUDIO JEPANG NATIVE & SRS SM-2",
      footerRight: "SISTEM INTERAKTIF",
    },
    login: {
      windowTitle: "Autentikasi",
      appTitle: "SaKana Autentikasi",
      instruction: "Masuk atau buat akun untuk menyimpan dan menyinkronkan progres belajar di berbagai perangkat.",
      signInTab: "MASUK",
      signUpTab: "BUAT AKUN",
      emailLabel: "ALAMAT EMAIL:",
      displayNameLabel: "NAMA TAMPILAN (OPSIONAL):",
      passwordLabel: "KATA SANDI:",
      submit: "MASUK DENGAN EMAIL",
      signUpSubmit: "DAFTAR AKUN",
      submitting: "MEMPROSES...",
      authSuccessMsg: "Autentikasi berhasil! Mengalihkan...",
      signUpCheckEmailTitle: "LINK VERIFIKASI TERKIRIM!",
      signUpCheckEmailDesc: "Kami telah mengirim tautan konfirmasi ke email kamu. Silakan klik tautan tersebut untuk mengaktifkan akun.",
      checkSpamNotice: "Penting: Jika email belum muncul dalam 1-2 menit, periksa folder Spam / Junk kamu.",
      emailConfirmedMsg: "Email berhasil diverifikasi! Sekarang kamu bisa masuk.",
      goToSignInBtn: "→ LANJUT KE HALAMAN MASUK",
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
      sec1Title: "HIRAGANA",
      sec1Sub: "FONETIK DASAR",
      sec2Title: "KATAKANA",
      sec2Sub: "KATA SERAPAN & BUNYI KHUSUS",
      sec3Title: "KATA",
      sec3Sub: "KOSAKATA INTI",
      statusDone: "[SELESAI]",
      statusReady: "[SIAP]",
      statusLocked: "[TERKUNCI]",
      statusWon: "LULUS",
      statusBoss: "BOS",
      optionalDrillBadge: "LATIHAN OPSIONAL",
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
      footerTagline: "LATIHAN KECEPATAN MEMORI SRS MULTIBAHASA",
      footerReady: "UTF-8 // SIAP",
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
      newBadge: "[BARU]",
      hotkeyHint: "[ SPASI: BALIK // 1-4: NILAI ]",
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
      srsDueReviewsTitle: "Review SRS Jatuh Tempo",
      dailyRetentionQueue: "Antrean Retensi Harian",
      srsAllCaughtUpDesc: "Semua memori karakter berada dalam jadwal aman. Kartu baru akan muncul di sini saat tiba waktunya.",
      footerSrsReviews: "REVIEW SRS:",
      footerLapses: "ULANGI:",
    },
    test: {
      windowTitle: "Uji Kecepatan",
      testBadge: "UJI REFLEKS CEPAT DENGAN TIMER",
      timeRemaining: "SISA WAKTU",
      questionProgress: "SOAL",
      targetSpeed: "TARGET WAKTU",
      choosePrompt: "[ Tekan 1-4 atau Klik Jawaban ]",
      kanaToRomajiBadge: "Kana ➔ Romaji",
      romajiToKanaBadge: "Romaji ➔ Kana",
      audioToKanaBadge: "Audio ➔ Kana",
      audioToRomajiBadge: "Audio ➔ Romaji",
      audioListeningPrompt: "Dengarkan audio dengan saksama...",
      audioReplayBtn: "Ulangi Audio [R]",
      audioPlayingStatus: "MEMUTAR (TIMER JEDA)",
      audioReadyStatus: "JAWAB SEKARANG (TIMER BERJALAN)",
      audioQuestionToggle: "SOAL AUDIO",
      audioQuestionsOn: "AUDIO: NYALA",
      audioQuestionsOff: "AUDIO: MATI",
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
      lockedCode: "[403 TERKUNCI]",
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
      accuracyTargetVal: "< 1.5 dtk / kana",
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
      lookalikeBtn: "PERBANDINGAN HURUF MIRIP (シ vs ツ, さ vs き)",
      hiraganaPdfBtn: "BAGAN PDF HIRAGANA (HORIZONTAL)",
      katakanaPdfBtn: "BAGAN PDF KATAKANA (HORIZONTAL)",
      browseCategoriesLabel: "Telusuri Kategori:",
      hiraganaGojuonBadge: "Hiragana Gojūon (46)",
      hiraganaDakuonBadge: "Hiragana Dakuon (20)",
      hiraganaYoonBadge: "Hiragana Yōon (33)",
      katakanaGojuonBadge: "Katakana Gojūon (46)",
      katakanaExtendedBadge: "Katakana Tambahan (10)",
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
      faqTitle: "Tanya Jawab Seputar Belajar Kana",
      faq1Q: "Haruskah saya belajar Hiragana atau Katakana terlebih dahulu?",
      faq1A: "Mulailah dengan Hiragana untuk memahami tata bahasa inti, partikel, dan bunyi dasar bahasa Jepang. Lanjutkan segera dengan Katakana agar kamu bisa membaca efek suara manga, judul anime modern, dan kata serapan asing tanpa ragu.",
      faq2Q: "Bagaimana cara menghindari tertukarnya karakter yang mirip?",
      faq2ABefore: "Karakter seperti シ (shi) vs ツ (tsu) atau さ (sa) vs き (ki) memiliki bentuk serupa. Kunjungi ",
      faq2ALink: "Pusat Perbandingan Huruf Mirip",
      faq2AAfter: " kami untuk melihat analisis arah goresan berdampingan dan trik memori visual.",
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
      originTitle: "Akar Kanji Historis (万葉仮名)",
      evolvedFromKanji: (kanji: string, reading: string) => `Berasal dari Kanji: ${kanji} (${reading})`,
      originFooter: "Karakter sumber kuno dari tradisi kaligrafi Jepang.",
      elementaryVocabTitle: "Contoh Kosakata Dasar",
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
    kanaCategory: {
      breadcrumbHub: "PUSAT KANA",
      countBadge: (count: number) => `JUMLAH: ${count} KARAKTER`,
      aboutSetTitle: "Tentang Kelompok Karakter Ini",
      rosterTitle: "Daftar Karakter",
      rosterHint: "Klik karakter mana saja untuk melihat urutan goresan dan pelafalan",
      returnBtn: "KEMBALI KE PUSAT KANA",
    },
    compareHub: {
      subtitle: "PERBANDINGAN KANA",
      badge: "Pusat Analisis Huruf Mirip",
      title: "PERBANDINGAN KANA JEPANG & HURUF MIRIP",
      description: "Sering tertukar antara Katakana シ dan ツ? Atau Hiragana さ dan き? Pilih pasangan karakter di bawah untuk analisis anatomi bentuk dan trik menghafalnya.",
      compareAction: "Bandingkan",
      eduTitle: "Rahasia Membedakan Huruf Kana Jepang yang Mirip",
      edu1Title: "Arah Goresan & Kemiringan",
      edu1Desc: "Dalam Katakana, karakter seperti シ (shi) dan ツ (tsu) dibedakan dari arah goresannya: shi ditulis dari bawah ke atas dengan titik sejajar secara vertikal di kiri, sedangkan tsu ditulis dari atas ke bawah dengan titik berjajar horizontal di bagian atas.",
      edu2Title: "Variasi Lengkungan & Ekor Akhir",
      edu2Desc: "Pada pasangan Hiragana seperti れ (re), わ (wa), dan ね (ne), goresan kiri awalnya identik, namun ekor akhirnya membedakan ketiganya: re melengkung keluar, wa melengkung bulat ke dalam, dan ne membentuk simpul melingkar di ujung.",
    },
    compareDetail: {
      subtitle: (c1: string, c2: string) => `${c1} VS ${c2} // PERBANDINGAN`,
      backToMatrix: "KEMBALI KE MATRIKS KANA",
      badge: "Panduan Perbedaan Visual",
      title: (c1: string, c2: string) => `${c1} vs ${c2} — CARA MEMBEDAKAN KEDUANYA`,
      description: (script: string) => `Kedua karakter ${script} yang mirip ini paling sering membingungkan pelajar bahasa Jepang. Berikut cara membedakannya secara instan.`,
      char1Label: "KARAKTER #1",
      char2Label: "KARAKTER #2",
      strokesLabel: "Goresan:",
      standardStrokes: "Standar",
      fullProfileLink: (char: string) => `Profil Lengkap ${char}`,
      keyDifferencesTitle: "Perbedaan Anatomi Utama",
      memoryTrickLabel: "TRIK INGATAN UTAMA:",
      ctaTitle: "LATIH KEDUA KARAKTER DI DOJO LATIHAN",
      ctaDesc: "Uji refleks visualmu. Kuasai perbedaannya lewat latihan kecepatan agar tidak pernah tertukar lagi saat membaca manga atau subtitle.",
      ctaBtn: "MULAI SESI LATIHAN",
    },
    converter: {
      subtitle: "KONVERTER ROMAJI ⇄ KANA",
      badge: "Alat Bantu Bahasa Jepang Gratis",
      title: "KONVERTER ROMAJI KE KANA (ローマ字変換)",
      description: "Ketik romaji atau huruf alfabet Latin untuk langsung mengubahnya menjadi Hiragana dan Katakana Jepang.",
      inputLabel: "MASUKKAN ROMAJI (ALFABET LATIN):",
      clearBtn: "Hapus",
      placeholder: "Ketik romaji seperti 'arigatou', 'sensei', 'tsuki'...",
      smartParticleLabel: "Aturan Partikel Cerdas: Ubah sapaan/partikel \"wa\" menjadi \"は\" (mis. こんにちは, わたし は)",
      grammarStandardBadge: "Standar tata bahasa: AKTIF",
      quickSamplesLabel: "Contoh Cepat:",
      presetGreetings: "Sapaan (konnichiwa)",
      presetTopic: "Partikel Topik (watashi wa)",
      presetAnime: "Kutipan Anime",
      presetSmallTsu: "Tes Tsu Kecil",
      hiraganaHeader: "HIRAGANA (ひらがな)",
      katakanaHeader: "KATAKANA (カタカナ)",
      copied: "Tersalin!",
      copy: "Salin",
      waitingInput: "Menunggu masukan romaji...",
      hiraganaFooter: "Fonetik & tata bahasa asli Jepang",
      katakanaFooter: "Kata serapan, nama asing & onomatope",
      eduTitle: "Cara Kerja Transliterasi Romaji",
      eduLead: "Rōmaji (ローマ字) adalah representasi bunyi bahasa Jepang menggunakan aksara Latin. Alat ini secara otomatis memetakan suku kata Romanisasi Hepburn ke bentuk Kana standar, termasuk:",
      eduRule1: "Konsonan ganda (Sokuon): \"matte\" → まって / マッテ (menggunakan っ / ッ kecil)",
      eduRule2: "Bunyi gabungan (Yōon): \"kya\", \"shu\", \"cho\" → きゃ, しゅ, ちょ",
      eduRule3: "Partikel Topik & Sapaan: Meskipun dilafalkan \"wa\", sapaan seperti \"konnichiwa\" (こんにちは) dan partikel topik (\"watashi wa\" → わたし は) secara historis ditulis dengan は (ha) dalam tata bahasa Jepang standar.",
      eduRule4: "Konsonan sengau N tunggal: \"konnichiwa\" → こんにちは",
      ctaTitle: "INGIN BISA MEMBACA INI TANPA KONVERSI?",
      ctaDesc: "Latih matamu untuk mengenali Hiragana dan Katakana secara langsung dalam hitungan sepersekian detik.",
      ctaBtn: "MASUK KE LATIHAN CEPAT SAKANA",
    },
    wordsHub: {
      subtitle: "DIREKTORI KOSAKATA",
      breadcrumbWords: "DIREKTORI KOSAKATA",
      badge: "Kamus Kosakata Inti Bahasa Jepang",
      title: (count: number) => `DIREKTORI KOSAKATA INTI JEPANG (${count} KATA)`,
      description: "Jelajahi kosakata dasar Hiragana dan Katakana lengkap dengan audio pelafalan, rincian ejaan per karakter, arti multibahasa, dan flashcard latihan.",
      jlptN5Btn: (count: number = 105) => `JLPT N5 (${count})`,
      jlptN4Btn: (count: number = 47) => `JLPT N4 (${count})`,
      animePopBtn: (count: number = 9) => `Anime & Kultur Pop (${count})`,
      kanaMatrixBtn: "MATRIKS KANA",
      lookalikesBtn: "HURUF MIRIP",
      allTab: (count: number) => `SEMUA (${count})`,
      hiraganaTab: "HIRAGANA",
      katakanaTab: "KATAKANA",
      searchPlaceholder: "Cari kata, romaji, atau arti...",
      breakdownLink: "Rincian",
      eduTitle: "Cara Efektif Belajar Kosakata Jepang dengan SaKana",
      edu1Title: "1. Dekomposisi Karakter",
      edu1Desc: "Setiap entri kosakata menguraikan kata majemuk menjadi karakter Kana pembentuknya. Menguasai tiap suku kata terlebih dahulu membuat kata panjang dalam anime langsung mudah dikenali.",
      edu2Title: "2. Audio Suara Penutur Asli",
      edu2Desc: "Dengarkan audio pelafalan bahasa Jepang alami untuk setiap kata. Menghubungkan ingatan pendengaran dengan bentuk visual memperkuat daya ingat kosakata jangka panjang.",
      edu3Title: "3. Konteks Anime & Budaya",
      edu3Desc: "Kamus terkurasi kami mencakup bahasa Jepang percakapan penting, kata serapan (Gairaigo), dan kosakata kultur pop ikonik yang sering muncul dalam dialog anime.",
    },
    wordDetail: {
      breadcrumbHub: "PUSAT KANA",
      badge: (script: string) => `Kosakata Bahasa Jepang • ${script}`,
      kanaLabel: "Kana:",
      popCultureBadge: "KULTUR POP / ANIME",
      meaningHeader: "Arti / Terjemahan",
      exampleSentenceHeader: "Contoh Kalimat dengan Furigana (文例)",
      breakdownHeader: "Rincian Karakter (Panduan Ejaan)",
      breakdownDesc: "Klik karakter mana saja di bawah untuk mempelajari urutan goresan, audio, dan mnemoniknya:",
      strokeOrderLink: "Urutan Goresan",
      relatedWordsHeader: (script: string) => `Kosakata ${script} Terkait`,
      returnBtn: "KEMBALI KE PUSAT KANA",
      homophonesHeader: "Variasi Kanji & Pembedaan Homofon (同音異義語)",
      homophonesSub: "Dalam bahasa Jepang, bunyi kana yang sama persis dapat ditulis dengan Kanji berbeda yang memiliki arti dan tinggi-rendah nada (pitch accent) berbeda:",
      pitchAccentLabel: "Pitch Accent (Aksen Nada)",
      exampleLabel: "Contoh",
    },
    jlptCategory: {
      wordsCountHeader: (title: string, count: number) => `${title} (${count} Kata)`,
      allWordsBtn: (count: number) => `Semua ${count} Kata →`,
      scriptFilterLabel: "Aksara:",
      allFilter: "semua",
      searchPlaceholder: "Cari arti atau romaji...",
      learnWordBtn: "Pelajari Kata",
      noResults: (query: string) => `Tidak ditemukan kata yang cocok dengan “${query}”.`,
    },
    pdfChart: {
      studyToolsBreadcrumb: "Alat Belajar Bahasa Jepang SaKana",
      pdfChartSuffix: "BAGAN PDF",
      switchChartLink: (label: string) => `Beralih ke Bagan ${label}`,
      generatingPdf: "Membuat PDF...",
      downloadPdfBtn: "Unduh PDF (A4 Mendatar)",
      printChartBtn: "Cetak Bagan",
      tipOrientation: "Orientasi: Mendatar (Landscape)",
      tipVariants: "Semua Variasi Lengkap: 46 Gojūon + 20 Dakuon + 5 Handakuon + 33 Yōon",
      tipFree: "100% Lembar Belajar & Cetak Gratis",
      sheetBrand: "SaKana Japanese",
      sheetTitle: (script: string, jp: string) => `Bagan Lengkap ${script} (全${jp}一覧表)`,
      sheetSub: "Tata Letak A4 Horizontal • Semua Variasi (Gojūon, Dakuon & Yōon)",
      sec1Title: "1. GOJŪON DASAR (五十音 - 46 KARAKTER)",
      sec1Sub: "Tabel Horizontal (A - I - U - E - O)",
      rowCol: "Baris",
      sec2Title: "2. DAKUON & HANDAKUON (濁音・半濁音 - 25 BUNYI BERSUARA)",
      sec2Sub: "Tenten (ﾞ) & Maru (ﾟ)",
      sec3Title: "3. YŌON (拗音 - 33 KOMBINASI)",
      sec3Sub: "ya/yu/yo kecil",
      rootCol: "Dasar",
      sheetFooterLeft: "© SaKana (魚) Japanese Drill • Gratis untuk Penggunaan Pribadi, Edukasi & Kelas",
      sheetFooterRight: "Latihan online di:",
      howToUseTitle: (script: string) => `Cara Menggunakan Bagan Cetak ${script} Ini`,
      howToUseDesc: (script: string) => `Menguasai ${script} adalah langkah pertama bagi pelajar bahasa Jepang. Lembar referensi horizontal siap cetak ini memuat seluruh 104+ variasi fonetik yang disusun dalam matriks standar A-I-U-E-O untuk referensi meja belajar, latihan menulis, dan penggunaan di kelas.`,
      box1Title: "Gojūon Dasar (46 Bunyi)",
      box1Desc: "Fondasi utama bahasa Jepang lisan. Dimulai dengan 5 vokal (A, I, U, E, O) diikuti kombinasi konsonan (K, S, T, N, H, M, Y, R, W) serta konsonan tunggal N (ん/ン).",
      box2Title: "Dakuon & Handakuon (25 Bunyi)",
      box2Desc: "Bunyi bersuara yang dibentuk dengan menambahkan tanda diakritik dakuten (ﾞ) yang mengubah K→G, S→Z, T→D, H→B; atau lingkaran handakuten (ﾟ) yang mengubah H→P.",
      box3Title: "Kombinasi Yōon (33 Bunyi)",
      box3Desc: "Bunyi gabungan yang dibuat dengan memasangkan kana kolom-i (seperti ki, shi, chi) dengan huruf kecil ya, yu, atau yo (ゃ/ゅ/ょ atau ャ/ュ/ョ).",
      faqTitle: "Pertanyaan yang Sering Diajukan",
      faq1Q: "Apa pengaturan cetak terbaik untuk bagan ini?",
      faq1A: "Pilih orientasi Landscape (Mendatar) dan ukuran kertas A4 atau Letter. Pastikan opsi \"Background graphics\" (Grafis latar belakang) diaktifkan pada dialog cetak browser agar warna tabel tampil rapi.",
      faq2Q: "Apakah bagan PDF ini gratis dicetak untuk guru dan ruang kelas?",
      faq2A: "Ya, 100% gratis! Kamu bebas mencetak salinan untuk diri sendiri, siswa, kelompok belajar, maupun materi kelas.",
      faq3Q: "Haruskah saya belajar Hiragana atau Katakana terlebih dahulu?",
      faq3A: "Selalu mulai dengan Hiragana! Aksara ini digunakan untuk kosakata asli Jepang, partikel tata bahasa, dan akhiran kata kerja. Setelah lancar, lanjutkan ke Katakana untuk kata serapan dan nama asing.",
      interactiveDrillLink: "LATIHAN AUDIO KANA INTERAKTIF",
      converterLink: "KONVERTER ROMAJI ⇄ KANA",
      lookalikesLink: "PERBANDINGAN HURUF KANA MIRIP",
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
      audioDeliveryValue: "Web Speech Native / Audio Pelafalan",
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
      footerMeta: "API Publik REST SaKana v1.0 • Output JSON • Audio Native",
      serverReady: "SERVER API SIAP",
    },
    webring: {
      title: "WEBRING // JARINGAN FEDERASI",
      nodesCount: "[4 SIMPUL]",
      federationHeader: "FEDERASI WEBRING INDIE",
      hoverPrompt: "ARAHKAN KURSOR KE BADGE UNTUK DETAIL // KLIK UNTUK MENGUNJUNGI",
      prev: "« SEBELUMNYA",
      random: "ACAK",
      next: "BERIKUTNYA »",
      join: "+ GABUNG RING",
      guestbookTag: "(BUKU TAMU)",
      nodes: {
        kurzaginDesc: "Arsitek sistem, pengembang solo & kreator",
        eteyvatDesc: "Basis Pengetahuan Genshin Impact",
        vxnusDesc: "Studio Teknologi Kreatif",
        joinName: "Gabung Webring",
        joinDesc: "Tinggalkan tautan situsmu di buku tamu untuk bergabung",
      },
    },
  },

  ja: {
    meta: {
      title: "SaKana",
      sub: "アニメファンのための最速「かな文字」学習ドリル",
    },
    nav: {
      brand: "SaKana",
      home: "ホーム",
      dashboard: "道場",
      study: "修練",
      kana: "五十音図",
      words: "単語集",
      about: "概要",
      docs: "解説書",
      arcade: "アーケード",
      compare: "比較",
      converter: "変換ツール",
      pdfCharts: "PDF一覧表",
      menu: "メニュー",
      close: "閉じる",
      windowTitle: "SaKana",
      login: "ログイン",
      enter: "道場へ入る",
      top: "トップへ戻る",
      logout: "ログアウト",
      back: "戻る",
      mainNavigation: "メインナビゲーション",
      selectLanguage: "言語を選択",
      titleBarSub: "魚 SAKANA // 日本語かな反射速読ドリル",
      online: "稼働中",
      profile: "プロフィール",
      preferences: "設定",
    },
    home: {
      welcomeBadge: "アニメファンのための「かな文字」瞬時認識ドリル",
      heroTitle: "魚 SAKANA — アニメファンのための日本語かな最速習得ドリル",
      tagline: "楽しく覚える、アニメファンのための「かな」学習",
      subTagline: "退屈なテキスト練習や手書きの宿題はもういりません。テンポの良いカード学習、クリアなネイティブ音声、大好きなポップカルチャーの言葉でひらがな・カタカナを楽しく身につけます。",
      counterLabel: "学習者数:",
      liveTag: "【稼働中！】",
      newsBadge: "お知らせ",
      startSessionBanner: "かな文字ドリルセッションを開始",
      ticker: "かなドリル稼働中 // 最速でひらがな＆カタカナを完全攻略 // アニメ頻出単語や外来語で実践演習 // SM-2記憶スケジューラ待機中",
      ctaEnter: "かな学習を始める",
      ctaLogin: "ログイン / 進捗保存",
      ruleTitle: "学習の心得とルール",
      ruleTag: "学習ルール",
      rule1Title: "まずは視覚的な瞬時認識から",
      rule1Desc: "文字を読めるようになるために、何週間も手書きノートを埋める必要はありません。まずはパッと見て瞬時に文字が浮かぶ視覚反射を鍛えます。",
      rule2Title: "全カードにネイティブ音声を完備",
      rule2Desc: "すべての文字にクリアで自然なネイティブ発音音声が付いています。初日から正確な音に触れることで、文字と発音をスムーズに脳に定着させます。",
      rule3Title: "生きたカルチャーと外来語で学ぶ",
      rule3Desc: "教科書の硬い単語ではなく、アニメの定番表現やカタカナのキャラクター名・外来語など、本当に興味のある言葉で楽しく語彙を広げます。",
      directoriesTitle: "学習マトリクス＆各種ディレクトリ",
      exploreTag: "探求",
      kanaTitle: "かな文字五十音図",
      kanaDesc: "基本46文字の清音、濁音・半濁音、拗音の一覧表とネイティブ発音音声。",
      kanaFullLink: "五十音図マトリクス総合ハブ",
      hiraganaBasicLink: "ひらがな基本46文字",
      katakanaBasicLink: "カタカナ基本46文字",
      vocabTitle: "アニメ＆基礎重要単語",
      vocabDesc: "全161語：アニメの定番表現、外来語、日常の重要基礎単語を音声付きで収録。",
      vocabFullLink: "全161語 単語ディレクトリ",
      jlptN5Link: "JLPT N5 必須単語 (104)",
      animeVocabLink: "アニメ＆ポップカルチャー語彙 (9)",
      sakanaWordLink: "さかな (魚 / SaKana)",
      lookalikeTitle: "紛らわしい文字の比較ガイド",
      lookalikeDesc: "間違いやすい日本語のかな文字ペアを並べて見分ける視覚徹底ガイド。",
      lookalikeFullLink: "紛らわしい文字 全18組",
      shiVsTsuLink: "シ vs ツ (Shi vs Tsu)",
      soVsNLink: "ソ vs ン (So vs N)",
      saVsKiLink: "さ vs き (Sa vs Ki)",
      toolLabel: "無料ローマ字変換ツール:",
      toolBtn: "ローマ字 ⇄ ひらがな・カタカナ変換ツール →",
      faqTitle: "よくある質問 (FAQ)",
      faqTag: "Q&A",
      faq1Q: "ひらがなとカタカナを覚えるのにどのくらい時間がかかりますか？",
      faq1A: "SaKanaの「視覚認識優先」間隔反復ドリルなら、1日わずか10〜15分の練習で、多くの初心者が3〜7日以内に基本のひらがな46文字とカタカナ46文字を習得しています。",
      faq2Q: "アニメファンにとって特にカタカナが重要なのはなぜですか？",
      faq2A: "日本のポップカルチャーでは、キャラクター名（ナルト、ルフィ）、必殺技、SF用語、外来語（ヒーロー、アニメ）、そしてマンガの迫力ある擬音語（ドドド、ゴゴゴ）など、あらゆる場面でカタカナが使われているからです。",
      faq3Q: "従来の教科書型アプリとSaKanaは何が違いますか？",
      faq3A: "従来のアプリは厳密な手書き筆順テストで学習ペースを遅らせがちです。SaKanaは瞬時の視覚認識反射、クリアなネイティブ音声、紛らわしい文字の比較解説（シ vs ツなど）、そして実際のアニメの台詞で登場する生きた語彙に特化しています。",
      footerStatus: "SAKANA 稼働中",
      footerTagline: "SAKANA PROJECT // アニメファンのためのかな文字高速ドリル",
      footerEncoding: "UTF-8 // 多言語対応",
    },
    about: {
      windowTitle: "SaKanaについて",
      badge: "小さな一歩とこれからの歩み",
      sloganSub: "さ、仮名を始めよう",
      sloganNote: "大好きな日本のポップカルチャーを、気負わず自然に楽しみたいすべての人へ。",
      whatIsTitle: "そもそも「SaKana（魚）」とは？",
      whatIsTag: "SAKANAについて",
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
        voicevoxTrans: "あ、い、う、え、お。音声パラメータの認識を行っています。",
        animeTitle: "心に残るアニメの短いひとコマ",
        animeDesc: "大好きな作品の名台詞や字幕の断片を、実際の文脈とともにやさしく読み解く練習です。",
        animeSpeaker: "名作アニメの台詞",
        animeTrans: "ここで諦めたら、そこで試合終了ですよ…？",
        vtuberXTitle: "VTuberの日常ポストに触れる",
        vtuberXDesc: "SNSならではのくだけた口語表現や親しみやすいスラングから、生のコミュニケーションを感じてみましょう。",
        vtuberXTrans: "みんなおはよ〜！今日の20時から歌枠やるよ！遊びにきてね！",
        vtuberVoiceTitle: "あたたかい通話体験のシミュレーション",
        vtuberVoiceDesc: "録音ボイスコールを通じて、緊張せず自分のペースで聴き取るリスニングの小さな練習です。",
        vtuberVoiceSpeaker: "着信ボイスコール • 00:14",
        vtuberVoiceTrans: "もしもし？聞こえる？…よかった！今ちょっとだけお話できるかな？",
        vtuberAsmrTitle: "タイムスタンプ付きのASMRリスニング",
        vtuberAsmrDesc: "バイノーラルの囁き声と、秒単位で連動したテキスト。どこを読んでいるか迷わず安心して聴けます。",
        vtuberAsmrSpeaker: "バイノーラル囁きフィード",
        vtuberAsmrTrans: "[01:23] 今日も一日お疲れ様でした…ゆっくり休んでね。",
        eduPostTitle: "ネイティブが教えてくれる日本語の小さな豆知識",
        eduPostDesc: "X上で発信されている、言葉の微妙なニュアンスや文化のちょっとした知恵を教材としてお届けします。",
        eduPostSpeaker: "今日の日本語豆知識 • Xポスト",
        eduPostRomaji: "【豆知識】「結構です」は文脈やトーンによって「はい」にも「いいえ（不要）」にもなります！",
        eduPostTrans: "ネイティブならではの自然なニュアンスを実際のポスト形式で解説。",
      },
      currentFeaturesTitle: "現在の実装機能（今すぐ遊べる機能）",
      currentFeaturesDesc: "現在SaKanaで実際に体験・ご利用いただける修行機能一覧：",
      futureFeaturesTitle: "今後の実装予定機能（開発中の構想）",
      futureFeaturesDesc: "単語カードの枠を越え、生きた日本語メディアに直接触れられる体験を準備中です：",
      roadmapBadge: "ロードマップ // 開発進行中",
      currentList: {
        srsTitle: "間隔反復記憶（SRS単語カード）",
        srsDesc: "SM-2アルゴリズムに基づく復習スケジュール。視覚的記憶ヒント、音声再生、実戦日本語単語を搭載。",
        sprintTitle: "反射神経タイムアタック試練",
        sprintDesc: "15秒以内の制限時間内に素早く判別するスピードテスト。音声問題の再生中はタイマーが自動一時停止します。",
        bidirectionalTitle: "マルチモーダル試練（仮名 ⇄ ローマ字・音声問題）",
        bidirectionalDesc: "「仮名 ➔ ローマ字」の読解認識と「ローマ字 ➔ 仮名」の能動想起、さらに音声聞き取り問題（音声 ➔ 仮名・音声 ➔ ローマ字）がランダムに混ざり合います。",
        stagesTitle: "段階的な海域ステージ構成（平仮名〜片仮名〜実戦単語）",
        stagesDesc: "平仮名基礎から片仮名、そしてアニメ・ポップカルチャーの外来語まで全24以上のステージを網羅。",
        kanaDirectoryTitle: "五十音図インタラクティブ図鑑（436文字完全収録）",
        kanaDirectoryDesc: "清音・濁音・半濁音・拗音を網羅。筆順画数、視覚的記憶ヒント、ネイティブ音声、基礎単語の完全リファレンス。",
        categoryHubsTitle: "体系別カテゴリ特設ポータル（清音・濁音・拗音・外来音）",
        categoryHubsDesc: "五十音各行、濁音、半濁音、拗音、現代外来音の音韻体系ごとに独立した解説と文字一覧ハブページ。",
        vocabularyDirectoryTitle: "重要実戦単語・アニメ語彙辞書（160単語超）",
        vocabularyDirectoryDesc: "単語ごとのネイティブ音声、構成かな文字への逆引きリンク、意味、ポップカルチャー豆知識を備えた単語個別ページ群。",
        kanaCompareTitle: "18組の紛らわしい文字比較徹底解説（シ vs ツ、さ vs き、ソ vs ン 等）",
        kanaCompareDesc: "書き出し方向、角度の違い、混乱しやすい文字を一瞬で見分ける記憶の秘訣を視覚的に解説。",
        romajiConverterTitle: "リアルタイム ローマ字 ⇄ かな変換ツール",
        romajiConverterDesc: "ローマ字入力から即座にひらがな・カタカナを生成。促音（っ）や拗音（きゃ等）も自動解析・変換。",
        minigameTitle: "適応型30文字幕間アーケード（ボーナス試練）",
        minigameDesc: "2ボス突破ごと（または道場から自由挑戦）に出現する高速反射ミニゲーム。過去に誤答した苦手札を優先抽出し、100%修得札を適度に休止させながら累積30文字ループで脳に定着させます。",
        bilingualTitle: "3言語対応インターフェース（日・英・インドネシア語）",
        bilingualDesc: "快適に切り替え可能なマルチ言語UIと、集中を妨げないレトロOS風デザイン。",
      },
      roadmapTitle: "SaKanaのささやかな想い",
      roadmapDesc: "学ぶことは、決して義務や苦行である必要はありません。手書きのプレッシャーをいったん手放して、好きなコンテンツの音と文字にふれるうちに、いつの間にか自然と読めるようになる――そんな歩みを応援します。",
      backBtn: "<< 道場メニューへ戻る",
      footerStatus: "SAKANA アーキテクチャ // 稼働中",
      footerSub: "ネイティブ音声 & SM-2 SRS",
      footerRight: "インタラクティブシステム",
    },
    login: {
      windowTitle: "ユーザー認証",
      appTitle: "SaKana 認証",
      instruction: "ログインまたはアカウントを作成して、学習記録と進捗をクラウド同期しましょう。",
      signInTab: "ログイン",
      signUpTab: "新規登録",
      emailLabel: "メールアドレス:",
      displayNameLabel: "表示名 (任意):",
      passwordLabel: "パスワード:",
      submit: "ログインする",
      signUpSubmit: "アカウント作成",
      submitting: "通信中...",
      authSuccessMsg: "認証に成功しました！リダイレクトしています...",
      signUpCheckEmailTitle: "確認メールを送信しました！",
      signUpCheckEmailDesc: "ご入力いただいたメールアドレスに認証リンクを送信しました。リンクをクリックして登録を完了してください。",
      checkSpamNotice: "※ 1〜2分経っても届かない場合は、迷惑メール（Spam）フォルダーもご確認ください。",
      emailConfirmedMsg: "メール認証が完了しました！ログインしてください。",
      goToSignInBtn: "→ ログイン画面へ進む",
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
      sec1Title: "平仮名",
      sec1Sub: "基本音",
      sec2Title: "片仮名",
      sec2Sub: "外来語・特殊音",
      sec3Title: "単語",
      sec3Sub: "基本語彙",
      statusDone: "【済】",
      statusReady: "【挑】",
      statusLocked: "【封】",
      statusWon: "突破",
      statusBoss: "ボス",
      optionalDrillBadge: "自由修練",
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
      footerTagline: "多言語対応 SRS記憶＆反射速度ドリル",
      footerReady: "UTF-8 // 準備完了",
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
      newBadge: "【新規】",
      hotkeyHint: "【 SPACE: 裏返す // 1-4: 評価 】",
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
      srsDueReviewsTitle: "本日のSRS復習",
      dailyRetentionQueue: "日次記憶定着キュー",
      srsAllCaughtUpDesc: "すべての文字の記憶保持インターバルは順調です。復習時期が来るとここに現れます。",
      footerSrsReviews: "SRS復習数:",
      footerLapses: "やり直し:",
    },
    test: {
      windowTitle: "速度試練",
      testBadge: "制限時間付き反射速度試練",
      timeRemaining: "残り時間",
      questionProgress: "出題",
      targetSpeed: "目標基準時間",
      choosePrompt: "【 1〜4キー またはクリックで解答 】",
      kanaToRomajiBadge: "仮名 ➔ ローマ字",
      romajiToKanaBadge: "ローマ字 ➔ 仮名",
      audioToKanaBadge: "音声 ➔ 仮名",
      audioToRomajiBadge: "音声 ➔ ローマ字",
      audioListeningPrompt: "音声をよく聴いてください...",
      audioReplayBtn: "音声再再生 [R]",
      audioPlayingStatus: "音声再生中 (タイマー停止)",
      audioReadyStatus: "回答してください (タイマー再開)",
      audioQuestionToggle: "音声問題",
      audioQuestionsOn: "音声出題: オン",
      audioQuestionsOff: "音声出題: オフ",
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
      lockedCode: "【403 封鎖中】",
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
      accuracyTargetVal: "< 1.5秒 / 文字",
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
      lookalikeBtn: "紛らわしい文字の比較 (シ vs ツ, さ vs き)",
      hiraganaPdfBtn: "ひらがなPDF一覧表 (A4横)",
      katakanaPdfBtn: "カタカナPDF一覧表 (A4横)",
      browseCategoriesLabel: "カテゴリ別一覧:",
      hiraganaGojuonBadge: "ひらがな 五十音 (46)",
      hiraganaDakuonBadge: "ひらがな 濁音 (20)",
      hiraganaYoonBadge: "ひらがな 拗音 (33)",
      katakanaGojuonBadge: "カタカナ 五十音 (46)",
      katakanaExtendedBadge: "拡張カタカナ (10)",
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
      faqTitle: "かな学習に関するよくある質問",
      faq1Q: "ひらがなとカタカナ、どちらを先に学ぶべきですか？",
      faq1A: "まずは基本的な文法や助詞、日本語の基礎音を理解するために「ひらがな」から始めましょう。その後すぐに「カタカナ」へ進むことで、マンガの効果音やアニメのタイトル、外来語をスムーズに読めるようになります。",
      faq2Q: "形が似ている文字を混同しないコツはありますか？",
      faq2ABefore: "「シ」と「ツ」や「さ」と「き」などは字形がよく似ています。",
      faq2ALink: "紛らわしい文字の比較ハブ",
      faq2AAfter: "では、画数の向きや角度の違い、一瞬で見分ける記憶のコツを並べて解説しています。",
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
      originTitle: "字源・万葉仮名 (歴史的ルーツ)",
      evolvedFromKanji: (kanji: string, reading: string) => `元の漢字（字源）: ${kanji} (${reading})`,
      originFooter: "日本の書道・万葉仮名の伝統における字源漢字です。",
      elementaryVocabTitle: "基礎単語・用例",
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
    kanaCategory: {
      breadcrumbHub: "五十音図ハブ",
      countBadge: (count: number) => `収録数: ${count}文字`,
      aboutSetTitle: "この文字グループについて",
      rosterTitle: "収録文字一覧",
      rosterHint: "各文字をクリックすると画数・発音音声・記憶ヒントを確認できます",
      returnBtn: "五十音図ハブへ戻る",
    },
    compareHub: {
      subtitle: "紛らわしい文字の比較",
      badge: "類似かな文字 徹底比較ハブ",
      title: "紛らわしい日本語のかな文字 徹底比較ガイド",
      description: "カタカナの「シ」と「ツ」、ひらがなの「さ」と「き」などで迷っていませんか？下のペアを選択して、字形の構造的な違いと記憶のコツを確認しましょう。",
      compareAction: "比較する",
      eduTitle: "似ているかな文字を一瞬で見分ける秘訣",
      edu1Title: "画数の向きと整列軸",
      edu1Desc: "カタカナの「シ」と「ツ」は書き進める向きが異なります。「シ」は左側に縦並びで下から上へ払い上げますが、「ツ」は上部に横並びで上から下へと払い下ろします。",
      edu2Title: "結び目と払いの違い",
      edu2Desc: "ひらがなの「れ」「わ」「ね」は左側の1画目が共通していますが、最後の終わり方で区別できます。「れ」は外へ跳ね、「わ」は丸く内側へ払い、「ね」は最後にくるっと結び目を作ります。",
    },
    compareDetail: {
      subtitle: (c1: string, c2: string) => `${c1} VS ${c2} // 徹底比較`,
      backToMatrix: "五十音図一覧へ戻る",
      badge: "視覚的判別ガイド",
      title: (c1: string, c2: string) => `「${c1}」と「${c2}」の見分け方・違い`,
      description: (script: string) => `この2つの${script}は、日本語学習者が最も混同しやすい類似ペアです。一瞬で判別するためのポイントを解説します。`,
      char1Label: "文字 #1",
      char2Label: "文字 #2",
      strokesLabel: "画数:",
      standardStrokes: "標準",
      fullProfileLink: (char: string) => `「${char}」の詳細ページ`,
      keyDifferencesTitle: "字形構造の決定的な違い",
      memoryTrickLabel: "一瞬で見分ける記憶のコツ:",
      ctaTitle: "道場のスピード試練で両方の文字を特訓しよう",
      ctaDesc: "視覚反射をテストしましょう。スピードドリルで脳に定着させれば、マンガや字幕を読むときに迷うことはなくなります。",
      ctaBtn: "ドリルセッションを開始",
    },
    converter: {
      subtitle: "ローマ字 ⇄ かな変換",
      badge: "無料日本語学習ユーティリティ",
      title: "ローマ字 ⇄ かなリアルタイム変換ツール (ローマ字変換)",
      description: "ローマ字（アルファベット）を入力すると、リアルタイムで日本語のひらがなとカタカナに同時変換します。",
      inputLabel: "ローマ字入力 (アルファベット):",
      clearBtn: "クリア",
      placeholder: "'arigatou', 'sensei', 'tsuki' などのローマ字を入力...",
      smartParticleLabel: "スマート助詞ルール: 挨拶や助詞の \"wa\" を「は」に自動変換 (例: こんにちは, わたし は)",
      grammarStandardBadge: "標準文法モード: ON",
      quickSamplesLabel: "サンプル入力:",
      presetGreetings: "挨拶 (konnichiwa)",
      presetTopic: "助詞の「は」 (watashi wa)",
      presetAnime: "アニメの名台詞",
      presetSmallTsu: "促音（っ）テスト",
      hiraganaHeader: "平仮名 (ひらがな)",
      katakanaHeader: "片仮名 (カタカナ)",
      copied: "コピー完了！",
      copy: "コピー",
      waitingInput: "ローマ字の入力を待っています...",
      hiraganaFooter: "和語・助詞・標準的な日本語表記",
      katakanaFooter: "外来語・外国名・オノマトペ表記",
      eduTitle: "ローマ字かな変換の仕組み",
      eduLead: "ローマ字（Rōmaji）はラテン文字を用いた日本語の発音表記です。このツールはヘボン式ローマ字の音節を標準的なかな文字へ自動変換します：",
      eduRule1: "促音（小さい「っ／ッ」）: 子音を重ねる \"matte\" → まって / マッテ",
      eduRule2: "拗音（小さい「ゃ・ゅ・ょ」）: \"kya\", \"shu\", \"cho\" → きゃ, しゅ, ちょ",
      eduRule3: "助詞と挨拶の表記: 発音は \"wa\" ですが、挨拶の \"konnichiwa\"（こんにちは）や主題の助詞（\"watashi wa\" → わたし は）は現代仮名遣いの規則に従い「は」と表記されます。",
      eduRule4: "撥音「ん」: \"konnichiwa\" → こんにちは",
      ctaTitle: "変換ツールなしで直接スラスラ読めるようになりたいですか？",
      ctaDesc: "ひらがなとカタカナを0.5秒以内に直接認識できる視覚反射を鍛えましょう。",
      ctaBtn: "SAKANA スピードドリルへ挑戦",
    },
    wordsHub: {
      subtitle: "単語ディレクトリ",
      breadcrumbWords: "単語ディレクトリ",
      badge: "日本語基礎＆アニメ重要語彙辞典",
      title: (count: number) => `日本語コア単語ディレクトリ (全${count}語)`,
      description: "基礎的なひらがな・カタカナ単語をネイティブ発音音声、構成文字の分解解説、多言語の意味、反復練習カードとともに収録しています。",
      jlptN5Btn: (count: number = 105) => `JLPT N5 (${count})`,
      jlptN4Btn: (count: number = 47) => `JLPT N4 (${count})`,
      animePopBtn: (count: number = 9) => `アニメ＆ポップカルチャー (${count})`,
      kanaMatrixBtn: "五十音図",
      lookalikesBtn: "類似文字比較",
      allTab: (count: number) => `すべて (${count})`,
      hiraganaTab: "平仮名",
      katakanaTab: "片仮名",
      searchPlaceholder: "単語、ローマ字、意味で検索...",
      breakdownLink: "詳細分解",
      eduTitle: "SaKanaで日本語の語彙を効果的に身につける方法",
      edu1Title: "1. 構成かな文字への分解",
      edu1Desc: "各単語ページでは、単語を1文字ずつの構成かな文字に分解して解説しています。個々の音節を確実に押さえることで、長いアニメ単語も瞬時に読み取れるようになります。",
      edu2Title: "2. ネイティブ発音音声",
      edu2Desc: "すべての単語に自然な日本語発音音声を収録。聴覚の記憶と文字の形を結びつけることで、長期的な語彙の定着を促します。",
      edu3Title: "3. アニメの文脈とカルチャー",
      edu3Desc: "日常会話の必須単語から外来語、そしてアニメの台詞で頻繁に登場する象徴的なポップカルチャー語彙まで厳選して収録しています。",
    },
    wordDetail: {
      breadcrumbHub: "五十音図ハブ",
      badge: (script: string) => `日本語単語カルテ • ${script}`,
      kanaLabel: "かな表記:",
      popCultureBadge: "ポップカルチャー / アニメ",
      meaningHeader: "意味・翻訳",
      exampleSentenceHeader: "ふりがな付き例文 (文例)",
      breakdownHeader: "構成文字の分解ガイド",
      breakdownDesc: "下の各文字をクリックすると、画数・発音音声・記憶ヒントを確認できます：",
      strokeOrderLink: "画数・詳細",
      relatedWordsHeader: (script: string) => `関連する${script}の単語`,
      returnBtn: "五十音図ハブへ戻る",
      homophonesHeader: "漢字の書き分け・同音異義語の判別",
      homophonesSub: "日本語では同じ「かな読み」でも、文脈やアクセントによって異なる漢字と意味に対応します：",
      pitchAccentLabel: "アクセント型",
      exampleLabel: "用例",
    },
    jlptCategory: {
      wordsCountHeader: (title: string, count: number) => `${title} (${count}語)`,
      allWordsBtn: (count: number) => `全${count}語を見る →`,
      scriptFilterLabel: "書体:",
      allFilter: "すべて",
      searchPlaceholder: "意味やローマ字で検索...",
      learnWordBtn: "詳細を見る",
      noResults: (query: string) => `「${query}」に一致する単語は見つかりませんでした。`,
    },
    pdfChart: {
      studyToolsBreadcrumb: "SaKana 日本語学習ツール",
      pdfChartSuffix: "PDF一覧表",
      switchChartLink: (label: string) => `${label}一覧表へ切り替え`,
      generatingPdf: "PDFを生成中...",
      downloadPdfBtn: "PDFをダウンロード (A4横)",
      printChartBtn: "一覧表を印刷",
      tipOrientation: "用紙の向き: A4横 (ランドスケープ)",
      tipVariants: "全バリエーション収録: 五十音46字 + 濁音20字 + 半濁音5字 + 拗音33字",
      tipFree: "100%無料 印刷＆学習用リファレンスシート",
      sheetBrand: "SaKana Japanese",
      sheetTitle: (script: string, jp: string) => `完全版 ${script}一覧表 (全${jp}一覧表)`,
      sheetSub: "A4横レイアウト • 全音収録 (五十音・濁音・半濁音・拗音)",
      sec1Title: "1. 基本五十音 (清音 - 46文字)",
      sec1Sub: "横並び一覧表 (あ - い - う - え - お)",
      rowCol: "行",
      sec2Title: "2. 濁音・半濁音 (25文字)",
      sec2Sub: "濁点 (ﾞ) & 半濁点 (ﾟ)",
      sec3Title: "3. 拗音 (33音)",
      sec3Sub: "小さい「ゃ・ゅ・ょ」の組み合わせ",
      rootCol: "基本行",
      sheetFooterLeft: "© SaKana (魚) Japanese Drill • 個人学習・教育・教室での配布および印刷は完全無料です",
      sheetFooterRight: "オンライン練習はこちら:",
      howToUseTitle: (script: string) => `印刷用${script}一覧表の活用方法`,
      howToUseDesc: (script: string) => `${script}の習得は日本語学習の第一歩です。このA4横レイアウトの一覧表には、104種類以上の全音韻バリエーションが標準的な「あいうえお」順で見やすく整理されており、デスクでの参照や書き取り練習、教室での配布教材として最適です。`,
      box1Title: "基本の五十音 (46音)",
      box1Desc: "日本語の発音の基礎となる文字群です。5つの母音（あ・い・う・え・お）から始まり、子音との組み合わせ（か・さ・た・な・は・ま・や・ら・わ行）と撥音「ん／ン」で構成されます。",
      box2Title: "濁音・半濁音 (25音)",
      box2Desc: "濁点（ﾞ）を付けて発音を濁らせる音（K→G、S→Z、T→D、H→B）と、半濁点（ﾟ）を付けてH→Pへと変化させる音です。",
      box3Title: "拗音 (33音)",
      box3Desc: "イ段の文字（き・し・ち等）に小さい「ゃ・ゅ・ょ（ャ・ュ・ョ）」を組み合わせて1音節で発音する結合音です。",
      faqTitle: "よくある質問",
      faq1Q: "印刷時のおすすめ設定はありますか？",
      faq1A: "用紙の向きを「横（ランドスケープ）」、サイズを「A4」または「レター」に設定してください。表の背景色をきれいに印刷するため、ブラウザの印刷設定で「背景のグラフィック」を有効にしてください。",
      faq2Q: "教師や学校の授業で生徒に印刷して配っても無料ですか？",
      faq2A: "はい、100%無料です！ご自身の学習用はもちろん、生徒への配布や勉強会、教室の掲示資料として自由にご活用いただけます。",
      faq3Q: "ひらがなとカタカナ、どちらを先に覚えるべきですか？",
      faq3A: "まずは「ひらがな」から始めましょう！和語や助詞、動詞の活用など日本語の土台に使われます。慣れたら外来語や固有名詞に使われる「カタカナ」へ進むのが最もスムーズです。",
      interactiveDrillLink: "インタラクティブ音声かなドリル",
      converterLink: "ローマ字 ⇄ かな変換ツール",
      lookalikesLink: "紛らわしいかな文字の比較ガイド",
    },
    docs: {
      subtitle: "API仕様書",
      breadcrumbApi: "SAKANA かな文字REST API // v1.0",
      apiOverviewBadge: "かな文字データAPI 概要",
      apiOverviewDesc: "SaKanaパブリックREST APIは、構造化された平仮名・片仮名の音声文字データセットを提供します。文字、ローマ字表記、音韻分類（五十音、濁音、半濁音、拗音）、字形ヒント、発音音声ファイルを参照可能です。",
      baseEndpoint: "基底エンドポイント",
      authLabel: "認証",
      authValue: "不要 (公開GET)",
      audioDeliveryLabel: "音声配信",
      audioDeliveryValue: "Web Speechネイティブ音声 (.wav)",
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
      outputPlaceholder: "// 上の「リクエスト実行」をクリックすると、リアルタイムでAPIレスポンスが表示されます。",
      schemaTitle: "標準レスポンススキーマ",
      returnDashboard: "道場メニューへ戻る",
      footerMeta: "SaKana パブリックREST API v1.0 • JSON出力 • ネイティブ音声",
      serverReady: "APIサーバー正常稼働中",
    },
    webring: {
      title: "ウェブリング // 連合ネットワーク",
      nodesCount: "【4サイト】",
      federationHeader: "インディーウェブリング連合",
      hoverPrompt: "バナーにカーソルを合わせると詳細表示 // クリックで移動",
      prev: "« 前へ",
      random: "ランダム",
      next: "次へ »",
      join: "+ 参加希望",
      guestbookTag: "【ゲストブック】",
      nodes: {
        kurzaginDesc: "システムアーキテクト・個人開発者",
        eteyvatDesc: "原神（Genshin Impact）データベース",
        vxnusDesc: "クリエイティブ・テクノロジースタジオ",
        joinName: "ウェブリングに参加",
        joinDesc: "参加をご希望の方はゲストブックにサイトURLをご記入ください",
      },
    },
  },
};
