import type { Metadata } from "next";
import Link from "next/link";
import { CURATED_COMPARISONS } from "@/lib/kana-seo";
import { ALL_KANA_PRIMITIVES } from "@/data/kana";
import { RetroNavbar } from "@/components/RetroNavbar";
import { Sparkles, ArrowRight, Layers, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Japanese Kana Lookalike Comparisons — Confused Characters Guide",
  description:
    "Master the most confusing Japanese Hiragana and Katakana characters. Side-by-side comparisons of シ vs ツ, ソ vs ン, さ vs き, and more with stroke orders and visual tricks.",
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "Japanese Kana Lookalike Comparisons | SaKana",
    description:
      "Stop confusing Japanese characters. Explore visual comparison guides for Hiragana and Katakana lookalikes.",
    url: "/compare",
  },
};

export default function CompareIndexPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Japanese Kana Lookalike Comparisons",
        description:
          "Detailed side-by-side guide for distinguishing confusing Japanese Hiragana and Katakana lookalikes including シ vs ツ, ソ vs ン, and さ vs き.",
        url: "https://sakanajp.site/compare",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://sakanajp.site",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Kana Comparisons",
            item: "https://sakanajp.site/compare",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <RetroNavbar currentSubtitle="KANA COMPARISONS" />

      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4">
        {/* Banner */}
        <div className="border-2 border-[#800000] bg-[#fff8e7] p-4 text-center shadow-xs">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>Lookalike Breakdown Hub</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#000080] tracking-wide">
            JAPANESE KANA COMPARISONS & LOOKALIKES
          </h1>
          <p className="text-xs sm:text-sm text-[#404040] font-medium mt-1 max-w-xl mx-auto">
            Easily confused by Katakana シ and ツ? Or Hiragana さ and き? Select a character pair below for an anatomical breakdown and memory tricks.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {CURATED_COMPARISONS.map((comp) => {
            const k1 = ALL_KANA_PRIMITIVES.find((k) => k.id === comp.kana1Id);
            const k2 = ALL_KANA_PRIMITIVES.find((k) => k.id === comp.kana2Id);

            if (!k1 || !k2) return null;

            return (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="border-2 border-[#808080] bg-white p-4 hover:border-[#000080] hover:bg-[#f0f4ff] transition-all group flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#800000] uppercase font-bold">
                    <span>{comp.script}</span>
                    <span className="text-[#000080] group-hover:underline flex items-center gap-0.5">
                      Compare <ArrowRight className="w-3 h-3 inline" />
                    </span>
                  </div>

                  {/* Visual vs */}
                  <div className="flex items-center justify-center gap-4 my-3">
                    <div className="text-center">
                      <div className="text-4xl font-black text-[#000080] group-hover:scale-110 transition-transform">
                        {k1.character}
                      </div>
                      <div className="text-xs font-mono font-bold text-[#cc0000]">
                        /{k1.romaji}/
                      </div>
                    </div>
                    <span className="text-sm font-black text-[#888] font-mono">VS</span>
                    <div className="text-center">
                      <div className="text-4xl font-black text-[#800000] group-hover:scale-110 transition-transform">
                        {k2.character}
                      </div>
                      <div className="text-xs font-mono font-bold text-[#cc0000]">
                        /{k2.romaji}/
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#eee] text-[11px] text-[#555] line-clamp-1 italic">
                  {comp.visualTip.en}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Educational Guide for Confusing Kana Pairs */}
        <section className="border border-[#808080] bg-white p-4 sm:p-6 space-y-4 shadow-xs mt-6">
          <div className="flex items-center gap-2 border-b border-[#c0c0c0] pb-2">
            <HelpCircle className="w-4 h-4 text-[#000080]" />
            <h2 className="text-sm sm:text-base font-bold text-[#000080] uppercase">
              The Secret to Telling Lookalike Japanese Kana Apart
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-[#444]">
            <div className="p-3 bg-[#faf9f5] border border-[#e8e6d8]">
              <strong className="text-[#800000] block mb-1">Stroke Direction &amp; Alignment</strong>
              <p>
                In Katakana, characters like <strong>シ (shi)</strong> and <strong>ツ (tsu)</strong> differ by stroke direction: <em>shi</em> is written from bottom-to-top with strokes aligned along a vertical axis, whereas <em>tsu</em> is written top-to-bottom with strokes aligned horizontally along the ceiling.
              </p>
            </div>
            <div className="p-3 bg-[#faf9f5] border border-[#e8e6d8]">
              <strong className="text-[#800000] block mb-1">Loop &amp; Tail Variations</strong>
              <p>
                In Hiragana pairs like <strong>れ (re)</strong>, <strong>わ (wa)</strong>, and <strong>ね (ne)</strong>, the initial left stroke is identical, but the ending tail tells them apart: <em>re</em> flares outward, <em>wa</em> curves round like a hoop, and <em>ne</em> ties into a closed loop at the finish.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
