import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutClient from "./AboutClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "About the Method & Curriculum — Learn Kana for Anime Fans",
    description:
      "Learn about SaKana's Japanese learning philosophy: instant Kana recognition, SM-2 spaced repetition (SRS), Voicevox neural audio, and vocabulary built for anime and manga enthusiasts.",
    ogTitle: "About SaKana — Kana Speed Recognition for Anime Fans",
    ogDescription:
      "Explore SaKana's recognition-first approach: read anime titles, character names, and manga sound effects with speed drills and Voicevox audio.",
  },
  id: {
    title: "Tentang Metode & Kurikulum — Belajar Huruf Jepang untuk Penggemar Anime",
    description:
      "Pelajari filosofi belajar SaKana: pengenalan instan Kana, SM-2 spaced repetition, audio TTS Voicevox, dan kosakata untuk penikmat anime & manga.",
    ogTitle: "Tentang SaKana — Drill Kecepatan Kana untuk Penggemar Anime",
    ogDescription:
      "Pendekatan recognition-first: baca judul anime, nama karakter, dan efek suara manga tanpa terbebani hafalan guratan rumit.",
  },
  ja: {
    title: "学習理念とカリキュラムについて — アニメファンのための「かな」学習",
    description:
      "SaKanaの学習アプローチ：瞬間視覚認識、SM-2間隔反復、VOICEVOX音声合成（TTS）、そしてアニメやポップカルチャーに根ざした生きた語彙。",
    ogTitle: "SaKanaについて — アニメファンのための「かな」瞬時認識ドリル",
    ogDescription:
      "手書きよりもまず「見て聴いて読める」楽しさを。アニメタイトルやセリフが自然に読めるようになるための学習法。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/about");

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

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  return <AboutClient />;
}
