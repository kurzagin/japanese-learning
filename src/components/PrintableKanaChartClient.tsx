"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { RetroWebring } from "@/components/RetroWebring";
import { useLanguage } from "@/context/LanguageContext";
import { KanaCharacter } from "@/types/kana";
import {
  Printer,
  Download,
  Sparkles,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  BookOpen,
} from "lucide-react";

interface PrintableKanaChartProps {
  script: "hiragana" | "katakana";
  title: string;
  japaneseTitle: string;
  description: string;
  seoSubtitle: string;
  otherScriptUrl: string;
  otherScriptLabel: string;
  kanaList?: KanaCharacter[];
}

// Columns for standard Japanese kana charts (Right to Left historically or Left to Right modern table):
// Standard vowel positions: a, i, u, e, o
const GOJUON_ROWS = [
  { key: "vowel", label: "Vowels (あ/ア)", romajis: ["a", "i", "u", "e", "o"] },
  { key: "k", label: "K-row (か/カ)", romajis: ["ka", "ki", "ku", "ke", "ko"] },
  { key: "s", label: "S-row (さ/サ)", romajis: ["sa", "shi", "su", "se", "so"] },
  { key: "t", label: "T-row (た/タ)", romajis: ["ta", "chi", "tsu", "te", "to"] },
  { key: "n", label: "N-row (な/ナ)", romajis: ["na", "ni", "nu", "ne", "no"] },
  { key: "h", label: "H-row (は/ハ)", romajis: ["ha", "hi", "fu", "he", "ho"] },
  { key: "m", label: "M-row (ま/マ)", romajis: ["ma", "mi", "mu", "me", "mo"] },
  { key: "y", label: "Y-row (や/ヤ)", romajis: ["ya", "", "yu", "", "yo"] },
  { key: "r", label: "R-row (ら/ラ)", romajis: ["ra", "ri", "ru", "re", "ro"] },
  { key: "w", label: "W-row (わ/ワ)", romajis: ["wa", "", "", "", "wo"] },
  { key: "singular", label: "N (ん/ン)", romajis: ["n", "", "", "", ""] },
];

const DAKUON_ROWS = [
  { key: "g", label: "G-row (が行)", romajis: ["ga", "gi", "gu", "ge", "go"] },
  { key: "z", label: "Z-row (ざ行)", romajis: ["za", "ji", "zu", "ze", "zo"] },
  { key: "d", label: "D-row (だ行)", romajis: ["da", "ji(di)", "zu(du)", "de", "do"] },
  { key: "b", label: "B-row (ば行)", romajis: ["ba", "bi", "bu", "be", "bo"] },
  { key: "p", label: "P-row (ぱ行)", romajis: ["pa", "pi", "pu", "pe", "po"] },
];

const YOON_ROWS = [
  { label: "kya / kyu / kyo", romajis: ["kya", "kyu", "kyo"] },
  { label: "sha / shu / sho", romajis: ["sha", "shu", "sho"] },
  { label: "cha / chu / cho", romajis: ["cha", "chu", "cho"] },
  { label: "nya / nyu / nyo", romajis: ["nya", "nyu", "nyo"] },
  { label: "hya / hyu / hyo", romajis: ["hya", "hyu", "hyo"] },
  { label: "mya / myu / myo", romajis: ["mya", "myu", "myo"] },
  { label: "rya / ryu / ryo", romajis: ["rya", "ryu", "ryo"] },
  { label: "gya / gyu / gyo", romajis: ["gya", "gyu", "gyo"] },
  { label: "ja / ju / jo", romajis: ["ja", "ju", "jo"] },
  { label: "bya / byu / byo", romajis: ["bya", "byu", "byo"] },
  { label: "pya / pyu / pyo", romajis: ["pya", "pyu", "pyo"] },
];

