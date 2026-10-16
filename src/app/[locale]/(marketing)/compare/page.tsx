import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CURATED_COMPARISONS } from "@/lib/kana-seo";
import { getAllKana } from "@/lib/db-data";
import { translations } from "@/data/i18n";
import { RetroNavbar } from "@/components/RetroNavbar";
import { Sparkles, ArrowRight, HelpCircle } from "lucide-react";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "Japanese Kana Lookalike Comparisons — Confused Characters Guide",
    description:
      "Master the most confusing Japanese Hiragana and Katakana characters. Side-by-side comparisons of シ vs ツ, ソ vs ン, さ vs き, and more with stroke orders and visual tricks.",
    ogTitle: "Japanese Kana Lookalike Comparisons | SaKana",
    ogDescription:
      "Stop confusing Japanese characters. Explore visual comparison guides for Hiragana and Katakana lookalikes.",
  },
  id: {
    title: "Perbandingan Huruf Jepang Mirip — Panduan Karakter Membingungkan",
    description:
      "Kuasai karakter Hiragana dan Katakana yang paling membingungkan. Perbandingan berdampingan シ vs ツ, ソ vs ン, さ vs き dengan trik visual dan arah guratan.",
    ogTitle: "Perbandingan Karakter Kana Mirip | SaKana",
    ogDescription:
      "Jangan lagi tertukar antara huruf Jepang yang mirip. Panduan perbandingan visual karakter Hiragana dan Katakana.",
  },
  ja: {
    title: "見分けにくい「かな文字」比較ガイド — 似ているひらがな・カタカナ",
    description:
      "初心者が間違えやすい「シ vs ツ」「ソ vs ン」「さ vs き」などを徹底比較。筆順の方向や字形のポイントをわかりやすく解説します。",
    ogTitle: "似ているかな文字の比較ガイド | SaKana",
    ogDescription:
      "カタカナ・ひらがなの紛らわしい文字を視覚的に分解。一瞬で見分けられるようになる記憶のコツを掲載。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/compare");

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: alternates.languages[locale] || alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: alternates.languages[locale] || alternates.canonical,
    },
  };
}

export default async function CompareIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = translations[locale];
  const prefix = locale === "en" ? "" : `/${locale}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name:
          locale === "id"
            ? "Perbandingan Huruf Jepang Mirip"
            : locale === "ja"
            ? "似ている日本語かな文字の比較一覧"
            : "Japanese Kana Lookalike Comparisons",
        description:
          "Detailed side-by-side guide for distinguishing confusing Japanese Hiragana and Katakana lookalikes including シ vs ツ, ソ vs ン, and さ vs き.",
        url: `https://sakanajp.site${prefix}/compare`,
      },
    ],
  };

  const allKana = await getAllKana();

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <RetroNavbar currentSubtitle={t.compareHub.subtitle} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4">
        {/* Banner */}
        <div className="border-2 border-[#800000] bg-[#fff8e7] p-4 text-center shadow-xs">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>{t.compareHub.badge}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#000080] tracking-wide">
            {t.compareHub.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#404040] font-medium mt-1 max-w-xl mx-auto">
            {t.compareHub.description}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {CURATED_COMPARISONS.map((comp) => {
            const k1 = allKana.find((k) => k.id === comp.kana1Id);
            const k2 = allKana.find((k) => k.id === comp.kana2Id);

            if (!k1 || !k2) return null;

            return (
              <Link
                key={comp.slug}
                href={`${prefix}/compare/${comp.slug}`}
                className="border-2 border-[#808080] bg-white p-4 hover:border-[#000080] hover:bg-[#f0f4ff] transition-all group flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#800000] uppercase font-bold">
                    <span>{comp.script}</span>
                    <span className="text-[#000080] group-hover:underline flex items-center gap-0.5">
                      {t.compareHub.compareAction} <ArrowRight className="w-3 h-3 inline" />
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
                  {comp.visualTip[locale] || comp.visualTip.en}
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
              {t.compareHub.eduTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-[#444]">
            <div className="p-3 bg-[#faf9f5] border border-[#e8e6d8]">
              <strong className="text-[#800000] block mb-1">{t.compareHub.edu1Title}</strong>
              <p>
                {t.compareHub.edu1Desc}
              </p>
            </div>
            <div className="p-3 bg-[#faf9f5] border border-[#e8e6d8]">
              <strong className="text-[#800000] block mb-1">{t.compareHub.edu2Title}</strong>
              <p>
                {t.compareHub.edu2Desc}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
