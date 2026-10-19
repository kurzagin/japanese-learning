"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RetroNavbar } from "@/components/RetroNavbar";
import { useLanguage } from "@/context/LanguageContext";
import { DOCS_TOPICS, DocsTopic } from "@/data/docsTopics";
import {
  BookOpen,
  Sparkles,
  Trophy,
  Gamepad2,
  Volume2,
  Code,
  Search,
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  Home,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const { locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const iconMap: Record<DocsTopic["iconName"], React.ReactNode> = {
    book: <BookOpen className="w-3.5 h-3.5" />,
    sparkles: <Sparkles className="w-3.5 h-3.5" />,
    trophy: <Trophy className="w-3.5 h-3.5" />,
    gamepad: <Gamepad2 className="w-3.5 h-3.5" />,
    volume: <Volume2 className="w-3.5 h-3.5" />,
    code: <Code className="w-3.5 h-3.5" />,
  };

  const topicLabels: Record<string, Record<string, string>> = {
    en: {
      overview: "Knowledge Base Overview",
      srs: "SRS & Memory Intervals",
      progression: "Progression & Sprint Gates",
      arcade: "Arcade Engine & Survival",
      audio: "Audio & Phonetics (VOICEVOX)",
      api: "REST API Developer Console",
    },
    id: {
      overview: "Ringkasan Basis Pengetahuan",
      srs: "SRS & Interval Memori",
      progression: "Progresi & Gerbang Sprint",
      arcade: "Mesin Arcade & Bertahan Hidup",
      audio: "Audio & Fonetik (VOICEVOX)",
      api: "Konsol Developer REST API",
    },
    ja: {
      overview: "ナレッジベース概要",
      srs: "SRS記憶間隔アルゴリズム",
      progression: "進捗・スピードスプリント関門",
      arcade: "アーケード適応生存ループ",
      audio: "音声・音韻論 (VOICEVOX)",
      api: "REST API 開発者リファレンス",
    },
  };

  const filteredTopics = DOCS_TOPICS.filter((topic) => {
    const label = topicLabels[locale]?.[topic.titleKey] || topic.titleKey;
    return label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const currentTopic = DOCS_TOPICS.find((t) => {
    const fullPath = `${prefix}/docs${t.slug}`;
    return pathname === fullPath || (t.slug === "" && pathname === `${prefix}/docs`);
  });

  return (
    <div className="min-h-screen bg-[#008080] flex flex-col font-sans">
      <RetroNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto p-2 sm:p-4 md:p-6 flex flex-col">
        {/* Win98 Window Shell */}
        <div className="border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] bg-[#d4d0c8] shadow-2xl flex-1 flex flex-col">
          {/* Blue Title Bar */}
          <div className="bg-[#000080] text-white px-3 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#ffff00] inline-block border border-black shadow-xs"></span>
              <span className="font-bold text-xs sm:text-sm tracking-wider font-mono">
                SAKANA_HELP_WORKSHOP.EXE — [KB // MANUAL v1.0]
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px]">
              <span className="px-1.5 py-0.2 bg-[#3a6ea5] text-white">ONLINE</span>
            </div>
          </div>

          {/* MSDN Style Menu / Breadcrumb Bar */}
          <div className="px-3 py-1.5 bg-[#ece9d8] border-b border-[#808080] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#333]">
              <Link href={`${prefix}/`} className="hover:underline text-[#000080] flex items-center gap-1">
                <Home className="w-3 h-3" />
                <span>ROOT</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-[#888]" />
              <Link href={`${prefix}/docs`} className="hover:underline text-[#000080]">
                DOCS
              </Link>
              {currentTopic && currentTopic.slug !== "" && (
                <>
                  <ChevronRight className="w-3 h-3 text-[#888]" />
                  <span className="font-bold text-[#800000] uppercase">
                    {topicLabels[locale]?.[currentTopic.titleKey] || currentTopic.titleKey}
                  </span>
                </>
              )}
            </div>

            <div className="text-[10px] text-[#666] font-mono hidden sm:block">
              SYSTEM: UTF-8 // HYPERTEXT MANUAL
            </div>
          </div>

          {/* Split Pane: Sidebar + Content */}
          <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-[#d4d0c8]">
            {/* Left Sidebar (MSDN Tree) */}
            <aside className="w-full md:w-64 lg:w-72 border-b md:border-b-0 md:border-r border-[#808080] bg-[#e0ded8] p-3 flex flex-col shrink-0">
              {/* Search Bar */}
              <div className="mb-3">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search manual topics..."
                    className="w-full pl-7 pr-2 py-1 text-xs border-t border-l border-[#808080] border-b border-r border-white bg-white font-mono focus:outline-none focus:ring-1 focus:ring-[#000080]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#888] absolute left-2 top-2 pointer-events-none" />
                </div>
              </div>

              {/* Navigation Tree */}
              <div className="flex-1 overflow-y-auto space-y-1 font-mono text-xs">
                <div className="text-[10px] font-bold text-[#555] uppercase tracking-wider mb-1 px-1">
                  Table of Contents
                </div>

                {filteredTopics.map((topic) => {
                  const targetHref = `${prefix}/docs${topic.slug}`;
                  const isActive =
                    pathname === targetHref || (topic.slug === "" && pathname === `${prefix}/docs`);
                  const title = topicLabels[locale]?.[topic.titleKey] || topic.titleKey;

                  return (
                    <Link
                      key={topic.id}
                      href={targetHref}
                      className={`flex items-center gap-2 px-2 py-1.5 transition-colors border ${
                        isActive
                          ? "bg-[#000080] text-white border-[#000080] font-bold shadow-xs"
                          : "hover:bg-[#d0ccc0] text-[#111] border-transparent"
                      }`}
                    >
                      <span className="shrink-0">{iconMap[topic.iconName]}</span>
                      <span className="truncate flex-1 text-[11px]">{title}</span>
                      <span
                        className={`text-[9px] px-1 py-0.2 shrink-0 ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#c0c0c0] text-[#333]"
                        }`}
                      >
                        {topic.readTime}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Quick Link to Dashboard */}
              <div className="mt-3 pt-3 border-t border-[#b0aca0]">
                <Link
                  href={`${prefix}/dashboard`}
                  className="w-full py-1.5 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-[11px] font-bold text-[#000080] flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Return to Workstation</span>
                </Link>
              </div>
            </aside>

            {/* Right Main Content */}
            <article className="flex-1 p-4 sm:p-6 lg:p-8 bg-white overflow-y-auto max-w-full">
              {children}
            </article>
          </div>

          {/* Win98 Status Bar */}
          <div className="px-3 py-1 bg-[#d4d0c8] border-t border-[#808080] flex items-center justify-between text-[11px] font-mono text-[#555]">
            <span className="truncate">SaKana Manual // Documentation System</span>
            <span className="shrink-0">PAGE READY</span>
          </div>
        </div>
      </main>
    </div>
  );
}
