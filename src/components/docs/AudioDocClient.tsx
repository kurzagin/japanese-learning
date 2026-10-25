"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Volume2, Bot, Sparkles, ArrowRight, Music, Play } from "lucide-react";

export function AudioDocClient() {
  const { locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const sampleAudios = [
    { kana: "あ", romaji: "a", label: "Pure Vowel [A]", file: "/audio/kana/hiragana/a.mp3" },
    { kana: "し", romaji: "shi", label: "Palatalized [SHI]", file: "/audio/kana/hiragana/shi.mp3" },
    { kana: "つ", romaji: "tsu", label: "Affricate [TSU]", file: "/audio/kana/hiragana/tsu.mp3" },
    { kana: "ふ", romaji: "fu", label: "Bilabial Fricative [FU]", file: "/audio/kana/hiragana/fu.mp3" },
    { kana: "を", romaji: "wo / o", label: "Grammar Particle [O]", file: "/audio/kana/hiragana/wo.mp3" },
    { kana: "ん", romaji: "n", label: "Uvular Nasal Mora [N]", file: "/audio/kana/hiragana/n.mp3" },
  ];

  const playAudio = (file: string, key: string) => {
    try {
      setPlayingAudio(key);
      const audio = new Audio(file);
      audio.onended = () => setPlayingAudio(null);
      audio.onerror = () => setPlayingAudio(null);
      audio.play().catch(() => setPlayingAudio(null));
    } catch {
      setPlayingAudio(null);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="border-b-2 border-[#000080] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#800000] uppercase font-mono">
          <span>◆ AUDIO PIPELINE</span>
          <span>//</span>
          <span>NEURAL SYNTHESIS &amp; PHONETICS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#000080] mt-1 tracking-tight">
          Native Japanese Speech &amp; Phonetics
        </h1>
        <p className="text-sm text-[#444] mt-2 leading-relaxed">
          How SaKana uses calibrated native Japanese speech synthesis (TTS) at an optimal 0.85× pace to train
          your ears for native Japanese pitch and mora timing.
        </p>
      </div>

      {/* Speech Engine Intro */}
      <div className="p-4 bg-[#fdfdfb] border-2 border-[#000080] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#000080] uppercase font-mono">
            <Bot className="w-4 h-4 text-[#000080]" />
            <span>Native Speech Synthesis Engine</span>
          </div>
          <p className="text-xs text-[#555] leading-relaxed">
            Audio pronunciation in SaKana is rendered through clear native Japanese speech synthesis to produce authentic
            accentuation and crisp consonant attacks.
          </p>
        </div>
        <span className="px-2 py-1 bg-[#000080] text-white font-mono text-[10px] font-bold shrink-0">
          CALIBRATED 0.85× PACE
        </span>
      </div>

      {/* Interactive Phonetic Audio Samples */}
      <section className="space-y-3 pt-2">
        <h2 className="text-lg font-bold text-[#000080] flex items-center gap-2 border-b border-[#c0c0c0] pb-1">
          <Volume2 className="w-5 h-5 text-[#000080]" />
          <span>Interactive Phonetic Audio Samples</span>
        </h2>
        <p className="text-xs text-[#555]">
          Click any button below to audition tricky characters directly through the audio player:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {sampleAudios.map((sample) => (
            <button
              key={sample.kana}
              type="button"
              onClick={() => playAudio(sample.file, sample.kana)}
              className={`p-2.5 border-2 flex items-center justify-between text-left transition-colors cursor-pointer ${
                playingAudio === sample.kana
                  ? "bg-[#ffff00] border-[#800000] text-[#800000]"
                  : "bg-[#d4d0c8] border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#c0bca8]"
              }`}
            >
              <div>
                <div className="text-lg font-bold text-[#000080] font-serif leading-none">
                  {sample.kana}
                </div>
                <div className="text-[10px] text-[#555] font-mono mt-0.5">
                  /{sample.romaji}/ — {sample.label}
                </div>
              </div>
              <Play className={`w-3.5 h-3.5 shrink-0 ${playingAudio === sample.kana ? "fill-[#800000] text-[#800000]" : "text-[#000080]"}`} />
            </button>
          ))}
        </div>
      </section>

      {/* Concept: Mora Timing */}
      <section className="space-y-3 pt-4">
        <h2 className="text-lg font-bold text-[#000080] flex items-center gap-2 border-b border-[#c0c0c0] pb-1">
          <Music className="w-5 h-5 text-[#800000]" />
          <span>The Concept of Mora Timing (拍)</span>
        </h2>
        <p className="text-xs text-[#333] leading-relaxed">
          Unlike English syllables, which vary greatly in length, Japanese is an <strong>isochronous mora-timed language</strong>.
          Every mora gets approximately the same beat duration:
        </p>
        <div className="p-3 bg-[#f5f5f0] border border-[#808080] text-xs space-y-2">
          <ul className="list-disc pl-4 space-y-1.5 text-[#333]">
            <li>
              <strong>Standard Kana:</strong> Each basic kana (あ, か, さ) counts as 1 full mora beat.
            </li>
            <li>
              <strong>The Small &quot;っ&quot; (Sokuon):</strong> Represents a momentary glottal silent stop, which counts as a full 1-beat mora pause.
            </li>
            <li>
              <strong>The Syllabic &quot;ん&quot;:</strong> Holds its own full beat of nasal resonance.
            </li>
            <li>
              <strong>Long Vowels (ー / おう):</strong> Stretches the vowel across 2 distinct mora beats.
            </li>
          </ul>
        </div>
      </section>

      {/* Audio Integration in Speed Sprints */}
      <section className="space-y-3 pt-4">
        <h2 className="text-lg font-bold text-[#000080] flex items-center gap-2 border-b border-[#c0c0c0] pb-1">
          <Volume2 className="w-5 h-5 text-[#008000]" />
          <span>Interactive Audio in Speed Sprints (Timed Drills)</span>
        </h2>
        <p className="text-xs text-[#333] leading-relaxed">
          While flashcards in study mode allow relaxed listening, SaKana&apos;s <strong>Speed Sprint</strong> challenges also feature an optional <em>Listening Sprint</em> mode.
        </p>
        <div className="p-3 bg-[#f5f5f0] border border-[#808080] text-xs space-y-2">
          <div className="font-bold text-[#000080] uppercase font-mono">
            Zero Audio Latency Penalty:
          </div>
          <p className="text-[#333] text-[11px] leading-relaxed">
            Speech synthesis naturally takes 500ms–800ms to articulate phonemes. To keep 15-second timed tests 100% fair, SaKana features an <strong>auto-pause timer mechanism</strong>:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-[#333] text-[11px]">
            <li><strong>Auto Pause on Play:</strong> The countdown timer pauses instantly while speech plays.</li>
            <li><strong>Auto Resume on End:</strong> The moment the audio finishes, the timer resumes so pure reaction speed is recorded.</li>
            <li><strong>Hotkeys:</strong> Press <code>[R]</code> during an audio question to replay the sound at any time without losing seconds.</li>
            <li><strong>User Toggle:</strong> Can be turned ON or OFF at any time in the test header or system settings.</li>
          </ul>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="mt-8 pt-4 border-t-2 border-[#808080] flex justify-between items-center text-xs">
        <Link
          href={`${prefix}/docs/arcade-engine`}
          className="font-bold text-[#000080] hover:underline flex items-center gap-1"
        >
          &lt;&lt; Arcade Engine
        </Link>
        <Link
          href={`${prefix}/docs/api`}
          className="font-bold text-[#000080] hover:underline flex items-center gap-1"
        >
          <span>Developer REST API</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
