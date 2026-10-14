import { NextResponse } from "next/server";
import { ALL_KANA_PRIMITIVES, KanaScript, KanaType } from "@/data/kana";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const script = searchParams.get("script") as KanaScript | null; // "hiragana" | "katakana"
    const type = searchParams.get("type") as KanaType | null; // "gojuon" | "dakuon" | "handakuon" | "yoon" | "extended"
    const minimal = searchParams.get("minimal") === "true"; // return only character, id, and romaji for audio generation

    let results = ALL_KANA_PRIMITIVES;

    if (script) {
      results = results.filter((k) => k.script === script);
    }

    if (type) {
      results = results.filter((k) => k.type === type);
    }

    if (minimal) {
      const lightweight = results.map((k) => ({
        id: k.id,
        character: k.character,
        romaji: k.romaji,
        script: k.script,
      }));
      return NextResponse.json({
        success: true,
        count: lightweight.length,
        data: lightweight,
      });
    }

    // Default structure: essential properties + audio path reference
    const formatted = results.map((k) => ({
      id: k.id,
      character: k.character,
      romaji: k.romaji,
      script: k.script,
      type: k.type,
      row: k.row,
      hint: k.hint.en, // default English hint
      audioUrl: `/audio/kana/${k.id}.wav`,
    }));

    return NextResponse.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error: any) {
    console.error("Error retrieving kana data:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch kana data" },
      { status: 500 }
    );
  }
}
