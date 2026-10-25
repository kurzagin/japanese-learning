import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import { RetroBottomNav } from "@/components/RetroBottomNav";
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
    default: "SaKana (魚) — The Fastest Way to Master Kana for Anime Fans",
    template: "%s | SaKana (魚)",
  },
  description:
    "Skip the boring textbooks. Master Hiragana, Katakana, and iconic Japanese pop-culture words through fast flashcards, native Japanese TTS audio, and speed drills.",
  applicationName: "SaKana",
  authors: [{ name: "SaKana Project Team" }],
  generator: "Next.js",
  keywords: [
    "Learn Kana for anime",
    "Anime Hiragana",
    "Anime Katakana",
    "Japanese alphabet drill",
    "Fast Japanese flashcards",
    "Native Japanese TTS audio",
    "Belajar Hiragana Katakana anime",
    "日本語学習",
    "ひらがな",
    "カタカナ",
    "Spaced Repetition System",
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
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID", "ja_JP"],
    url: siteUrl,
    title: "SaKana (魚) — The Fastest Way to Master Kana for Anime Fans",
    description:
      "Master Hiragana, Katakana, and Japanese pop-culture vocabulary with fast-paced flashcards and native Japanese TTS audio.",
    siteName: "SaKana",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SaKana (魚) — The Fastest Way to Master Kana for Anime Fans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaKana (魚) — Japanese Kana Speed Drill",
    description:
      "Master Japanese Hiragana, Katakana & Vocab with arcade drills and spaced repetition.",
    images: ["/opengraph-image"],
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
  other: {
    "google-adsense-account": "ca-pub-6604416528217447",
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
          "Free online Japanese learning app with spaced repetition flashcards, native TTS audio pronunciation, and arcade speed drills for Hiragana, Katakana, and Vocabulary.",
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
          <div className="min-h-screen flex flex-col w-full pb-14 sm:pb-0">{children}</div>
          <RetroBottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
