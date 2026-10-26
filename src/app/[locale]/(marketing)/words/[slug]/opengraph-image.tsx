import { ImageResponse } from "next/og";
import { getWordBySlug } from "@/lib/db-data";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{
    locale?: string;
    slug: string;
  }>;
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  const word = await getWordBySlug(slug);
  const lang = locale === "id" || locale === "ja" ? locale : "en";
  const prefix = lang === "en" ? "" : `/${lang}`;

  const character = word ? word.character : "さかな";
  const romaji = word ? word.romaji : "sakana";
  const meaning = word ? word.meaning[lang] || word.meaning.en : "Fish";
  const kanji = word?.kanji && word.kanji !== word.character ? word.kanji : null;
  const scriptLabel = word?.script === "hiragana" ? "HIRAGANA" : "KATAKANA";
  const jlpt = word?.jlpt || "Core";

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
          <span>魚 SAKANA // JAPANESE VOCABULARY DICTIONARY</span>
          <span style={{ color: "#00ff66" }}>● {jlpt} VOCABULARY</span>
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
          {/* Word Character Display */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              border: "4px solid #000080",
              minWidth: "320px",
              padding: "24px 32px",
            }}
          >
            <div
              style={{
                fontSize: "76px",
                fontWeight: 900,
                color: "#000080",
                lineHeight: 1.1,
              }}
            >
              {character}
            </div>
            {kanji && (
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#800000",
                  marginTop: "8px",
                }}
              >
                Kanji: {kanji}
              </div>
            )}
          </div>

          {/* Details */}
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
                fontSize: "22px",
                fontWeight: "bold",
                color: "#800000",
                letterSpacing: "1px",
              }}
            >
              ROMAJI &amp; ENGLISH MEANING
            </div>
            <div
              style={{
                fontSize: "48px",
                fontWeight: 900,
                color: "#cc0000",
                marginBottom: "4px",
              }}
            >
              /{romaji}/
            </div>
            <div
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#222222",
                marginBottom: "16px",
              }}
            >
              &ldquo;{meaning}&rdquo;
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
              <span
                style={{
                  backgroundColor: "#006600",
                  color: "#fff",
                  padding: "6px 14px",
                }}
              >
                JLPT {jlpt}
              </span>
              <span
                style={{
                  backgroundColor: "#800000",
                  color: "#fff",
                  padding: "6px 14px",
                }}
              >
                NATIVE TTS AUDIO
              </span>
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
          <span>https://sakanajp.site{prefix}/words/{slug}</span>
          <span>SPACED REPETITION FLASHCARDS</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
