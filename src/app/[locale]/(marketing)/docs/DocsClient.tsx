"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { useLanguage } from "@/context/LanguageContext";
import {
  Code,
  Terminal,
  Volume2,
  Check,
  Copy,
  Sparkles,
  ArrowRight,
  Database,
  Sliders,
  Send,
  BookOpen,
  ArrowLeft,
} from "lucide-react";

export default function DocsClient() {
  const { t } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testScript, setTestScript] = useState<string>("hiragana");
  const [testType, setTestType] = useState<string>("gojuon");
  const [testMinimal, setTestMinimal] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTestApi = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (testScript) params.set("script", testScript);
      if (testType) params.set("type", testType);
      if (testMinimal) params.set("minimal", "true");

      const res = await fetch(`/api/v1/kana?${params.toString()}`);
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const curlExample = `# Fetch Hiragana gojuon characters with default audio URLs
curl -X GET "https://sakanajp.site/api/v1/kana?script=hiragana&type=gojuon"`;

  const fetchJsExample = `// Fetch kana primitives in JavaScript / TypeScript
const res = await fetch("/api/v1/kana?script=hiragana&type=gojuon");
const { data } = await res.json();

data.forEach((k) => {
  console.log(\`\${k.character} (\${k.romaji}) -> audio: \${k.audioUrl}\`);
});`;

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      {/* Full-width Sticky Retro Navbar */}
      <RetroNavbar currentSubtitle={t.docs.subtitle} />

      {/* Edge-to-Edge Responsive Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
        {/* Info & Breadcrumb Bar */}
        <div className="border border-[#808080] bg-[#d4d0c8] px-3.5 py-2 text-xs flex items-center justify-between text-black shadow-xs">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[#000080] underline hover:text-[#cc0000] flex items-center gap-1 text-xs font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> {t.nav.dashboard}
            </Link>
            <span className="text-[#808080]">|</span>
            <div className="flex items-center gap-1.5 font-bold text-[#000080]">
              <Code className="w-4 h-4" />
              <span>{t.docs.breadcrumbApi}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono">
            <span className="bg-white px-2 py-0.5 border border-[#808080] font-bold">
              REST
            </span>
            <span className="bg-[#00aa00] text-white px-2 py-0.5 font-bold">
              ONLINE
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 bg-white text-black space-y-4 border border-[#808080] shadow-xs">
          {/* Header Banner */}
          <div className="border border-[#808080] bg-[#ffffd0] p-3 text-xs leading-relaxed text-[#402000]">
            <div className="flex items-center gap-2 font-bold mb-1">
              <Sparkles className="w-4 h-4 text-[#800000]" />
              <span>{t.docs.apiOverviewBadge}</span>
            </div>
            <p>
              {t.docs.apiOverviewDesc}
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#ece9d8] p-2.5">
              <div className="flex items-center gap-1.5 font-bold text-[#000080] mb-1">
                <Database className="w-4 h-4" />
                <span>{t.docs.baseEndpoint}</span>
              </div>
              <div className="font-mono bg-white px-2 py-1 border border-[#808080] text-[11px] truncate">
                /api/v1/kana
              </div>
            </div>

            <div className="border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#ece9d8] p-2.5">
              <div className="flex items-center gap-1.5 font-bold text-[#006000] mb-1">
                <Sliders className="w-4 h-4" />
                <span>{t.docs.authLabel}</span>
              </div>
              <div className="font-mono bg-white px-2 py-1 border border-[#808080] text-[11px]">
                {t.docs.authValue}
              </div>
            </div>

            <div className="border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#ece9d8] p-2.5">
              <div className="flex items-center gap-1.5 font-bold text-[#800080] mb-1">
                <Volume2 className="w-4 h-4" />
                <span>{t.docs.audioDeliveryLabel}</span>
              </div>
              <div className="font-mono bg-white px-2 py-1 border border-[#808080] text-[11px]">
                {t.docs.audioDeliveryValue}
              </div>
            </div>
          </div>

          {/* Desktop 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column: API Reference & Examples */}
            <div className="lg:col-span-6 space-y-4">
              {/* Endpoint Specification */}
              <div className="border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#ece9d8] p-3.5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#808080] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#000080] text-white px-2 py-0.5 text-xs font-mono font-bold">
                      GET
                    </span>
                    <span className="font-mono font-bold text-xs sm:text-sm text-[#000040]">
                      /api/v1/kana
                    </span>
                  </div>
                  <span className="text-[11px] text-[#404040]">
                    {t.docs.endpointHeader}
                  </span>
                </div>

                {/* Query Parameters Table */}
                <div className="text-xs">
                  <div className="font-bold mb-1.5 text-[#000080]">{t.docs.queryParamsTitle}</div>
                  <div className="overflow-x-auto border border-[#808080] bg-white">
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead className="bg-[#d4d0c8] border-b border-[#808080]">
                        <tr>
                          <th className="p-1.5 border-r border-[#808080]">{t.docs.paramCol}</th>
                          <th className="p-1.5 border-r border-[#808080]">{t.docs.typeCol}</th>
                          <th className="p-1.5 border-r border-[#808080]">{t.docs.valuesCol}</th>
                          <th className="p-1.5">{t.docs.descCol}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#e0e0e0]">
                          <td className="p-1.5 font-mono font-bold border-r border-[#e0e0e0]">script</td>
                          <td className="p-1.5 font-mono text-[#800000] border-r border-[#e0e0e0]">string</td>
                          <td className="p-1.5 font-mono text-[#000080] border-r border-[#e0e0e0]">hiragana | katakana</td>
                          <td className="p-1.5 text-[#404040]">{t.docs.scriptDesc}</td>
                        </tr>
                        <tr className="border-b border-[#e0e0e0]">
                          <td className="p-1.5 font-mono font-bold border-r border-[#e0e0e0]">type</td>
                          <td className="p-1.5 font-mono text-[#800000] border-r border-[#e0e0e0]">string</td>
                          <td className="p-1.5 font-mono text-[#000080] border-r border-[#e0e0e0]">gojuon | dakuon | handakuon | yoon</td>
                          <td className="p-1.5 text-[#404040]">{t.docs.typeDesc}</td>
                        </tr>
                        <tr>
                          <td className="p-1.5 font-mono font-bold border-r border-[#e0e0e0]">minimal</td>
                          <td className="p-1.5 font-mono text-[#800000] border-r border-[#e0e0e0]">boolean</td>
                          <td className="p-1.5 font-mono text-[#000080] border-r border-[#e0e0e0]">true | false</td>
                          <td className="p-1.5 text-[#404040]">
                            {t.docs.minimalDesc}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Code Snippets */}
              <div className="border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#ece9d8] p-3.5 space-y-3">
                <div className="flex items-center gap-2 font-bold text-xs text-[#000080]">
                  <BookOpen className="w-4 h-4" />
                  <span>{t.docs.snippetsTitle}</span>
                </div>

                {/* cURL */}
                <div>
                  <div className="flex items-center justify-between font-bold text-[11px] text-[#000080] mb-1">
                    <span>{t.docs.curlTitle}</span>
                    <button
                      onClick={() => copyToClipboard(curlExample, "curl")}
                      className="text-[10px] font-mono flex items-center gap-1 hover:underline"
                    >
                      {copiedKey === "curl" ? (
                        <>
                          <Check className="w-3 h-3 text-green-700" /> {t.docs.copied}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> {t.docs.copy}
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-[#1e1e1e] text-[#9cdcfe] p-2.5 font-mono text-[11px] overflow-x-auto border border-[#808080]">
                    {curlExample}
                  </pre>
                </div>

                {/* JavaScript Fetch */}
                <div>
                  <div className="flex items-center justify-between font-bold text-[11px] text-[#006000] mb-1">
                    <span>{t.docs.jsTitle}</span>
                    <button
                      onClick={() => copyToClipboard(fetchJsExample, "js")}
                      className="text-[10px] font-mono flex items-center gap-1 hover:underline"
                    >
                      {copiedKey === "js" ? (
                        <>
                          <Check className="w-3 h-3 text-green-700" /> {t.docs.copied}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> {t.docs.copy}
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-[#1e1e1e] text-[#ce9178] p-2.5 font-mono text-[11px] overflow-x-auto border border-[#808080]">
                    {fetchJsExample}
                  </pre>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Explorer & Response Visualizer */}
            <div className="lg:col-span-6 space-y-4">
              {/* Interactive Console */}
              <div className="border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#ece9d8] p-3.5 space-y-3">
                <div className="flex items-center justify-between border-b border-[#808080] pb-2">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#000080]">
                    <Terminal className="w-4 h-4" />
                    <span>{t.docs.interactiveTitle}</span>
                  </div>
                  <span className="text-[10px] bg-[#ffff99] text-[#800000] px-1.5 py-0.5 border border-[#808080] font-bold">
                    {t.docs.testBenchBadge}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#404040] mb-1">
                      {t.docs.scriptField}
                    </label>
                    <select
                      value={testScript}
                      onChange={(e) => setTestScript(e.target.value)}
                      className="w-full bg-white border border-[#808080] p-1 text-xs"
                    >
                      <option value="">{t.docs.allScriptsOption}</option>
                      <option value="hiragana">hiragana</option>
                      <option value="katakana">katakana</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#404040] mb-1">
                      {t.docs.typeField}
                    </label>
                    <select
                      value={testType}
                      onChange={(e) => setTestType(e.target.value)}
                      className="w-full bg-white border border-[#808080] p-1 text-xs"
                    >
                      <option value="">{t.docs.allTypesOption}</option>
                      <option value="gojuon">gojuon</option>
                      <option value="dakuon">dakuon</option>
                      <option value="handakuon">handakuon</option>
                      <option value="yoon">yoon</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#404040] mb-1">
                      {t.docs.minimalField}
                    </label>
                    <select
                      value={testMinimal ? "true" : "false"}
                      onChange={(e) => setTestMinimal(e.target.value === "true")}
                      className="w-full bg-white border border-[#808080] p-1 text-xs"
                    >
                      <option value="false">{t.docs.fullModeOption}</option>
                      <option value="true">{t.docs.minimalModeOption}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleTestApi}
                    disabled={isLoading}
                    className="w-full bg-[#000080] text-white py-1.5 px-3 text-xs font-bold border border-t-white border-l-white border-b-black border-r-black hover:bg-[#101090] active:translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isLoading ? t.docs.executingBtn : t.docs.executeBtn}
                  </button>
                </div>

                {/* API Response Display */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#404040] mb-1">
                    <span>{t.docs.outputLabel}</span>
                    {apiResponse && (
                      <button
                        onClick={() => copyToClipboard(apiResponse, "live-res")}
                        className="text-[10px] text-[#000080] flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        {copiedKey === "live-res" ? (
                          <>
                            <Check className="w-3 h-3 text-green-700" /> {t.docs.copied}
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> {t.docs.copyJson}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <pre className="bg-[#1e1e1e] text-[#4ec9b0] p-2.5 font-mono text-[11px] overflow-x-auto border border-[#808080] max-h-64 sm:max-h-72">
                    {apiResponse || t.docs.outputPlaceholder}
                  </pre>
                </div>
              </div>

              {/* Sample Response Payloads */}
              <div className="border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#ece9d8] p-3.5 space-y-2.5">
                <div className="flex items-center justify-between font-bold text-xs text-[#000080] border-b border-[#808080] pb-1.5">
                  <span>{t.docs.schemaTitle}</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `{\n  "success": true,\n  "count": 46,\n  "data": [\n    {\n      "id": "h-a",\n      "character": "あ",\n      "romaji": "a",\n      "script": "hiragana",\n      "type": "gojuon",\n      "row": "vowel",\n      "hint": "Looks like an apple with a stem.",\n      "audioUrl": "/audio/kana/h-a.wav"\n    }\n  ]\n}`,
                        "schema-json"
                      )
                    }
                    className="text-[10px] font-mono text-[#000080] flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    {copiedKey === "schema-json" ? (
                      <>
                        <Check className="w-3 h-3 text-green-700" /> {t.docs.copied}
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> {t.docs.copy}
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-2.5 font-mono text-[10px] sm:text-[11px] overflow-x-auto border border-[#808080] max-h-44">
{`{
  "success": true,
  "count": 46,
  "data": [
    {
      "id": "h-a",
      "character": "あ",
      "romaji": "a",
      "script": "hiragana",
      "type": "gojuon",
      "row": "vowel",
      "hint": "Looks like an apple with a stem.",
      "audioUrl": "/audio/kana/h-a.wav"
    },
    ...
  ]
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Bottom Navigation & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#808080]">
            <Link
              href="/dashboard"
              className="bg-[#d4d0c8] text-black px-3 py-1 text-xs font-bold border border-t-white border-l-white border-b-black border-r-black hover:bg-[#e0dcd4] active:border-t-black active:border-l-black active:border-b-white active:border-r-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t.docs.returnDashboard}
            </Link>

            <span className="text-[11px] text-[#555555]">
              {t.docs.footerMeta}
            </span>
          </div>
        </div>
      </main>

      {/* Docked Retro Footer & Status Bar */}
      <footer className="border-t border-[#808080] bg-[#d4d0c8] px-3 sm:px-6 py-2 text-[11px] text-[#404040] flex items-center justify-between font-mono shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00aa00]"></span>
          <span>{t.docs.serverReady}</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="hidden sm:inline">SAKANA PUBLIC REST API V1.0</span>
          <span className="border-l border-[#808080] pl-2 font-mono">HTTP 200 OK</span>
        </div>
      </footer>
    </div>
  );
}
