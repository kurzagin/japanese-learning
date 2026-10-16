import type { Metadata } from "next";
import { PrintableKanaChartClient } from "@/components/PrintableKanaChartClient";

export const metadata: Metadata = {
  title: "Free Printable Hiragana Chart PDF (Horizontal Landscape) — Complete A-O Table",
  description:
    "Download or print the complete Japanese Hiragana chart in horizontal landscape PDF format. Includes all 46 basic Gojūon, 25 Dakuon/Handakuon, and 33 Yōon combinations with Romaji. 100% free for students and teachers.",
  alternates: {
    canonical: "/tools/hiragana-chart-pdf",
    languages: {
      en: "/tools/hiragana-chart-pdf",
      id: "/tools/hiragana-chart-pdf",
      ja: "/tools/hiragana-chart-pdf",
      "x-default": "/tools/hiragana-chart-pdf",
    },
  },
  openGraph: {
    title: "Printable Hiragana Chart PDF (Horizontal Layout) | SaKana",
    description:
      "Free high-resolution horizontal Hiragana PDF study sheet. All 104+ Hiragana characters with Romaji guide.",
    url: "/tools/hiragana-chart-pdf",
    type: "website",
  },
  keywords: [
    "hiragana chart pdf",
    "printable hiragana chart",
    "hiragana chart horizontal",
    "hiragana landscape pdf",
    "japanese hiragana table download",
    "hiragana alphabet chart printable",
    "complete hiragana chart",
    "free japanese study sheet",
    "sakanajp",
  ],
};

export default function HiraganaChartPdfPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "SaKana Printable Hiragana Chart PDF Downloader",
        applicationCategory: "EducationalApplication",
        operatingSystem: "All modern browsers",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "DigitalDocument",
        name: "Japanese Hiragana Chart Horizontal PDF",
        description:
          "Complete horizontal A4 printable Japanese Hiragana chart with Gojūon, Dakuon, and Yōon combinations with Romaji.",
        fileFormat: "application/pdf",
        isAccessibleForFree: true,
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
            name: "Tools",
            item: "https://sakanajp.site/tools/romaji-to-kana",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Hiragana Chart PDF",
            item: "https://sakanajp.site/tools/hiragana-chart-pdf",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I download the Hiragana chart as a PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Click the 'Download PDF (A4 Landscape)' button on this page to instantly generate and save the complete horizontal Hiragana chart in high-resolution PDF format, or click 'Print Chart' to print via your browser.",
            },
          },
          {
            "@type": "Question",
            name: "What kana variants are included in this Hiragana PDF chart?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The chart includes all 46 basic Gojūon characters, 20 Dakuon, 5 Handakuon, and 33 Yōon contracted combination sounds (104 characters in total).",
            },
          },
          {
            "@type": "Question",
            name: "Is this Hiragana chart free for classroom use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, this printable horizontal Hiragana sheet is 100% free for individual learners, teachers, and classroom distribution.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <PrintableKanaChartClient
        script="hiragana"
        title="Printable Hiragana Chart PDF"
        japaneseTitle="平仮名一覧表"
        description="Free downloadable and printable horizontal Hiragana reference chart in A4 landscape format. Complete with all 46 Gojūon, 25 Dakuon/Handakuon, and 33 Yōon combinations with clean Romaji guides."
        seoSubtitle="Printable Hiragana Chart PDF (Horizontal Landscape)"
        otherScriptUrl="/tools/katakana-chart-pdf"
        otherScriptLabel="Katakana (片仮名)"
      />
    </>
  );
}
