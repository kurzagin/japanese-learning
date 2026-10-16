import type { Metadata } from "next";
import { PrintableKanaChartClient } from "@/components/PrintableKanaChartClient";

export const metadata: Metadata = {
  title: "Free Printable Katakana Chart PDF (Horizontal Landscape) — Complete A-O Table",
  description:
    "Download or print the complete Japanese Katakana chart in horizontal landscape PDF format. Includes all 46 basic Gojūon, 25 Dakuon/Handakuon, and 33 Yōon combinations with Romaji. 100% free for students and teachers.",
  alternates: {
    canonical: "/tools/katakana-chart-pdf",
    languages: {
      en: "/tools/katakana-chart-pdf",
      id: "/tools/katakana-chart-pdf",
      ja: "/tools/katakana-chart-pdf",
      "x-default": "/tools/katakana-chart-pdf",
    },
  },
  openGraph: {
    title: "Printable Katakana Chart PDF (Horizontal Layout) | SaKana",
    description:
      "Free high-resolution horizontal Katakana PDF study sheet. All 104+ Katakana characters with Romaji guide.",
    url: "/tools/katakana-chart-pdf",
    type: "website",
  },
  keywords: [
    "katakana chart pdf",
    "printable katakana chart",
    "katakana chart horizontal",
    "katakana landscape pdf",
    "japanese katakana table download",
    "katakana alphabet chart printable",
    "complete katakana chart",
    "free japanese study sheet",
    "sakanajp",
  ],
};

export default function KatakanaChartPdfPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "SaKana Printable Katakana Chart PDF Downloader",
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
        name: "Japanese Katakana Chart Horizontal PDF",
        description:
          "Complete horizontal A4 printable Japanese Katakana chart with Gojūon, Dakuon, and Yōon combinations with Romaji.",
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
            name: "Katakana Chart PDF",
            item: "https://sakanajp.site/tools/katakana-chart-pdf",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I download the Katakana chart as a PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Click the 'Download PDF (A4 Landscape)' button on this page to instantly generate and save the complete horizontal Katakana chart in high-resolution PDF format, or click 'Print Chart' to print via your browser.",
            },
          },
          {
            "@type": "Question",
            name: "What kana variants are included in this Katakana PDF chart?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The chart includes all 46 basic Gojūon characters, 20 Dakuon, 5 Handakuon, and 33 Yōon contracted combination sounds (104 characters in total).",
            },
          },
          {
            "@type": "Question",
            name: "Is this Katakana chart free for classroom use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, this printable horizontal Katakana sheet is 100% free for individual learners, teachers, and classroom distribution.",
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
        script="katakana"
        title="Printable Katakana Chart PDF"
        japaneseTitle="片仮名一覧表"
        description="Free downloadable and printable horizontal Katakana reference chart in A4 landscape format. Complete with all 46 Gojūon, 25 Dakuon/Handakuon, and 33 Yōon combinations with clean Romaji guides."
        seoSubtitle="Printable Katakana Chart PDF (Horizontal Landscape)"
        otherScriptUrl="/tools/hiragana-chart-pdf"
        otherScriptLabel="Hiragana (平仮名)"
      />
    </>
  );
}
