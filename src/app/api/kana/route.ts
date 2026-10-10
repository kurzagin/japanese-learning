import { NextResponse } from "next/server";
import { db } from "@/db";
import { kana } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const script = searchParams.get("script"); // "hiragana" | "katakana"

    let query = db.select().from(kana);
    const records = await query.orderBy(asc(kana.id));

    const filtered = script
      ? records.filter((k) => k.script === script)
      : records;

    return NextResponse.json({ success: true, data: filtered });
  } catch (error: any) {
    console.error("Error fetching kana from Neon:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch kana" },
      { status: 500 }
    );
  }
}
