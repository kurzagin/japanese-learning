"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import {
  Code,
  Terminal,
  Volume2,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Database,
  Sliders,
  Send,
  BookOpen
} from "lucide-react";

export default function DocsClient() {
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
curl -X GET "https://your-domain.com/api/v1/kana?script=hiragana&type=gojuon"`;

  const fetchJsExample = `// Fetch kana primitives in JavaScript / TypeScript
const res = await fetch("/api/v1/kana?script=hiragana&type=gojuon");
const { data } = await res.json();

data.forEach((k) => {
  console.log(\`\${k.character} (\${k.romaji}) -> audio: \${k.audioUrl}\`);
});`;

  return (
    <div className="min-h-screen bg-[#008080] text-black font-sans pb-16">
      {/* Top Navbar */}
      <RetroNavbar currentSubtitle="API DOCUMENTATION" />

      <main className="max-w-5xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
        {/* Window Container */}
        <div className="border-2 border-t-white border-l-white border-b-black border-r-black bg-[#d4d0c8] shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
          {/* Header Bar */}
          <div className="bg-[#000080] text-white px-3 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-[#ffff00]" />
              <span className="font-bold text-xs tracking-wider font-mono">
                SAKANA KANA PRIMITIVES API // v1.0
              </span>
            </div>
            <div className="flex gap-1 text-[10px] font-mono">
              <span className="bg-[#c0c0c0] text-black px-1.5 font-bold border border-t-white border-l-white border-b-black border-r-black">
                REST
              </span>
              <span className="bg-[#00aa00] text-white px-1.5 font-bold">
                ONLINE
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            {/* Overview Banner */}
            <div className="border border-[#808080] bg-[#ffffd0] p-3 text-xs leading-relaxed text-[#402000]">
              <div className="flex items-center gap-2 font-bold mb-1">
                <Sparkles className="w-4 h-4 text-[#800000]" />
                <span>Kana Primitives API Overview</span>
              </div>
              <p>
                The SaKana Public API exposes structured Japanese Hiragana and
                Katakana phonetic datasets. Developers can query characters,
                romaji transliterations, phonetic classifications (gojūon, dakuon,
                handakuon, yōon), mnemonic hints, and native audio pronunciation files.
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#ece9d8] p-3">
                <div className="flex items-center gap-1.5 font-bold text-[#000080] mb-1">
                  <Database className="w-4 h-4" />
                  <span>Base URL</span>
                </div>
                <div className="font-mono bg-white px-2 py-1 border border-[#808080] text-[11px] truncate">
                  /api/v1/kana
                </div>
              </div>

              <div className="border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#ece9d8] p-3">
                <div className="flex items-center gap-1.5 font-bold text-[#006000] mb-1">
                  <Sliders className="w-4 h-4" />
                  <span>Authentication</span>
                </div>
                <div className="font-mono bg-white px-2 py-1 border border-[#808080] text-[11px]">
                  None (Public GET)
                </div>
              </div>

              <div className="border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#ece9d8] p-3">
                <div className="flex items-center gap-1.5 font-bold text-[#800080] mb-1">
                  <Volume2 className="w-4 h-4" />
                  <span>Audio Delivery</span>
                </div>
                <div className="font-mono bg-white px-2 py-1 border border-[#808080] text-[11px]">
                  Pre-rendered Pronunciation (.wav)
                </div>
              </div>
            </div>

            {/* Endpoint 1 Details */}
            <div className="border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#ece9d8] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#808080] pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#000080] text-white px-2 py-0.5 text-xs font-mono font-bold">
                    GET
                  </span>
                  <span className="font-mono font-bold text-sm text-[#000040]">
                    /api/v1/kana
                  </span>
                </div>
                <span className="text-[11px] text-[#404040]">
                  Retrieve Kana Primitives List
                </span>
              </div>

              {/* Query Parameters Table */}
              <div className="text-xs mb-4">
                <div className="font-bold mb-1.5 text-[#000080]">Query Parameters</div>
                <div className="overflow-x-auto border border-[#808080] bg-white">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead className="bg-[#d4d0c8] border-b border-[#808080]">
                      <tr>
                        <th className="p-2 border-r border-[#808080]">Parameter</th>
                        <th className="p-2 border-r border-[#808080]">Type</th>
                        <th className="p-2 border-r border-[#808080]">Values</th>
                        <th className="p-2">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#e0e0e0]">
                        <td className="p-2 font-mono font-bold border-r border-[#e0e0e0]">script</td>
                        <td className="p-2 font-mono text-[#800000] border-r border-[#e0e0e0]">string</td>
                        <td className="p-2 font-mono text-[#000080] border-r border-[#e0e0e0]">hiragana | katakana</td>
                        <td className="p-2 text-[#404040]">Filter by script family.</td>
                      </tr>
                      <tr className="border-b border-[#e0e0e0]">
                        <td className="p-2 font-mono font-bold border-r border-[#e0e0e0]">type</td>
                        <td className="p-2 font-mono text-[#800000] border-r border-[#e0e0e0]">string</td>
                        <td className="p-2 font-mono text-[#000080] border-r border-[#e0e0e0]">gojuon | dakuon | handakuon | yoon | extended</td>
                        <td className="p-2 text-[#404040]">Filter by phonetic type category.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold border-r border-[#e0e0e0]">minimal</td>
                        <td className="p-2 font-mono text-[#800000] border-r border-[#e0e0e0]">boolean</td>
                        <td className="p-2 font-mono text-[#000080] border-r border-[#e0e0e0]">true | false</td>
                        <td className="p-2 text-[#404040]">
                          When <code>true</code>, returns only core identity fields (<code>id</code>, <code>character</code>, <code>romaji</code>, <code>script</code>).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sample Payloads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Full Response */}
                <div>
                  <div className="flex items-center justify-between font-bold mb-1 text-[#000080]">
                    <span>Default Response (Includes Audio URL)</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `{\n  "success": true,\n  "count": 46,\n  "data": [\n    {\n      "id": "h-a",\n      "character": "あ",\n      "romaji": "a",\n      "script": "hiragana",\n      "type": "gojuon",\n      "row": "vowel",\n      "hint": "Looks like an apple with a stem.",\n      "audioUrl": "/audio/kana/h-a.wav"\n    }\n  ]\n}`,
                          "full-json"
                        )
                      }
                      className="text-[10px] font-mono text-[#000080] flex items-center gap-1 hover:underline"
                    >
                      {copiedKey === "full-json" ? (
                        <>
                          <Check className="w-3 h-3 text-green-700" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-2.5 font-mono text-[11px] overflow-x-auto border border-[#808080] max-h-52">
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

                {/* Minimal Response */}
                <div>
                  <div className="flex items-center justify-between font-bold mb-1 text-[#006000]">
                    <span>Minimal Mode (?minimal=true)</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `{\n  "success": true,\n  "count": 104,\n  "data": [\n    {\n      "id": "h-a",\n      "character": "あ",\n      "romaji": "a",\n      "script": "hiragana"\n    }\n  ]\n}`,
                          "minimal-json"
                        )
                      }
                      className="text-[10px] font-mono text-[#000080] flex items-center gap-1 hover:underline"
                    >
                      {copiedKey === "minimal-json" ? (
                        <>
                          <Check className="w-3 h-3 text-green-700" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-2.5 font-mono text-[11px] overflow-x-auto border border-[#808080] max-h-52">
{`{
  "success": true,
  "count": 104,
  "data": [
    {
      "id": "h-a",
      "character": "あ",
      "romaji": "a",
      "script": "hiragana"
    },
    ...
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Interactive API Tester Console */}
            <div className="border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#ece9d8] p-4">
              <div className="flex items-center gap-2 font-bold text-xs text-[#000080] mb-3">
                <Terminal className="w-4 h-4" />
                <span>Interactive Live API Explorer</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#404040] mb-1">
                    Script
                  </label>
                  <select
                    value={testScript}
                    onChange={(e) => setTestScript(e.target.value)}
                    className="w-full bg-white border border-[#808080] p-1 text-xs"
                  >
                    <option value="">(All Scripts)</option>
                    <option value="hiragana">hiragana</option>
                    <option value="katakana">katakana</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#404040] mb-1">
                    Type
                  </label>
                  <select
                    value={testType}
                    onChange={(e) => setTestType(e.target.value)}
                    className="w-full bg-white border border-[#808080] p-1 text-xs"
                  >
                    <option value="">(All Types)</option>
                    <option value="gojuon">gojuon</option>
                    <option value="dakuon">dakuon</option>
                    <option value="handakuon">handakuon</option>
                    <option value="yoon">yoon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#404040] mb-1">
                    Minimal Mode
                  </label>
                  <select
                    value={testMinimal ? "true" : "false"}
                    onChange={(e) => setTestMinimal(e.target.value === "true")}
                    className="w-full bg-white border border-[#808080] p-1 text-xs"
                  >
                    <option value="false">false (Default)</option>
                    <option value="true">true (Minimal)</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleTestApi}
                    disabled={isLoading}
                    className="w-full bg-[#000080] text-white py-1.5 px-3 text-xs font-bold border border-t-white border-l-white border-b-black border-r-black hover:bg-[#101090] active:translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isLoading ? "Fetching..." : "Send Request"}
                  </button>
                </div>
              </div>

              {apiResponse && (
                <div>
                  <div className="text-[11px] font-bold text-[#404040] mb-1">
                    Response Preview:
                  </div>
                  <pre className="bg-[#1e1e1e] text-[#4ec9b0] p-3 font-mono text-[11px] overflow-x-auto border border-[#808080] max-h-56">
                    {apiResponse}
                  </pre>
                </div>
              )}
            </div>

            {/* Quick Integration Code Snippets */}
            <div className="border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#ece9d8] p-4">
              <div className="flex items-center gap-2 font-bold text-xs text-[#000080] mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Integration Examples</span>
              </div>

              <div className="space-y-4 text-xs">
                {/* cURL */}
                <div>
                  <div className="flex items-center justify-between font-bold text-[#000080] mb-1">
                    <span>cURL Request</span>
                    <button
                      onClick={() => copyToClipboard(curlExample, "curl")}
                      className="text-[10px] font-mono flex items-center gap-1 hover:underline"
                    >
                      {copiedKey === "curl" ? (
                        <>
                          <Check className="w-3 h-3 text-green-700" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-[#1e1e1e] text-[#9cdcfe] p-3 font-mono text-[11px] overflow-x-auto border border-[#808080]">
                    {curlExample}
                  </pre>
                </div>

                {/* Fetch API */}
                <div>
                  <div className="flex items-center justify-between font-bold text-[#006000] mb-1">
                    <span>JavaScript / TypeScript Fetch</span>
                    <button
                      onClick={() => copyToClipboard(fetchJsExample, "js")}
                      className="text-[10px] font-mono flex items-center gap-1 hover:underline"
                    >
                      {copiedKey === "js" ? (
                        <>
                          <Check className="w-3 h-3 text-green-700" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-[#1e1e1e] text-[#ce9178] p-3 font-mono text-[11px] overflow-x-auto border border-[#808080]">
                    {fetchJsExample}
                  </pre>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#808080]">
              <Link
                href="/study/hiragana-vowels"
                className="bg-[#d4d0c8] text-black px-3 py-1 text-xs font-bold border border-t-white border-l-white border-b-black border-r-black hover:bg-[#e0dcd4] flex items-center gap-1.5"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                Go to Study Dojo
              </Link>

              <span className="text-[11px] text-[#555555]">
                SaKana Public REST API v1.0 • JSON output
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
