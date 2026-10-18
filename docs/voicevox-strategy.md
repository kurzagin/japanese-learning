# Voicevox & Audio Strategy Plan

## 1. Overview & Findings

Following evaluation of Voicevox synthesis across isolated characters and words:
- **Single Kana & Vowels (あ, い, う, etc.)**: 
  - Voicevox neural acoustic models are built for conversational phrases and natural cadence. When synthesizing isolated single morae, the model produces unnatural inflection, excessive smoothing, and muffled articulation.
  - **Verdict**: Not suitable for single kana characters.
- **Words & Multi-Syllabic Vocabulary (ねこ, さかな, おはよう, etc.)**:
  - Voicevox excels at multi-syllable phrases, pitch-accent contours, and realistic cadence.
  - **Verdict**: High audio quality and ideal fit for vocabulary / study mode words.

---

## 2. Hybrid Audio Architecture

| Scope / Mode | Audio Engine | Voice / Speaker | Rationale |
| :--- | :--- | :--- | :--- |
| **Stage Kana Drill (Single Kana)** | Native Browser Speech Synthesis (`SpeechSynthesisUtterance`) | Device default Japanese OS voice (`ja-JP`) | Crisp, zero-latency, precise individual consonant/vowel articulation without neural blurring. |
| **Learn / Study Mode (Vocabulary Words)** | VOICEVOX Pre-rendered Audio | **Robo Type T** (robo-type-t) | Consistent pitch accent, friendly character persona, high retention through auditory-visual association. |
| **Sample Words on Flipped Kana Cards** | VOICEVOX Pre-rendered Audio | **Robo Type T** | Demonstrates the target kana inside a complete natural word. |

---

## 3. Selected Voicevox Configuration

- **Speaker**: Robo Type T (ロボ Type T)
- **Speed Scale**: `0.85x` (calibrated for language learners to discern mora boundaries cleanly)
- **Sample Rate**: `24,000 Hz`
- **Output Format**: Optimized `.wav` / `.mp3`
- **Delivery Strategy**: Pre-rendered static files served via CDN/Cloudflare R2 or `/public/audio/words/` for instant zero-latency playback.

---

## 4. Implementation Steps

1. **Audio Asset Generation Script**:
   - Create a clean node script in `scripts/generate-word-audio.mjs` targeting the word list from `src/data/stages.ts` and `src/data/words.ts`.
   - Synthesize using local Voicevox engine (`http://127.0.0.1:50021`) with speaker Robo Type T.
2. **Audio Player Integration**:
   - Enhance audio playback in `StudyClient.tsx` and `WordDetailClient.tsx`:
     - If the item is a single kana, trigger native `speechSynthesis`.
     - If the item is a word or has an associated pre-rendered audio URL, play the Voicevox track.
3. **Fallback Grace**:
   - If pre-rendered Voicevox audio fails to load or is missing, gracefully fall back to native speech synthesis.
