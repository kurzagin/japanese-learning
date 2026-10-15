"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface WebringNode {
  id: string;
  name: string;
  url: string;
  badge: string;
  desc: string;
  external?: boolean;
}

const WEBRING_NODES: WebringNode[] = [
  {
    id: "kurzagin",
    name: "Kur Zagin",
    url: "https://kurzagin.com",
    badge: "/badges/kurzagin.svg",
    desc: "System architect, solo developer & builder",
    external: true,
  },
  {
    id: "e-teyvat",
    name: "E-Teyvat",
    url: "https://e-teyvat.vxnus.xyz",
    badge: "/badges/e-teyvat.svg",
    desc: "Genshin Impact Knowledge Base",
    external: true,
  },
  {
    id: "vxnus",
    name: "VXNUS Studio",
    url: "https://vxnus.xyz",
    badge: "/badges/vxnus.svg",
    desc: "Creative Technology Studio",
    external: true,
  },
  {
    id: "join",
    name: "Join Webring",
    url: "https://kurzagin.com/guestbook",
    badge: "/badges/join.svg",
    desc: "Leave your site link in the guestbook to join",
    external: true,
  },
];

export function RetroWebring() {
  const [activeNode, setActiveNode] = useState<WebringNode | null>(null);

  const realSites = WEBRING_NODES.filter((n) => n.id !== "join");

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
          <span>WEBRING // FEDERATED NETWORK</span>
        </span>
        <span className="text-[10px] text-[#00ff66] font-mono">[4 NODES]</span>
      </div>

      <div className="mt-2.5 p-2 bg-[#f4f2e8] border border-[#a09e90] space-y-2.5">
        {/* Buttons Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {WEBRING_NODES.map((node) => {
            return (
              <a
                key={node.id}
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform duration-100 hover:-translate-y-0.5 shadow-xs"
                style={{ width: "80px", height: "33px" }}
                title={`${node.name} — ${node.desc}`}
                onMouseEnter={() => setActiveNode(node)}
                onMouseLeave={() => setActiveNode(null)}
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
        <div className="bg-[#000040] text-[#00ff66] border border-[#808080] px-2.5 py-1 text-[11px] min-h-[36px] flex flex-col justify-center shadow-inner">
          {activeNode ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-bold text-[#ffff00]">
                {">"} {activeNode.name}
              </span>
              <span className="text-[10px] text-[#a0ffb0] truncate">
                {activeNode.desc}
              </span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#ffff99]">
              <span>{">"} INDIE WEBRING FEDERATION</span>
              <span className="text-[10px] text-[#00ff66]">
                HOVER BADGE FOR DETAILS // CLICK TO NAVIGATE
              </span>
            </div>
          )}
        </div>

        {/* Retro Nav Controls */}
        <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] pt-1 border-t border-[#d0cebf]">
          <div className="flex items-center gap-1.5">
            <a
              href={realSites[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-0.5 bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-[#000080] font-bold text-[10px]"
            >
              « PREV
            </a>
            <button
              type="button"
              onClick={handleRandom}
              className="px-2 py-0.5 bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-black font-bold text-[10px] cursor-pointer"
            >
              RANDOM
            </button>
            <a
              href={realSites[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-0.5 bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-[#000080] font-bold text-[10px]"
            >
              NEXT »
            </a>
          </div>

          <a
            href="https://kurzagin.com/guestbook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#800000] hover:underline font-bold flex items-center gap-1"
          >
            <span>+ JOIN RING</span>
            <span className="text-[9px] font-mono text-[#555]">(GUESTBOOK)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
