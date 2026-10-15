import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakanajp.site";

export const viewport: Viewport = {
  themeColor: "#000080",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SaKana (魚) — Learn Kana for Anime Fans | Japanese Speed Drill",
    template: "%s | SaKana (魚)",
  },
  description:
    "Master Hiragana, Katakana, and iconic anime words fast. Built for anime and manga fans who want instant reading reflexes without handwriting burnout.",
  applicationName: "SaKana",
  authors: [{ name: "SaKana Project Team" }],
  generator: "Next.js",
  keywords: [
    "Learn Japanese for anime",
    "Anime Hiragana",
    "Anime Katakana",
    "Read anime subtitles",
    "Manga sound effects",
    "Japanese flashcards",
    "Belajar Bahasa Jepang anime",
    "日本語学習",
    "ひらがな",
    "カタカナ",
    "Spaced Repetition System",
    "SRS Japanese",
    "Voicevox Japanese",
    "Anime vocabulary speed drill",
  ],
  creator: "SaKana",
  publisher: "SaKana",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "id-ID": "/",
      "ja-JP": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID", "ja_JP"],
    url: siteUrl,
    title: "SaKana (魚) — Learn Kana for Anime Fans | Japanese Speed Drill",
    description:
      "Instant Kana recognition drill for anime & manga fans. Master Hiragana, Katakana, and anime vocabulary with SM-2 spaced repetition and Voicevox audio.",
    siteName: "SaKana",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaKana (魚) — Japanese Kana Speed Drill",
    description:
      "Master Japanese Hiragana, Katakana & Vocab with arcade drills and spaced repetition.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/#webapp`,
        name: "SaKana",
        url: siteUrl,
        applicationCategory: "EducationalApplication",
        operatingSystem: "All modern web browsers",
        browserRequirements: "Requires JavaScript",
        description:
          "Free online Japanese learning app with spaced repetition flashcards, native audio pronunciation, and arcade speed drills for Hiragana, Katakana, and Vocabulary.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        inLanguage: ["en", "id", "ja"],
      },
      {
        "@type": "EducationalOrganization",
        "@id": `${siteUrl}/#organization`,
        name: "SaKana",
        url: siteUrl,
        logo: `${siteUrl}/favicon.ico`,
      },
    ],
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#ece9d8] text-[#111111] font-mono selection:bg-[#000080] selection:text-white">
        <LanguageProvider>
          <div className="min-h-screen flex flex-col w-full">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
