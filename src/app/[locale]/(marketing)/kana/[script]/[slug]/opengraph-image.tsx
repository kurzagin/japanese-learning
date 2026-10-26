import { ImageResponse } from "next/og";
import { getKanaBySlug } from "@/lib/db-data";
import { KANA_ORIGINS, KANA_STROKE_COUNTS } from "@/lib/kana-seo";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{
    locale?: string;
    script: string;
    slug: string;
  }>;
}

export default async function Image({ params }: Props) {
  const { locale, script, slug } = await params;
  const prefix = locale === "id" || locale === "ja" ? `/${locale}` : "";
  const kana = await getKanaBySlug(script, slug);

  const character = kana ? kana.character : "あ";
  const romaji = kana ? kana.romaji : "a";
  const scriptLabel = script === "hiragana" ? "HIRAGANA" : "KATAKANA";
  const origin = kana ? KANA_ORIGINS[kana.id] : null;
  const strokes = kana ? KANA_STROKE_COUNTS[kana.id] : null;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ece9d8",
          border: "16px solid #000080",
          fontFamily: "monospace",
          padding: "40px",
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            width: "100%",
            backgroundColor: "#000080",
            color: "#ffffff",
            padding: "12px 24px",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          <span>魚 SAKANA // JAPANESE {scriptLabel} GUIDE</span>
          <span style={{ color: "#00ff66" }}>● CHARACTER PROFILE</span>
        </div>

        {/* Center Main Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff8e7",
            border: "4px solid #800000",
            padding: "36px 60px",
            width: "90%",
            boxShadow: "8px 8px 0px rgba(0,0,0,0.25)",
          }}
        >
          {/* Character Big Box */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              border: "4px solid #000080",
              width: "240px",
              height: "240px",
            }}
          >
            <div
              style={{
                fontSize: "130px",
                fontWeight: 900,
                color: "#000080",
                lineHeight: 1,
              }}
            >
              {character}
            </div>
          </div>

          {/* Character Details */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              marginLeft: "40px",
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#800000",
                letterSpacing: "1px",
              }}
            >
              ROMANIZATION / SOUND
            </div>
            <div
              style={{
                fontSize: "64px",
                fontWeight: 900,
                color: "#cc0000",
                marginBottom: "8px",
              }}
            >
              /{romaji}/
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              <span
                style={{
                  backgroundColor: "#000080",
                  color: "#fff",
                  padding: "6px 14px",
                }}
              >
                {scriptLabel}
              </span>
              {strokes && (
                <span
                  style={{
                    backgroundColor: "#555555",
                    color: "#fff",
                    padding: "6px 14px",
                  }}
                >
                  {strokes} STROKE{strokes > 1 ? "S" : ""}
                </span>
              )}
              {origin && (
                <span
                  style={{
                    backgroundColor: "#800000",
                    color: "#fff",
                    padding: "6px 14px",
                  }}
                >
                  ORIGIN: {origin.kanji}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            fontSize: "18px",
            color: "#555555",
            borderTop: "2px solid #808080",
            paddingTop: "10px",
          }}
        >
          <span>https://sakanajp.site{prefix}/kana/{script}/{slug}</span>
          <span>FREE AUDIO &amp; STROKE BREAKDOWN</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
