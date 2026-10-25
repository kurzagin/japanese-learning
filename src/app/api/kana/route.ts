import { NextResponse } from "next/server";
import rawKana from "@/data/kana.json";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const script = searchParams.get("script"); // "hiragana" | "katakana"

    const filtered = script
      ? (rawKana as any[]).filter((k) => k.script === script)
      : rawKana;

    return NextResponse.json({ success: true, data: filtered });
  } catch (error: any) {
    console.error("Error fetching kana from static data:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch kana" },
      { status: 500 }
    );
  }
}
