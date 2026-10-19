import { ImageResponse } from "next/og";

export const alt = "SaKana (魚) — The Fastest Way to Master Kana for Anime Fans";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
        {/* Top header bar */}
        <div
          style={{
            display: "flex",
            width: "100%",
            backgroundColor: "#000080",
            color: "#ffffff",
            padding: "12px 24px",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          <span>魚 SAKANA // KANA SPEED DRILL FOR ANIME FANS</span>
          <span style={{ color: "#00ff66" }}>● ONLINE</span>
        </div>

        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#fff8e7",
            border: "4px solid #800000",
            padding: "36px 60px",
            boxShadow: "8px 8px 0px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              fontSize: "68px",
              fontWeight: 900,
              color: "#000080",
              letterSpacing: "4px",
              marginBottom: "12px",
            }}
          >
            あ ア 魚 SAKANA
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#cc0000",
              marginBottom: "16px",
            }}
          >
            〜 Master Kana the Fun Way — Built for Anime Fans 〜
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              fontSize: "20px",
              color: "#333333",
            }}
          >
            <span style={{ backgroundColor: "#000080", color: "#fff", padding: "6px 16px" }}>
              Hiragana & Katakana
            </span>
            <span style={{ backgroundColor: "#800000", color: "#fff", padding: "6px 16px" }}>
              Anime Words & Loanwords
            </span>
            <span style={{ backgroundColor: "#006600", color: "#fff", padding: "6px 16px" }}>
              Native Audio
            </span>
          </div>
        </div>

        {/* Bottom footer status */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            fontSize: "20px",
            color: "#555555",
            borderTop: "2px solid #808080",
            paddingTop: "12px",
          }}
        >
          <span>https://sakanajp.site</span>
          <span>FAST KANA DRILL FOR ANIME & MANGA FANS</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