export function PrintableKanaChartClient({
  script,
  title,
  japaneseTitle,
  description,
  seoSubtitle,
  otherScriptUrl,
  otherScriptLabel,
  kanaList = [],
}: PrintableKanaChartProps) {
  const { t, locale } = useLanguage();
  const chartRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const prefix = locale === "en" ? "" : `/${locale}`;
  const scriptDisplay =
    locale === "ja"
      ? script === "hiragana"
        ? "ひらがな"
        : "カタカナ"
      : script === "hiragana"
        ? "Hiragana"
        : "Katakana";

  const primitives: KanaCharacter[] = kanaList || [];

  // Lookup map: romaji -> KanaCharacter
  const kanaMap = React.useMemo(() => {
    const map = new Map<string, KanaCharacter>();
    for (const item of primitives) {
      map.set(item.romaji.toLowerCase(), item);
      // also normalize duplicates like dakuon 'ji' / 'zu'
      if (item.id === "h-dji" || item.id === "k-dji") map.set("ji(di)", item);
      if (item.id === "h-dzu" || item.id === "k-dzu") map.set("zu(du)", item);
    }
    return map;
  }, [primitives]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!chartRef.current || isGeneratingPdf) return;
    try {
      setIsGeneratingPdf(true);
      const html2canvasModule = await import("html2canvas");
      const jsPDFModule = await import("jspdf");
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = jsPDFModule;

      const canvas = await html2canvas(chartRef.current, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4", // 297mm x 210mm
      });

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 297
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 210
      const margin = 8; // 8mm margin
      const printableWidth = pdfWidth - margin * 2;
      const printableHeight = pdfHeight - margin * 2;

      // Maintain exact aspect ratio to fit within single A4 page
      const imgWidth = printableWidth;
      const imgHeight = (canvas.height * printableWidth) / canvas.width;

      const finalWidth = imgHeight > printableHeight ? (canvas.width * printableHeight) / canvas.height : imgWidth;
      const finalHeight = imgHeight > printableHeight ? printableHeight : imgHeight;
      const posX = margin + (printableWidth - finalWidth) / 2;
      const posY = margin + (printableHeight - finalHeight) / 2;

      pdf.addImage(imgData, "PNG", posX, posY, finalWidth, finalHeight, undefined, "FAST");
      pdf.save(`sakana-${script}-chart-horizontal-a4.pdf`);
    } catch (err) {
      console.error("PDF generation failed, falling back to window.print():", err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-black">
      <div className="no-print">
        <RetroNavbar currentSubtitle={seoSubtitle} />
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 space-y-4">
        {/* Top Breadcrumb & SEO Hero Header */}
        <div className="no-print border-2 border-[#800000] bg-[#fff8e7] p-4 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-[#800000] border-b border-[#800000]/20 pb-2">
            <div className="flex items-center gap-1.5 font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
              <span>{t.pdfChart.studyToolsBreadcrumb}</span>
              <span>/</span>
              <span className="text-[#fa624d]">{script.toUpperCase()} {t.pdfChart.pdfChartSuffix}</span>
            </div>
            <Link
              href={otherScriptUrl}
              className="text-[#fa624d] hover:underline font-bold flex items-center gap-1"
            >
              <span>{t.pdfChart.switchChartLink(otherScriptLabel)}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="mt-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#fa624d] tracking-wide flex items-center gap-2">
                <span>{title}</span>
                <span className="text-sm font-bold text-[#800000] bg-[#ffd700] px-2 py-0.5 border border-[#800000]">
                  {japaneseTitle}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-[#333333] mt-1 max-w-3xl font-medium leading-relaxed">
                {description}
              </p>
            </div>

            {/* Print & Download Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="cursor-pointer px-4 py-2 bg-[#008000] text-white font-bold text-xs uppercase border-t-2 border-l-2 border-[#80ff80] border-b-2 border-r-2 border-[#004000] hover:bg-[#009900] active:translate-y-0.5 flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isGeneratingPdf ? t.pdfChart.generatingPdf : t.pdfChart.downloadPdfBtn}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="cursor-pointer px-4 py-2 bg-[#fa624d] text-white font-bold text-xs uppercase border-t-2 border-l-2 border-[#8080ff] border-b-2 border-r-2 border-[#000040] hover:bg-[#0000a0] active:translate-y-0.5 flex items-center gap-2 shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>{t.pdfChart.printChartBtn}</span>
              </button>
            </div>
          </div>

          {/* Quick tips bar */}
          <div className="mt-3 pt-2 border-t border-[#800000]/20 flex flex-wrap items-center gap-4 text-[11px] text-[#444444] font-mono">
            <span className="flex items-center gap-1 font-bold text-[#fa624d]">
              <CheckCircle className="w-3.5 h-3.5 text-[#008000]" />
              {t.pdfChart.tipOrientation}
            </span>
            <span className="flex items-center gap-1 font-bold text-[#fa624d]">
              <CheckCircle className="w-3.5 h-3.5 text-[#008000]" />
              {t.pdfChart.tipVariants}
            </span>
            <span className="flex items-center gap-1 font-bold text-[#fa624d]">
              <CheckCircle className="w-3.5 h-3.5 text-[#008000]" />
              {t.pdfChart.tipFree}
            </span>
          </div>
        </div>

        {/* PRINTABLE CANVAS / CHART PREVIEW */}
        <div className="overflow-x-auto pb-2">
          <div
            ref={chartRef}
            className="printable-chart-container bg-white border-2 border-[#000080] p-4 sm:p-5 shadow-md mx-auto w-[1080px] min-w-[1080px] text-black font-sans box-border"
          >
            {/* Header of Printable Sheet */}
            <div className="border-b-2 border-[#000080] pb-2 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-[#fa624d] text-white px-2 py-0.5 font-bold text-sm tracking-wider uppercase">
                  {t.pdfChart.sheetBrand}
                </div>
                <h2 className="text-xl font-black text-[#fa624d] tracking-wider uppercase">
                  {t.pdfChart.sheetTitle(scriptDisplay, script === "hiragana" ? "平仮名" : "片仮名")}
                </h2>
              </div>
              <div className="text-right text-[10px] font-mono text-[#555555]">
                <div className="font-bold text-[#800000]">sakanajp.site/tools/{script}-chart-pdf</div>
                <div>{t.pdfChart.sheetSub}</div>
              </div>
            </div>

            {/* Layout Grid: Left 2/3 (Basic Gojuon 46 + Dakuon 25) | Right 1/3 (Yoon Combinations 33) */}
            <div className="grid grid-cols-12 gap-3">
              {/* SECTION 1: GOJUON (Basic 46) */}
              <div className="col-span-8 space-y-3">
                <div className="border border-[#000080]">
                  <div className="bg-[#fa624d] text-white text-[11px] font-bold px-2 py-0.5 flex justify-between items-center">
                    <span>{t.pdfChart.sec1Title}</span>
                    <span className="text-[9px] font-mono text-[#ffff99]">{t.pdfChart.sec1Sub}</span>
                  </div>
                  <table className="w-full text-center border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#f0f4f8] text-[#fa624d] font-bold border-b border-[#000080]">
                        <th className="py-1 px-1 border-r border-[#000080] w-16 text-[10px]">{t.pdfChart.rowCol}</th>
                        <th className="py-1 px-1 border-r border-[#000080] w-[18%] text-[11px]">a (あ/ア)</th>
                        <th className="py-1 px-1 border-r border-[#000080] w-[18%] text-[11px]">i (い/イ)</th>
                        <th className="py-1 px-1 border-r border-[#000080] w-[18%] text-[11px]">u (う/ウ)</th>
                        <th className="py-1 px-1 border-r border-[#000080] w-[18%] text-[11px]">e (え/エ)</th>
                        <th className="py-1 px-1 w-[18%] text-[11px]">o (お/オ)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {GOJUON_ROWS.map((row, idx) => (
                        <tr
                          key={row.key}
                          className={`border-b border-[#dddddd] ${idx % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}`}
                        >
                          <td className="py-0.5 px-1 font-bold text-[10px] text-[#555555] border-r border-[#000080] bg-[#f9f9f9]">
                            {row.label.split(" ")[0]}
                          </td>
                          {row.romajis.map((romaji, rIdx) => {
                            if (!romaji) {
                              return (
                                <td
                                  key={rIdx}
                                  className={`py-0.5 px-1 bg-[#f0f0f0] text-gray-300 ${
                                    rIdx < 4 ? "border-r border-[#dddddd]" : ""
                                  }`}
                                >
                                  -
                                </td>
                              );
                            }
                            const charObj = kanaMap.get(romaji);
                            return (
                              <td
                                key={rIdx}
                                className={`py-0.5 px-1 ${rIdx < 4 ? "border-r border-[#dddddd]" : ""}`}
                              >
                                <div className="text-base font-bold text-black leading-tight">
                                  {charObj?.character || ""}
                                </div>
                                <div className="text-[9px] font-mono font-semibold text-[#800000] leading-none">
                                  {romaji}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* SECTION 2: DAKUON & HANDAKUON (25 Characters) */}
                <div className="border border-[#800000]">
                  <div className="bg-[#800000] text-white text-[11px] font-bold px-2 py-0.5 flex justify-between items-center">
                    <span>{t.pdfChart.sec2Title}</span>
                    <span className="text-[9px] font-mono text-[#ffd700]">{t.pdfChart.sec2Sub}</span>
                  </div>
                  <table className="w-full text-center border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#fff5f5] text-[#800000] font-bold border-b border-[#800000]">
                        <th className="py-1 px-1 border-r border-[#800000] w-16 text-[10px]">{t.pdfChart.rowCol}</th>
                        <th className="py-1 px-1 border-r border-[#800000] w-[18%] text-[11px]">a</th>
                        <th className="py-1 px-1 border-r border-[#800000] w-[18%] text-[11px]">i</th>
                        <th className="py-1 px-1 border-r border-[#800000] w-[18%] text-[11px]">u</th>
                        <th className="py-1 px-1 border-r border-[#800000] w-[18%] text-[11px]">e</th>
                        <th className="py-1 px-1 w-[18%] text-[11px]">o</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DAKUON_ROWS.map((row, idx) => (
                        <tr
                          key={row.key}
                          className={`border-b border-[#dddddd] ${idx % 2 === 0 ? "bg-white" : "bg-[#fffdfd]"}`}
                        >
                          <td className="py-0.5 px-1 font-bold text-[10px] text-[#800000] border-r border-[#800000] bg-[#fff9f9]">
                            {row.label.split(" ")[0]}
                          </td>
                          {row.romajis.map((romaji, rIdx) => {
                            const charObj = kanaMap.get(romaji);
                            const displayRomaji = romaji.includes("(") ? romaji.split("(")[0] : romaji;
                            return (
                              <td
                                key={rIdx}
                                className={`py-0.5 px-1 ${rIdx < 4 ? "border-r border-[#dddddd]" : ""}`}
                              >
                                <div className="text-base font-bold text-black leading-tight">
                                  {charObj?.character || ""}
                                </div>
                                <div className="text-[9px] font-mono font-semibold text-[#800000] leading-none">
                                  {displayRomaji}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION 3: YOON COMBINATIONS (33 Characters) */}
              <div className="col-span-4 border border-[#006064] flex flex-col">
                <div className="bg-[#006064] text-white text-[11px] font-bold px-2 py-0.5 flex justify-between items-center">
                  <span>{t.pdfChart.sec3Title}</span>
                  <span className="text-[9px] font-mono text-[#80deea]">{t.pdfChart.sec3Sub}</span>
                </div>
                <table className="w-full text-center border-collapse text-xs flex-1">
                  <thead>
                    <tr className="bg-[#e0f7fa] text-[#006064] font-bold border-b border-[#006064]">
                      <th className="py-1 px-1 border-r border-[#006064] w-12 text-[10px]">{t.pdfChart.rootCol}</th>
                      <th className="py-1 px-1 border-r border-[#006064] text-[11px]">-ya</th>
                      <th className="py-1 px-1 border-r border-[#006064] text-[11px]">-yu</th>
                      <th className="py-1 px-1 text-[11px]">-yo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {YOON_ROWS.map((row, idx) => {
                      const root = row.romajis[0].slice(0, -2) || row.romajis[0][0];
                      return (
                        <tr
                          key={idx}
                          className={`border-b border-[#e0e0e0] ${idx % 2 === 0 ? "bg-white" : "bg-[#f9fbfb]"}`}
                        >
                          <td className="py-0.5 px-1 font-bold text-[9px] text-[#006064] border-r border-[#006064] bg-[#f0fbfb]">
                            {root.toUpperCase()}
                          </td>
                          {row.romajis.map((romaji, rIdx) => {
                            const charObj = kanaMap.get(romaji);
                            return (
                              <td
                                key={rIdx}
                                className={`py-0.5 px-1 ${rIdx < 2 ? "border-r border-[#e0e0e0]" : ""}`}
                              >
                                <div className="text-sm font-bold text-black leading-tight tracking-tight">
                                  {charObj?.character || ""}
                                </div>
                                <div className="text-[8.5px] font-mono font-semibold text-[#006064] leading-none">
                                  {romaji}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer of Printable Sheet */}
            <div className="mt-3 pt-1 border-t border-[#000080] flex items-center justify-between text-[9px] text-[#666666] font-mono">
              <div>
                {t.pdfChart.sheetFooterLeft}
              </div>
              <div>
                {t.pdfChart.sheetFooterRight} <span className="font-bold text-[#fa624d]">sakanajp.site</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEO In-Depth Educational Guide & FAQ */}
        <section className="no-print bg-white border-2 border-stone-200 p-5 shadow-xs space-y-4">
          <div className="border-b border-[#cccccc] pb-3">
            <h2 className="text-lg font-bold text-[#fa624d] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#800000]" />
              <span>{t.pdfChart.howToUseTitle(scriptDisplay)}</span>
            </h2>
            <p className="text-xs text-[#555555] mt-1 leading-relaxed">
              {t.pdfChart.howToUseDesc(scriptDisplay)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="border border-[#dddddd] p-3 bg-[#fafafa]">
              <div className="font-bold text-[#800000] mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#800000] text-white flex items-center justify-center text-[10px]">1</span>
                <span>{t.pdfChart.box1Title}</span>
              </div>
              <p className="text-[#555555] leading-relaxed">
                {t.pdfChart.box1Desc}
              </p>
            </div>

            <div className="border border-[#dddddd] p-3 bg-[#fafafa]">
              <div className="font-bold text-[#800000] mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#800000] text-white flex items-center justify-center text-[10px]">2</span>
                <span>{t.pdfChart.box2Title}</span>
              </div>
              <p className="text-[#555555] leading-relaxed">
                {t.pdfChart.box2Desc}
              </p>
            </div>

            <div className="border border-[#dddddd] p-3 bg-[#fafafa]">
              <div className="font-bold text-[#800000] mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#800000] text-white flex items-center justify-center text-[10px]">3</span>
                <span>{t.pdfChart.box3Title}</span>
              </div>
              <p className="text-[#555555] leading-relaxed">
                {t.pdfChart.box3Desc}
              </p>
            </div>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="border-t border-[#cccccc] pt-3">
            <h3 className="font-bold text-sm text-[#fa624d] mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#800000]" />
              <span>{t.pdfChart.faqTitle}</span>
            </h3>
            <div className="space-y-2 text-xs">
              <details className="border border-[#e0e0e0] p-2 bg-[#fdfdfd] cursor-pointer">
                <summary className="font-bold text-[#333333]">
                  {t.pdfChart.faq1Q}
                </summary>
                <p className="text-[#555555] mt-1 pl-2">
                  {t.pdfChart.faq1A}
                </p>
              </details>
              <details className="border border-[#e0e0e0] p-2 bg-[#fdfdfd] cursor-pointer">
                <summary className="font-bold text-[#333333]">
                  {t.pdfChart.faq2Q}
                </summary>
                <p className="text-[#555555] mt-1 pl-2">
                  {t.pdfChart.faq2A}
                </p>
              </details>
              <details className="border border-[#e0e0e0] p-2 bg-[#fdfdfd] cursor-pointer">
                <summary className="font-bold text-[#333333]">
                  {t.pdfChart.faq3Q}
                </summary>
                <p className="text-[#555555] mt-1 pl-2">
                  {t.pdfChart.faq3A}
                </p>
              </details>
            </div>
          </div>

          {/* Links to interactive tools */}
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            <Link
              href={`${prefix}/kana`}
              className="px-3 py-1 bg-stone-100 text-black font-bold border-t border-l border-white border-b border-r border-[#404040] hover:bg-[#e4e0d8] flex items-center gap-1.5"
            >
              <span>{t.pdfChart.interactiveDrillLink}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href={`${prefix}/tools/romaji-to-kana`}
              className="px-3 py-1 bg-stone-100 text-black font-bold border-t border-l border-white border-b border-r border-[#404040] hover:bg-[#e4e0d8] flex items-center gap-1.5"
            >
              <span>{t.pdfChart.converterLink}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href={`${prefix}/compare`}
              className="px-3 py-1 bg-stone-100 text-black font-bold border-t border-l border-white border-b border-r border-[#404040] hover:bg-[#e4e0d8] flex items-center gap-1.5"
            >
              <span>{t.pdfChart.lookalikesLink}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

        <div className="no-print">
          <RetroWebring />
        </div>
      </main>
    </div>
  );
}
