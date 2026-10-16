import fs from "fs";

// Build a dictionary of historical Kanji origins (Man'yōgana) and phonetic notes
const origins = {
  // Hiragana Vowels
  "h-a": { kanji: "安", reading: "an", notes: "Derived from the cursive form of the Kanji 安 (peace/cheap)." },
  "h-i": { kanji: "以", reading: "i", notes: "Derived from the cursive form of 以 (by means of)." },
  "h-u": { kanji: "宇", reading: "u", notes: "Derived from the crown and body of 宇 (universe)." },
  "h-e": { kanji: "衣", reading: "e", notes: "Derived from the cursive strokes of 衣 (clothing)." },
  "h-o": { kanji: "於", reading: "o", notes: "Derived from the cursive form of 於 (at/in)." },

  // Hiragana K-row
  "h-ka": { kanji: "加", reading: "ka", notes: "Derived from 加 (to add)." },
  "h-ki": { kanji: "幾", reading: "ki", notes: "Derived from the cursive form of 幾 (how many)." },
  "h-ku": { kanji: "久", reading: "ku", notes: "Derived from 久 (long time)." },
  "h-ke": { kanji: "計", reading: "ke", notes: "Derived from 計 (to measure/plan)." },
  "h-ko": { kanji: "己", reading: "ko", notes: "Derived from 己 (oneself)." },

  // Hiragana S-row
  "h-sa": { kanji: "左", reading: "sa", notes: "Derived from 左 (left)." },
  "h-shi": { kanji: "之", reading: "shi", notes: "Derived from the flowing stroke of 之 (of)." },
  "h-su": { kanji: "寸", reading: "su", notes: "Derived from 寸 (traditional measurement unit)." },
  "h-se": { kanji: "世", reading: "se", notes: "Derived from 世 (world/generation)." },
  "h-so": { kanji: "曽", reading: "so", notes: "Derived from 曽 (formerly)." },

  // Hiragana T-row
  "h-ta": { kanji: "太", reading: "ta", notes: "Derived from 太 (thick/great)." },
  "h-chi": { kanji: "知", reading: "chi", notes: "Derived from 知 (to know)." },
  "h-tsu": { kanji: "川", reading: "tsu", notes: "Derived from 川 (river)." },
  "h-te": { kanji: "天", reading: "te", notes: "Derived from 天 (heaven/sky)." },
  "h-to": { kanji: "止", reading: "to", notes: "Derived from 止 (to stop)." },

  // Hiragana N-row
  "h-na": { kanji: "奈", reading: "na", notes: "Derived from 奈 (Nara prefecture / what)." },
  "h-ni": { kanji: "仁", reading: "ni", notes: "Derived from 仁 (benevolence)." },
  "h-nu": { kanji: "奴", reading: "nu", notes: "Derived from 奴 (fellow/servant)." },
  "h-ne": { kanji: "祢", reading: "ne", notes: "Derived from 祢 (ancestral shrine)." },
  "h-no": { kanji: "乃", reading: "no", notes: "Derived from 乃 (from/whereupon)." },

  // Hiragana H-row
  "h-ha": { kanji: "波", reading: "ha", notes: "Derived from 波 (wave)." },
  "h-hi": { kanji: "比", reading: "hi", notes: "Derived from 比 (to compare)." },
  "h-fu": { kanji: "不", reading: "fu", notes: "Derived from 不 (non/negative)." },
  "h-he": { kanji: "部", reading: "he", notes: "Derived from 部 (part/section)." },
  "h-ho": { kanji: "保", reading: "ho", notes: "Derived from 保 (to protect/preserve)." },

  // Hiragana M-row
  "h-ma": { kanji: "末", reading: "ma", notes: "Derived from 末 (end/extremity)." },
  "h-mi": { kanji: "美", reading: "mi", notes: "Derived from 美 (beauty)." },
  "h-mu": { kanji: "武", reading: "mu", notes: "Derived from 武 (martial/warrior)." },
  "h-me": { kanji: "女", reading: "me", notes: "Derived from 女 (woman/female)." },
  "h-mo": { kanji: "毛", reading: "mo", notes: "Derived from 毛 (hair/fur)." },

  // Hiragana Y-row
  "h-ya": { kanji: "也", reading: "ya", notes: "Derived from 也 (to be)." },
  "h-yu": { kanji: "由", reading: "yu", notes: "Derived from 由 (reason/cause)." },
  "h-yo": { kanji: "与", reading: "yo", notes: "Derived from 与 (to give)." },

  // Hiragana R-row
  "h-ra": { kanji: "良", reading: "ra", notes: "Derived from 良 (good/virtuous)." },
  "h-ri": { kanji: "利", reading: "ri", notes: "Derived from 利 (benefit/sharp)." },
  "h-ru": { kanji: "留", reading: "ru", notes: "Derived from 留 (to stay/detain)." },
  "h-re": { kanji: "礼", reading: "re", notes: "Derived from 礼 (courtesy/bow)." },
  "h-ro": { kanji: "呂", reading: "ro", notes: "Derived from 呂 (bath/spine)." },

  // Hiragana W & N
  "h-wa": { kanji: "和", reading: "wa", notes: "Derived from 和 (harmony/peace)." },
  "h-wo": { kanji: "遠", reading: "wo", notes: "Derived from 遠 (distant/far)." },
  "h-n": { kanji: "无", reading: "n", notes: "Derived from 无 (nothingness)." },

  // Katakana Vowels
  "k-a": { kanji: "阿", reading: "a", notes: "Derived from the left radical 阝 of 阿." },
  "k-i": { kanji: "伊", reading: "i", notes: "Derived from the left radical 亻 of 伊." },
  "k-u": { kanji: "宇", reading: "u", notes: "Derived from the crown radical 宀 of 宇." },
  "k-e": { kanji: "江", reading: "e", notes: "Derived from the right part 工 of 江." },
  "k-o": { kanji: "於", reading: "o", notes: "Derived from the upper-left of 於." },

  // Katakana K-row
  "k-ka": { kanji: "加", reading: "ka", notes: "Derived from the left part 力 of 加." },
  "k-ki": { kanji: "幾", reading: "ki", notes: "Derived from the top part of 幾." },
  "k-ku": { kanji: "久", reading: "ku", notes: "Derived from the first two strokes of 久." },
  "k-ke": { kanji: "介", reading: "ke", notes: "Derived from the left part of 介." },
  "k-ko": { kanji: "己", reading: "ko", notes: "Derived from the top strokes of 己." },

  // Katakana S-row
  "k-sa": { kanji: "散", reading: "sa", notes: "Derived from the top-left of 散." },
  "k-shi": { kanji: "之", reading: "shi", notes: "Derived from the cursive form of 之." },
  "k-su": { kanji: "須", reading: "su", notes: "Derived from the top-right strokes of 須." },
  "k-se": { kanji: "世", reading: "se", notes: "Derived from the bottom stroke and body of 世." },
  "k-so": { kanji: "曽", reading: "so", notes: "Derived from the top two strokes of 曽." },

  // Katakana T-row
  "k-ta": { kanji: "多", reading: "ta", notes: "Derived from the top part of 多." },
  "k-chi": { kanji: "千", reading: "chi", notes: "Derived from 千 (thousand)." },
  "k-tsu": { kanji: "川", reading: "tsu", notes: "Derived from 川 (river)." },
  "k-te": { kanji: "天", reading: "te", notes: "Derived from the top strokes of 天." },
  "k-to": { kanji: "止", reading: "to", notes: "Derived from the right and top stroke of 止." },

  // Katakana N-row
  "k-na": { kanji: "奈", reading: "na", notes: "Derived from the top two strokes of 奈." },
  "k-ni": { kanji: "二", reading: "ni", notes: "Derived from 二 (two)." },
  "k-nu": { kanji: "奴", reading: "nu", notes: "Derived from the right part 又 of 奴." },
  "k-ne": { kanji: "祢", reading: "ne", notes: "Derived from the left radical 礻 of 祢." },
  "k-no": { kanji: "乃", reading: "no", notes: "Derived from the left stroke of 乃." },

  // Katakana H-row
  "k-ha": { kanji: "八", reading: "ha", notes: "Derived from 八 (eight)." },
  "k-hi": { kanji: "比", reading: "hi", notes: "Derived from the right half of 比." },
  "k-fu": { kanji: "不", reading: "fu", notes: "Derived from the first stroke of 不." },
  "k-he": { kanji: "部", reading: "he", notes: "Derived from the right part 阝 of 部." },
  "k-ho": { kanji: "保", reading: "ho", notes: "Derived from the right part 呆 of 保." },

  // Katakana M-row
  "k-ma": { kanji: "末", reading: "ma", notes: "Derived from the top strokes of 末." },
  "k-mi": { kanji: "三", reading: "mi", notes: "Derived from 三 (three)." },
  "k-mu": { kanji: "牟", reading: "mu", notes: "Derived from the top strokes of 牟." },
  "k-me": { kanji: "女", reading: "me", notes: "Derived from the cross strokes of 女." },
  "k-mo": { kanji: "毛", reading: "mo", notes: "Derived from the bottom strokes of 毛." },

  // Katakana Y-row
  "k-ya": { kanji: "也", reading: "ya", notes: "Derived from the first strokes of 也." },
  "k-yu": { kanji: "由", reading: "yu", notes: "Derived from the lower strokes of 由." },
  "k-yo": { kanji: "与", reading: "yo", notes: "Derived from the right and bottom angles of 与." },

  // Katakana R-row
  "k-ra": { kanji: "良", reading: "ra", notes: "Derived from the top of 良." },
  "k-ri": { kanji: "利", reading: "ri", notes: "Derived from the right radical 刂 of 利." },
  "k-ru": { kanji: "流", reading: "ru", notes: "Derived from the bottom-right strokes of 流." },
  "k-re": { kanji: "礼", reading: "re", notes: "Derived from the right radical 乚 of 礼." },
  "k-ro": { kanji: "呂", reading: "ro", notes: "Derived from the top square 口 of 呂." },

  // Katakana W & N
  "k-wa": { kanji: "和", reading: "wa", notes: "Derived from the right radical 口 of 和." },
  "k-wo": { kanji: "乎", reading: "wo", notes: "Derived from the top and body strokes of 乎." },
  "k-n": { kanji: "尓", reading: "n", notes: "Derived from the cursive form of 尓." },
};

export default origins;
