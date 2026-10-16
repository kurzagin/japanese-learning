"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface WebringNode {
  id: string;
  name: string;
  url: string;
  badge: string;
  desc: string;
  external?: boolean;
}

export function RetroWebring() {
  const { t } = useLanguage();
  const [activeNode, setActiveNode] = useState<WebringNode | null>(null);

  const webringNodes: WebringNode[] = [
    {
      id: "kurzagin",
      name: "Kur Zagin",
      url: "https://kurzagin.com",
      badge: "/badges/kurzagin.svg",
      desc: t.webring.nodes.kurzaginDesc,
      external: true,
    },
    {
      id: "e-teyvat",
      name: "E-Teyvat",
      url: "https://e-teyvat.vxnus.xyz",
      badge: "/badges/e-teyvat.svg",
      desc: t.webring.nodes.eteyvatDesc,
      external: true,
    },
    {
      id: "vxnus",
      name: "VXNUS Studio",
      url: "https://vxnus.xyz",
      badge: "/badges/vxnus.svg",
      desc: t.webring.nodes.vxnusDesc,
      external: true,
    },
    {
      id: "join",
      name: t.webring.nodes.joinName,
      url: "https://kurzagin.com/guestbook",
      badge: "/badges/join.svg",
      desc: t.webring.nodes.joinDesc,
      external: true,
    },
  ];

  const realSites = webringNodes.filter((n) => n.id !== "join");

  const handleRandom = () => {
    const random = realSites[Math.floor(Math.random() * realSites.length)];
    window.open(random.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="border border-[#808080] bg-[#ece9d8] p-3 shadow-xs font-mono">
      {/* Titlebar */}
      <div className="bg-[#000080] text-white px-2.5 py-1 text-xs font-bold flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="text-[#ffff00]">❖</span>
          <span>{t.webring.title}</span>
        </span>
        <span className="text-[10px] text-[#00ff66] font-mono">{t.webring.nodesCount}</span>
      </div>

      <div className="mt-2.5 p-2 bg-[#f4f2e8] border border-[#a09e90] space-y-2.5">
        {/* Buttons Grid - Optimized for mobile wrapping and touch friendly */}
        <div className="grid grid-cols-2 xs:grid-cols-4 sm:flex sm:flex-wrap items-center justify-center gap-2">
          {webringNodes.map((node) => {
            return (
              <a
                key={node.id}
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-transform duration-100 hover:-translate-y-0.5 active:translate-y-0 shadow-xs mx-auto"
                style={{ width: "80px", height: "33px" }}
                title={`${node.name} — ${node.desc}`}
                onMouseEnter={() => setActiveNode(node)}
                onMouseLeave={() => setActiveNode(null)}
                onTouchStart={() => setActiveNode(node)}
              >
                <Image
                  src={node.badge}
                  alt={`${node.name} 80x33 badge`}
                  width={80}
                  height={33}
                  className="w-[80px] h-[33px] block"
                  style={{ imageRendering: "pixelated" }}
                  unoptimized
                />
              </a>
            );
          })}
        </div>

        {/* Ticker / Hover Status */}
        <div className="bg-[#000040] text-[#00ff66] border border-[#808080] px-2.5 py-1.5 text-[11px] min-h-[36px] flex flex-col justify-center shadow-inner">
          {activeNode ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
              <span className="font-bold text-[#ffff00] truncate">
                {">"} {activeNode.name}
              </span>
              <span className="text-[10px] text-[#a0ffb0] line-clamp-1 sm:truncate">
                {activeNode.desc}
              </span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 text-[#ffff99]">
              <span className="truncate">{">"} {t.webring.federationHeader}</span>
              <span className="text-[10px] text-[#00ff66]">
                {t.webring.hoverPrompt}
              </span>
            </div>
          )}
        </div>

        {/* Retro Nav Controls - Mobile friendly flex wrap */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] pt-1.5 border-t border-[#d0cebf]">
          <div className="flex items-center justify-center gap-1.5 w-full sm:w-auto">
            <a
              href={realSites[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none text-center px-2 py-1 bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-[#000080] font-bold text-[10px]"
            >
              {t.webring.prev}
            </a>
            <button
              type="button"
              onClick={handleRandom}
              className="flex-1 sm:flex-none text-center px-2 py-1 bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-black font-bold text-[10px] cursor-pointer"
            >
              {t.webring.random}
            </button>
            <a
              href={realSites[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none text-center px-2 py-1 bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-[#000080] font-bold text-[10px]"
            >
              {t.webring.next}
            </a>
          </div>

          <a
            href="https://kurzagin.com/guestbook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#800000] hover:underline font-bold flex items-center justify-center gap-1 py-0.5"
          >
            <span>{t.webring.join}</span>
            <span className="text-[9px] font-mono text-[#555]">{t.webring.guestbookTag}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
