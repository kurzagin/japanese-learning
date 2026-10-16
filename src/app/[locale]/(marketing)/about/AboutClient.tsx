"use client";

import Link from "next/link";
import { FishIcon } from "@/components/FishIcon";
import { RetroNavbar } from "@/components/RetroNavbar";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Bot, 
  Film, 
  MessageSquare, 
  PhoneCall, 
  Headphones, 
  BookOpenCheck, 
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Star,
  CheckCircle2,
  Zap,
  Layers,
  Globe,
  Hourglass,
  Shuffle,
  Gamepad2,
  Search,
  Split,
  Binary
} from "lucide-react";

export default function AboutPage() {
  const { t } = useLanguage();

  const interactiveFeatures = [
    {
      id: "voicevox",
      icon: <Bot className="w-5 h-5 text-[#000080]" />,
      badge: "VOICEVOX ENGINE // ROBO TYPE T",
      title: t.about.features.voicevoxTitle,
      description: t.about.features.voicevoxDesc,
      preview: {
        speaker: "ロボ Type T (VOICEVOX)",
        japanese: "「あ、い、う、え、お。音声パラメータ認識中。」",
        romaji: "A, i, u, e, o. Onsei paramēta ninshikichū.",
        translation: t.about.features.voicevoxTrans,
        tag: "NEURAL PITCH ACCURACY",
      },
    },
    {
      id: "anime",
      icon: <Film className="w-5 h-5 text-[#800000]" />,
      badge: "MEDIA // ANIME FRAMES",
      title: t.about.features.animeTitle,
      description: t.about.features.animeDesc,
      preview: {
        speaker: t.about.features.animeSpeaker,
        japanese: "「あきらめたら そこで 試合終了ですよ…？」",
        romaji: "Akirametara sokode shiai shūryō desu yo...",
        translation: t.about.features.animeTrans,
        tag: "ICONIC LINES DRILL",
      },
    },
    {
      id: "vtuber-x",
      icon: <MessageSquare className="w-5 h-5 text-[#0055aa]" />,
      badge: "SOCIAL // VTUBER X POST",
      title: t.about.features.vtuberXTitle,
      description: t.about.features.vtuberXDesc,
      preview: {
        speaker: "@sakana_vtuber • X (Twitter)",
        japanese: "「みんなおはよ〜！ 今日20時から歌枠やるよ！遊びに来てね！」",
        romaji: "Minna ohayo~! Kyou 20ji kara utawaku yaru yo! Asobi ni kite ne!",
        translation: t.about.features.vtuberXTrans,
        tag: "SLANG & MODERN CASUAL JP",
      },
    },
    {
      id: "vtuber-voice",
      icon: <PhoneCall className="w-5 h-5 text-[#006600]" />,
      badge: "AUDIO // VOICE CALL EXPERIENCE",
      title: t.about.features.vtuberVoiceTitle,
      description: t.about.features.vtuberVoiceDesc,
      preview: {
        speaker: t.about.features.vtuberVoiceSpeaker,
        japanese: "「もしもし？聞こえる？…よかった！今ちょっと話せる？」",
        romaji: "Moshimoshi? Kikoeru? ...Yokatta! Ima chotto hanaseru?",
        translation: t.about.features.vtuberVoiceTrans,
        tag: "1-ON-1 ACTIVE LISTENING",
      },
    },
    {
      id: "vtuber-asmr",
      icon: <Headphones className="w-5 h-5 text-[#800080]" />,
      badge: "AUDIO + TIME // ASMR & TIMESTAMPS",
      title: t.about.features.vtuberAsmrTitle,
      description: t.about.features.vtuberAsmrDesc,
      preview: {
        speaker: t.about.features.vtuberAsmrSpeaker,
        japanese: "【01:23】「今日も一日、本当にお疲れ様でした…ゆっくり休んでね」",
        romaji: "[01:23] Kyou mo ichinichi, hontou ni otsukaresama deshita... yukkuri yasunde ne",
        translation: t.about.features.vtuberAsmrTrans,
        tag: "FINE-GRAINED AUDITORY & KANA",
      },
    },
    {
      id: "edu-post",
      icon: <BookOpenCheck className="w-5 h-5 text-[#b8860b]" />,
      badge: "KNOWLEDGE // EDUCATIONAL X FEED",
      title: t.about.features.eduPostTitle,
      description: t.about.features.eduPostDesc,
      preview: {
        speaker: t.about.features.eduPostSpeaker,
        japanese: "【豆知識】「結構です」は肯定・否定の両方で使われます。文脈とトーンに注意！",
        romaji: t.about.features.eduPostRomaji,
        translation: t.about.features.eduPostTrans,
        tag: "REAL-LIFE USAGE & TRIVIA",
      },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      {/* Full-width Sticky Retro Navbar */}
      <RetroNavbar currentSubtitle={t.about.windowTitle} />

      {/* Edge-to-Edge Responsive Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
        {/* Top Banner with Slogan */}
        <div className="border-2 border-[#000080] bg-[#eef3f8] p-4 text-center space-y-2 shadow-xs">
            <div className="text-[10px] text-[#000080] font-bold tracking-widest uppercase flex items-center justify-center gap-1">
              <Star className="w-3 h-3 fill-[#000080]" />
              <span>{t.about.badge}</span>
              <Star className="w-3 h-3 fill-[#000080]" />
            </div>
            
            {/* The Slogan: "さ、仮名を始めよう。" with highlighted "さ" and "仮名 (かな)" */}
            <div className="py-1">
              <div className="inline-block bg-[#fff8e7] border-2 border-[#000080] px-4 py-1.5 shadow-sm">
                <span className="text-lg sm:text-xl font-black tracking-widest text-[#222]">
                  “<span className="text-[#cc0000] underline decoration-2 underline-offset-4 font-black">さ</span>、
                  <span className="text-[#000080] bg-[#ffff99] px-1 py-0.5 rounded-xs font-black">仮名</span>
                  を始めよう。”
                </span>
                <div className="text-[10px] text-[#666] font-mono mt-0.5 tracking-tight">
                  [ <span className="text-[#cc0000] font-bold">sa</span>, <span className="text-[#000080] font-bold">kana</span> wo hajimeyou • {t.about.sloganSub} ]
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#555] italic">
              {t.about.sloganNote}
            </p>
          </div>

          {/* FIRST SECTION: What is even SaKana? */}
          <div className="border border-[#808080] bg-[#fafafa]">
            <div className="bg-[#000080] text-white px-2.5 py-1 text-xs font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FishIcon className="w-4 h-4 fill-white text-white" />
                <span>{t.about.whatIsTitle}</span>
              </span>
              <span className="text-[10px] text-[#ffff00] font-mono">{t.about.whatIsTag}</span>
            </div>
            <div className="p-3 text-xs space-y-2.5 bg-white">
              <p className="text-xs sm:text-[13px] text-[#222] font-semibold leading-relaxed border-l-2 border-[#000080] pl-2 bg-[#f0f4f8] py-1">
                {t.about.whatIsLead}
              </p>
              <div className="space-y-2 pt-1 text-[11px] sm:text-xs">
                <div className="flex items-start gap-2 bg-[#fffdf0] p-2 border border-[#e8dcb8]">
                  <span className="text-[#cc0000] font-bold shrink-0">①</span>
                  <span className="text-[#333] leading-relaxed">
                    {t.about.whatIsPoints.saKanaWordplay}
                  </span>
                </div>
                <div className="flex items-start gap-2 bg-[#f4f8f4] p-2 border border-[#c4dcc4]">
                  <span className="text-[#006600] font-bold shrink-0">②</span>
                  <span className="text-[#333] leading-relaxed">
                    {t.about.whatIsPoints.speedFocus}
                  </span>
                </div>
                <div className="flex items-start gap-2 bg-[#f8f5fc] p-2 border border-[#ded0f0]">
                  <span className="text-[#800080] font-bold shrink-0">③</span>
                  <span className="text-[#333] leading-relaxed">
                    {t.about.whatIsPoints.mediaHeart}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* LEARNING PHILOSOPHY: Recognition First */}
          <div className="border border-[#000080] bg-[#f4f7fb] p-3 shadow-xs">
            <div className="flex items-center gap-1.5 text-[#000080] font-bold text-xs">
              <Zap className="w-4 h-4 shrink-0 text-[#000080]" />
              <span className="uppercase tracking-wide font-mono text-[11px]">
                {t.about.writingDisclaimerBadge}
              </span>
            </div>
            <div className="mt-1.5 p-2 bg-white border border-[#a0b0d0] text-center font-mono font-bold text-sm sm:text-base text-[#000080] tracking-wider select-all">
              &quot;{t.about.writingDisclaimerText}&quot;
            </div>
            <p className="text-[11px] text-[#444] mt-1.5 leading-relaxed">
              {t.about.writingDisclaimerSub}
            </p>
          </div>

          {/* SECTION: Current Features (Available Now) */}
          <div className="border border-[#808080]">
            <div className="bg-[#000080] text-white px-2.5 py-1 text-xs font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff00]" />
                <span>{t.about.currentFeaturesTitle}</span>
              </span>
              <span className="text-[10px] text-[#00ff00] font-mono">[ACTIVE v1.0]</span>
            </div>
            <div className="p-2.5 bg-[#fbfbf8] border-b border-[#d0d0d0] text-xs">
              <p className="text-[11px] text-[#444] leading-relaxed">
                {t.about.currentFeaturesDesc}
              </p>
            </div>

            <div className="divide-y divide-[#d0d0d0] bg-white">
              <div className="p-3 flex items-start gap-2.5 hover:bg-[#fafafc]">
                <div className="p-1.5 bg-[#eef4ff] border border-[#7ba4e8] shrink-0 mt-0.5">
                  <Layers className="w-5 h-5 text-[#000080]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h2 className="text-xs sm:text-sm font-bold text-[#000080]">
                      {t.about.currentList.srsTitle}
                    </h2>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#e6f4ea] border border-[#57ab5a] text-[#137333] font-bold">
                      ACTIVE // SM-2 ALGORITHM
                    </span>
                  </div>
                  <p className="text-[11px] text-[#444] mt-1 leading-normal">
                    {t.about.currentList.srsDesc}
                  </p>
                </div>
              </div>

              <div className="p-3 flex items-start gap-2.5 hover:bg-[#fafafc]">
                <div className="p-1.5 bg-[#fff8e7] border border-[#e0c060] shrink-0 mt-0.5">
                  <Zap className="w-5 h-5 text-[#cc6600]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h2 className="text-xs sm:text-sm font-bold text-[#000080]">
                      {t.about.currentList.sprintTitle}
                    </h2>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#fef7e0] border border-[#f9ab00] text-[#b06000] font-bold">
                      ACTIVE // SPEED REFLEX
                    </span>
                  </div>
                  <p className="text-[11px] text-[#444] mt-1 leading-normal">
                    {t.about.currentList.sprintDesc}
                  </p>
                </div>
              </div>

              <div className="p-3 flex items-start gap-2.5 hover:bg-[#fafafc]">
                <div className="p-1.5 bg-[#f0f4ff] border border-[#90b0e0] shrink-0 mt-0.5">
                  <Shuffle className="w-5 h-5 text-[#000080]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h2 className="text-xs sm:text-sm font-bold text-[#000080]">
                      {t.about.currentList.bidirectionalTitle}
                    </h2>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#e8f0fe] border border-[#4285f4] text-[#1967d2] font-bold">
                      ACTIVE // BIDIRECTIONAL DRILL
                    </span>
                  </div>
                  <p className="text-[11px] text-[#444] mt-1 leading-normal">
                    {t.about.currentList.bidirectionalDesc}
                  </p>
                </div>
              </div>

              <div className="p-3 flex items-start gap-2.5 hover:bg-[#fafafc]">
                <div className="p-1.5 bg-[#f2f8f2] border border-[#80b880] shrink-0 mt-0.5">
                  <BookOpenCheck className="w-5 h-5 text-[#006600]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h2 className="text-xs sm:text-sm font-bold text-[#000080]">
                      {t.about.currentList.stagesTitle}
                    </h2>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#e6f4ea] border border-[#57ab5a] text-[#137333] font-bold">
                      ACTIVE // 24+ STAGES
                    </span>
                  </div>
                  <p className="text-[11px] text-[#444] mt-1 leading-normal">
                    {t.about.currentList.stagesDesc}
                  </p>
                </div>
              </div>

              {/* NEW FEATURE 1: Kana Directory */}
              <div className="p-3 flex items-start gap-2.5 hover:bg-[#fafafc]">
                <div className="p-1.5 bg-[#eef4ff] border border-[#7ba4e8] shrink-0 mt-0.5">
                  <Search className="w-5 h-5 text-[#000080]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <Link
                      href="/kana"
                      className="text-xs sm:text-sm font-bold text-[#000080] hover:underline flex items-center gap-1"
                    >
                      <span>{t.about.currentList.kanaDirectoryTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#e8f0fe] border border-[#4285f4] text-[#1967d2] font-bold">
                      ACTIVE // 436+ PROFILES
                    </span>
                  </div>
                  <p className="text-[11px] text-[#444] mt-1 leading-normal">
                    {t.about.currentList.kanaDirectoryDesc}
                  </p>
                </div>
              </div>

              {/* NEW FEATURE: Dedicated Category Hubs */}
              <div className="p-3 flex items-start gap-2.5 hover:bg-[#fafafc]">
                <div className="p-1.5 bg-[#f5f0fa] border border-[#b898d8] shrink-0 mt-0.5">
                  <Layers className="w-5 h-5 text-[#660099]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <Link
                      href="/kana/hiragana/category/gojuon"
                      className="text-xs sm:text-sm font-bold text-[#660099] hover:underline flex items-center gap-1"
                    >
                      <span>{t.about.currentList.categoryHubsTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#f5f0fa] border border-[#9b51e0] text-[#660099] font-bold">
                      ACTIVE // 9 SPECIALIZED HUBS
                    </span>
                  </div>
                  <p className="text-[11px] text-[#444] mt-1 leading-normal">
                    {t.about.currentList.categoryHubsDesc}
                  </p>
                </div>
              </div>

              {/* NEW FEATURE: Standalone Vocabulary Directory */}
              <div className="p-3 flex items-start gap-2.5 hover:bg-[#fafafc]">
                <div className="p-1.5 bg-[#fdf2f2] border border-[#fca5a5] shrink-0 mt-0.5">
                  <BookOpenCheck className="w-5 h-5 text-[#991b1b]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <Link
                      href="/words/neko"
                      className="text-xs sm:text-sm font-bold text-[#991b1b] hover:underline flex items-center gap-1"
                    >
                      <span>{t.about.currentList.vocabularyDirectoryTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#fee2e2] border border-[#ef4444] text-[#991b1b] font-bold">
                      ACTIVE // 160+ WORD PAGES
                    </span>
                  </div>
                  <p className="text-[11px] text-[#444] mt-1 leading-normal">
                    {t.about.currentList.vocabularyDirectoryDesc}
                  </p>
                </div>
              </div>

              {/* NEW FEATURE 2: Kana Comparisons */}
              <div className="p-3 flex items-start gap-2.5 hover:bg-[#fafafc]">
                <div className="p-1.5 bg-[#fff8e7] border border-[#e0c060] shrink-0 mt-0.5">
                  <Split className="w-5 h-5 text-[#800000]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <Link
                      href="/compare"
                      className="text-xs sm:text-sm font-bold text-[#800000] hover:underline flex items-center gap-1"
                    >
                      <span>{t.about.currentList.kanaCompareTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#fef7e0] border border-[#f9ab00] text-[#b06000] font-bold">
                      ACTIVE // 18 CURATED PAIRS
                    </span>
                  </div>
                  <p className="text-[11px] text-[#444] mt-1 leading-normal">
                    {t.about.currentList.kanaCompareDesc}
                  </p>
                </div>
              </div>

              {/* NEW FEATURE 3: Romaji Converter */}
              <div className="p-3 flex items-start gap-2.5 hover:bg-[#fafafc]">
                <div className="p-1.5 bg-[#f0fdf4] border border-[#86efac] shrink-0 mt-0.5">
                  <Binary className="w-5 h-5 text-[#15803d]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <Link
                      href="/tools/romaji-to-kana"
                      className="text-xs sm:text-sm font-bold text-[#15803d] hover:underline flex items-center gap-1"
                    >
                      <span>{t.about.currentList.romajiConverterTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#dcfce7] border border-[#22c55e] text-[#15803d] font-bold">
                      ACTIVE // TRANSLITERATOR
                    </span>
                  </div>
                  <p className="text-[11px] text-[#444] mt-1 leading-normal">
                    {t.about.currentList.romajiConverterDesc}
                  </p>
                </div>
              </div>

              <div className="p-3 flex items-start gap-2.5 hover:bg-[#fafafc]">
                <div className="p-1.5 bg-[#fff8e0] border border-[#f5b300] shrink-0 mt-0.5">
                  <Gamepad2 className="w-5 h-5 text-[#cc6600]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h2 className="text-xs sm:text-sm font-bold text-[#000080]">
                      {t.about.currentList.minigameTitle}
                    </h2>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#fef7e0] border border-[#f9ab00] text-[#b06000] font-bold">
                      ACTIVE // ADAPTIVE ARCADE LOOP
                    </span>
                  </div>
                  <p className="text-[11px] text-[#444] mt-1 leading-normal">
                    {t.about.currentList.minigameDesc}
                  </p>
                </div>
              </div>

              <div className="p-3 flex items-start gap-2.5 hover:bg-[#fafafc]">
                <div className="p-1.5 bg-[#f5f0fa] border border-[#b898d8] shrink-0 mt-0.5">
                  <Globe className="w-5 h-5 text-[#660099]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h2 className="text-xs sm:text-sm font-bold text-[#000080]">
                      {t.about.currentList.bilingualTitle}
                    </h2>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#ece9d8] border border-[#808080] text-[#404040] font-bold">
                      ACTIVE // EN • ID • JA
                    </span>
                  </div>
                  <p className="text-[11px] text-[#444] mt-1 leading-normal">
                    {t.about.currentList.bilingualDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: Future Features (In Development) */}
          <div className="border border-[#808080]">
            <div className="bg-[#000080] text-white px-2.5 py-1 text-xs font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ffff00]" />
                <span>{t.about.futureFeaturesTitle}</span>
              </span>
              <span className="text-[10px] text-[#ffff00] font-mono flex items-center gap-1">
                <Hourglass className="w-3 h-3 text-[#ffff00]" />
                {t.about.roadmapBadge}
              </span>
            </div>
            <div className="p-3 bg-[#fbfbf8] border-b border-[#d0d0d0] text-xs space-y-1">
              <h2 className="font-bold text-sm text-[#000080]">
                {t.about.heroTitle}
              </h2>
              <p className="text-xs text-[#555] leading-relaxed">
                {t.about.heroSubtitle}
              </p>
              <p className="text-[11px] text-[#444] pt-1 leading-relaxed">
                {t.about.futureFeaturesDesc}
              </p>
            </div>

            {/* List of Interactive Media Features in Development */}
            <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#ece9d8]">
              {interactiveFeatures.map((item) => (
                <div key={item.id} className="p-3 bg-white border border-t-white border-l-white border-b-[#808080] border-r-[#808080] space-y-2 hover:bg-[#fafafc] flex flex-col justify-between">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 bg-[#e8e8e8] border border-[#a0a0a0] shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h2 className="text-xs sm:text-sm font-bold text-[#000080]">
                          {item.title}
                        </h2>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#ece9d8] border border-[#808080] text-[#404040] font-bold">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#444] mt-1 leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Feature Interactive Card Sample Preview */}
                  <div className="ml-0 sm:ml-9 border border-[#b0b0b0] bg-[#f7f9fa] p-2 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-[#666] border-b border-[#e0e0e0] pb-1">
                      <span className="font-semibold text-[#000080]">
                        {item.preview.speaker}
                      </span>
                      <span className="font-mono text-[9px] text-[#800000] font-bold">
                        [{item.preview.tag}]
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-black font-sans py-0.5">
                      {item.preview.japanese}
                    </div>
                    <div className="text-[10px] text-[#555] font-mono">
                      {item.preview.romaji}
                    </div>
                    <div className="text-[11px] text-[#222] italic">
                      &quot;{item.preview.translation}&quot;
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy Box */}
          <div className="border border-[#808080] bg-[#fbfbf8] p-3">
            <h3 className="font-bold text-xs text-[#000080] uppercase flex items-center gap-1.5">
              <span>◆ {t.about.roadmapTitle}</span>
            </h3>
            <p className="text-xs text-[#444] mt-1 leading-relaxed">
              {t.about.roadmapDesc}
            </p>
          </div>

          {/* Action Call to Action */}
          <div className="border-2 border-dashed border-[#000080] bg-[#eef3f8] p-3 text-center space-y-2">
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-2 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-black flex items-center justify-center gap-1.5 shadow"
              >
                <span>{t.about.backBtn}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#000080]" />
              </Link>
              <Link
                href="/study/hiragana-vowels"
                className="w-full sm:w-auto px-5 py-2 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] text-xs font-bold text-[#000080]"
              >
                {t.dashboard.studyBtn}: {t.dashboard.sec1Title}
              </Link>
            </div>
          </div>
        </main>

      {/* Docked Retro Footer & Status Bar */}
      <footer className="border-t border-[#808080] bg-[#d4d0c8] px-3 sm:px-6 py-2 text-[11px] text-[#404040] flex items-center justify-between font-mono shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00aa00]"></span>
          <span>{t.about.footerStatus}</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="hidden sm:inline">{t.about.footerSub}</span>
          <span className="border-l border-[#808080] pl-2 font-mono">{t.about.footerRight}</span>
        </div>
      </footer>
    </div>
  );
}
